import { FaRegBell, FaUserCircle, FaHome, FaBookmark, FaBook, FaList, FaEnvelope, FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom"

export default function MenuMobile() {

    const buttonsMenu = [
      { label: 'Tableau de bord', icon: FaHome, to: "/" },
      { label: 'Ouvrages Réservés', icon: FaBookmark, to: "/reserves" },
      { label: 'Ouvrages Empruntés', icon: FaBook, to: "/empruntes" },
      { label: 'Catalogue des Ouvrages', icon: FaList, to: "/catalogue" },
      { label: 'Contacter la Bibliothècaire', icon: FaEnvelope, to: "/messagerie" },
  ];
     
    return(
        <nav className="md:hidden absolute top-[6vh] right-0 bg-white w-full shadow-md p-4">
          <ul>
            {buttonsMenu.map((btn) => (
              <li key={btn.label} className="py-2 border-b border-gray-200 last:border-b-0">
                <Link
                  to={btn.to}
                  className={`flex items-center gap-2 ${
                    location.pathname === btn.to
                      ? 'bg-blue-100 text-black border-r-[5px] border-blue-900'
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
            <div className="flex flex-row items-center">
              <Link to={"/notifications"} className='px-[10px] py-[5px] hover:bg-gray-100' onClick={() => setMenuOpen(false)}>
                <FaRegBell className='text-xl' />
              </Link>
              <Link to={"/profil"} className='px-[10px] py-[5px] hover:bg-gray-100' onClick={() => setMenuOpen(false)}> 
                <FaRegUserCircle className='text-xl' />
              </Link>
            </div>
          </div>
        </nav>       
    );
}