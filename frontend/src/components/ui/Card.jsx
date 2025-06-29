import React from 'react';

export const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-surface-card rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }) => {
  return (
    <div className={`px-6 py-4 bg-surface-background border-b border-surface-border ${className}`}>
      {children}
    </div>
  );
};

export const CardTitle = ({ children, className = '' }) => {
  return (
    <h3 className={`text-lg font-semibold text-text-primary ${className}`}>{children}</h3>
  );
};

export const CardContent = ({ children, className = '' }) => {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
};

export const CardFooter = ({ children, className = '' }) => {
  return (
    <div className={`px-6 py-4 bg-surface-background border-t border-surface-border flex justify-end space-x-2 ${className}`}>
      {children}
    </div>
  );
};
