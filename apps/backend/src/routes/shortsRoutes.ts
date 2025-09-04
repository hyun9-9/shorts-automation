import { Router } from 'express';
import {
  generateText,
  generateAudio,
  generateImage,
  uploadImage,
  autoEdit,
  generateConcept,
  allProcess,
  pushYoutube
} from '../controllers/shortsController';

const router = Router();

router.post('/concept', generateConcept);
router.post('/text', generateText);
router.post('/audio', generateAudio);
router.post('/image', generateImage);
router.post('/upload', uploadImage);
router.post('/edit', autoEdit);
router.post('/pushYoutube', pushYoutube);

router.get('/', allProcess);


export default router;