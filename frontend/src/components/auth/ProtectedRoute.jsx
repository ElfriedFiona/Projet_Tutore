import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AppContext';

// This component protects routes that require authentication
const ProtectedRoute = ({ children, requireAdmin = false, requireTeacher = false, requireLibrarian = false }) => {
  const { isAuthenticated, isAdmin, user } = useAuth();
  const location = useLocation();
  
  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    // Save the location they were trying to access so we can redirect after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  if (requireAdmin && !isAdmin && user?.role !== 'admin' && user?.role !== 'administrator') {
    // Redirect to home page if admin access is required but user is not an admin
    return <Navigate to="/" replace />;
  }

  if (requireLibrarian && user?.role !== 'librarian' && user?.role !== 'admin' && user?.role !== 'administrator') {
    // Redirect to home page if librarian access is required but user is not a librarian or admin
    return <Navigate to="/" replace />;
  }

  if (requireTeacher && user?.userType !== 'teacher' && user?.role !== 'teacher') {
    // Redirect to home page if teacher access is required but user is not a teacher
    return <Navigate to="/" replace />;
  }
  
  return children;
};

export default ProtectedRoute;
