import React, { useEffect, useState } from "react";
import {
  testServerConnection,
  signupUser,
} from "../api/server";
import logo from "../assets/FLAVEA.png";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Test backend connection when the page loads
  useEffect(() => {
    testServerConnection()
      .then((data) => {
        console.log("Server response:", data);
      })
      .catch((error) => {
        console.error("Server connection failed:", error);
      });
  }, []);

  // Handle input changes
  const handleChange = (event) => {
    const { id, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [id]: value,
    }));
  };

  // Handle signup
const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  setMessage("");
  setError("");

  if (formData.password !== formData.confirmPassword) {
    setError("Passwords do not match.");
    return;
  }

  try {
    setLoading(true);

    const response = await fetch(
      "http://localhost:5000/api/auth/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    const data = await response.json(); 
    if (!response.ok) {
      throw new Error(data.message || "Signup failed.");
    }

    setMessage(data.message);

    setFormData({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    console.log("Signup successful:", data);
  } catch (error) {
    console.error("Signup error:", error);

    if (error instanceof Error) {
      setError(error.message);
    } else {
      setError("Something went wrong during signup.");
    }
  } finally {
    setLoading(false);
  }
};
  return (
    <div
      className="signup-page"
      style={{
        backgroundColor: "#f4f8ff",
        color: "#3b261e",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 20px",
        boxSizing: "border-box",
      }}
    >
      <div
        className="signup-card"
        style={{
          width: "100%",
          maxWidth: "450px",
          padding: "40px",
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "16px",
          boxShadow: "0 12px 35px rgba(30, 64, 175, 0.1)",
          boxSizing: "border-box",
        }}
      >
        <img
          src={logo}
          alt="FLAVEA Logo"
          style={{
            width: "120px",
            height: "auto",
            display: "block",
            margin: "0 auto 20px",
          }}
        />

        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <h1
            style={{
              margin: "0 0 10px",
              color: "#172554",
              fontSize: "30px",
            }}
          >
            Create Your Account
          </h1>

          <p
            style={{
              margin: 0,
              color: "#fc7a00",
              fontSize: "15px",
            }}
          >
            Join FLAVEA and get started today.
          </p>
        </div>

        {/* Success message */}
        {message && (
          <div
            style={{
              marginBottom: "20px",
              padding: "12px",
              backgroundColor: "#dcfce7",
              color: "#166534",
              borderRadius: "8px",
              textAlign: "center",
              fontSize: "14px",
            }}
          >
            {message}
          </div>
        )}

        {/* Error message */}
        {error && (
          <div
            style={{
              marginBottom: "20px",
              padding: "12px",
              backgroundColor: "#fee2e2",
              color: "#b91c1c",
              borderRadius: "8px",
              textAlign: "center",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="fullName"
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#1e293b",
                fontWeight: "600",
              }}
            >
              Full Name
            </label>

            <input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "13px",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                boxSizing: "border-box",
                fontSize: "15px",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="email"
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#1e293b",
                fontWeight: "600",
              }}
            >
              Email Address
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "13px",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                boxSizing: "border-box",
                fontSize: "15px",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="password"
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#1e293b",
                fontWeight: "600",
              }}
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "13px",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                boxSizing: "border-box",
                fontSize: "15px",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="confirmPassword"
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#1e293b",
                fontWeight: "600",
              }}
            >
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "13px",
                border: "1px solid #cbd5e1",
                borderRadius: "8px",
                boxSizing: "border-box",
                fontSize: "15px",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              border: "none",
              borderRadius: "8px",
              backgroundColor: loading ? "#93c5fd" : "#2563eb",
              color: "#ffffff",
              fontSize: "16px",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p
          style={{
            marginTop: "25px",
            textAlign: "center",
            color: "#64748b",
            fontSize: "14px",
          }}
        >
          Already have an account?{" "}
          <a
            href="/login"
            style={{
              color: "#2563eb",
              fontWeight: "600",
              textDecoration: "none",
            }}
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;