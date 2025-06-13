import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const PasswordInput = ({
  id,
  name,
  label,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  autoComplete,
  className = '',
  disabled = false
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-neutral-700">
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative mt-1">
        <input
          id={id}
          name={name}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disabled}
          className={`appearance-none relative block w-full px-3 py-2 pr-10 border ${
            error ? 'border-red-300' : 'border-gray-300'
          } placeholder-neutral-500 text-neutral-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center bg-transparent hover:bg-transparent"
          onClick={togglePasswordVisibility}
          tabIndex={-1}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4 text-neutral-400 hover:text-neutral-900 transition-colors" />
          ) : (
            <Eye className="h-4 w-4 text-neutral-400 hover:text-secondary-900 transition-colors" />
          )}
        </button>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default PasswordInput;
