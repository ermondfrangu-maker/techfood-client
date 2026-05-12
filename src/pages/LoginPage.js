import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const res = await axios.post(
        "https://scrambled-vagabond-payer.ngrok-free.dev/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      localStorage.setItem(
        "role",
        res.data.user.role
      );

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Login failed ❌"
      );

    }

    setLoading(false);

  };

  return (

    <div className="login-page">

      <div className="login-overlay"></div>

      <div className="login-container">

        <div className="login-left">

          <h1>
            TechFood 🚀
          </h1>

          <p>
            Connect Restaurants & Suppliers
            in Real Time.
          </p>

          <div className="login-features">

            <div className="feature-card">
              ⚡ Fast Ordering
            </div>

            <div className="feature-card">
              📦 Smart Inventory
            </div>

            <div className="feature-card">
              🛒 Real-Time Marketplace
            </div>

          </div>

        </div>

        <div className="login-right">

          <form
            className="login-form"
            onSubmit={handleLogin}
          >

            <h2>Welcome Back 👋</h2>

            <p className="subtitle">
              Login to your account
            </p>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

            <button type="submit">

              {
                loading
                  ? "Logging in..."
                  : "Login"
              }

            </button>

            <div className="register-link">

              Don't have an account?

              <span
                onClick={() =>
                  navigate("/register")
                }
              >
                Register
              </span>

            </div>

          </form>

        </div>

      </div>

    </div>

  );

}

export default LoginPage;