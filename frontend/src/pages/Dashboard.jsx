import React, { useEffect, useState } from 'react';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AppContext';
import DashboardCard from '../components/dashboard/DashboardCard';
import QuickActions from '../components/dashboard/QuickActions';
import RecentActivity from '../components/dashboard/RecentActivity';
import UserStats from '../components/dashboard/UserStats';
// Removed: import RoleNavigator from '../components/demo/RoleNavigator';
// Removed: import DemoModeInfo from '../components/demo/DemoModeInfo';
import ResponsiveDashboardContainer, { 
  ResponsiveDashboardGrid, 
  ResponsiveDashboardHeader 
} from '../components/dashboard/ResponsiveDashboardContainer';

const Dashboard = () => {
  const { favoritesCount } = useFavorites();
  const { user, loading } = useAuth(); // Get user and loading state from useAuth

  const [lastLoginDate, setLastLoginDate] = useState('');

  useEffect(() => {
    // Simulate fetching last login date from backend or local storage
    // For now, it's just the current date as an example
    setLastLoginDate(new Date().toLocaleDateString('fr-FR'));
  }, []);

  // Show a loading indicator while user data is being fetched
  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-[9999]">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-500"></div>
          <p className="mt-4 text-primary-700 font-semibold">Chargement du tableau de bord...</p>
        </div>
      </div>
    );
  }

  // Handle case where user data might not be available after loading (e.g., not authenticated)
  if (!user) {
    // Optionally redirect to login or show an error message
    // For now, we'll display a fallback message
    return (
      <div className="flex items-center justify-center min-h-screen text-lg text-red-600">
        Impossible de charger les données utilisateur. Veuillez vous connecter.
      </div>
    );
  }

  // Use actual user data instead of mockUser
  const welcomeActions = (
    <div className="text-left sm:text-right">
      <div className="text-xs sm:text-sm text-gray-500">Dernière connexion</div>
      <div className="text-gray-800 font-medium text-sm sm:text-base">
        {lastLoginDate}
      </div>
    </div>
  );

  // Determine subtitle based on user's role
  let subtitle = '';
  if (user.role === 'student' || user.role === 'etudiant') {
    subtitle = `Étudiant - ${user.etudiant?.departement || 'Non spécifié'}`;
  } else if (user.role === 'teacher' || user.role === 'enseignant') {
    subtitle = `Enseignant - ${user.enseignant?.departement || 'Non spécifié'}`;
  } else if (user.role === 'librarian' || user.role === 'bibliothecaire') {
    subtitle = `Bibliothécaire`; // Librarians might not have a department field
  } else if (user.role === 'admin') { // Assuming 'admin' is the role for administrator
    subtitle = `Administrateur`;
  }
  
  // Conditionally render specific user details based on role
  const userDetails = () => {
    if (user.role === 'student' || user.role === 'etudiant') {
      return (
        <p className="text-xs sm:text-sm text-gray-500">
          {user.etudiant?.filiere || 'Filière non spécifiée'} - Niveau {user.etudiant?.niveau || 'Non spécifié'}
        </p>
      );
    } else if (user.role === 'teacher' || user.role === 'enseignant') {
      return (
        <p className="text-xs sm:text-sm text-gray-500">
          {user.enseignant?.grade || 'Grade non spécifié'} - {user.enseignant?.specialite || 'Spécialisation non spécifiée'}
        </p>
      );
    }
    // For librarian and admin, you might not have specific details to display here
    return null;
  };

  return (
    <ResponsiveDashboardContainer>
      {/* Removed: <DemoModeInfo /> */}
      {/* Removed: <RoleNavigator /> */}

      {/* Responsive Header using real user data */}
      <ResponsiveDashboardHeader
        title={`Bienvenue, ${user.prenom || 'Utilisateur'} ${user.nom || ''}`}
        subtitle={subtitle}
        actions={welcomeActions}
      />

      {/* Additional User Information */}
      <div className="mb-6 sm:mb-8">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-6 border border-gray-100">
          <div className="text-center sm:text-left">
            {userDetails()}
          </div>
        </div>
      </div>

      {/* User Stats - Ensure UserStats component can handle different user roles or fetch its own data */}
      <UserStats />

      {/* Quick Actions - Pass actual user role */}
      <QuickActions userType={user.role} />

      {/* Dashboard Card Grid - Conditional rendering based on role */}
      <ResponsiveDashboardGrid type="cards" className="mb-6 sm:mb-8">
        {/* These cards will be general for students and teachers */}
        {(user.role === 'etudiant' || user.role === 'enseignant') && (
          <>
            <DashboardCard
              title="Mes Emprunts"
              icon="📚"
              count="3" // This should ideally be dynamic from user data or another API call
              description="Livres empruntés"
              link="/dashboard/loans"
              color="blue"
            />

            <DashboardCard
              title="Mes Réservations"
              icon="📅"
              count="2" // This should ideally be dynamic
              description="Réservations actives"
              link="/dashboard/reservations"
              color="green"
            />

            <DashboardCard
              title="Mes Favoris"
              icon="❤️"
              count={favoritesCount.toString()}
              description="Livres favoris"
              link="/dashboard/favorites"
              color="red"
            />
          </>
        )}

        {/* Librarian specific cards */}
        {user.role === 'bibliothecaire' && (
          <>
            <DashboardCard
              title="Prêts en cours"
              icon="📚"
              count="45" // Dynamic data needed
              description="Lecteurs actifs"
              link="/dashboard/loans-management"
              color="blue"
            />
            <DashboardCard
              title="Livres à classer"
              icon="🏷️"
              count="12" // Dynamic data needed
              description="Nouveaux ajouts"
              link="/dashboard/catalog-management"
              color="orange"
            />
            <DashboardCard
              title="Amendes en attente"
              icon="💰"
              count="7" // Dynamic data needed
              description="Retards de restitution"
              link="/dashboard/fines-management"
              color="red"
            />
          </>
        )}

        {/* Admin specific cards */}
        {user.role === 'admin' && (
          <>
            <DashboardCard
              title="Utilisateurs enregistrés"
              icon="👥"
              count="150" // Dynamic data needed
              description="Total comptes"
              link="/dashboard/user-management"
              color="purple"
            />
            <DashboardCard
              title="État du système"
              icon="⚙️"
              count="Opérationnel" // Dynamic status needed
              description="Vérifier la santé"
              link="/dashboard/system"
              color="teal"
            />
            <DashboardCard
              title="Rapports Générés"
              icon="📊"
              count="10" // Dynamic data needed
              description="Accès aux statistiques"
              link="/dashboard/reports"
              color="indigo"
            />
          </>
        )}
      </ResponsiveDashboardGrid>

      {/* Additional grid for teachers */}
      {user.role === 'enseignant' && (
        <ResponsiveDashboardGrid type="standard" className="mb-6 sm:mb-8">
          <DashboardCard
            title="Mes Recommandations"
            icon="💡"
            count="5" // Dynamic data needed
            description="Livres recommandés"
            link="/dashboard/recommendations"
            color="purple"
          />
          <DashboardCard
            title="Demandes d'Acquisition"
            icon="📖"
            count="2" // Dynamic data needed
            description="Demandes en cours"
            link="/dashboard/acquisitions"
            color="yellow"
          />
        </ResponsiveDashboardGrid>
      )}

      {/* Recent Activity - This component should also be updated to use real data */}
      <RecentActivity />
    </ResponsiveDashboardContainer>
  );
};

export default Dashboard;