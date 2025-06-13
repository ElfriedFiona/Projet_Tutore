import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Search, Filter, Calendar, User, AlertCircle,
  CheckCircle, Clock, Undo2, Mail, Phone, MapPin,
  Download, FileText, Eye, RotateCcw, Ban
} from 'lucide-react';

const LoanManagement = () => {
  const [loans, setLoans] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock data pour les prêts
  const mockLoans = [
    {
      id: 1,
      bookTitle: "Introduction à la Physique Quantique",
      bookAuthor: "Dr. Ahmed Kouassi",
      isbn: "978-2-123456-78-9",
      borrower: {
        id: 101,
        name: "Marie Dumont",
        email: "marie.dumont@enspd.edu.cm",
        phone: "+237 6XX XXX XXX",
        studentId: "20231045",
        program: "Master Physique"
      },
      loanDate: "2024-01-15",
      dueDate: "2024-02-15",
      returnDate: null,
      status: "En cours",
      daysOverdue: 0,
      renewalCount: 1,
      maxRenewals: 3,
      fine: 0
    },
    {
      id: 2,
      bookTitle: "Histoire du Cameroun Contemporain",
      bookAuthor: "Prof. Marie Bamileke",
      isbn: "978-2-987654-32-1",
      borrower: {
        id: 102,
        name: "Jean Mballa",
        email: "jean.mballa@enspd.edu.cm",
        phone: "+237 6XX XXX XXX",
        studentId: "20231089",
        program: "Licence Histoire"
      },
      loanDate: "2024-01-05",
      dueDate: "2024-01-20",
      returnDate: null,
      status: "En retard",
      daysOverdue: 12,
      renewalCount: 2,
      maxRenewals: 3,
      fine: 1200
    },
    {
      id: 3,
      bookTitle: "Algorithmes et Structures de Données",
      bookAuthor: "Dr. Jean-Claude Assi",
      isbn: "978-2-456789-12-3",
      borrower: {
        id: 103,
        name: "Sarah Nkomo",
        email: "sarah.nkomo@enspd.edu.cm",
        phone: "+237 6XX XXX XXX",
        studentId: "20231156",
        program: "Master Informatique"
      },
      loanDate: "2024-01-10",
      dueDate: "2024-02-10",
      returnDate: "2024-02-08",
      status: "Retourné",
      daysOverdue: 0,
      renewalCount: 0,
      maxRenewals: 3,
      fine: 0
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'Tous les prêts', count: 45 },
    { value: 'En cours', label: 'En cours', count: 28 },
    { value: 'En retard', label: 'En retard', count: 12 },
    { value: 'Retourné', label: 'Retournés', count: 5 }
  ];

  useEffect(() => {
    setTimeout(() => {
      setLoans(mockLoans);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredLoans = loans.filter(loan => {
    const matchesSearch = 
      loan.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.borrower.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.borrower.studentId.includes(searchTerm) ||
      loan.isbn.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || loan.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'En cours': return 'bg-blue-100 text-blue-800';
      case 'En retard': return 'bg-red-100 text-red-800';
      case 'Retourné': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleReturn = (loanId) => {
    setLoans(prevLoans =>
      prevLoans.map(loan =>
        loan.id === loanId
          ? { ...loan, status: 'Retourné', returnDate: new Date().toISOString().split('T')[0] }
          : loan
      )
    );
  };

  const handleRenewal = (loanId) => {
    setLoans(prevLoans =>
      prevLoans.map(loan =>
        loan.id === loanId && loan.renewalCount < loan.maxRenewals
          ? {
              ...loan,
              renewalCount: loan.renewalCount + 1,
              dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              daysOverdue: 0
            }
          : loan
      )
    );
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
            <p className="font-medium">{new Date(loan.loanDate).toLocaleDateString('fr-FR')}</p>
          </div>
          <div>
            <span className="text-gray-500">Date de retour:</span>
            <p className={`font-medium ${loan.daysOverdue > 0 ? 'text-red-600' : 'text-gray-900'}`}>
              {new Date(loan.dueDate).toLocaleDateString('fr-FR')}
              {loan.daysOverdue > 0 && ` (${loan.daysOverdue}j de retard)`}
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
          {loan.status === 'En cours' || loan.status === 'En retard' ? (
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
                    {new Date(selectedLoan?.loanDate).toLocaleDateString('fr-FR')}
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
              <p className="text-2xl font-bold text-gray-900">28</p>
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
              <p className="text-2xl font-bold text-gray-900">12</p>
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
              <p className="text-2xl font-bold text-gray-900">5</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Amendes</p>
              <p className="text-2xl font-bold text-gray-900">8 500 F</p>
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
