# Shorts Automation — 프로젝트 아키텍처 & 로드맵

> 유튜브 쇼츠 자동화 파이프라인을 LangGraph 기반 대화형 챗봇으로 리팩토링하고,
> 다중 장르 템플릿 시스템으로 확장하는 프로젝트입니다.
>
> GitHub: https://github.com/hyun9-9/shorts-automation

---

## 1. 현재 상태 (As-Is)

### 1.1 기술 스택

| 영역       | 기술                                            |
| ---------- | ----------------------------------------------- |
| 프론트엔드 | Next.js (pnpm)                                  |
| 백엔드     | Express 5 + TypeScript (npm)                    |
| AI         | Google Gemini 2.5 Flash (콘셉트, 스크립트, TTS) |
| 영상 편집  | FFmpeg + 동적 ASS 자막                          |
| 배포       | YouTube Data API v3                             |
| 모노레포   | Turborepo (설정 미완성)                         |

### 1.2 파이프라인 흐름

현재 8단계 위자드 UI로 동작합니다.

```
[Step 1] 감정 키워드 입력
    ↓
[Step 2] Gemini → 콘셉트 생성 (제목, 감정, 배경, 사운드)
    ↓
[Step 3] Gemini → 명상 스크립트 생성
    ↓
[Step 4] 이미지 프롬프트 생성 → 수동 업로드 (AI Studio에서 직접 생성)
    ↓
[Step 5] Gemini TTS → 음성 생성 (WAV)
    ↓
[Step 6] 배경음악 선택 (public/music 폴더에서 수동 선택)
    ↓
[Step 7] FFmpeg → 영상 편집 (이미지 + TTS + BGM + ASS 자막)
    ↓
[Step 8] YouTube 업로드 (CLI 기반 OAuth)
```

### 1.3 알려진 기술 부채

- 하드코딩된 테스트 데이터로 실제 파이프라인이 바이패스됨
- `docker-compose.yml`, `turbo.json` 빈 파일
- `public/` 폴더에 바이너리 파일(~68MB) Git 커밋
- 프론트/백 패키지 매니저 불일치 (pnpm vs npm)
- Step 컴포넌트에서 Linear 디자인 시스템 미적용 (Tailwind 직접 사용)
- 타입 안전성 부족 (`any` 다수 사용)
- YouTube OAuth가 `readline` 기반 CLI 방식
- 이미지 생성이 반자동 (프롬프트만 생성, 수동 업로드)
- 자막 시간 분배가 단순 균등 분할 (문장 길이 미반영)

---

## 2. 목표 아키텍처 (To-Be)

### 2.1 핵심 변경 요약

```
[As-Is]  8단계 위자드 UI + Express REST API
    ↓
[To-Be]  대화형 챗봇 UI + LangGraph 상태 머신
```

**3가지 핵심 전환:**

1. 위자드 UI → 채팅 인터페이스 (왼쪽 채팅 / 오른쪽 미디어 프리뷰)
2. Express 라우터 → LangGraph StateGraph (노드 기반 파이프라인)
3. 명상 단일 장르 → 다중 장르 템플릿 시스템

### 2.2 LangGraph 상태 그래프

```
                    ┌─────────────┐
                    │    START    │
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │ parse_input │  ← 채팅에서 의도/장르/키워드 추출
                    └──────┬──────┘
                           │
                    ┌──────▼──────────┐
                    │ select_template │  ← 장르별 프롬프트/설정 로드
                    └──────┬──────────┘
                           │
                    ┌──────▼──────────────┐
                    │ generate_concept    │  ← Gemini 구조화 출력
                    └──────┬──────────────┘
                           │
                    ┌──────▼──────────────┐
                    │ human_review        │  ← interrupt() 사용자 확인
                    │  ├─ "좋아" → 다음    │
                    │  └─ "수정" → 재생성  │ ──→ generate_concept (루프)
                    └──────┬──────────────┘
                           │
                    ┌──────▼──────────────┐
                    │ generate_script     │  ← 템플릿별 스크립트 생성
                    └──────┬──────────────┘
                           │
                    ┌──────▼──────────────┐
                    │ human_review        │  ← 스크립트 확인
                    └──────┬──────────────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
       ┌──────▼───┐ ┌─────▼─────┐ ┌───▼────────┐
       │ gen_tts  │ │ gen_image │ │ select_bgm │  ← fan-out 병렬 처리
       └──────┬───┘ └─────┬─────┘ └───┬────────┘
              │            │            │
              └────────────┼────────────┘
                           │  fan-in (join)
                    ┌──────▼──────────────┐
                    │ edit_video          │  ← FFmpeg 편집
                    └──────┬──────────────┘
                           │
                    ┌──────▼──────────────┐
                    │ human_review        │  ← 최종 영상 확인
                    │  ├─ "업로드" → push  │
                    │  ├─ "수정" → 재편집  │
                    │  └─ "재생성" → 처음  │
                    └──────┬──────────────┘
                           │
                    ┌──────▼──────────────┐
                    │ push_youtube        │  ← YouTube 업로드
                    └──────┬──────────────┘
                           │
                    ┌──────▼──────┐
                    │     END     │
                    └─────────────┘
```

### 2.3 State 스키마

```typescript
interface ShortsState {
  // 입력
  userMessage: string;
  genre: TemplateType;

  // 콘셉트
  concept: {
    title: string;
    subtitle: string;
    emotion: string;
    background: string;
    sound: string;
    hashtags: string[];
  };

  // 스크립트
  script: {
    lines: string[];
    totalDuration: number;
  };

  // 미디어 (병렬 생성)
  tts: {
    audioUrl: string;
    duration: number;
  };
  images: {
    prompts: string[];
    urls: string[];
  };
  bgm: {
    source: "library" | "generated";
    url: string;
    emotion: string;
  };

  // 출력
  video: {
    url: string;
    subtitleStyle: SubtitleStyle;
  };
  youtube: {
    videoId: string;
    uploadStatus: "pending" | "uploaded" | "failed";
  };

  // 메타
  currentStep: string;
  reviewHistory: ReviewEntry[];
}
```

---

## 3. 다중 장르 템플릿 시스템

### 3.1 설계 원칙

> **하나의 파이프라인, 여러 템플릿**
>
> 모든 장르는 동일한 LangGraph 그래프를 탑니다.
> 템플릿이 바꾸는 것은 프롬프트, 목소리 톤, 이미지 스타일, 자막 연출, BGM 분위기뿐입니다.

### 3.2 템플릿 목록

| 템플릿             | 입력            | 스크립트 스타일             | 목소리 톤               | 이미지                       | 자막 연출                  | BGM                |
| ------------------ | --------------- | --------------------------- | ----------------------- | ---------------------------- | -------------------------- | ------------------ |
| **Meditation**     | 감정 키워드     | 명상 대본, 천천히           | 차분한 저음             | 자연 풍경, 파스텔            | 중앙 배치, 페이드 인/아웃  | Ambient, 피아노    |
| **Knowledge**      | 주제 키워드     | 팩트 나열, "알고 계셨나요?" | 또렷한 남성/여성        | 관련 사진 빠르게 전환        | 팝업 강조, 숫자 하이라이트 | 긴장감 전자음      |
| **Storytelling**   | 이야기 소재     | 내러티브, 기승전결          | 극적 톤 변화            | 어두운 일러스트, 그라데이션  | 시네마틱 하단 자막         | 서스펜스, 드라마틱 |
| **Motivation**     | 명언/인물/주제  | 자기계발 메시지             | 힘 있는 목소리          | 강렬한 배경 (산, 도시, 우주) | 임팩트 있는 대형 텍스트    | 웅장한 오케스트라  |
| **News Digest**    | 키워드 or 자동  | 오늘의 핫토픽 요약          | 뉴스 앵커 톤            | 뉴스 관련 사진/그래픽        | 뉴스 티커 스타일           | 뉴스 BGM           |
| **Product Review** | 제품명/카테고리 | 장단점 분석                 | 친근한 리뷰어 톤        | 제품 이미지, 비교 차트       | 별점/체크마크 애니메이션   | 경쾌한 팝          |
| **Health Tip**     | 건강 주제       | 실천 가능한 팁 나열         | 따뜻하고 신뢰감 있는 톤 | 운동/식품 이미지             | 체크리스트 스타일          | 활기찬 어쿠스틱    |

### 3.3 템플릿 파일 구조

```
src/templates/
├── index.ts                 # 템플릿 레지스트리 & 타입 정의
├── meditation.ts            # 현재 구현 (마이그레이션)
├── knowledge.ts
├── storytelling.ts
├── motivation.ts
├── news-digest.ts
├── product-review.ts
└── health-tip.ts
```

### 3.4 템플릿 인터페이스

```typescript
interface ShortTemplate {
  id: TemplateType;
  name: string;
  description: string;

  // 각 노드에서 사용할 설정
  conceptPrompt: string; // Gemini 시스템 프롬프트
  scriptPrompt: string; // 스크립트 생성 프롬프트
  ttsConfig: {
    voiceName: string; // Gemini TTS 보이스
    speakingRate: number;
    pitch: number;
  };
  imageConfig: {
    style: string; // 이미지 생성 스타일 프롬프트
    count: number; // 이미지 수
    transitionType: string; // 전환 효과
  };
  subtitleConfig: {
    position: "center" | "bottom" | "top";
    animation: string; // ASS 자막 애니메이션 코드
    fontStyle: string;
  };
  bgmConfig: {
    mood: string; // Suno/매칭에 전달할 감정 키워드
    genre: string;
    tempo: "slow" | "medium" | "fast";
  };
}
```

---

## 4. 음악(BGM) 전략

### 4.1 현재 문제

- `public/music/`에 18개 MP3 수동 배치
- 감정-음악 매칭 로직 없음 (사용자가 목록에서 수동 선택)
- 새 콘텐츠마다 같은 BGM 반복

### 4.2 단계별 개선 계획

#### Phase 1: Gemini 매칭 + 라이브러리 확충 (단기, 비용 $0)

```
[현재 18곡] → [50~100곡으로 확충] (Pixabay Music, Free Music Archive 등)

각 음악 파일에 메타데이터 태깅:
music/
├── ambient_calm_piano_01.mp3       → { emotion: "평화", genre: "ambient", tempo: "slow" }
├── tension_electronic_01.mp3       → { emotion: "긴장", genre: "electronic", tempo: "fast" }
└── ...

select_bgm 노드:
  1. concept.emotion + template.bgmConfig 읽기
  2. Gemini에 음악 메타데이터 목록 + 콘셉트 전달
  3. 가장 적합한 BGM 자동 선택
```

#### Phase 2: AI 음악 생성 API 연동 (중기)

**후보 API 비교:**

| 서비스          | 강점                                                   | 가격                     | 저작권           |
| --------------- | ------------------------------------------------------ | ------------------------ | ---------------- |
| **Suno API**    | 최고 품질, 감정 프롬프트 이해도 뛰어남, 보컬 포함 가능 | ~$0.11/곡 (EvoLink 기준) | 상업적 사용 가능 |
| **Beatoven.ai** | 비디오-to-뮤직 지원, 배경음악 특화                     | 구독 기반                | 로열티프리       |
| **SOUNDRAW**    | 자체 프로듀서 학습, 저작권 가장 깔끔                   | 구독 기반                | 로열티 100% 유지 |

**추천:** Suno API를 기본으로, 예산에 따라 SOUNDRAW 병행

#### Phase 3: 하이브리드 (장기)

```
select_bgm 노드:
  ├─ 로컬 라이브러리에 적합한 곡 있음 → 라이브러리에서 선택 (비용 $0)
  └─ 적합한 곡 없음 → Suno API로 커스텀 생성
        프롬프트 예시:
        "calm meditation instrumental,
         emotion: 외로움 → 따뜻함,
         sound: 밤새소리, 잔잔한 피아노,
         60 seconds, no vocals"
```

---

## 5. 프론트엔드 재설계

### 5.1 레이아웃

```
┌─────────────────────────────────────────────────────┐
│  Header: 프로젝트 로고 / 설정 / 채널 관리           │
├────────────────────┬────────────────────────────────┤
│                    │                                │
│   Chat Panel       │   Preview Panel               │
│   (40%)            │   (60%)                        │
│                    │                                │
│   ┌──────────────┐ │   ┌────────────────────────┐   │
│   │ 메시지 히스토│ │   │ 9:16 비디오 프리뷰     │   │
│   │ 리           │ │   │                        │   │
│   │              │ │   │  ┌──────────────────┐  │   │
│   │ AI: 콘셉트를 │ │   │  │                  │  │   │
│   │ 만들었어요.  │ │   │  │   Live Preview   │  │   │
│   │              │ │   │  │                  │  │   │
│   │ 나: 좋아!    │ │   │  │                  │  │   │
│   │              │ │   │  └──────────────────┘  │   │
│   │ AI: 스크립트 │ │   │                        │   │
│   │ 생성 중...   │ │   │ [다시 생성] [업로드]   │   │
│   └──────────────┘ │   └────────────────────────┘   │
│                    │                                │
│   ┌──────────────┐ │   ┌────────────────────────┐   │
│   │ 입력창   [↗] │ │   │ Progress: Step 5/8     │   │
│   └──────────────┘ │   └────────────────────────┘   │
├────────────────────┴────────────────────────────────┤
│  Status bar: 현재 노드 / 소요 시간 / 비용 추정      │
└─────────────────────────────────────────────────────┘
```

### 5.2 실시간 통신

```
[Next.js Client]
      │
      │  WebSocket / SSE
      │
[LangGraph Server]
      │
      ├─ 노드 진행 이벤트:  { type: "node_start", node: "generate_tts" }
      ├─ 미디어 업데이트:   { type: "media_update", field: "tts", url: "..." }
      ├─ 리뷰 요청:        { type: "interrupt", data: { concept: {...} } }
      └─ 완료 이벤트:       { type: "complete", video: { url: "..." } }
```

### 5.3 모바일 대응

- 모바일에서는 채팅/프리뷰 탭 전환 (탭 UI)
- 프리뷰 패널은 하단 시트로 올라오는 구조

---

## 6. 기술 스택 선택

### 6.1 LangGraph.js vs Python LangGraph

| 기준           | LangGraph.js              | Python LangGraph         |
| -------------- | ------------------------- | ------------------------ |
| 기존 코드 활용 | ✅ TypeScript 코드 재사용 | ❌ Python으로 재작성     |
| 생태계 성숙도  | 🔸 상대적으로 신생        | ✅ 더 풍부한 예제/문서   |
| FFmpeg 연동    | ✅ child_process로 동일   | ✅ subprocess로 동일     |
| 음악 API 연동  | ✅ fetch 기반 동일        | ✅ requests 기반 동일    |
| 배포           | ✅ Node.js 단일 런타임    | 🔸 Python 서버 별도 운영 |
| 러닝 커브      | ✅ 현재 스택과 동일       | 🔸 Python 추가 학습 필요 |

**결론:** LangGraph.js 권장 — 기존 TypeScript 코드(서비스, 타입, FFmpeg 로직)를 최대한 살릴 수 있음

### 6.2 최종 기술 스택

```
프론트엔드: Next.js + Linear 디자인 시스템 (통일)
백엔드:    LangGraph.js + Express 5 (API 게이트웨이)
AI:        Gemini 2.5 Flash (콘셉트, 스크립트, TTS, 이미지 프롬프트, BGM 매칭)
음악:      로컬 라이브러리 + Suno API (Phase 2)
영상:      FFmpeg + 동적 ASS 자막
통신:      WebSocket (채팅 실시간 통신)
배포:      YouTube Data API v3 (OAuth callback 방식으로 전환)
모노레포:  Turborepo + pnpm workspace
```

---

## 7. 구현 로드맵

### Phase 1: 기반 정리 (1~2주)

- [ ] 모노레포 설정 완성 (turbo.json, pnpm-workspace.yaml, 패키지 매니저 통일)
- [ ] 공유 타입 패키지 생성 (`packages/types`)
- [ ] 바이너리 파일 Git에서 제거 → 외부 스토리지
- [ ] Step 컴포넌트 Linear 디자인 시스템 통일
- [ ] YouTube OAuth를 콜백 URL 기반으로 전환

### Phase 2: LangGraph 전환 (2~3주)

- [ ] LangGraph.js 의존성 추가 및 StateGraph 정의
- [ ] 기존 서비스(concept, text, tts, edit, youtube)를 LangGraph 노드로 래핑
- [ ] `human_review` 노드 구현 (interrupt 기반)
- [ ] TTS / 이미지 / BGM 병렬 처리 (fan-out / fan-in)
- [ ] WebSocket 서버 구현 (노드 진행 이벤트 스트리밍)

### Phase 3: 채팅 UI 전환 (1~2주)

- [ ] 왼쪽 채팅 패널 구현 (메시지 히스토리, 입력, 스트리밍)
- [ ] 오른쪽 미디어 프리뷰 패널 구현 (비디오 플레이어, 프로그레스)
- [ ] WebSocket 클라이언트 연결
- [ ] human_review 응답 UI (확인/수정/재생성 버튼)

### Phase 4: 템플릿 확장 (2~3주)

- [ ] 템플릿 인터페이스 및 레지스트리 구현
- [ ] `select_template` 노드 구현 (사용자 입력에서 장르 자동 분류)
- [ ] Knowledge 템플릿 구현 (첫 번째 확장)
- [ ] Storytelling 템플릿 구현
- [ ] Motivation 템플릿 구현
- [ ] 자막 애니메이션 다양화 (장르별 ASS 스타일)

### Phase 5: 음악 고도화 (1~2주)

- [ ] 로열티프리 음악 라이브러리 확충 (50곡 이상 + 메타데이터 태깅)
- [ ] Gemini 기반 감정-음악 자동 매칭 구현
- [ ] Suno API 연동 (커스텀 BGM 생성)
- [ ] 하이브리드 BGM 선택 로직 (라이브러리 우선 → API 폴백)

### Phase 6: 고도화 (지속)

- [ ] 이미지 생성 자동화 (Gemini Imagen 또는 외부 API)
- [ ] 자막 시간 분배 개선 (문장 길이 비례)
- [ ] 뉴스 템플릿용 웹 검색 API 연동
- [ ] 제품 리뷰 템플릿용 YouTube 쇼핑 태그 연동
- [ ] 배치 생성 기능 (한 번에 여러 쇼츠 생성)
- [ ] 분석 대시보드 (YouTube Analytics 연동)

---

## 8. 대화 흐름 예시

### 8.1 기본 흐름 (명상)

```
사용자: 외로움 느낌의 쇼츠 만들어줘

AI:     콘셉트를 만들었어요.
        제목: 달빛 아래의 속삭임
        감정: 외로움 → 따뜻함
        배경: 달빛 아래 잔잔한 호수
        이 콘셉트로 진행할까요?

사용자: 좋아! 근데 배경을 별이 가득한 하늘로 바꿔줘

AI:     배경을 수정했어요!
        배경: 별이 가득한 밤하늘 아래 고요한 들판
        스크립트 생성 → TTS → 편집까지 진행할게요.

        [스크립트 생성 완료]
        [TTS 생성 중... ████░░░░ 50%]
        [이미지 프롬프트 생성 완료]
        [BGM 선택: 조용하면서 평화로운 배경.mp3]
        [영상 편집 중...]

AI:     영상이 완성되었어요! 오른쪽에서 확인해보세요.
        [업로드] [다시 만들기] [자막 수정]

사용자: 유튜브에 업로드해줘

AI:     업로드 완료! 🎬
        https://youtube.com/shorts/xxxx
```

### 8.2 장르 선택 흐름

```
사용자: 쇼츠 하나 만들어줘

AI:     어떤 스타일의 쇼츠를 만들까요?
        🧘 명상/ASMR
        📚 지식/팩트
        📖 스토리텔링
        💪 동기부여
        📰 뉴스 요약
        🛍 제품 리뷰
        🏃 건강 팁

사용자: 지식 팩트로! 우주에서 가장 큰 별에 대해

AI:     [Knowledge 템플릿 로드]
        콘셉트를 만들었어요.
        제목: 우리 태양의 1,700배? UY Scuti의 비밀
        구성: 크기 비교 → 특징 설명 → 놀라운 사실
        ...
```

### 8.3 수정 반복 흐름

```
사용자: 목소리가 너무 빨라, 좀 천천히 해줘

AI:     TTS 속도를 0.85로 낮춰서 다시 생성할게요.
        [TTS 재생성 중...]
        [영상 재편집 중...]
        완료! 확인해보세요.

사용자: 이번엔 자막 색깔을 노란색으로

AI:     자막 색상을 노란색(#FFD700)으로 변경했어요.
        [영상 재편집 중...]
        완료!
```

---

## 9. 참고 자료

- [LangGraph.js 문서](https://langchain-ai.github.io/langgraphjs/)
- [LangGraph Human-in-the-loop 가이드](https://langchain-ai.github.io/langgraph/concepts/human_in_the_loop/)
- [Gemini TTS 문서](https://ai.google.dev/gemini-api/docs/text-to-speech)
- [Suno API (EvoLink)](https://evolink.ai/suno)
- [Beatoven.ai API](https://www.beatoven.ai)
- [FFmpeg ASS 자막 가이드](https://ffmpeg.org/ffmpeg-filters.html#ass)
- [YouTube Data API v3](https://developers.google.com/youtube/v3)
