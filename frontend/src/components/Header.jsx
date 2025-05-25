import { FaBell, FaUser, FaBars, FaTimes, FaHome, FaBookmark, FaBook, FaList, FaEnvelope, FaUserCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"

// création de l'en-tete de la page web
// l'en tete est composé du titre de la page et de deux boutons
export default function Header() {
  // état pour gérer l'ouverture et la fermeture du menu
  const [menuOpen, setMenuOpen] = useState(false);
  // fonction pour basculer l'état du menu
  const toggleMenu = () => setMenuOpen((prev) => !prev);
  // utilise le hook useLocation pour obtenir l'emplacement actuel
  // de la page dans l'application React Router
  const location = useLocation();
  // liste des boutons du menu
  // chaque bouton a un label et une icône
  // le label est le texte affiché sur le bouton
  // l'icône est l'icône affichée sur le bouton   
  // le label et l'icône sont stockés dans un tableau d'objets
  const buttonsMenu = [
      { label: 'Tableau de bord', icon: FaHome, to: "/" },
      { label: 'Ouvrages Réservés', icon: FaBookmark, to: "/reserves" },
      { label: 'Ouvrages Empruntés', icon: FaBook, to: "/empruntes" },
      { label: 'Catalogue des Ouvrages', icon: FaList, to: "/catalogue" },
      { label: 'Contacter la Bibliothècaire', icon: FaEnvelope, to: "/messagerie" },
  ];

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
    <header className="flex justify-between align-items-center pt-[5px] pl-[20px] pb-0 pr-[20px] w-[100%] h-[6vh]">
      <div className='flex items-center px-[10px] py-[5px]'>
        <h3 className='font-bold'>UniLib</h3>
      </div>      
      <div className='flex items-center justify-between'>
        <button className='px-[10px] py-[5px] hidden md:block'>
          <FaBell className='text-xl' />
        </button>
        <button className='px-[10px] py-[5px] hidden md:block'> 
          <FaUser className='text-xl' />
        </button>
        <button className="px-[10px] py-[5px] md:hidden focus:outline-none" onClick={toggleMenu} aria-label="Toggle menu">
          {menuOpen ? (
            <FaTimes className="text-3xl" />
          ) : (
            <FaBars className="text-3xl" />
          )}
        </button>
      </div>


          {/* Exemple d'affichage conditionnel du menu mobile */}
      {menuOpen && (
        <nav className="md:hidden absolute top-[6vh] right-0 bg-white w-full shadow-md p-4">
          <ul>
            {buttonsMenu.map((btn) => (
              <li key={btn.label} className="py-2 border-b border-gray-200 last:border-b-0">
                <Link
                  to={btn.to}
                  className={`flex items-center gap-2 ${
                    location.pathname === btn.to
                      ? 'bg-[#21a3df] text-white border-r-[5px] border-[#3e1eaf]'
                      : 'text-black'
                  } px-2 py-1 rounded`}
                  onClick={() => setMenuOpen(false)}
                >
                  <btn.icon className="text-xl" />
                  {btn.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-row items-center justify-between mt-4">
            <div className='flex flex-row items-center p-[5px]'>
              <FaUserCircle className='text-6xl p-[5px]'/>
              <div>
                  <h1 className='font-bold text-xl pt-[5px] pl-[10px] pb-[0px] pr-[5px]'>nomEtudiant</h1>
                  <h6 className='font-light text-base pt-[0px] pl-[10px] pb-[5px] pr-[5px]'>Matricule</h6>
              </div>
            </div> 
            <div>
              <button className='px-[10px] py-[5px]'>
                <FaBell className='text-xl' />
              </button>
              <button className='px-[10px] py-[5px]'> 
                <FaUser className='text-xl' />
              </button>
            </div>
          </div>
        </nav>
      )}

    </header>
  );
}