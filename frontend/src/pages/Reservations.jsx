import React, { useState, useEffect, useMemo } from 'react';
import { formatDate } from '../utils/formatters';
import { error as logError } from '../utils/logger';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fonction pour charger les réservations depuis l'API
    const fetchReservations = async () => {
      try {
        setLoading(true);
        // Remplacez par votre appel API réel
        const response = await fetch('/api/reservations');
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des réservations');
        }
        const data = await response.json();
        setReservations(data);      } catch (err) {
        setError(err.message);
        logError('Erreur lors du chargement des réservations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  // Fonction pour récupérer un livre
  const handleCheckout = async (reservationId) => {
    try {
      // Remplacez par votre appel API réel
      const response = await fetch(`/api/reservations/${reservationId}/checkout`, {
        method: 'POST',
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération du livre');
      }
      
      // Mettre à jour l'état local après la récupération réussie
      setReservations(prev => 
        prev.filter(reservation => reservation.id !== reservationId)
      );
      
    } catch (err) {
      setError(err.message);
    }
  };

  // Fonction pour annuler une réservation
  const handleCancel = async (reservationId) => {
    try {
      // Remplacez par votre appel API réel
      const response = await fetch(`/api/reservations/${reservationId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de l\'annulation de la réservation');
      }
      
      // Mettre à jour l'état local après l'annulation réussie
      setReservations(prev => 
        prev.filter(reservation => reservation.id !== reservationId)
      );
      
    } catch (err) {
      setError(err.message);
    }
  };
  // Memoize filtered reservations to improve performance
  const readyReservations = useMemo(() => 
    reservations.filter(res => res.status === 'ready')
  , [reservations]);
  
  const waitingReservations = useMemo(() => 
    reservations.filter(res => res.status === 'waiting')
  , [reservations]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Mes Réservations</h1>
      
      <div className="bg-white p-4 rounded-lg shadow-md mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Résumé</h2>
            <p className="text-gray-600">
              {readyReservations.length} réservation(s) prête(s), {' '}
              {waitingReservations.length} en attente
            </p>
          </div>
        </div>
      </div>

      {loading ? (
        <p className="text-center py-8">Chargement des réservations...</p>
      ) : error ? (
        <p className="text-center text-red-600 py-8">{error}</p>
      ) : reservations.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">Vous n'avez pas de réservations actives.</p>
          <a href="/catalog" className="text-blue-600 hover:text-blue-800">Parcourir le catalogue</a>
        </div>
      ) : (
        <div className="space-y-8">          {readyReservations.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Livres à retirer</h2>
              <div className="space-y-4">
                {readyReservations.map(reservation => (
                    <div key={reservation.id} className="bg-white rounded-lg shadow overflow-hidden border-l-4 border-green-500">
                      <div className="md:flex">
                        <div className="md:flex-shrink-0">
                          <img
                            className="h-48 w-full object-cover md:w-48"
                            src={reservation.coverImage}
                            alt={reservation.bookTitle}
                          />
                        </div>
                        <div className="p-4 flex-1">
                          <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                            <div>
                              <div className="flex items-center mb-1">
                                <h3 className="text-xl font-semibold">{reservation.bookTitle}</h3>
                                <span className="ml-3 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                  Disponible
                                </span>
                              </div>
                              <p className="text-gray-600">{reservation.bookAuthor}</p>
                              
                              <div className="mt-3 space-y-1">
                                <div className="flex">
                                  <span className="text-gray-600 w-40">Date de réservation:</span>
                                  <span>{formatDate(reservation.reservationDate)}</span>
                                </div>
                                <div className="flex">
                                  <span className="text-gray-600 w-40">Disponible jusqu'au:</span>
                                  <span>{formatDate(reservation.expirationDate)}</span>
                                </div>
                              </div>
                              
                              <p className="mt-3 text-sm text-gray-500">
                                Le livre est disponible et vous attend au bureau de prêt. Vous avez jusqu'au{' '}
                                {formatDate(reservation.expirationDate)} pour le récupérer.
                              </p>
                            </div>
                            
                            <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end space-y-2">
                              <button 
                                onClick={() => handleCheckout(reservation.id)}
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                              >
                                Récupérer
                              </button>
                              
                              <button 
                                onClick={() => handleCancel(reservation.id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                Annuler
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
            {waitingReservations.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Liste d'attente</h2>
              <div className="space-y-4">
                {waitingReservations.map(reservation => (
                    <div key={reservation.id} className="bg-white rounded-lg shadow overflow-hidden">
                      <div className="md:flex">
                        <div className="md:flex-shrink-0">
                          <img
                            className="h-48 w-full object-cover md:w-48"
                            src={reservation.coverImage}
                            alt={reservation.bookTitle}
                          />
                        </div>
                        <div className="p-4 flex-1">
                          <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                            <div>
                              <h3 className="text-xl font-semibold mb-1">{reservation.bookTitle}</h3>
                              <p className="text-gray-600">{reservation.bookAuthor}</p>
                              
                              <div className="mt-3 space-y-1">
                                <div className="flex">
                                  <span className="text-gray-600 w-40">Date de réservation:</span>
                                  <span>{formatDate(reservation.reservationDate)}</span>
                                </div>
                                <div className="flex">
                                  <span className="text-gray-600 w-40">Position dans la file:</span>
                                  <span className="font-semibold">{reservation.position}</span>
                                </div>
                              </div>
                              
                              <p className="mt-3 text-sm text-gray-500">
                                {reservation.position === 1 
                                  ? "Vous êtes le prochain sur la liste d'attente. Vous serez notifié dès que le livre sera disponible."
                                  : `Il y a ${reservation.position - 1} personne(s) avant vous dans la file d'attente.`
                                }
                              </p>
                            </div>
                            
                            <div className="mt-4 md:mt-0">
                              <button 
                                onClick={() => handleCancel(reservation.id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                Annuler
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Reservations;
