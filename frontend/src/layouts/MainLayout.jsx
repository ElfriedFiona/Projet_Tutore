import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import BackToTopButton from '../components/common/BackToTopButton';
import ToastContainer from '../components/common/ToastContainer';
import Breadcrumbs from '../components/common/Breadcrumbs';

export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-white text-neutral-800">
      <Header />
      <div className="sm:pt-5">
        <Breadcrumbs className="my-4" />
        <main className="flex-grow sm:py-3 md:py-4 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto w-full">
            {children || <Outlet />}
          </div>
        </main>
      </div>
      <Footer />
      <BackToTopButton />
      <ToastContainer />
    </div>
  );
}
