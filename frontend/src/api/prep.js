const API_BASE = import.meta.env.VITE_API_URL || "";

async function readJson(response) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.success === false) {
    throw new Error(data.message || "Request failed");
  }
  return data;
}

export async function fetchInterviewQuestions(query) {
  const response = await fetch(`${API_BASE}/api/prep/questions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
  return readJson(response);
}

export async function reviewInterviewAnswer(question, answer) {
  const response = await fetch(`${API_BASE}/api/prep/feedback`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, answer }),
  });
  return readJson(response);
}
