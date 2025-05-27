

export default function OuvragesReserves(){

    const data = [

    ];

    return(
        <div className='w-full h-auto p-[20px]'>
            <h1 className='text-2xl font-bold text-center mb-4'>Vos Ouvrages Réservés</h1>
            <div className="overflow-x-auto ">
                <table className="w-full bg-white shadow-xl rounded-lg">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b text-center">ISBN</th>
                            <th className="px-4 py-2 border-b text-center">TITRE</th>
                            <th className="px-4 py-2 border-b text-center">AUTEUR</th>
                            <th className="px-4 py-2 border-b text-center">DATE DE RESERVATION</th>
                            <th className="px-4 py-2 border-b text-center">DATE EXPIRATION</th>
                            <th className="px-4 py-2 border-b text-center">STATUT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((reservation) => (
                            <tr key={reservation.ISBN} className="hover:bg-gray-100">
                                <td className="px-4 py-2 border-b text-center">{reservation.ISBN}</td>
                                <td className="px-4 py-2 border-b text-center">{reservation.titre}</td>
                                <td className="px-4 py-2 border-b text-center">{reservation.auteur}</td>
                                <td className="px-4 py-2 border-b text-center">{reservation.dateDeReservation}</td>
                                <td className="px-4 py-2 border-b text-center">{reservation.dateExpiration}</td>
                                <td className="px-4 py-2 border-b text-center">{reservation.statut}</td>
                            </tr>
                        ))}                        
                    </tbody>
                </table>
            </div>
        </div>
    );
}