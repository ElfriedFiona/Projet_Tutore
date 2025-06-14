import React from 'react';

export const Table = ({ children, className = '' }) => {
  return (
    <div className="overflow-x-auto">
      <table className={`min-w-full divide-y divide-surface-border ${className}`}>
        {children}
      </table>
    </div>
  );
};

export const THead = ({ children, className = '' }) => {
  return (
    <thead className={`bg-surface-hover ${className}`}>
      {children}
    </thead>
  );
};

export const TBody = ({ children, className = '' }) => {
  return (
    <tbody className={`bg-surface-card divide-y divide-surface-border ${className}`}>
      {children}
    </tbody>
  );
};

export const Tr = ({ children, className = '', onClick }) => {
  return (
    <tr 
      className={`${onClick ? 'cursor-pointer hover:bg-surface-hover' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </tr>
  );
};

export const Th = ({ children, className = '' }) => {
  return (
    <th
      scope="col"
      className={`px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider ${className}`}
    >
      {children}
    </th>
  );
};

export const Td = ({ children, className = '' }) => {
  return (
    <td className={`px-6 py-4 whitespace-nowrap text-sm text-text-primary ${className}`}>
      {children}
    </td>
  );
};

export const EmptyRow = ({ colSpan = 1, message = "Aucune donnée disponible" }) => {
  return (
    <tr>
      <td colSpan={colSpan} className="px-6 py-4 text-center text-sm text-text-secondary">
        {message}
      </td>
    </tr>
  );
};

export default Table;
