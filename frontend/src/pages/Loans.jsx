import { useState, useEffect, useMemo } from 'react';
import { formatDate } from '../utils/formatters';
import { log, error as logError } from '../utils/logger';

const Loans = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Simulate API call to get user's loan history
    const fetchLoans = async () => {
      try {
        // In a real app, this would be an actual API call
        // For now, we'll use mock data
        setTimeout(() => {
          setLoans([
            {
              id: 1,
              bookId: 1,
              bookTitle: 'Les Misérables',
              bookAuthor: 'Victor Hugo',
              coverImage: 'https://via.placeholder.com/150',
              borrowDate: '2025-04-15',
              dueDate: '2025-05-15',
              returnDate: null,
              status: 'active',
              fineAmount: 0
            },
            {
              id: 2,
              bookId: 3,
              bookTitle: 'Histoire de France',
              bookAuthor: 'Jacques Bainville',
              coverImage: 'https://via.placeholder.com/150',
              borrowDate: '2025-03-10',
              dueDate: '2025-04-10',
              returnDate: '2025-04-05',
              status: 'returned',
              fineAmount: 0
            },
            {
              id: 3,
              bookId: 5,
              bookTitle: 'Le Rouge et le Noir',
              bookAuthor: 'Stendhal',
              coverImage: 'https://via.placeholder.com/150',
              borrowDate: '2025-02-20',
              dueDate: '2025-03-20',
              returnDate: '2025-03-25',
              status: 'returned',
              fineAmount: 2500 // 2500 FCFA fine for late return
            }
          ]);
          setLoading(false);
        }, 1000);      } catch (err) {
        logError('Erreur lors du chargement des emprunts:', err);
        setError('Erreur lors du chargement des emprunts');
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  const handleRenew = (loanId) => {
    log(`Renouveler l'emprunt ${loanId}`);
    // In a real app, this would make an API call to renew the loan
  };

  // Calculate remaining days until due date
  const calculateRemainingDays = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  // Memoized filtered loans by status
  const activeLoans = useMemo(() => 
    loans.filter(loan => loan.status === 'active')
  , [loans]);
  
  const returnedLoans = useMemo(() => 
    loans.filter(loan => loan.status === 'returned')
  , [loans]);
  // Now using the formatDate utility from formatters.js

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Mes Emprunts</h1>
      
      <div className="bg-white p-4 rounded-lg shadow-md mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-semibold">Résumé</h2>
            <p className="text-gray-600">
              {activeLoans.length} emprunt(s) actif(s), {' '}
              {returnedLoans.length} emprunt(s) retourné(s)
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
              Historique complet
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <p className="text-center py-8">Chargement des emprunts...</p>
      ) : error ? (
        <p className="text-center text-red-600 py-8">{error}</p>
      ) : loans.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">Vous n'avez pas encore emprunté de livre.</p>
          <a href="/catalog" className="text-blue-600 hover:text-blue-800">Parcourir le catalogue</a>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">Emprunts actifs</h2>
          <div className="space-y-4 mb-8">
            {activeLoans.length > 0 ? (
              activeLoans.map(loan => {
                const remainingDays = calculateRemainingDays(loan.dueDate);
                const isOverdue = remainingDays < 0;
                
                return (
                  <div key={loan.id} className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="md:flex">
                      <div className="md:flex-shrink-0">
                        <img
                          className="h-48 w-full object-cover md:w-48"
                          src={loan.coverImage}
                          alt={loan.bookTitle}
                        />
                      </div>
                      <div className="p-4 flex-1">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                          <div>
                            <h3 className="text-xl font-semibold mb-1">{loan.bookTitle}</h3>
                            <p className="text-gray-600">{loan.bookAuthor}</p>
                            
                            <div className="mt-3 space-y-1">
                              <div className="flex">
                                <span className="text-gray-600 w-32">Date d'emprunt:</span>
                                <span>{formatDate(loan.borrowDate)}</span>
                              </div>
                              <div className="flex">
                                <span className="text-gray-600 w-32">À retourner avant:</span>
                                <span className={isOverdue ? 'text-red-600 font-semibold' : ''}>
                                  {formatDate(loan.dueDate)}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end space-y-2">
                            <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              isOverdue 
                                ? 'bg-red-100 text-red-800' 
                                : remainingDays <= 3 
                                  ? 'bg-yellow-100 text-yellow-800' 
                                  : 'bg-green-100 text-green-800'
                            }`}>
                              {isOverdue 
                                ? `En retard de ${Math.abs(remainingDays)} jour(s)` 
                                : `${remainingDays} jour(s) restant(s)`}
                            </div>
                            
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => handleRenew(loan.id)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                              >
                                Renouveler
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-600">Aucun emprunt actif.</p>
            )}
          </div>

          <h2 className="text-2xl font-bold mb-4">Emprunts retournés récemment</h2>
          <div className="space-y-4">
            {returnedLoans.length > 0 ? (
              returnedLoans.map(loan => (
                <div key={loan.id} className="bg-white rounded-lg shadow overflow-hidden opacity-75">
                  <div className="md:flex">
                    <div className="md:flex-shrink-0">
                      <img
                        className="h-48 w-full object-cover md:w-48"
                        src={loan.coverImage}
                        alt={loan.bookTitle}
                      />
                    </div>
                    <div className="p-4 flex-1">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                        <div>
                          <h3 className="text-xl font-semibold mb-1">{loan.bookTitle}</h3>
                          <p className="text-gray-600">{loan.bookAuthor}</p>
                          
                          <div className="mt-3 space-y-1">
                            <div className="flex">
                              <span className="text-gray-600 w-32">Date d'emprunt:</span>
                              <span>{formatDate(loan.borrowDate)}</span>
                            </div>
                            <div className="flex">
                              <span className="text-gray-600 w-32">Date de retour:</span>
                              <span>
                                {loan.returnDate ? formatDate(loan.returnDate) : '-'}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end">
                          {loan.fineAmount > 0 && (
                            <div className="px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-800">
                              Amende: {loan.fineAmount} FCFA
                            </div>
                          )}
                          
                          <div className="mt-2 px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-800">
                            Retourné
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600">Aucun emprunt retourné récemment.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Loans;
