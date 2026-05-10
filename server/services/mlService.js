import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  vertexai: false
});
export const analyzeWithML = async (type, input) => {

  // ── Heuristic Engine ──────────────────────────────

  const phishingKeywords = [
    'login',
    'verify',
    'account',
    'secure',
    'update',
    'confirm',
    'bank',
    'wallet',
    'crypto',
    'otp',
    'password'
  ];

  const suspiciousTLDs = [
    '.xyz',
    '.tk',
    '.ml',
    '.ga',
    '.cf'
  ];

  let heuristicScore = 0;

  const safeInput = String(input || '');

  const lowerInput = safeInput.toLowerCase();

  phishingKeywords.forEach((kw) => {
    if (lowerInput.includes(kw)) {
      heuristicScore += 15;
    }
  });

  suspiciousTLDs.forEach((tld) => {
    if (lowerInput.includes(tld)) {
      heuristicScore += 25;
    }
  });

  // Detect IP-based URLs
  if (
    /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(safeInput)
  ) {
    heuristicScore += 30;
  }

  // Too many hyphens
  if ((safeInput.match(/-/g) || []).length > 3) {
    heuristicScore += 10;
  }

  // ── Gemini AI Analysis ────────────────────────────

  try {

    const prompt = `
You are an advanced phishing detection AI.

Analyze this ${type}:

"${safeInput}"

Determine whether it is:
- safe
- suspicious
- phishing

Return ONLY valid JSON in this format:

{
  "result":"safe",
  "confidence":85,
  "reason":"short explanation"
}
`;

    const response =
      await ai.models.generateContent({

        model: "gemini-1.5-flash",

        contents: prompt
      });

    // Clean response
    const raw =
      response.text
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();

    const parsed = JSON.parse(raw);

    // Combine AI + heuristic confidence

    const finalConfidence = Math.min(
      99,
      parsed.confidence +
      Math.floor(heuristicScore / 5)
    );

    return {

      result: parsed.result,

      confidence: finalConfidence,

      details: {

        heuristicScore,

        aiReason: parsed.reason,

        aiPowered: true,

        type
      }
    };

  } catch (error) {

    console.error("Gemini Error:", error);

    // ── Fallback Heuristic ─────────────────────────

    const confidence =
      Math.min(heuristicScore, 99);

    const result =
      confidence > 60
        ? 'phishing'
        : confidence > 30
          ? 'suspicious'
          : 'safe';

    return {

      result,

      confidence,

      details: {

        heuristicScore,

        fallback: true,

        type
      }
    };
  }
};