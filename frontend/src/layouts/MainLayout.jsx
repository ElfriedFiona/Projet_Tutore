import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import BackToTopButton from '../components/common/BackToTopButton';
import ToastContainer from '../components/common/ToastContainer';
import Breadcrumbs from '../components/common/Breadcrumbs';

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-800">
      {/* Header fixe */}
      <Header />
      <div className="flex-1">
        {/* Contenu principal qui s'étend */}
        <div className="pt-16 sm:pt-16 md:pt-20 lg:pt-24 ">
          <Breadcrumbs className="my-4 mx-8" />
          <main className="px-4 sm:px-6 lg:px-8 pb-8">
            <div className="mx-auto w-full">
              {children || <Outlet />}
            </div>
          </main>
        </div>
      </div>
      
      {/* Footer qui reste en bas */}
      <Footer />
      
      {/* Composants supplémentaires */}
      <BackToTopButton />
      <ToastContainer />
    </div>
  );
}
