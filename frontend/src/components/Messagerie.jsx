import { FaUserCircle, FaGreaterThan } from "react-icons/fa"
import { MdAttachFile, MdAdd } from 'react-icons/md';

export default function Messagerie(){

    return(
        <div className='w-full h-full py-[20px] flex flex-col justify-between'>
            <div className="flex flex-row items-center h-[50px] px-[20px] py-[20px] bg-green-100">
                <FaUserCircle className='text-6xl p-[5px]'/>
                <h5 className="text-2xl">nomDesBibliothècaire</h5>             
            </div>
            <div>
                <div className="flex fex-row items-center justify-center h-[50px] px-[20px]">
                    <MdAttachFile className='text-3xl mr-[10px]'/>
                    <input type="text" placeholder="Entrer un message" className="p-[5px] pl-[10px] w-[90%]"/>
                    <FaGreaterThan className='text-3xl text-red-500 ml-[10px] hover:text-blue-500'/>
                </div>
            </div>
        </div>
    );
}