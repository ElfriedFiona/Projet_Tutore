import React from 'react';

export const PrimaryButton = ({ 
  className = '', 
  disabled = false, 
  children, 
  type = 'button',
  onClick,
  asChild = false,
  size = 'md',
  ...props 
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  const buttonClasses = `inline-flex items-center justify-center ${sizeClasses[size]} bg-primary-500 border border-transparent rounded-md font-semibold tracking-wide hover:bg-primary-600 focus:bg-primary-600 active:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 transition ease-in-out duration-150 shadow-md hover:shadow-lg ${
    disabled ? 'opacity-50 cursor-not-allowed' : ''
  } ${className}`;

  if (asChild) {
    return React.cloneElement(children, {
      ...props,
      className: buttonClasses,
      disabled,
      onClick
    });
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      {...props}
    >
      {children}
    </button>
  );
};

export const SecondaryButton = ({ 
  className = '', 
  disabled = false, 
  children, 
  type = 'button',
  onClick,
  asChild = false,
  size = 'md',
  variant = 'default',
  ...props 
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  const variantClasses = variant === 'outline' 
    ? 'bg-transparent border-2 border-secondary-500 text-secondary-500' 
    : 'bg-secondary-500 border border-transparent text-white hover:bg-secondary-600';

  const buttonClasses = `inline-flex items-center justify-center ${sizeClasses[size]} ${variantClasses} rounded-md font-semibold shadow-md tracking-wide hover:shadow-lg hover:shadow-secondary-500/20 focus:outline-none focus:ring-2 focus:ring-secondary-400 focus:ring-offset-2 transition ease-in-out duration-150 transform hover:translate-y-[-1px] ${
    disabled ? 'opacity-50 cursor-not-allowed' : ''
  } ${className}`;

  if (asChild) {
    return React.cloneElement(children, {
      ...props,
      className: buttonClasses,
      disabled,
      onClick
    });
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      {...props}
    >
      {children}
    </button>
  );
};

export const DangerButton = ({ 
  className = '', 
  disabled = false, 
  children, 
  type = 'button',
  onClick,
  asChild = false,
  ...props 
}) => {
  const buttonClasses = `inline-flex items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-sm text-white tracking-wide hover:bg-red-700 focus:bg-red-700 active:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 shadow-md hover:shadow-lg transition ease-in-out duration-150 ${
    disabled ? 'opacity-50 cursor-not-allowed' : ''
  } ${className}`;

  if (asChild) {
    return React.cloneElement(children, {
      ...props,
      className: buttonClasses,
      disabled,
      onClick
    });
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      {...props}
    >
      {children}
    </button>
  );
};

export const LinkButton = ({ 
  className = '', 
  disabled = false, 
  children, 
  onClick,
  asChild = false,
  ...props 
}) => {
  const buttonClasses = `inline-flex items-center px-4 py-2 bg-transparent underline font-semibold text-sm text-primary-600 tracking-wide hover:text-secondary-500 focus:outline-none transition ease-in-out duration-150 ${
    disabled ? 'opacity-50 cursor-not-allowed' : ''
  } ${className}`;

  if (asChild) {
    return React.cloneElement(children, {
      ...props,
      className: buttonClasses,
      disabled,
      onClick
    });
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      {...props}
    >
      {children}
    </button>
  );
};
