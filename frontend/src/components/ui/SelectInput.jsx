import React, { forwardRef } from 'react';

const SelectInput = forwardRef(({
  name,
  id,
  value,
  className = '',
  required = false,
  disabled = false,
  label,
  error,
  options = [],
  placeholder = 'Sélectionner une option',
  onChange,
  ...props
}, ref) => {
  return (
    <div className="w-full">      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-text-primary mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select
        name={name}
        id={id}
        value={value}
        className={`w-full rounded-md shadow-sm border-surface-border bg-surface-card text-text-primary focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50 ${
          error ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : ''
        } ${disabled ? 'bg-surface-hover opacity-75' : ''} ${className}`}
        ref={ref}
        required={required}
        disabled={disabled}
        onChange={onChange}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

export default SelectInput;
