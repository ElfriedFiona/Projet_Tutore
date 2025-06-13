import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

// Configuration des routes personnalisées
const ROUTE_CONFIG = {
  // Routes de gestion utilisateur
  catalog: 'Catalogue',
  login: 'Connexion',
  register: 'Inscription',
  'password-reset': 'Réinitialisation du mot de passe',
  'forgot-password': 'Mot de passe oublié',
  'verify-email': 'Vérification de l\'email',
  'confirm-password': 'Confirmation du mot de passe',
  contact: 'Contact', // Ajouté
  
  // Routes utilisateur
  loans: 'Mes emprunts',
  reservations: 'Mes réservations',
  profile: 'Mon profil',
  
  // Routes admin
  admin: 'Administration',
};

// Configuration des sections admin
const ADMIN_SECTIONS = {
  books: 'Gestion des livres',
  users: 'Gestion des utilisateurs',
  loans: 'Gestion des prêts',
  reservations: 'Gestion des réservations',
  statistics: 'Statistiques',
  settings: 'Paramètres',
};

export default function Breadcrumbs() {
  const location = useLocation();

  // Mémorisation des breadcrumbs pour éviter les recalculs inutiles
  const breadcrumbs = useMemo(() => {
    // Ne pas afficher sur la page d'accueil
    if (location.pathname === '/') {
      return null;
    }

    return generateBreadcrumbs(location.pathname);
  }, [location.pathname]);

  // Si pas de breadcrumbs à afficher
  if (!breadcrumbs) {
    return null;
  }

  return (
    <nav 
      className="container mx-auto px-4 py-3" 
      aria-label="Fil d'Ariane"
    >
      <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl p-4 border border-primary-200">
        <ol className="flex flex-wrap items-center space-x-2 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <li key={crumb.path} className="flex items-center">
              {index > 0 && (
                <ChevronRight 
                  className="mx-2 h-4 w-4 text-primary-400" 
                  aria-hidden="true"
                />
              )}
              
              <BreadcrumbItem 
                crumb={crumb} 
                isFirst={index === 0}
              />
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}

// Composant pour un élément de breadcrumb
function BreadcrumbItem({ crumb, isFirst }) {
  const baseClasses = "flex items-center transition-all duration-200";
  
  if (crumb.isLast) {
    return (
      <span 
        className={`${baseClasses} text-primary-700 font-semibold cursor-default`}
        aria-current="page"
      >
        {isFirst && <Home className="h-4 w-4 mr-1" aria-hidden="true" />}
        {crumb.text}
      </span>
    );
  }

  return (
    <Link 
      to={crumb.path} 
      className={`${baseClasses} text-primary-600 hover:text-secondary-500 hover:scale-105 font-medium`}
      title={`Aller à ${crumb.text}`}
    >
      {isFirst && <Home className="h-4 w-4 mr-1" aria-hidden="true" />}
      {crumb.text}
    </Link>
  );
}

// Génération des breadcrumbs
function generateBreadcrumbs(pathname) {
  // Gestion spéciale pour les détails de livre
  if (pathname.includes('/book/')) {
    return [
      { path: '/', text: 'Accueil', isLast: false },
      { path: '/catalog', text: 'Catalogue', isLast: false },
      { path: pathname, text: 'Détails du livre', isLast: true }
    ];
  }

  // Gestion spéciale pour les sections admin
  if (pathname.includes('/admin/')) {
    const section = pathname.split('/admin/')[1]?.split('/')[0];
    const sectionName = ADMIN_SECTIONS[section] || formatRouteName(section);
    
    return [
      { path: '/', text: 'Accueil', isLast: false },
      { path: '/admin', text: 'Administration', isLast: false },
      { path: pathname, text: sectionName, isLast: true }
    ];
  }

  // Génération par défaut basée sur les segments du chemin
  return generateDefaultBreadcrumbs(pathname);
}

// Génération des breadcrumbs par défaut
function generateDefaultBreadcrumbs(pathname) {
  let currentPath = '';
  
  const pathSegments = pathname.split('/')
    .filter(segment => segment !== '')
    .map((segment, index, array) => {
      currentPath += `/${segment}`;
      
      return {
        path: currentPath,
        text: formatRouteName(segment),
        isLast: index === array.length - 1
      };
    });

  // Toujours inclure l'accueil comme premier élément
  return [
    { path: '/', text: 'Accueil', isLast: pathSegments.length === 0 },
    ...pathSegments
  ];
}

// Formatage des noms de routes
function formatRouteName(routeName) {
  // Vérifier si c'est une route configurée
  if (ROUTE_CONFIG[routeName]) {
    return ROUTE_CONFIG[routeName];
  }

  // Décoder l'URL et formater
  const decoded = decodeURIComponent(routeName);
  
  // Transformer les tirets en espaces et capitaliser
  return decoded
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}