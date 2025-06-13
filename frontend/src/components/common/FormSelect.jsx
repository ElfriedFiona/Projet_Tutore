import React from 'react';

const FormSelect = ({
  id,
  name,
  label,
  value,
  onChange,
  options = [],
  error,
  required = false,
  className = '',
  placeholder = 'Sélectionner une option',
  disabled = false
}) => {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-neutral-700">
        {label}{required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
          error ? 'border-red-300' : 'border-gray-300'
        } text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
      >
        <option value="">{placeholder}</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default FormSelect;
