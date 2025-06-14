import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Configuration des noms de pages pour le breadcrumb
  const pageNames = {
    'dashboard': 'Tableau de Bord',
    'administrator': 'Dashboard Administrateur',
    'librarian': 'Dashboard Bibliothécaire',
    'user-management': 'Gestion des Utilisateurs',
    'permissions': 'Droits d\'Accès',
    'system-config': 'Configuration Système',
    'system-reports': 'Rapports Système',
    'backups': 'Sauvegardes',
    'catalog-management': 'Gestion du Catalogue',
    'loans-management': 'Gestion des Prêts',
    'fines-management': 'Gestion des Amendes',
    'loans': 'Mes Emprunts',
    'reservations': 'Mes Réservations',
    'favorites': 'Mes Favoris',
    'profile': 'Mon Profil',
    'recommendations': 'Mes Recommandations',
    'acquisitions': 'Mes Acquisitions'
  };

  const getPageName = (path) => {
    return pageNames[path] || path.charAt(0).toUpperCase() + path.slice(1);
  };

  // Si on est sur la page d'accueil, ne pas afficher le breadcrumb
  if (pathnames.length === 0) return null;

  return (
    <nav className="flex items-center space-x-2 text-sm mb-6 bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-200">
      <Link
        to="/"
        className="flex items-center text-gray-500 hover:text-primary-600 transition-colors"
      >
        <Home className="w-4 h-4" />
      </Link>

      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        return (
          <React.Fragment key={name}>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            {isLast ? (
              <span className="text-gray-900 font-medium">
                {getPageName(name)}
              </span>
            ) : (
              <Link
                to={routeTo}
                className="text-gray-500 hover:text-primary-600 transition-colors"
              >
                {getPageName(name)}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
