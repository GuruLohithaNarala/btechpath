const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export async function apiRequest(endpoint, method = "GET", data = null, customHeaders = {}) {
  const token = localStorage.getItem("btechpath_token");
  const headers = {
    "Content-Type": "application/json",
    ...customHeaders,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
  };

  if (data && (method === "POST" || method === "PUT" || method === "PATCH")) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.error || json.message || `API Request failed with status ${response.status}`);
    }

    return json;
  } catch (error) {
    console.warn(`[API Warning] Request to ${endpoint} failed:`, error.message);
    throw error;
  }
}
