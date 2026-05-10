import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    title: {
      type: String,
      required: true,
      default: 'Phishing Detection Report'
    },

    // Report kisi scan se banu h
    scan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ScanResult'
    },

    // Report ka type
    type: {
      type: String,
      enum: ['url', 'email', 'bulk'],
      default: 'url'
    },

    // Final Result
    result: {
      type: String,
      enum: ['safe', 'phishing', 'suspicious'],
      required: true
    },

    // ML Confidence Score (0-100)
    confidence: {
      type: Number,
      min: 0,
      max: 100
    },

    // Scanned email ya URL
    input: {
      type: String,
      required: true
    },

    // ML Model ki details
    details: {
      ipInUrl: { type: Boolean, default: false },
      suspiciousTLD: { type: Boolean, default: false },
      manyHyphens: { type: Boolean, default: false },
      phishingKeywords: { type: [String], default: [] },
      riskScore: { type: Number, default: 0 }
    },

    // Report ki severity
    severity: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'low'
    },

    // Report export or not
    exported: {
      type: Boolean,
      default: false
    },

    // Extra notes (admin or user )
    notes: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true  // createdAt & updatedAt automatically
  }
);

// ── Severity Auto-Set kro Confidence se ──────────────
reportSchema.pre('save', function (next) {
  if (this.confidence >= 85) this.severity = 'critical';
  else if (this.confidence >= 65) this.severity = 'high';
  else if (this.confidence >= 40) this.severity = 'medium';
  else this.severity = 'low';
  next();
});

// ── Index for fast queries ────────────────────────────
reportSchema.index({ user: 1, createdAt: -1 });
reportSchema.index({ result: 1 });
reportSchema.index({ severity: 1 });

export default mongoose.model('Report', reportSchema);