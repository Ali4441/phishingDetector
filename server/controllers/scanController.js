import ScanResult from '../models/ScanResult.js';
import Alert from '../models/Alert.js';
import { analyzeWithML } from '../services/mlService.js';
import logger from '../utils/logger.js';

// ── SCAN INPUT ────────────────────────────────────────
export const scanInput = async (req, res, next) => {
  try {
    const type = req.body.type || 'url';

    const input =
      req.body.input ||
      req.body.url ||
      '';
    console.log(req.body);
    const { result, confidence, details } = await analyzeWithML(type, input);

    const scan = await ScanResult.create({
      user: req.user?._id || null, type, input, result, confidence, details
    });

    logger.info('Scan performed', {
      user: req.user?._id || null,
      type,
      result,
      confidence
    });

    if (result === 'phishing') {
      logger.warn('Phishing detected!', { input, confidence });

      await Alert.create({
        user: req.user?._id || null,
        message: `Phishing ${type} detected: "${input.slice(0, 60)}..."`,
        severity: confidence > 85 ? 'critical' : 'high'
      });
    }

    res.status(201).json({ success: true, scan });
  } catch (err) {
    logger.error('Scan error', { message: err.message, stack: err.stack });
    next(err);
  }
};

// ── GET SCAN HISTORY ──────────────────────────────────
export const getScanHistory = async (req, res, next) => {
  try {
    const scans = await ScanResult.find({ user: req.user?._id || null })
      .sort({ createdAt: -1 })
      .limit(50);

    logger.info('Scan history fetched', {
      user: req.user?._id || null,
      count: scans.length
    });

    res.json({ success: true, scans });
  } catch (err) {
    logger.error('Scan history error', { message: err.message });
    next(err);
  }
};

// ── GET SCAN STATS ────────────────────────────────────
export const getScanStats = async (req, res, next) => {
  try {
    const [total, phishing, safe, suspicious] = await Promise.all([
      ScanResult.countDocuments({ user: req.user?._id || null }),
      ScanResult.countDocuments({ user: req.user?._id || null, result: 'phishing' }),
      ScanResult.countDocuments({ user: req.user?._id || null, result: 'safe' }),
      ScanResult.countDocuments({ user: req.user?._id || null, result: 'suspicious' })
    ]);

    logger.info('Scan stats fetched', { user: req.user?._id || null });

    res.json({ success: true, stats: { total, phishing, safe, suspicious } });
  } catch (err) {
    logger.error('Scan stats error', { message: err.message });
    next(err);
  }
};