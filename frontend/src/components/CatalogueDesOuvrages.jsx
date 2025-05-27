import { FaSearch } from "react-icons/fa"

export default function CatalogueDesOuvrages(){

    const data = [

    ];

    return(
        <div className='w-full h-auto p-[20px]'>
            <div className="flex flex-col items-center sm:flex-row justify-between">
                <h1 className='text-2xl font-bold text-center mb-4'>Nos Ouvrages</h1>            
                <div className="flex align-items-center ">
                    <input type="text" id="" name="" placeholder="Recherche" className="mr-[10px] px-[10px]"/>
                    <button className="bg-white px-[5px] hover:bg-gray-100"><FaSearch/></button>
                </div>
            </div>
            <div className="overflow-x-auto ">
                <table className="w-full bg-white shadow-xl rounded-lg">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b text-center">ISBN</th>
                            <th className="px-4 py-2 border-b text-center">TITRE</th>
                            <th className="px-4 py-2 border-b text-center">AUTEUR</th>
                            <th className="px-4 py-2 border-b text-center">EDITEUR</th>
                            <th className="px-4 py-2 border-b text-center">CATEGORIE</th>
                            <th className="px-4 py-2 border-b text-center">ANNEE DE PUBLICATION</th>
                            <th className="px-4 py-2 border-b text-center">STATUT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((ouvrage) => (
                            <tr key={ouvrage.ISBN} className="hover:bg-gray-100">
                                <td className="px-4 py-2 border-b text-center">{ouvrage.ISBN}</td>
                                <td className="px-4 py-2 border-b text-center">{ouvrage.titre}</td>
                                <td className="px-4 py-2 border-b text-center">{ouvrage.auteur}</td>
                                <td className="px-4 py-2 border-b text-center">{ouvrage.editeur}</td>
                                <td className="px-4 py-2 border-b text-center">{ouvrage.categorie}</td>
                                <td className="px-4 py-2 border-b text-center">{ouvrage.anneeDePublication}</td>
                                <td className="px-4 py-2 border-b text-center">{ouvrage.statut}</td>
                            </tr>
                        ))}                        
                    </tbody>
                </table>
            </div>
        </div>
    );
}