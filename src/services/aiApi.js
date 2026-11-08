const AI_API_URL = (import.meta.env.VITE_AI_API_URL || "http://localhost:5000").replace(/\/$/, "");

async function postAI(path, body) {
  const response = await fetch(`${AI_API_URL}/api/ai/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.success) throw new Error(data.message || "AI request could not be completed.");
  return data;
}

export async function analyzeGithubProfile(user, repositories) {
  const data = await postAI("analyze-profile", { user, repositories });
  return data.analysis;
}
export async function chatWithGithub(user, repositories, messages) {
  const data = await postAI("chat", { user, repositories, messages });
  return data.answer;
}
export async function reviewGithubRepository(user, repositories, repositoryName, readme = "") {
  const data = await postAI("review-repository", { user, repositories, repositoryName, readme });
  return data.review;
}
export async function generateCareerRoadmap(user, repositories, goal = "") {
  const data = await postAI("career-roadmap", { user, repositories, goal });
  return data.roadmap;
}
export async function askGithubData(user, repositories, question) {
  const data = await postAI("ask-data", { user, repositories, question });
  return data.answer;
}
