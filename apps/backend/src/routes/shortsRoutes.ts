import { Router } from 'express';
import {
  generateText,
  generateAudio,
  generateSound,
  generateImage,
  uploadImage,
  autoEdit,
  generateConcept,
  allProcess
} from '../controllers/shortsController';

const router = Router();

router.post('/concept', generateConcept);
router.post('/text', generateText);
router.post('/audio', generateAudio);
router.post('/sound', generateSound);
router.post('/image', generateImage);
router.post('/upload', uploadImage);
router.post('/edit', autoEdit);

router.get('/', allProcess);


export default router;