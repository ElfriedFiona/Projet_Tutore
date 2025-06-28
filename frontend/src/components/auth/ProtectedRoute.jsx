import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AppContext';

// This component now protects routes based on authentication and optionally, roles.
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, loading } = useAuth(); // Assuming useAuth provides these

  // Show a loading indicator while authentication status is being determined
  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-[9999]">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-500"></div>
          <p className="mt-4 text-primary-700 font-semibold">Vérification de l'accès...</p>
        </div>
      </div>
    );
  }

  // 1. Check if the user is authenticated
  if (!isAuthenticated) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  // 2. Optional: Check if the user has one of the allowed roles
  // 'allowedRoles' is an array of roles, e.g., ['admin', 'librarian']
  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = user?.role; // Assuming the user object has a 'role' property
    if (!userRole || !allowedRoles.includes(userRole)) {
      // If the user's role is not among the allowed roles, redirect to an unauthorized page or dashboard
      // You can customize this redirect based on your application's flow
      console.warn(`Access denied for role: ${userRole}. Required roles: ${allowedRoles.join(', ')}`);
      return <Navigate to="/*" replace />; // Or '/dashboard'
    }
  }

  // If authenticated and (optionally) authorized by role, render the children
  return children;
};

export default ProtectedRoute;