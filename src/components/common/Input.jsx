import { useId, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import "./Input.css";

function Input({
    id,
    label,
    type = "text",
    required = false,
    error = "",
    helperText = "",
    className = "",
    ...props
}) {
    const generatedId = useId();
    const inputId = id || generatedId;

    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";
    const currentType = isPassword && showPassword ? "text" : type;

    return (
        <div className={`input-group ${className}`}>
            {label && (
                <label className="input-label" htmlFor={inputId}>
                    {label}
                    {required && <span className="input-required"> *</span>}
                </label>
            )}

            <div className="input-wrapper">
                <input
                    id={inputId}
                    type={currentType}
                    className={`input-field ${isPassword ? "input-field--password" : ""
                        } ${error ? "input-field--error" : ""}`}
                    aria-invalid={Boolean(error)}
                    aria-describedby={
                        error
                            ? `${inputId}-error`
                            : helperText
                                ? `${inputId}-helper`
                                : undefined
                    }
                    {...props}
                />

                {isPassword && (
                    <button
                        type="button"
                        className="input-password-button"
                        onClick={() => setShowPassword((previous) => !previous)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? <Eye size={21} /> : <EyeOff size={21} />}
                    </button>
                )}
            </div>

            {error && (
                <p className="input-message input-message--error" id={`${inputId}-error`}>
                    {error}
                </p>
            )}

            {!error && helperText && (
                <p className="input-message" id={`${inputId}-helper`}>
                    {helperText}
                </p>
            )}
        </div>
    );
}

export default Input;