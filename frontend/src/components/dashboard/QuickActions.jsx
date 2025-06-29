import React from 'react';
import { Link } from 'react-router-dom';

const QuickActions = ({ userType }) => {
  const studentActions = [
    {
      title: 'Rechercher un livre',
      description: 'Parcourir le catalogue',
      icon: '🔍',
      link: '/catalog',
      color: 'bg-blue-500'
    },
    {
      title: 'Mes emprunts',
      description: 'Gérer mes emprunts',
      icon: '📚',
      link: '/dashboard/loans',
      color: 'bg-green-500'
    },
    {
      title: 'Mes réservations',
      description: 'Voir mes réservations',
      icon: '📅',
      link: '/dashboard/reservations',
      color: 'bg-purple-500'
    },
    {
      title: 'Mon profil',
      description: 'Modifier mes informations',
      icon: '👤',
      link: '/dashboard/profile',
      color: 'bg-gray-500'
    }
  ];

  const teacherActions = [
    {
      title: 'Rechercher un livre',
      description: 'Parcourir le catalogue',
      icon: '🔍',
      link: '/catalog',
      color: 'bg-blue-500'
    },
    {
      title: 'Mes emprunts',
      description: 'Gérer mes emprunts',
      icon: '📚',
      link: '/dashboard/loans',
      color: 'bg-green-500'
    },
    {
      title: 'Recommander un livre',
      description: 'Suggérer des acquisitions',
      icon: '💡',
      link: '/dashboard/recommend',
      color: 'bg-yellow-500'
    },
    {
      title: 'Mes recommandations',
      description: 'Livres recommandés',
      icon: '⭐',
      link: '/dashboard/recommendations',
      color: 'bg-purple-500'
    },
    {
      title: 'Mon profil',
      description: 'Modifier mes informations',
      icon: '👤',
      link: '/dashboard/profile',
      color: 'bg-gray-500'
    }
  ];

  const actions = userType === 'teacher' ? teacherActions : studentActions;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Actions rapides</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {actions.map((action, index) => (
          <Link
            key={index}
            to={action.link}
            className="group flex flex-col items-center p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 hover:scale-105"
          >
            <div className={`w-12 h-12 ${action.color} rounded-full flex items-center justify-center text-white text-xl mb-3 group-hover:scale-110 transition-transform duration-200`}>
              {action.icon}
            </div>
            <h3 className="font-semibold text-gray-800 text-sm text-center mb-1">
              {action.title}
            </h3>
            <p className="text-xs text-gray-500 text-center">
              {action.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
