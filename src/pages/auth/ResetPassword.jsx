import { useState } from "react";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import "./ResetPassword.css";

function ResetPassword() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  const [success, setSuccess] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));

    setSuccess(false);
  }

  function validateForm() {
    const newErrors = {
      password: "",
      confirmPassword: "",
    };

    if (!formData.password) {
      newErrors.password = "New password is required.";
    } else if (formData.password.length < 2) {
      newErrors.password = "Password must contain at least 2 characters.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password.";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    return !newErrors.password && !newErrors.confirmPassword;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!validateForm()) {
      setSuccess(false);
      return;
    }

    setSuccess(true);
  }

  return (
    <main className="reset-password-page">
      <section className="reset-password-left">
        <div className="reset-password-logo">
          <span className="reset-password-logo-icon">U</span>
          <span>UniLink</span>
        </div>

        <div className="reset-password-intro">
          <p className="reset-password-eyebrow">
            Built for KFUPM students
          </p>

          <h1>
            One campus.
            <br />
            More possibilities.
          </h1>

          <p className="reset-password-description">
            Discover meaningful opportunities, find the right teammates,
            and build your university experience together.
          </p>
        </div>
      </section>

      <section className="reset-password-right">
        <div className="reset-password-container">
          <p className="reset-password-kicker">PASSWORD RECOVERY</p>

          <h2>Create a new password</h2>

          <p className="reset-password-subtitle">
            Enter and confirm your new password to regain access to your
            UniLink account.
          </p>

          <form
            className="reset-password-form"
            onSubmit={handleSubmit}
            noValidate
          >
            <Input
              label="New Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your new password"
              required
              error={errors.password}
            />

            <Input
              label="Confirm New Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your new password"
              required
              error={errors.confirmPassword}
            />

            {success && (
              <p className="reset-password-success" role="status">
                Your password has been reset successfully.
              </p>
            )}

            <Button
              type="submit"
              className="reset-password-submit"
            >
              Reset Password
            </Button>

            <a className="reset-password-back" href="/login">
                Back to Login
            </a>
            
          </form>
        </div>
      </section>
    </main>
  );
}

export default ResetPassword;