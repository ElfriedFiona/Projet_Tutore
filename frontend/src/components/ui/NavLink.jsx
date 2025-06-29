import React from 'react';
import { Link } from 'react-router-dom';

export const NavLink = ({ 
  active = false, 
  className = '', 
  children, 
  to,
  ...props 
}) => {
  return (    <Link
      to={to}
      className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 focus:outline-none transition duration-150 ease-in-out ${
        active
          ? 'border-primary-500 text-text-primary focus:border-primary-700'
          : 'border-transparent text-text-secondary hover:text-text-primary hover:border-surface-border focus:text-text-primary focus:border-surface-border'
      } ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
};

export const ResponsiveNavLink = ({ 
  active = false, 
  className = '', 
  children, 
  to,
  ...props 
}) => {
  return (    <Link
      to={to}      className={`block w-full pl-3 pr-4 py-2 border-l-4 text-left text-base font-medium focus:outline-none transition duration-150 ease-in-out ${
        active
          ? 'border-primary-500 text-primary-700 bg-primary-50 focus:text-primary-800 focus:bg-primary-100 focus:border-primary-700'
          : 'border-transparent text-text-secondary hover:text-text-primary hover:bg-surface-hover hover:border-surface-border focus:text-text-primary focus:bg-surface-hover focus:border-surface-border'
      } ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
};

export default NavLink;
