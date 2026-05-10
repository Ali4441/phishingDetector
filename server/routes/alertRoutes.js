import express from 'express';
import {
  getAllAlerts,
  markAsRead,
  markAllAsRead,
  deleteAlert
} from '../controllers/alertController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // routes protected 

router.get('/', getAllAlerts);
router.put('/:id/read', markAsRead);
router.put('/read-all', markAllAsRead);
router.delete('/:id', deleteAlert);

export default router;