import { useState } from "react";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSent, setIsSent] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    const universityEmailPattern =
      /^[^\s@]+@kfupm\.edu\.sa$/i;

    if (!email.trim()) {
      setEmailError("University email is required.");
      setIsSent(false);
      return;
    }

    if (!universityEmailPattern.test(email.trim())) {
      setEmailError(
        "Please use your KFUPM university email."
      );
      setIsSent(false);
      return;
    }

    setEmailError("");
    setIsSent(true);
  }

  return (
    <div className="forgot-page">
      <section className="forgot-intro">
        <div className="forgot-logo">
          <span className="forgot-logo-icon">U</span>
          <span>UniLink</span>
        </div>

        <div className="forgot-intro-content">
          <p className="forgot-intro-eyebrow">
            Built for KFUPM students
          </p>

          <h1>
            One campus.
            <br />
            More possibilities.
          </h1>

          <p className="forgot-description">
            Discover meaningful opportunities, find the right teammates,
            and build your university experience together.
          </p>
        </div>
      </section>

      <main className="forgot-main">
        <div className="forgot-container">
          <p className="forgot-form-eyebrow">
            PASSWORD RECOVERY
          </p>

          <h2>Reset your password</h2>

          <p className="forgot-subtitle">
            Enter your university email and we will send you a
            secure reset link.
          </p>

          <form
            className="forgot-form"
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
                setEmailError("");
                setIsSent(false);
              }}
              error={emailError}
              autoComplete="email"
              required
            />

            {isSent && (
              <p
                className="forgot-success"
                role="status"
              >
                A password reset link has been sent to your
                university email.
              </p>
            )}

            <Button
              type="submit"
              className="forgot-submit"
            >
              Send Reset Link
            </Button>

            <a
              className="forgot-login-link"
              href="/login"
            >
              Back to Login
            </a>
          </form>
        </div>
      </main>
    </div>
  );
}

export default ForgotPassword;