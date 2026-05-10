import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: { type: String, required: true },
  severity: { type: String, enum: ['low', 'medium', 'high', 'critical'] },
  read: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('Alert', alertSchema);