// frontend/src/services/openaiApi.js

export async function queryOpenAI(prompt, context = []) {
  const res = await fetch("/chat/openai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: prompt, context })
  });
  if (!res.ok) throw new Error(`Server error: ${res.status}`);
  const { response } = await res.json();
  return response;
}
