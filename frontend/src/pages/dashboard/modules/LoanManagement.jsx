import React, { useState, useEffect, useCallback } from 'react'; // Import useCallback
import {
  BookOpen, Search, Filter, Calendar, User, AlertCircle,
  CheckCircle, Clock, Undo2, Mail, Phone, MapPin,
  Download, FileText, Eye, RotateCcw, Ban
} from 'lucide-react';
import api from '../../../services/apiService';

const LoanManagement = () => {
  const [loans, setLoans] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Fonction pour formater les données d'emprunt de l'API
const formatLoanData = (apiLoan) => {
    const today = new Date();
    const dueDate = new Date(apiLoan.dateRetourPrevu);
    const daysOverdue = apiLoan.statut === 'en cours' && today > dueDate
      ? Math.floor((today - dueDate) / (1000 * 60 * 60 * 24))
      : 0;

    return {
      id: apiLoan.id,
      bookTitle: apiLoan.ouvrage?.titre || "Titre inconnu",
      bookAuthor: apiLoan.ouvrage?.auteur || "Auteur inconnu",
      isbn: apiLoan.ouvrage?.isbn || "",
      borrower: {
        id: apiLoan.user?.id,
        name: `${apiLoan.user?.prenom || ''} ${apiLoan.user?.nom || ''}`.trim() || "Inconnu", 
        email: apiLoan.user?.email || "N/A",
        phone: apiLoan.user?.telephone || "N/A", 
        studentId: apiLoan.user?.etudiant?.matricule || "N/A", 
        program: apiLoan.user?.etudiant?.filiere || "N/A" 
      },
      loanDate: apiLoan.dateEmprunt || apiLoan.created_at,
      dueDate: apiLoan.dateRetourPrevu,
      returnDate: apiLoan.dateRetourEffectif,
      status: apiLoan.statut === 'en cours' && daysOverdue > 0 ? 'En retard' : (apiLoan.statut || 'Inconnu'),
      daysOverdue: daysOverdue,
      renewalCount: apiLoan.nbProlongations || 0,
      maxRenewals: 3,
      fine: apiLoan.amendes ? apiLoan.amendes.reduce((sum, amende) => sum + amende.montant, 0) : 0,
      coverImage: apiLoan.ouvrage?.imageCouverture || '/images/books/default.jpg',
      category: apiLoan.ouvrage?.categorie?.nom || "Inconnu",
    };
};

  // Fonction pour récupérer les prêts
  const fetchLoans = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Utilisez l'API indexAll pour le bibliothécaire
      const response = await api.get(`/admin/emprunts`, {
      });
      const formattedLoans = response.data.map(formatLoanData);
      setLoans(formattedLoans);
    } catch (err) {
      console.error("Erreur lors de la récupération des prêts:", err);
      setError("Impossible de charger les prêts. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  }, []); // Dépendances vides car fetchLoans ne dépend de rien d'extérieur

  useEffect(() => {
    fetchLoans();
  }, [fetchLoans]); // Exécuter une fois au montage et chaque fois que fetchLoans change (ce qui n'arrive pas avec useCallback sans deps)


  // Statistiques calculées dynamiquement
  const totalLoans = loans.length;
  const currentLoansCount = loans.filter(loan => loan.status === 'en cours').length;
  const overdueLoansCount = loans.filter(loan => loan.status === 'En retard').length;
  const returnedTodayCount = loans.filter(loan => loan.returnDate === new Date().toISOString().split('T')[0]).length;
  const totalFines = loans.reduce((sum, loan) => sum + loan.fine, 0);


  const statusOptions = [
    { value: 'all', label: 'Tous les prêts', count: totalLoans },
    { value: 'en cours', label: 'En cours', count: currentLoansCount },
    { value: 'En retard', label: 'En retard', count: overdueLoansCount },
    { value: 'terminé', label: 'Retournés', count: loans.filter(loan => loan.status === 'terminé').length } // Utilisez 'terminé' pour le filtre si c'est le statut backend
  ];


  const filteredLoans = loans.filter(loan => {
    const matchesSearch =
      loan.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.borrower.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (loan.borrower.studentId && loan.borrower.studentId.includes(searchTerm)) || // Ajoutez une vérification pour studentId
      (loan.isbn && loan.isbn.includes(searchTerm)); // Ajoutez une vérification pour ISBN
    const matchesStatus = statusFilter === 'all' || loan.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) { // Utilisez toLowerCase pour correspondre aux statuts backend
      case 'en cours': return 'bg-blue-100 text-blue-800';
      case 'en retard': return 'bg-red-100 text-red-800';
      case 'terminé': return 'bg-green-100 text-green-800';
      case 'en attente': return 'bg-yellow-100 text-yellow-800'; // Nouveau statut
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 3000); // Masquer après 3 secondes
  };

  const handleReturn = async (loanId) => {
    try {
      await api.post(`/emprunts/${loanId}/retour`, {
        etatRetour: "Bon", // Exemple : assume un bon état par défaut pour le moment
        notes: ""
      });
      showSuccessMessage("Livre marqué comme retourné avec succès !");
      fetchLoans(); // Recharger les prêts après l'action
    } catch (err) {
      console.error("Erreur lors du retour du livre:", err);
      setError("Impossible de marquer le livre comme retourné.");
    }
  };

  const handleRenewal = async (loanId) => {
    try {
      await api.post(`/emprunts/${loanId}/prolonger`, {});
      showSuccessMessage("Prêt prolongé avec succès !");
      fetchLoans(); // Recharger les prêts après l'action
    } catch (err) {
      console.error("Erreur lors de la prolongation:", err);
      setError("Impossible de prolonger le prêt. " + (err.response?.data?.message || ""));
    }
  };

  const handleValidateLoan = async (loanId) => {
    try {
      await api.post(`/emprunts/${loanId}/valider`, {});
      showSuccessMessage("Emprunt validé avec succès !");
      fetchLoans(); // Recharger les prêts après l'action
    } catch (err) {
      console.error("Erreur lors de la validation:", err);
      setError("Impossible de valider l'emprunt. " + (err.response?.data?.message || ""));
    }
  };


  const LoanCard = ({ loan }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">{loan.bookTitle}</h3>
          <p className="text-sm text-gray-600 mb-2">{loan.bookAuthor}</p>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>ISBN: {loan.isbn}</span>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(loan.status)}`}>
          {loan.status}
        </span>
      </div>

      <div className="border-t border-gray-100 pt-4">
        <div className="flex items-center space-x-3 mb-3">
          <User className="w-4 h-4 text-gray-400" />
          <div>
            <p className="font-medium text-gray-900">{loan.borrower.name}</p>
            <p className="text-sm text-gray-500">{loan.borrower.studentId} • {loan.borrower.program}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
          <div>
            <span className="text-gray-500">Date d'emprunt:</span>
            <p className="font-medium">{loan.loanDate ? new Date(loan.loanDate).toLocaleDateString('fr-FR') : 'N/A'}</p>
          </div>
          <div>
            <span className="text-gray-500">Date de retour prévue:</span>
            <p className={`font-medium ${loan.daysOverdue > 0 ? 'text-red-600' : 'text-gray-900'}`}>
              {loan.dueDate ? new Date(loan.dueDate).toLocaleDateString('fr-FR') : 'N/A'}
              {loan.status === 'En retard' && ` (${loan.daysOverdue}j de retard)`}
            </p>
          </div>
        </div>

        {loan.fine > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <span className="text-sm font-medium text-red-800">
                Amende: {loan.fine} FCFA
              </span>
            </div>
          </div>
        )}

        <div className="flex space-x-2">
          {loan.status === 'en attente' && (
            <button
              onClick={() => handleValidateLoan(loan.id)}
              className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <CheckCircle className="w-4 h-4 inline mr-1" />
              Valider l'emprunt
            </button>
          )}

          {loan.status === 'en cours' || loan.status === 'En retard' ? (
            <>
              <button
                onClick={() => handleReturn(loan.id)}
                className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
              >
                <CheckCircle className="w-4 h-4 inline mr-1" />
                Marquer retourné
              </button>
              {loan.renewalCount < loan.maxRenewals && (
                <button
                  onClick={() => handleRenewal(loan.id)}
                  className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  <RotateCcw className="w-4 h-4 inline mr-1" />
                  Renouveler
                </button>
              )}
            </>
          ) : (
            <button
              onClick={() => setSelectedLoan(loan)}
              className="flex-1 bg-primary-600 text-white py-2 px-3 rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
            >
              <Eye className="w-4 h-4 inline mr-1" />
              Détails
            </button>
          )}
        </div>

        <div className="mt-3 text-xs text-gray-500">
          Renouvellements: {loan.renewalCount}/{loan.maxRenewals}
        </div>
      </div>
    </div>
  );

  const LoanDetailModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Détails du Prêt</h2>
            <button
              onClick={() => setSelectedLoan(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Informations du livre */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Ouvrage</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-1">{selectedLoan?.bookTitle}</h4>
              <p className="text-gray-600 mb-2">{selectedLoan?.bookAuthor}</p>
              <p className="text-sm text-gray-500">ISBN: {selectedLoan?.isbn}</p>
            </div>
          </div>

          {/* Informations de l'emprunteur */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Emprunteur</h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">{selectedLoan?.borrower.name}</p>
                  <p className="text-sm text-gray-500">{selectedLoan?.borrower.studentId}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{selectedLoan?.borrower.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{selectedLoan?.borrower.phone}</span>
              </div>
            </div>
          </div>

          {/* Historique du prêt */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Historique</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <Calendar className="w-4 h-4 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-blue-900">Emprunt effectué</p>
                  <p className="text-xs text-blue-700">
                    {selectedLoan?.loanDate ? new Date(selectedLoan.loanDate).toLocaleDateString('fr-FR') : 'N/A'}
                  </p>
                </div>
              </div>
              {selectedLoan?.returnDate && (
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-green-900">Livre retourné</p>
                    <p className="text-xs text-green-700">
                      {new Date(selectedLoan?.returnDate).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
              )}
              {/* Ajoutez un affichage pour les prolongations si pertinent ici */}
              {selectedLoan?.renewalCount > 0 && (
                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                  <RotateCcw className="w-4 h-4 text-purple-600" />
                  <div>
                    <p className="text-sm font-medium text-purple-900">Renouvelé {selectedLoan.renewalCount} fois</p>
                    {/* Vous pourriez afficher les dates de prolongation ici si l'API les fournissait */}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Succès !</strong>
          <span className="block sm:inline ml-2">{successMessage}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setSuccessMessage(null)}>
            <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.103l-2.651 2.651a1.2 1.2 0 1 1-1.697-1.697L8.303 9.406l-2.651-2.651a1.2 1.2 0 1 1 1.697-1.697L10 7.71l2.651-2.651a1.2 1.2 0 0 1 1.697 1.697L11.697 9.406l2.651 2.651a1.2 1.2 0 0 1 0 1.697z" /></svg>
          </span>
        </div>
      )}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Erreur !</strong>
          <span className="block sm:inline ml-2">{error}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setError(null)}>
            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.103l-2.651 2.651a1.2 1.2 0 1 1-1.697-1.697L8.303 9.406l-2.651-2.651a1.2 1.2 0 1 1 1.697-1.697L10 7.71l2.651-2.651a1.2 1.2 0 0 1 1.697 1.697L11.697 9.406l2.651 2.651a1.2 1.2 0 0 1 0 1.697z" /></svg>
          </span>
        </div>
      )}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Gestion des Prêts et Retours</h1>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Prêts actifs</p>
              <p className="text-2xl font-bold text-gray-900">{currentLoansCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <Clock className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">En retard</p>
              <p className="text-2xl font-bold text-gray-900">{overdueLoansCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Retours du jour</p>
              <p className="text-2xl font-bold text-gray-900">{returnedTodayCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Amendes totales</p>
              <p className="text-2xl font-bold text-gray-900">{totalFines} F</p>
            </div>
          </div>
        </div>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher par livre, emprunteur ou ID étudiant..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 w-full sm:w-80"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label} ({option.count})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-3">
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              <Download className="w-4 h-4 inline mr-2" />
              Exporter
            </button>
          </div>
        </div>
      </div>

      {/* Liste des prêts */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Prêts ({filteredLoans.length})
          </h3>
        </div>

        <div className="p-6">
          {filteredLoans.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Aucun prêt trouvé</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredLoans.map(loan => (
                <LoanCard key={loan.id} loan={loan} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal de détails */}
      {selectedLoan && <LoanDetailModal />}
    </div>
  );
};

export default LoanManagement;