import React, { useEffect, useRef, forwardRef } from 'react';

const TextInput = forwardRef(({
  type = 'text',
  name,
  id,
  value,
  className = '',
  placeholder,
  autoComplete,
  required = false,
  isFocused = false,
  disabled = false,
  label,
  error,
  onChange,
  ...props
}, ref) => {
  const localInputRef = useRef();
  const input = ref || localInputRef;

  useEffect(() => {
    if (isFocused && input.current) {
      input.current.focus();
    }
  }, [isFocused, input]);
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-text-primary mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        className={`w-full rounded-md shadow-sm border-surface-border bg-surface-card text-text-primary focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50 ${
          error ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : ''
        } ${disabled ? 'bg-surface-hover opacity-75' : ''} ${className}`}
        ref={input}
        autoComplete={autoComplete}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        onChange={onChange}
        {...props}
      />      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

export default TextInput;
