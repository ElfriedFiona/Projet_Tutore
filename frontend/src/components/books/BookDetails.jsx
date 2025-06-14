import { useState } from 'react';

const BookDetails = ({ book, onReserve, isAuthenticated }) => {
  const [isReserving, setIsReserving] = useState(false);
  
  const handleReserve = async () => {
    if (!isAuthenticated) {
      // Redirect to login page or show login modal in a real app
      console.log('Redirection vers la page de connexion...');
      return;
    }
    
    setIsReserving(true);
    
    try {
      await onReserve(book.id);
      // Success handled by parent component
    } catch (error) {
      console.error('Erreur lors de la réservation:', error);
      // Error handled by parent component
    } finally {
      setIsReserving(false);
    }
  };
  
  if (!book) return null;
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="md:flex">
        <div className="md:w-1/3 p-6">
          <img 
            src={book.coverImage} 
            alt={`Couverture de ${book.title}`} 
            className="w-full rounded-lg shadow-md"
          />
          
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`px-3 py-1 text-sm font-semibold rounded-full ${
                book.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {book.available ? 'Disponible' : 'Indisponible'}
              </div>
            </div>
            
            {book.available ? (
              <button
                onClick={handleReserve}
                disabled={isReserving || !isAuthenticated}
                className={`w-full py-2 rounded-md font-semibold ${
                  isAuthenticated 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                }`}
              >
                {isReserving ? 'Réservation en cours...' : isAuthenticated ? 'Réserver' : 'Connectez-vous pour réserver'}
              </button>
            ) : (
              <div>
                <button
                  disabled
                  className="w-full py-2 rounded-md font-semibold bg-gray-300 text-gray-600 cursor-not-allowed mb-2"
                >
                  Indisponible
                </button>
                {isAuthenticated && (
                  <button
                    className="w-full py-2 rounded-md font-semibold bg-blue-100 text-blue-800 hover:bg-blue-200"
                  >
                    Rejoindre la file d'attente
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        
        <div className="md:w-2/3 p-6">
          <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
          <h2 className="text-xl text-gray-600 mb-6">par {book.author}</h2>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-700 whitespace-pre-line">{book.description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Détails</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-gray-600">Catégorie:</span>
                  <span>{book.category}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">ISBN:</span>
                  <span>{book.isbn}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Éditeur:</span>
                  <span>{book.publisher}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Date de publication:</span>
                  <span>{book.publishDate}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Pages:</span>
                  <span>{book.pages}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Langue:</span>
                  <span>{book.language}</span>
                </li>
              </ul>
            </div>
            
            {book.location && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Emplacement</h3>
                <p className="text-gray-700">{book.location}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
