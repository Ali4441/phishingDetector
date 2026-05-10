import Alert from '../models/Alert.js';

// ── GET ALL ALERTS ────────────────────────────────────
export const getAllAlerts = async (req, res, next) => {
  try {
    const { read, severity } = req.query;

    // Dynamic Filter
    const filter = { user: req.user._id };
    if (read !== undefined) filter.read = read === 'true';
    if (severity) filter.severity = severity;

    const alerts = await Alert.find(filter).sort({ createdAt: -1 });

    // Unread count 
    const unreadCount = await Alert.countDocuments({
      user: req.user._id,
      read: false
    });

    res.json({ success: true, alerts, unreadCount });
  } catch (err) { next(err); }
};

// ── MARK SINGLE ALERT AS READ ─────────────────────────
export const markAsRead = async (req, res, next) => {
  try {
    const alert = await Alert.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { read: true },
      { new: true }
    );

    if (!alert) {
      return res.status(404).json({ message: 'Alert not found' });
    }

    res.json({ success: true, alert });
  } catch (err) { next(err); }
};

// ── MARK ALL ALERTS AS READ ───────────────────────────
export const markAllAsRead = async (req, res, next) => {
  try {
    await Alert.updateMany(
      { user: req.user._id, read: false },
      { read: true }
    );

    res.json({ success: true, message: 'All alerts marked as read' });
  } catch (err) { next(err); }
};

// ── DELETE ALERT ──────────────────────────────────────
export const deleteAlert = async (req, res, next) => {
  try {
    const alert = await Alert.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!alert) {
      return res.status(404).json({ message: 'Alert not found' });
    }

    res.json({ success: true, message: 'Alert deleted successfully' });
  } catch (err) { next(err); }
};