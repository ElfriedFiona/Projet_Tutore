import { FaRegBell, FaBars, FaTimes, FaHome, FaBookmark, FaBook, FaList, FaEnvelope, FaRegUserCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MenuMobile from "./MenuMobile";

// création de l'en-tete de la page web
// l'en tete est composé du titre de la page et de deux boutons
export default function Header() {
  // état pour gérer l'ouverture et la fermeture du menu
  const [menuOpen, setMenuOpen] = useState(false);
  // fonction pour basculer l'état du menu
  const toggleMenu = () => setMenuOpen((prev) => !prev);
  // Fermer le menu mobile si la fenêtre devient large
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="flex justify-between align-items-center pt-[5px] pl-[20px] pb-0 pr-[20px] h-[50px]">
      <div className='flex items-center px-[10px] py-[5px]'>
        <h3 className=''>Biblio <span className="font-bold">ENSPD</span></h3>
      </div>      
      <div className='flex items-center justify-between'>
        <Link to={"/notifications"} className='hover:bg-gray-100 px-[10px] py-[5px] hidden md:block'>
          <FaRegBell className='text-xl' />
        </Link>
        <Link to={'/profil'} className='hover:bg-gray-100 px-[10px] py-[5px] hidden md:block'> 
          <FaRegUserCircle className='text-xl' />
        </Link>
        <button className="hover:bg-gray-100px-[10px] py-[5px] md:hidden focus:outline-none" onClick={toggleMenu} aria-label="Toggle menu">
          {menuOpen ? (
            <FaTimes className="text-3xl" />
          ) : (
            <FaBars className="text-3xl" />
          )}
        </button>
      </div>
      
      {menuOpen && (
        //Affichage du menu sur mobile
        <MenuMobile/>
      )}

    </header>
  );
}