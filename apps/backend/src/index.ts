// src/index.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import shortsRoutes from './routes/shortsRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/api/shorts', shortsRoutes);
app.use('/audio', express.static(path.join(__dirname, '..', 'public', 'audio')));
app.use('/images', express.static(path.join(__dirname, '..', 'public', 'images')));
app.use('/music', express.static(path.join(__dirname, '..', 'public', 'music')));
app.use('/output', express.static(path.join(__dirname, '..', 'public', 'output')));

app.get('/', (req, res) => {
  res.send('유튜브 쇼츠 자동화 백엔드 서버가 실행 중입니다.');
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
