

export default function HistoriqueEmprunt(){

    const data = [

    ];

    return(
        <div className='w-full h-auto p-[20px]'>
            <h1 className='text-2xl font-bold text-center mb-4'>HISTORIQUE D'EMPRUNT</h1>
            <div className="overflow-x-auto ">
                <table className="w-full bg-white shadow-xl rounded-lg">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b text-center">ISBN</th>
                            <th className="px-4 py-2 border-b text-center">TITRE</th>
                            <th className="px-4 py-2 border-b text-center">AUTEUR</th>
                            <th className="px-4 py-2 border-b text-center">DATE DE RESERVATION</th>
                            <th className="px-4 py-2 border-b text-center">DATE D'EMPRUNT</th>
                            <th className="px-4 py-2 border-b text-center">DATE DE RETOUR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((historique) => (
                            <tr key={historique.ISBN} className="hover:bg-gray-100">
                                <td className="px-4 py-2 border-b text-center">{historique.ISBN}</td>
                                <td className="px-4 py-2 border-b text-center">{historique.titre}</td>
                                <td className="px-4 py-2 border-b text-center">{historique.auteur}</td>
                                <td className="px-4 py-2 border-b text-center">{historique.dateDeReservation}</td>
                                <td className="px-4 py-2 border-b text-center">{historique.dateDEmprunt}</td>
                                <td className="px-4 py-2 border-b text-center">{historique.dateRetour}</td>
                            </tr>
                        ))}                        
                    </tbody>
                </table>
            </div>
        </div>
    );
}