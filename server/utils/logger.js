import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ── Logs folder बनाओ ──────────────────────────────────
const logDir = path.join(__dirname, '..', 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// ── Log Levels ────────────────────────────────────────
const LOG_LEVELS = {
  INFO: '📘 INFO',
  WARN: '⚠️  WARN',
  ERROR: '❌ ERROR',
  SUCCESS: '✅ SUCCESS',
  DEBUG: '🔍 DEBUG'
};

// ── Write to File ─────────────────────────────────────
const writeToFile = (filename, message) => {
  const filepath = path.join(logDir, filename);
  fs.appendFile(filepath, message + '\n', (err) => {
    if (err) console.error('Failed to write log:', err);
  });
};

// ── Format Log Message ────────────────────────────────
const formatLog = (level, message, meta = {}) => {
  const timestamp = new Date().toISOString();
  const metaStr = Object.keys(meta).length
    ? `\nMeta: ${JSON.stringify(meta, null, 2)}`
    : '';
  return (
    `${'─'.repeat(60)}\n` +
    `[${timestamp}] ${level}\n` +
    `Message: ${message}` +
    `${metaStr}\n`
  );
};

// ── Logger Object ─────────────────────────────────────
const logger = {

  // ✅ Success Log
  success: (message, meta = {}) => {
    const log = formatLog(LOG_LEVELS.SUCCESS, message, meta);
    console.log(log);
    writeToFile('access.log', log);
  },

  // 📘 Info Log
  info: (message, meta = {}) => {
    const log = formatLog(LOG_LEVELS.INFO, message, meta);
    console.log(log);
    writeToFile('access.log', log);
  },

  // ⚠️ Warning Log
  warn: (message, meta = {}) => {
    const log = formatLog(LOG_LEVELS.WARN, message, meta);
    console.warn(log);
    writeToFile('error.log', log);
  },

  // ❌ Error Log
  error: (message, meta = {}) => {
    const log = formatLog(LOG_LEVELS.ERROR, message, meta);
    console.error(log);
    writeToFile('error.log', log);   // error.log में जाएगा
    writeToFile('access.log', log);  // access.log में भी जाएगा
  },

  // 🔍 Debug Log (सिर्फ development में)
  debug: (message, meta = {}) => {
    if (process.env.NODE_ENV !== 'development') return;
    const log = formatLog(LOG_LEVELS.DEBUG, message, meta);
    console.log(log);
  }
};

export default logger;