import "./Login.css";

function Login() {
  return (
    <div className="login-page">
      <section className="login-intro">
        <div className="login-logo">
          <span className="login-logo-icon">U</span>
          <span>UniLink</span>
        </div>

        <div className="login-intro-content">
          <p className="login-eyebrow">Built for KFUPM students</p>

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
      </section>

      <main className="login-form-side"></main>
    </div>
  );
}

export default Login;