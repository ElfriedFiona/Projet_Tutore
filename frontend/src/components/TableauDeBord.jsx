import {  FaRegBookmark, FaBookOpen, FaSearch, FaHandHolding, FaHistory } from "react-icons/fa"
import { MdLibraryBooks} from 'react-icons/md';
import { Link, useLocation } from "react-router-dom"

export default function TableauDeBord(){

    return(
        <div className='w-full h-auto py-[20px] sm:p-[20px]'>
            <div className="flex flex-col items-center mb-[10px]" >
                <h1 className="font-bold text-[15px] sm:text-[20px] ">Bienvenue, nomEtudiant !</h1>
                <p className="font-light">Votre Espace Etudiant</p>
            </div>
            <div className="flex flex-col items-center sm:flex-row justify-between lg:px-[10%] xl:px-[20%]">
                <div className="flex flex-col px-[10px]">
                    <Link to={"/catalogue"} className="bg-white w-[250px] h-[20px] mb-[10px] mt-[10px] pl-[20px] flex items-center rounded shadow-xl hover:bg-gray-100 sm:h-[40px] 2xl:w-[500px] h-[100px] ">
                        <FaSearch className="mr-[10px]"/> 
                        Rechercher un ouvrage
                    </Link>
                    <Link to={"/catalogue"} className="bg-white w-[250px] h-[20px] mb-[10px] pl-[20px] flex items-center rounded shadow-xl hover:bg-gray-100 sm:h-[40px] 2xl:w-[500px] h-[100px] ">
                        <FaRegBookmark className="mr-[10px]"/> 
                        Réserver un ouvrage
                    </Link>
                    <Link to={"/empruntes"} className="bg-white w-[250px] h-[70px] mb-[10px] pl-[20px] flex flex-row items-center rounded shadow-xl hover:bg-gray-100 sm:h-[100px] 2xl:w-[500px] h-[150px] ">
                        <FaBookOpen className="mr-[10px] size-[40px] bg-blue-400 p-[5px] text-white rounded sm:size-[65px]"/>
                        <div className="flex flex-col font-bold">
                            Ouvrages <br />Empruntés
                            <span>0</span>                            
                        </div> 
                    </Link>
                </div>
                <div className="flex flex-col px-[10px]">
                    <Link to={"/reserves"} className="bg-white w-[250px] h-[70px] mb-[10px] pl-[20px] flex flex-row items-center rounded shadow-xl hover:bg-gray-100 sm:h-[100px] 2xl:w-[500px] h-[150px] ">
                        <FaHandHolding className="mr-[10px] size-[40px] bg-green-300 p-[5px] text-white rounded sm:size-[65px]"/> 
                        <div className="flex flex-col font-bold">
                            Ouvrage <br />Réservés
                            <span>0</span> 
                        </div>
                    </Link>
                    <Link to={"/catalogue"} className="bg-white w-[250px] h-[20px] mb-[10px] pl-[20px] flex items-center rounded shadow-xl hover:bg-gray-100 sm:h-[40px] 2xl:w-[500px] h-[100px] ">
                        <MdLibraryBooks className="mr-[10px]"/> 
                        Catalogue des ouvrages
                    </Link>
                    <Link to={"/historique"} className="bg-white w-[250px] h-[20px] pl-[20px] flex items-center rounded shadow-xl hover:bg-gray-100 sm:h-[40px] 2xl:w-[500px] h-[100px] ">
                        <FaHistory className="mr-[10px]"/> 
                        Historique des emprunts
                    </Link>
                </div>
            </div>
            <div className="flex flex-col items-center pt-[20px] ">
                <div className="flex items-center] pb-[20px]">
                    <h3 className="font-bold">Nos Recommandation</h3>
                </div>
                <div className="bg-white shadow-xl sm:flex flex-row px-[20px]  lg:px-[20px] 2xl:px-[10%]">
                    <div>
                        <div className="flex flex-row justify-between">
                            <div className="flex flex-col items-center p-[20px]">
                                <img src="" alt="" sizes="" srcset="" className="h-[100px] w-[100px] bg-gray-400" />
                                <h4 className="font-bold">nomLivre</h4>
                                <h4 className="font-light">Editeur</h4>
                            </div>
                            <div className="flex flex-col items-center p-[20px]">
                                <img src="" alt="" sizes="" srcset="" className="h-[100px] w-[100px] bg-gray-400" />
                                <h4 className="font-bold">nomLivre</h4>
                                <h4 className="font-light">Editeur</h4>
                            </div>
                        </div>                        
                         <div className="flex flex-row justify-between">
                            <div className="flex flex-col items-center p-[20px]">
                                <img src="" alt="" sizes="" srcset="" className="h-[100px] w-[100px] bg-gray-400" />
                                <h4 className="font-bold">nomLivre</h4>
                                <h4 className="font-light">Editeur</h4>
                            </div>
                            <div className="flex flex-col items-center p-[20px]">
                                <img src="" alt="" sizes="" srcset="" className="h-[100px] w-[100px] bg-gray-400" />
                                <h4 className="font-bold">nomLivre</h4>
                                <h4 className="font-light">Editeur</h4>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-row justify-between">
                            <div className="flex flex-col items-center p-[20px]">
                                <img src="" alt="" sizes="" srcset="" className="h-[100px] w-[100px] bg-gray-400" />
                                <h4 className="font-bold">nomLivre</h4>
                                <h4 className="font-light">Editeur</h4>
                            </div>
                            <div className="flex flex-col items-center p-[20px]">
                                <img src="" alt="" sizes="" srcset="" className="h-[100px] w-[100px] bg-gray-400" />
                                <h4 className="font-bold">nomLivre</h4>
                                <h4 className="font-light">Editeur</h4>
                            </div>
                        </div>                        
                         <div className="flex flex-row justify-between">
                            <div className="flex flex-col items-center p-[20px]">
                                <img src="" alt="" sizes="" srcset="" className="h-[100px] w-[100px] bg-gray-400" />
                                <h4 className="font-bold">nomLivre</h4>
                                <h4 className="font-light">Editeur</h4>
                            </div>
                            <div className="flex flex-col items-center p-[20px]">
                                <img src="" alt="" sizes="" srcset="" className="h-[100px] w-[100px] bg-gray-400" />
                                <h4 className="font-bold">nomLivre</h4>
                                <h4 className="font-light">Editeur</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>            
        </div>
    );
}