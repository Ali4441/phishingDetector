import express from 'express';
import { scanInput, getScanHistory, getScanStats } from '../controllers/scanController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // All scan routes are protected

router.post('/', scanInput);
router.get('/history', getScanHistory);
router.get('/stats', getScanStats);

export default router;