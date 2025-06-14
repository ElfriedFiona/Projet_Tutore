import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardSidebar from '../components/layout/DashboardSidebar';
import { useAuth } from '../context/AppContext';

const DashboardLayout = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Accès refusé</h2>
          <p className="text-gray-600 mb-6">Vous devez être connecté pour accéder au dashboard.</p>
          <a 
            href="/login" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Se connecter
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-neutral-50">
      {/* Sidebar */}
      <DashboardSidebar />
      
      {/* Contenu principal */}
      <main className="flex-1 overflow-auto">
        <div className="min-h-screen">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
