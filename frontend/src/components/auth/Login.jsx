import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../authContext";
import "./auth.css";
import logo from "../../assets/github-mark-white.svg";
import { Link } from "react-router-dom";

const Login = () => {
  const { setCurrentUser } = useAuth();
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    setCurrentUser(null);
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let res = await axios.post("http://localhost:3000/login", {
        email: email,
        password: password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);
      setCurrentUser(res.data.userId);
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert("Login failed");
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-logo-container">
        <img className="logo-login" src={logo} alt="Logo" />
      </div>

      <div className="login-box-wrapper">
        {/* Heading */}
        <div className="login-heading" style={{ padding: "10px" }}>
          <h2 style={{ fontSize: "26px", color: "#f1f6fd" }}>login </h2>
        </div>

        <div className="login-box">
          <div>
            <label className="label">Email address</label>
            <input
              autoComplete="off"
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="label">Password</label>
            <input
              autoComplete="off"
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="submit-btn login-btn"
            disabled={loading}
            onClick={handleLogin}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </div>

        <div className="pass-box">
          <p>
            New to github? <Link to="/signup">Signup</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
