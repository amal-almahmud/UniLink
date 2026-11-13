import { useState } from "react";
import { useNavigate } from "react-router";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  function handleSubmit(event) {
    event.preventDefault();

    const newErrors = {
      email: "",
      password: "",
    };

    const universityEmailPattern =
      /^[^\s@]+@kfupm\.edu\.sa$/i;

    if (!email.trim()) {
      newErrors.email = "University email is required.";
    } else if (!universityEmailPattern.test(email.trim())) {
      newErrors.email = "Please use your KFUPM university email.";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required.";
    } else if (password.length < 2) {
      newErrors.password = "Password must contain at least 2 characters.";
    }

    setErrors(newErrors);

    if (!newErrors.email && !newErrors.password) {
      navigate("/dashboard");
    }
  }

  return (
    <div className="login-page">
      <section className="login-intro">
        <div className="login-logo">
          <span className="login-logo-icon">U</span>
          <span>UniLink</span>
        </div>

        <div className="login-intro-content">
          <p className="login-eyebrow">
            Built for KFUPM students
          </p>

          <h1>
            One campus.
            <br />
            More possibilities.
          </h1>

          <p className="login-description">
            Discover meaningful opportunities, find the right teammates,
            and build your university experience together.
          </p>
        </div>

        <div className="login-features">
          <p>
            <span>01</span>
            Discover opportunities
          </p>

          <p>
            <span>02</span>
            Connect with teams
          </p>

          <p>
            <span>03</span>
            Create something valuable
          </p>
        </div>
      </section>

      <main className="login-form-side">
        <div className="login-form-container">
          <p className="login-portal">
            STUDENT PORTAL
          </p>

          <h2>Welcome to UniLink</h2>

          <p className="login-subtitle">
            Connect with teams and discover university opportunities.
          </p>

          <form
            className="login-form"
            onSubmit={handleSubmit}
            noValidate
          >
            <Input
              label="University Email"
              name="email"
              type="email"
              placeholder="s20xxxxxx@kfupm.edu.sa"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);

                if (errors.email) {
                  setErrors({
                    ...errors,
                    email: "",
                  });
                }
              }}
              error={errors.email}
              autoComplete="email"
              required
            />

            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);

                if (errors.password) {
                  setErrors({
                    ...errors,
                    password: "",
                  });
                }
              }}
              error={errors.password}
              helperText="Password is hidden by default. Click eye icon to show or hide password."
              autoComplete="current-password"
              required
            />

            <div className="login-options">
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(event) =>
                    setRememberMe(event.target.checked)
                  }
                />

                <span>Remember Me</span>
              </label>

              <a href="/forgot-password">
                Forgot Password?
              </a>
            </div>

            <Button
              type="submit"
              className="login-submit"
            >
              Log In
            </Button>

            <p className="login-register">
              New to UniLink?{" "}
              <a href="/register">
                Create an Account
              </a>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Login;