import { useId } from "react";
import "./Textarea.css";

function Textarea({
  id,
  label,
  required = false,
  error = "",
  helperText = "",
  className = "",
  ...props
}) {
  const generatedId = useId();
  const textareaId = id || generatedId;

  return (
    <div className={`textarea-group ${className}`}>
      {label && (
        <label className="textarea-label" htmlFor={textareaId}>
          {label}

          {required && (
            <span className="textarea-required"> *</span>
          )}
        </label>
      )}

      <textarea
        id={textareaId}
        className={`textarea-field ${
          error ? "textarea-field--error" : ""
        }`}
        {...props}
      />

      {error && (
        <p className="textarea-message textarea-message--error">
          {error}
        </p>
      )}

      {!error && helperText && (
        <p className="textarea-message">
          {helperText}
        </p>
      )}
    </div>
  );
}

export default Textarea;