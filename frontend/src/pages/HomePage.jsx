import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Menu from '../components/Menu';
import TableauDeBord from '../components/TableauDeBord';
import CatalogueDesOuvrages from '../components/CatalogueDesOuvrages';
import OuvragesEmpruntes from '../components/OuvragesEmpruntes';
import OuvragesReserves from '../components/OuvragesReserves';
import Messagerie from '../components/Messagerie';
import HistoriqueEmprunt from '../components/HistoriqueEmprunt';
import Notifications from '../components/Notifications';
import Profil from '../components/Profil';

export default function HomePage() {
  return (
    <div className="h-screen w-screen">
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-xl">
        <Header />
      </header>
      <main className="flex pt-10 w-full h-[calc(100vh-2.5rem)]">
        <div className='h-full bg-white'>  
          <Menu />
        </div> 
         <div className="flex-1 h-full bg-gray-100 overflow-y-auto">
          <Routes>
            <Route path="/" element={<TableauDeBord />} />
            <Route path="/catalogue" element={<CatalogueDesOuvrages />} />
            <Route path="/empruntes" element={<OuvragesEmpruntes />} />
            <Route path="/reserves" element={<OuvragesReserves />} />
            <Route path="/messagerie" element={<Messagerie />} />
            <Route path="/historique" element={<HistoriqueEmprunt />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profil" element={<Profil />} />
          </Routes>
        </div>  
      </main>
      <footer className="fixed bottom-0 left-0 w-full z-50 bg-white shadow-xl shadow">
        <Footer />
      </footer>
    </div>
  );
}