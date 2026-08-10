const API_URL = "http://localhost:5000";

export async function testServerConnection() {
  const response = await fetch(`${API_URL}/api/test`);

  if (!response.ok) {
    throw new Error("Server request failed");
  }

  return response.json();
}