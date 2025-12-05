// frontend/src/apiClient.js

const API_BASE = import.meta.env.VITE_API_BASE_URL;

console.log("🔌 API Base URL:", API_BASE);

async function apiGet(path) {
  try {
    const res = await fetch(`${API_BASE}${path}`);
    if (!res.ok) {
      throw new Error(`GET ${path} failed: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.error("API GET error:", err);
    throw err;
  }
}

async function apiPost(path, body) {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error(`POST ${path} failed: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("API POST error:", err);
    throw err;
  }
}

export default {
  get: apiGet,
  post: apiPost,
};