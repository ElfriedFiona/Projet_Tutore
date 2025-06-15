// This component no longer protects routes - allows free navigation for testing
const ProtectedRoute = ({ children }) => {
  // Suppression de toutes les vérifications d'authentification et de permissions
  // pour permet la navigation manuelle entre les différentes pages
  
  return children;
};

export default ProtectedRoute;
