import React, { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://127.0.0.1:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Signup successful ✅");
        setFormData({ email: "", password: "" });
      } else {
        setMessage(data.detail || "Signup failed ❌");
      }

    } catch (error) {
      setMessage("Server error ❌");
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Create Account</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6"
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    width: "320px"
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px"
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px"
  },
  button: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#2563eb",
    color: "#fff",
    fontSize: "15px",
    cursor: "pointer"
  },
  message: {
    marginTop: "15px",
    textAlign: "center"
  }
};

export default Signup;
