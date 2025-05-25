import { FaUserCircle, FaHome, FaBookmark, FaBook, FaList, FaEnvelope } from "react-icons/fa"
import { Link, useLocation } from "react-router-dom"

// crée le menu de la page web
export default function Menu() {
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

    return(
        <div className='hidden md:block w-[20vw]'>
            <div className='flex flex-col w-[20vw] h-[94vh] justify-between'> 
                <div>
                    <h4 className='text-[10px] font-light p-4'>ETUDIANT PORTAL</h4>
                    <nav className="flex flex-col w-auto">
                        {buttonsMenu.map((btn) => (
                            <Link to={btn.to} className={`flex items-center py-[10px] pl-[20px] w-[20vw] text-black cursor-pointer text-left hover:bg-gray-200 hover:text-black hover:no-underline ${
                                    location.pathname === btn.to ? 'bg-[#21a3df] border-r-[5px] border-[#3e1eaf]' : ''
                                }`} key={btn.label}>
                                <btn.icon className='text-xl mr-[10px]'/>
                                <h1 className="font-bold">{btn.label}</h1>
                            </Link>
                        ))}
                    </nav>
                </div>
                <div className='flex flex-col items-center p-[5px] lg:flex-row items-center '>
                    <FaUserCircle className='text-6xl p-[5px]'/>
                    <div>
                        <h1 className='font-bold text-xl pt-[5px] pl-[10px] pb-[0px] pr-[5px]'>nomEtudiant</h1>
                        <h6 className='font-light text-base pt-[0px] pl-[10px] pb-[5px] pr-[5px]'>Matricule</h6>
                    </div>
                </div>                
            </div> 
        </div>
    );
}