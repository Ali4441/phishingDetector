import mongoose from 'mongoose';

const scanSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['url', 'email'], required: true },
  input: { type: String, required: true },
  result: { type: String, enum: ['safe', 'phishing', 'suspicious'] },
  confidence: { type: Number },             // 0-100 ML confidence score
  details: { type: Object },             // extra ML metadata
}, { timestamps: true });

export default mongoose.model('ScanResult', scanSchema);