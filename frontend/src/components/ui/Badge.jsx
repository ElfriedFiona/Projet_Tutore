import React from 'react';

const Badge = ({ 
  children, 
  type = 'default', 
  size = 'md',
  className = '' 
}) => {  const types = {
    default: 'bg-neutral-700 text-neutral-300',
    primary: 'bg-primary-700 text-primary-100',
    success: 'bg-green-700 text-green-100',
    warning: 'bg-yellow-700 text-yellow-100',
    danger: 'bg-red-700 text-red-100',
    info: 'bg-blue-700 text-blue-100',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-base'
  };

  const badgeType = types[type] || types.default;
  const badgeSize = sizes[size] || sizes.md;

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${badgeType} ${badgeSize} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
