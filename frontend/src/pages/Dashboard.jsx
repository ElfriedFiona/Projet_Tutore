import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AppContext';
import { useFavorites } from '../context/FavoritesContext';
import DashboardCard from '../components/dashboard/DashboardCard';
import QuickActions from '../components/dashboard/QuickActions';
import RecentActivity from '../components/dashboard/RecentActivity';
import UserStats from '../components/dashboard/UserStats';

const Dashboard = () => {
  const { user } = useAuth();
  const { favoritesCount } = useFavorites();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirection automatique basée sur le rôle
    if (user) {
      if (user.role === 'admin' || user.role === 'administrator') {
        navigate('/dashboard/administrator', { replace: true });
        return;
      } else if (user.role === 'librarian') {
        navigate('/dashboard/librarian', { replace: true });
        return;
      }
      // Les étudiants et enseignants restent sur le dashboard général
    }
  }, [user, navigate]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Accès refusé</h2>
          <p className="text-gray-600">Vous devez être connecté pour accéder au dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="p-6">
        {/* En-tête de bienvenue */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Bienvenue, {user.firstName} {user.lastName}
                </h1>
                <p className="text-gray-600">
                  {user.userType === 'student' ? 'Étudiant' : 'Enseignant'} - {user.department}
                </p>
                {user.userType === 'student' && (
                  <p className="text-sm text-gray-500">
                    {user.filiere} - Niveau {user.niveau}
                  </p>
                )}
                {user.userType === 'teacher' && (
                  <p className="text-sm text-gray-500">
                    {user.grade} - {user.specialization}
                  </p>
                )}
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Dernière connexion</div>
                <div className="text-gray-800 font-medium">
                  {new Date().toLocaleDateString('fr-FR')}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistiques utilisateur */}
        <UserStats />

        {/* Actions rapides */}
        <QuickActions userType={user.userType} />

        {/* Grille de cartes du dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Mes emprunts actuels */}
          <DashboardCard
            title="Mes Emprunts"
            icon="📚"
            count="3"
            description="Livres empruntés"
            link="/dashboard/loans"
            color="blue"
          />

          {/* Mes réservations */}
          <DashboardCard
            title="Mes Réservations"
            icon="📅"
            count="2"
            description="Réservations actives"
            link="/dashboard/reservations"
            color="green"
          />

          {/* Mes favoris */}
          <DashboardCard
            title="Mes Favoris"
            icon="❤️"
            count={favoritesCount.toString()}
            description="Livres favoris"
            link="/dashboard/favorites"
            color="red"
          />
        </div>

        {/* Grille supplémentaire pour enseignants */}
        {user.userType === 'teacher' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <DashboardCard
              title="Mes Recommandations"
              icon="💡"
              count="5"
              description="Livres recommandés"
              link="/dashboard/recommendations"
              color="purple"
            />
              <DashboardCard
              title="Demandes d'Acquisition"
              icon="📖"
              count="2"
              description="Demandes en cours"
              link="/dashboard/acquisitions"
              color="yellow"
            />
          </div>
        )}

        {/* Activité récente */}
        <RecentActivity />
      </div>
    </div>
  );
};

export default Dashboard;
