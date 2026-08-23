import { quickTopics } from "../data/questionBank.js";
import {
  getGeminiStatus,
  getInterviewQuestions,
  reviewInterviewAnswer,
} from "../services/prep.service.js";

export async function createQuestions(req, res) {
  const query = typeof req.body?.query === "string" ? req.body.query.trim() : "";

  if (query.length < 2) {
    return res.status(400).json({
      success: false,
      message: "Type a topic, for example: MERN stack interview questions",
    });
  }

  if (query.length > 200) {
    return res.status(400).json({
      success: false,
      message: "Topic is too long. Keep it under 200 characters.",
    });
  }

  try {
    const result = await getInterviewQuestions(query);
    return res.status(200).json({
      success: true,
      query,
      ...result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Could not load interview questions",
    });
  }
}

export function listQuickTopics(_req, res) {
  return res.status(200).json({
    success: true,
    topics: quickTopics,
  });
}

export function getPrepStatus(_req, res) {
  return res.status(200).json({
    success: true,
    ai: getGeminiStatus(),
  });
}

export async function createFeedback(req, res) {
  const question = typeof req.body?.question === "string" ? req.body.question.trim() : "";
  const answer = typeof req.body?.answer === "string" ? req.body.answer.trim() : "";

  if (!question || answer.length < 8) {
    return res.status(400).json({
      success: false,
      message: "Write a longer answer (at least a few sentences) before review.",
    });
  }

  try {
    const result = await reviewInterviewAnswer(question, answer);
    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Could not review the answer",
    });
  } 
}   
