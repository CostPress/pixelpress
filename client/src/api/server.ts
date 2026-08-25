const API_URL = "http://localhost:5000";

export async function testServerConnection() {
  const response = await fetch(`${API_URL}/api/test`);

  if (!response.ok) {
    throw new Error("Server request failed");
  }

  return response.json();
}

export interface SignupData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export async function signupUser(data: SignupData) {
  const response = await fetch(`${API_URL}/api/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Signup failed");
  }

  return result;
}