import ScanResult from '../models/ScanResult.js';

// ── GET ALL REPORTS ───────────────────────────────────
export const getAllReports = async (req, res, next) => {
  try {
    const { type, result, page = 1, limit = 10 } = req.query;

    // Dynamic Filter — DB से data fetch होगा
    const filter = { user: req.user._id };
    if (type) filter.type = type;
    if (result) filter.result = result;

    const skip = (page - 1) * limit;

    const [reports, total] = await Promise.all([
      ScanResult.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      ScanResult.countDocuments(filter)
    ]);

    res.json({
      success: true,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      reports
    });
  } catch (err) { next(err); }
};

// ── GET SINGLE REPORT ─────────────────────────────────
export const getReportById = async (req, res, next) => {
  try {
    const report = await ScanResult.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.json({ success: true, report });
  } catch (err) { next(err); }
};

// ── DELETE REPORT ─────────────────────────────────────
export const deleteReport = async (req, res, next) => {
  try {
    const report = await ScanResult.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.json({ success: true, message: 'Report deleted successfully' });
  } catch (err) { next(err); }
};