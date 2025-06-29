import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, BookOpen, GraduationCap, Users } from 'lucide-react';

const RoleNavigator = () => {
  const location = useLocation();
  
  const dashboardRoutes = [
    {
      path: '/dashboard',
      name: 'Dashboard Étudiant',
      icon: Users,
      color: 'bg-purple-500',
      description: 'Vue standard étudiant'
    },
    {
      path: '/dashboard/librarian',
      name: 'Dashboard Bibliothécaire',
      icon: BookOpen,
      color: 'bg-blue-500',
      description: 'Gestion de la bibliothèque'
    },
    {
      path: '/dashboard/administrator',
      name: 'Dashboard Administrateur',
      icon: Shield,
      color: 'bg-red-500',
      description: 'Administration système'
    }
  ];

  const isCurrentPath = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <h3 className="text-sm font-medium text-gray-700 mb-3">
        🎭 Navigation des rôles (Mode démonstration)
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {dashboardRoutes.map((route) => {
          const Icon = route.icon;
          const isActive = isCurrentPath(route.path);
          
          return (
            <Link
              key={route.path}
              to={route.path}
              className={`flex items-center p-3 rounded-lg border transition-all duration-200 ${
                isActive
                  ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-sm'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className={`w-8 h-8 rounded-full ${route.color} flex items-center justify-center mr-3`}>
                <Icon className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium truncate ${
                  isActive ? 'text-primary-700' : 'text-gray-900'
                }`}>
                  {route.name}
                </p>
                <p className={`text-xs truncate ${
                  isActive ? 'text-primary-600' : 'text-gray-500'
                }`}>
                  {route.description}
                </p>
              </div>
              {isActive && (
                <div className="ml-2 w-2 h-2 bg-primary-500 rounded-full"></div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default RoleNavigator;
