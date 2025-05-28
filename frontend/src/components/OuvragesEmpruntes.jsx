

export default function OuvragesEmpruntes(){

    const data = [

    ];

    return(
        <div className='w-full h-auto p-[20px]'>
            <h1 className='text-2xl font-bold text-center mb-4'>VOS OUVRAGES EMPRUNTES</h1>
            <div className="overflow-x-auto ">
                <table className="w-full bg-white shadow-xl rounded-lg">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b text-center">ISBN</th>
                            <th className="px-4 py-2 border-b text-center">TITRE</th>
                            <th className="px-4 py-2 border-b text-center">AUTEUR</th>
                            <th className="px-4 py-2 border-b text-center">DATE D'EMPRUNT</th>
                            <th className="px-4 py-2 border-b text-center">DATE RETOUR PREVU</th>
                            <th className="px-4 py-2 border-b text-center">STATUT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((empruntes) => (
                            <tr key={empruntes.ISBN} className="hover:bg-gray-100">
                                <td className="px-4 py-2 border-b text-center">{empruntes.ISBN}</td>
                                <td className="px-4 py-2 border-b text-center">{empruntes.titre}</td>
                                <td className="px-4 py-2 border-b text-center">{empruntes.auteur}</td>
                                <td className="px-4 py-2 border-b text-center">{empruntes.dateDEmprunt}</td>
                                <td className="px-4 py-2 border-b text-center">{empruntes.dateRetourPrevu}</td>
                                <td className="px-4 py-2 border-b text-center">{empruntes.statut}</td>
                            </tr>
                        ))}                        
                    </tbody>
                </table>
            </div>
        </div>
    );
}