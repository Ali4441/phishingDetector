import express from 'express';
import {
  getAllReports,
  getReportById,
  deleteReport
} from '../controllers/reportController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // routes protected 

router.get('/', getAllReports);
router.get('/:id', getReportById);
router.delete('/:id', deleteReport);

export default router;