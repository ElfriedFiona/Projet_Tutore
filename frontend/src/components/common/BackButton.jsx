import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const BackButton = ({
  to = null,
  className = '',
  children = 'Retour',
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      onClick={handleBack}
      className={`inline-flex items-center px-3 py-2 text-sm text-neutral-600 bg-white hover:bg-primary-50 hover:text-primary-600 border border-neutral-200 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md ${className}`}
    >
      <ChevronLeft className="h-4 w-4 mr-1" />
      {children}
    </button>
  );
};

export default BackButton;
