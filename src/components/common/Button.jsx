import "./Button.css";

function Button({
  children,
  variant = "primary",
  type = "button",
  fullWidth = false,
  loading = false,
  disabled = false,
  className = "",
  ...props
}) {
  const buttonClasses = [
    "button",
    `button--${variant}`,
    fullWidth ? "button--full-width" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}

export default Button;