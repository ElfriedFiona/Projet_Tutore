import { Outlet } from 'react-router-dom';
import DashboardSidebar from '../components/layout/DashboardSidebar';
import useResponsiveDashboard from '../hooks/useResponsiveDashboard';

const DashboardLayout = () => {
  const { containerClasses, getMaxWidth } = useResponsiveDashboard();

  return (
    <div className="flex min-h-screen bg-neutral-50">
      {/* Sidebar responsive */}
      <DashboardSidebar />
      
      {/* Contenu principal avec marge adaptative responsive optimisée */}
      <main className="flex-1 min-h-screen transition-all duration-300 ease-in-out lg:ml-64">
        {/* Container responsive avec padding optimisé */}
        <div className={`${containerClasses} max-w-full overflow-hidden`}>
          {/* Container avec largeur max pour très grands écrans */}
          <div className={`${getMaxWidth('full')} mx-auto`}>
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
