import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import Menu from '../components/Menu';
import TableauDeBord from '../components/TableauDeBord';
import CatalogueDesOuvrages from '../components/CatalogueDesOuvrages';
import OuvragesEmpruntes from '../components/OuvragesEmpruntes';
import OuvragesReserves from '../components/OuvragesReserves';
import Messagerie from '../components/Messagerie';

// creation de la page d'accueil
// cette page contient le header, le menu et le contenu de la page
// le contenu de la page est dynamique et change en fonction de l'élément du menu sélectionné
// le menu est composé de 5 éléments : Tableau de bord, Ouvrages Réservés, Ouvrages Empruntés, Catalogue des Ouvrages et Contacter la Bibliothécaire  
export default function HomePage() {
  return (
    <div className='homePage flex-column h-[100vh] w-[100vw]'>
      <Header />
      <div className='flex'>
        <Menu />
        <Routes>
          <Route path="/" element={<TableauDeBord />} />
          <Route path="/catalogue" element={<CatalogueDesOuvrages />} />
          <Route path="/empruntes" element={<OuvragesEmpruntes />} />
          <Route path="/reserves" element={<OuvragesReserves />} />
          <Route path="/messagerie" element={<Messagerie />} />
        </Routes>
      </div>
    </div>
  );
}