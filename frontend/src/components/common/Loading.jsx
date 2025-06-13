import React from 'react';

const Loading = ({ size = 'medium', fullScreen = false, message = '' }) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-10 h-10',
    large: 'w-16 h-16'
  };

  const spinnerSize = sizeClasses[size] || sizeClasses.medium;
  
  const spinner = (
    <div className="flex flex-col items-center justify-center">
      <div className={`${spinnerSize} border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin`}></div>
      {message && <p className="mt-3 text-gray-600">{message}</p>}
    </div>
  );
  
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-neutral-900 bg-opacity-75 z-50">
        {spinner}
      </div>
    );
  }
  
  return spinner;
};

export default Loading;
