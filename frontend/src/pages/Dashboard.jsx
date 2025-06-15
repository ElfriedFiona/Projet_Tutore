import { useFavorites } from '../context/FavoritesContext';
import DashboardCard from '../components/dashboard/DashboardCard';
import QuickActions from '../components/dashboard/QuickActions';
import RecentActivity from '../components/dashboard/RecentActivity';
import UserStats from '../components/dashboard/UserStats';
import RoleNavigator from '../components/demo/RoleNavigator';
import DemoModeInfo from '../components/demo/DemoModeInfo';
import ResponsiveDashboardContainer, { 
  ResponsiveDashboardGrid, 
  ResponsiveDashboardHeader 
} from '../components/dashboard/ResponsiveDashboardContainer';

const Dashboard = () => {
  const { favoritesCount } = useFavorites();

  // Mock user data pour affichage
  const mockUser = {
    firstName: 'Utilisateur',
    lastName: 'Test',
    role: 'student',
    userType: 'student',
    department: 'Informatique',
    filiere: 'Génie Logiciel',
    niveau: 'L3',
    grade: 'Professeur Assistant',
    specialization: 'Développement Web'
  };

  const welcomeActions = (
    <div className="text-left sm:text-right">
      <div className="text-xs sm:text-sm text-gray-500">Dernière connexion</div>
      <div className="text-gray-800 font-medium text-sm sm:text-base">
        {new Date().toLocaleDateString('fr-FR')}
      </div>
    </div>
  );

  const subtitle = `${mockUser.userType === 'student' ? 'Étudiant' : 'Enseignant'} - ${mockUser.department}`;

  return (
    <ResponsiveDashboardContainer>
      {/* Information sur le mode démonstration */}
      <DemoModeInfo />

      {/* Navigateur de rôles pour la démonstration */}
      <RoleNavigator />

      {/* En-tête de bienvenue responsive */}
      <ResponsiveDashboardHeader
        title={`Bienvenue, ${mockUser.firstName} ${mockUser.lastName}`}
        subtitle={subtitle}
        actions={welcomeActions}
      />

      {/* Informations supplémentaires utilisateur */}
      <div className="mb-6 sm:mb-8">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm p-4 sm:p-6 border border-gray-100">
          <div className="text-center sm:text-left">
            {mockUser.userType === 'student' && (
              <p className="text-xs sm:text-sm text-gray-500">
                {mockUser.filiere} - Niveau {mockUser.niveau}
              </p>
            )}
            {mockUser.userType === 'teacher' && (
              <p className="text-xs sm:text-sm text-gray-500">
                {mockUser.grade} - {mockUser.specialization}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Statistiques utilisateur */}
      <UserStats />

      {/* Actions rapides */}
      <QuickActions userType={mockUser.userType} />

      {/* Grille de cartes du dashboard - Responsive */}
      <ResponsiveDashboardGrid type="cards" className="mb-6 sm:mb-8">
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
          icon="❤️"          count={favoritesCount.toString()}
          description="Livres favoris"
          link="/dashboard/favorites"
          color="red"
        />
      </ResponsiveDashboardGrid>
        
      {/* Grille supplémentaire pour enseignants - Responsive */}
      {mockUser.userType === 'teacher' && (
        <ResponsiveDashboardGrid type="standard" className="mb-6 sm:mb-8">
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
        </ResponsiveDashboardGrid>
      )}      {/* Activité récente */}
      <RecentActivity />
    </ResponsiveDashboardContainer>
  );
};

export default Dashboard;
