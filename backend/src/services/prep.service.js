import { getBankQuestions } from "../data/questionBank.js";

const DEFAULT_GEMINI_MODELS = ["gemini-2.5-flash-lite", "gemini-2.5-flash"];
const GEMINI_TIMEOUT_MS = 25_000;

function getGeminiModels() {
  const configuredModel = process.env.GEMINI_MODEL?.trim();
  return configuredModel
    ? [configuredModel, ...DEFAULT_GEMINI_MODELS.filter((model) => model !== configuredModel)]
    : DEFAULT_GEMINI_MODELS;
}

const questionResponseSchema = {
  type: "OBJECT",
  required: ["topic", "questions"],
  properties: {
    topic: { type: "STRING" },
    questions: {
      type: "ARRAY",
      minItems: 8,
      maxItems: 12,
      items: {
        type: "OBJECT",
        required: ["category", "difficulty", "question", "hint", "sampleAnswer"],
        properties: {
          category: { type: "STRING" },
          difficulty: { type: "STRING", enum: ["Easy", "Medium", "Hard"] },
          question: { type: "STRING" },
          hint: { type: "STRING" },
          sampleAnswer: { type: "STRING" },
        },
      },
    },
  },
};

const feedbackResponseSchema = {
  type: "OBJECT",
  required: ["score", "feedback", "betterAnswer"],
  properties: {
    score: { type: "INTEGER", minimum: 1, maximum: 10 },
    feedback: { type: "STRING" },
    betterAnswer: { type: "STRING" },
  },
};

function parseJsonFromText(text) {
  if (!text) return null;
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const raw = fenced ? fenced[1] : text;
  try {
    return JSON.parse(raw.trim());
  } catch {
    const start = raw.indexOf("{");
    const end = raw.lastIndexOf("}");
    if (start === -1 || end === -1) return null;
    try {
      return JSON.parse(raw.slice(start, end + 1));
    } catch {
      return null;
    }
  }
}

function normalizeQuestions(payload, fallbackTopic) {
  const list = Array.isArray(payload?.questions) ? payload.questions : [];
  return list
    .filter((item) => item && typeof item.question === "string" && item.question.trim())
    .slice(0, 15)
    .map((item, index) => ({
      id: `ai-${index + 1}`,
      category: String(item.category || fallbackTopic || "General").slice(0, 40),
      difficulty: ["Easy", "Medium", "Hard"].includes(item.difficulty) ? item.difficulty : "Medium",
      question: item.question.trim(),
      hint: String(item.hint || "Think about definition, example, and when you would use it.").slice(0, 400),
      sampleAnswer: String(item.sampleAnswer || "Cover the idea, one example, and a trade-off.").slice(0, 1200),
    }));
}

async function callGemini(model, prompt, apiKey, responseSchema) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    signal: AbortSignal.timeout(GEMINI_TIMEOUT_MS),
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.6,
        maxOutputTokens: 4096,
        responseMimeType: "application/json",
        responseSchema,
      },
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    const message = data?.error?.message || `Gemini request failed (${response.status})`;
    throw new Error(message);
  }

  return data?.candidates?.[0]?.content?.parts?.map((part) => part.text).join("\n") || "";
}

async function generateWithGemini(query) {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) return null;

  const prompt = `You are an interview coach for software intern and junior roles, especially MERN.
The user asked: "${query}"

Return JSON only:
{
  "topic": "short topic name",
  "questions": [
    {
      "category": "React|Node|Express|MongoDB|JavaScript|DSA|HR|SQL|Git|MERN",
      "difficulty": "Easy|Medium|Hard",
      "question": "the interview question",
      "hint": "one short hint",
      "sampleAnswer": "a clear 3-6 sentence sample answer"
    }
  ]
}

Rules:
- Give 12 questions mixed Easy/Medium/Hard.
- Questions must match the user's topic.
- Do not invent fake company secrets. If company-specific, say what is typically asked.
- sampleAnswer should be useful for a student, not one-liners.`;

  let lastError;
  for (const model of getGeminiModels()) {
    try {
      const text = await callGemini(model, prompt, apiKey, questionResponseSchema);
      const parsed = parseJsonFromText(text);
      const questions = normalizeQuestions(parsed, parsed?.topic);
      if (questions.length >= 5) {
        return {
          topic: parsed?.topic || query,
          questions,
          source: "ai",
          model,
        };
      }
      lastError = new Error("Gemini returned too few questions");
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
}

async function reviewWithGemini(question, answer) {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) return null;

  const prompt = `Score this intern interview answer from 1 to 10.
Question: ${question}
Candidate answer: ${answer}

Return JSON only:
{
  "score": 7,
  "feedback": "2-4 sentences: what was good, what is missing",
  "betterAnswer": "a stronger sample answer"
}`;

  let lastError;
  for (const model of getGeminiModels()) {
    try {
      const text = await callGemini(model, prompt, apiKey, feedbackResponseSchema);
      const parsed = parseJsonFromText(text);
      const score = Number(parsed?.score);
      if (!parsed?.feedback) {
        lastError = new Error("Invalid review payload");
        continue;
      }
      return {
        score: Number.isFinite(score) ? Math.min(10, Math.max(1, Math.round(score))) : 6,
        feedback: String(parsed.feedback).slice(0, 800),
        betterAnswer: String(parsed.betterAnswer || "").slice(0, 1200),
        source: "ai",
        model,
      };
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
}

function hasGeminiKey() {
  return Boolean(process.env.GEMINI_API_KEY?.trim());
}

export async function getInterviewQuestions(query) {
  const bank = getBankQuestions(query);
  let aiError = "";

  if (hasGeminiKey()) {
    try {
      const ai = await generateWithGemini(query);
      if (ai) return ai;
    } catch (error) {
      console.error("Gemini questions:", error.message);
      aiError = error.message;
      if (!bank) {
        throw new Error(
          `AI se questions nahi aaye (${error.message}). GEMINI_API_KEY check karo.`
        );
      }
    }
  }

  if (bank) {
    return {
      topic: bank.topicLabel,
      questions: bank.questions,
      source: "bank",
      warning: aiError
        ? "Gemini is unavailable right now, so built-in questions are shown. Check your API key and model settings."
        : "Gemini API key is not configured, so built-in questions are shown.",
    };
  }

  throw new Error(
    "Jo topic type kiya hai uske questions AI banati hai. backend/src/.env mein GEMINI_API_KEY daalo, backend restart karo — phir Java, Python, TCS HR, kuch bhi search karoge to usi ke questions aayenge."
  );
}

export async function reviewInterviewAnswer(question, answer) {
  try {
    const ai = await reviewWithGemini(question, answer);
    if (ai) return ai;
  } catch (error) {
    console.error("Gemini review fallback:", error.message);
  }

  return {
    score: answer.trim().length > 80 ? 6 : 4,
    feedback: hasGeminiKey()
      ? "Gemini review is unavailable right now. Compare your response with the sample answer and add one concrete example plus a trade-off."
      : "AI review needs GEMINI_API_KEY. Compare your response with the sample answer and add one concrete example plus a trade-off.",
    betterAnswer: "",
    source: "bank",
  };
}

export function getGeminiStatus() {
  return {
    configured: hasGeminiKey(),
    model: getGeminiModels()[0],
  };
}
