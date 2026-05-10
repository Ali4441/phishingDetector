import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ES Module में __dirname नहीं होता — यह trick use करो
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ── Logs folder automatically बनाओ ───────────────────
const logDir = path.join(__dirname, '..', 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// ── Log File Stream (logs/access.log में save होगा) ──
const accessLogStream = fs.createWriteStream(
  path.join(logDir, 'access.log'),
  { flags: 'a' }  // 'a' = append mode (पुराना data delete नहीं होगा)
);

// ── Custom Token — Response Time Color ───────────────
morgan.token('status-color', (req, res) => {
  const status = res.statusCode;
  if (status >= 500) return `❌ ${status}`;
  if (status >= 400) return `⚠️  ${status}`;
  if (status >= 300) return `🔀 ${status}`;
  if (status >= 200) return `✅ ${status}`;
  return `${status}`;
});

// ── Custom Token — User ID (JWT से) ──────────────────
morgan.token('user-id', (req) => {
  return req.user ? req.user._id.toString() : 'Guest';
});

// ── Custom Token — Request Body (Scan input log) ─────
morgan.token('body', (req) => {
  if (req.body && req.body.input) {
    return `| Input: "${req.body.input.slice(0, 40)}..."`;
  }
  return '';
});

// ── Console Format (Development) ─────────────────────
const devFormat =
  ':method :url :status-color :response-time ms | User: :user-id :body';

// ── File Format (Production) ──────────────────────────
const prodFormat =
  ':remote-addr - :user-id [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"';

// ── Dev Logger — Terminal में दिखेगा ─────────────────
export const devLogger = morgan(devFormat, {
  skip: (req) => req.url === '/favicon.ico'
});

// ── Prod Logger — File में save होगा ─────────────────
export const fileLogger = morgan(prodFormat, {
  stream: accessLogStream,
  skip: (req) => req.url === '/favicon.ico'
});

// ── Error Logger ──────────────────────────────────────
export const errorLogger = (err, req, res, next) => {
  const errorLog = path.join(logDir, 'error.log');

  const logMessage =
    `[${new Date().toISOString()}] ` +
    `${req.method} ${req.url} | ` +
    `Status: ${res.statusCode} | ` +
    `Error: ${err.message}\n` +
    `Stack: ${err.stack}\n` +
    `${'─'.repeat(80)}\n`;

  // File में भी save करो
  fs.appendFile(errorLog, logMessage, (writeErr) => {
    if (writeErr) console.error('Log write failed:', writeErr);
  });

  // Terminal में भी दिखाओ
  console.error(`\n🔴 ERROR LOG:\n${logMessage}`);
}