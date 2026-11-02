import{useId} from 'react';
import{ChevronDown} from "lucide-react";
import "./Select.css";

function Select({
    id,
    label,
    required=false,
    error="",
    helperText = "",
    className = "",
    children,
  ...props
}){
const generatedId = useId();
const selectId = id || generatedId;

return(  
  <div className={`select-group ${className}`}>
    {label && (
     <label className="select-label" htmlFor={selectId}>
        {label}
        {required && <span className="select-required"> *</span>}
        </label>
      )}

      <div className="select-wrapper">
        <select
          id={selectId}
          className={`select-field ${
            error ? "select-field--error" : ""
          }`}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error
              ? `${selectId}-error`
              : helperText
                ? `${selectId}-helper`
                : undefined
          }
          {...props}
        >
          {children}
        </select>

        <ChevronDown
          className="select-icon"
          size={20}
          aria-hidden="true"
        />
      </div>

        {error && (
        <p
          className="select-message select-message--error"
          id={`${selectId}-error`}
        >
          {error}
        </p>
      )}

       {!error && helperText && (
        <p className="select-message" id={`${selectId}-helper`}>
          {helperText}
        </p>
      )}
    </div>
  );
}

export default Select;