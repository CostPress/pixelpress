import React from "react";
import { useEffect } from "react";
import { testServerConnection } from "../api/server";
import "./Signup.css";

const Signup = () => {
  useEffect(() => {
  testServerConnection()
    .then((data) => {
      console.log("Server response:", data);
    })
    .catch((error) => {
      console.error("Server connection failed:", error);
    });
}, []);

  return (
    <div
      className="signup-page"
      style={{
        color: "white",
        maxWidth: "450px",
        margin: "50px auto",
        padding: "30px",
        border: "1px solid #ddd",
        borderRadius: "10px",
      }}
    >
      <h1>Create Your Account</h1>

      <form>
        <div style={{ marginBottom: "15px" }}>
          <label>Full Name</label>
          <br />
          <input
            type="text"
            placeholder="Enter your full name"
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Email Address</label>
          <br />
          <input
            type="email"
            placeholder="Enter your email"
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Password</label>
          <br />
          <input
            type="password"
            placeholder="Enter your password"
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Confirm Password</label>
          <br />
          <input
            type="password"
            placeholder="Confirm your password"
            style={{ width: "100%", padding: "10px" }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            cursor: "pointer",
          }}
        >
          Create Account
        </button>
      </form>

      <p style={{ marginTop: "20px", textAlign: "center" }}>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
};

export default Signup;