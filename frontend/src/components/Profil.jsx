import { FaUserCircle } from "react-icons/fa"
import { Link } from "react-router-dom";

export default function Profil(){

    return(
        <div className='w-full h-auto p-[20px]'>
            <h1 className='text-2xl font-bold text-center mb-4'>PROFIL</h1>
            <div className='flex flex-col items-center p-[5px]'>
                <FaUserCircle className='text-6xl p-[5px]'/>
                <div className="flex flex-col items-center">
                    <h1 className='font-bold text-xl pt-[5px] pl-[10px] pb-[0px] pr-[5px]'>nomEtudiant</h1>
                    <h6 className='font-light text-base pt-[0px] pl-[10px] pb-[5px] pr-[5px]'>Matricule</h6>
                </div>
            </div>
            <div className="flex flex-col items-end ">
                <Link className="bg-red-400 hover:bg-gray-100">
                    Déconnexion
                </Link>
            </div>    
        </div>
    );
}