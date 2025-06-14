import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Users, Calendar, Clock, Check, X, AlertTriangle,
  Search, Filter, Plus, Scan, RotateCcw, Timer, User,
  CheckCircle, XCircle, RefreshCw, Eye, Edit, Phone, Mail,
  ArrowRight, QrCode, Barcode, Star, History, MapPin
} from 'lucide-react';
import { formatPrice } from '../../../utils/formatters';

const LoansManagement = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showNewLoanModal, setShowNewLoanModal] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock data pour les prêts
  const mockLoans = [
    {
      id: 1,
      user: {
        id: 'ETU001',
        name: 'Marie Kouassi',
        email: 'marie.k@etudiant.enspd.ci',
        phone: '+225 07 12 34 56 78',
        program: 'Génie Informatique',
        year: 'L3'
      },
      book: {
        id: 1,
        title: 'Introduction à la Physique Quantique',
        author: 'Dr. Ahmed Kouassi',
        isbn: '978-2-123456-78-9'
      },
      loanDate: '2024-01-10',
      dueDate: '2024-01-24',
      returnDate: null,
      status: 'active',
      renewals: 1,
      maxRenewals: 2,
      daysOverdue: 3,
      fine: 1500
    },
    {
      id: 2,
      user: {
        id: 'PROF002',
        name: 'Dr. Jean Bakayoko',
        email: 'j.bakayoko@enspd.ci',
        phone: '+225 05 87 65 43 21',
        program: 'Professeur',
        department: 'Physique'
      },
      book: {
        id: 2,
        title: 'Algorithmes et Structures de Données',
        author: 'Dr. Jean-Claude Assi',
        isbn: '978-2-456789-12-3'
      },
      loanDate: '2024-01-15',
      dueDate: '2024-02-14',
      returnDate: null,
      status: 'active',
      renewals: 0,
      maxRenewals: 3,
      daysOverdue: 0,
      fine: 0
    },
    {
      id: 3,
      user: {
        id: 'ETU003',
        name: 'Sophie Traoré',
        email: 's.traore@etudiant.enspd.ci',
        phone: '+225 01 23 45 67 89',
        program: 'Génie Civil',
        year: 'M1'
      },
      book: {
        id: 3,
        title: 'Histoire du Cameroun Contemporain',
        author: 'Prof. Marie Bamileke',
        isbn: '978-2-987654-32-1'
      },
      loanDate: '2024-01-05',
      dueDate: '2024-01-19',
      returnDate: '2024-01-18',
      status: 'returned',
      renewals: 0,
      maxRenewals: 2,
      daysOverdue: 0,
      fine: 0
    }
  ];

  const [loans, setLoans] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setLoans(mockLoans);
      setLoading(false);
    }, 1000);
  }, []);

  const getFilteredLoans = () => {
    return loans.filter(loan => {
      const matchesTab = activeTab === 'all' || 
                        (activeTab === 'active' && loan.status === 'active') ||
                        (activeTab === 'overdue' && loan.status === 'active' && loan.daysOverdue > 0) ||
                        (activeTab === 'returned' && loan.status === 'returned');
      
      const matchesSearch = loan.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           loan.book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           loan.user.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = filterStatus === 'all' || loan.status === filterStatus;
      
      return matchesTab && matchesSearch && matchesFilter;
    });
  };

  const getStatusBadge = (loan) => {
    if (loan.status === 'returned') {
      return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Retourné</span>;
    }
    if (loan.daysOverdue > 0) {
      return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">En retard</span>;
    }
    return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Actif</span>;
  };

  const calculateDaysRemaining = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const LoanCard = ({ loan }) => {
    const daysRemaining = calculateDaysRemaining(loan.dueDate);
    
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-200">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{loan.user.name}</h3>
              <p className="text-sm text-gray-600">{loan.user.id} • {loan.user.program}</p>
            </div>
          </div>
          {getStatusBadge(loan)}
        </div>
        
        <div className="mb-4">
          <h4 className="font-medium text-gray-900 mb-1">{loan.book.title}</h4>
          <p className="text-sm text-gray-600">{loan.book.author}</p>
          <p className="text-xs text-gray-500">ISBN: {loan.book.isbn}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <span className="text-gray-500">Emprunté le:</span>
            <p className="font-medium">{new Date(loan.loanDate).toLocaleDateString('fr-FR')}</p>
          </div>
          <div>
            <span className="text-gray-500">À retourner le:</span>
            <p className={`font-medium ${loan.daysOverdue > 0 ? 'text-red-600' : daysRemaining <= 3 ? 'text-yellow-600' : 'text-gray-900'}`}>
              {new Date(loan.dueDate).toLocaleDateString('fr-FR')}
            </p>
          </div>
        </div>
        
        {loan.status === 'active' && (
          <div className="mb-4">
            {loan.daysOverdue > 0 ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-medium text-red-800">
                    {loan.daysOverdue} jour{loan.daysOverdue > 1 ? 's' : ''} de retard
                  </span>
                </div>
                {loan.fine > 0 && (
                  <p className="text-sm text-red-700 mt-1">
                    Amende: {formatPrice(loan.fine)}
                  </p>
                )}
              </div>
            ) : (
              <div className={`border rounded-lg p-3 ${
                daysRemaining <= 3 ? 'bg-yellow-50 border-yellow-200' : 'bg-green-50 border-green-200'
              }`}>
                <div className="flex items-center space-x-2">
                  <Clock className={`w-4 h-4 ${daysRemaining <= 3 ? 'text-yellow-600' : 'text-green-600'}`} />
                  <span className={`text-sm font-medium ${daysRemaining <= 3 ? 'text-yellow-800' : 'text-green-800'}`}>
                    {daysRemaining > 0 ? `${daysRemaining} jour${daysRemaining > 1 ? 's' : ''} restant${daysRemaining > 1 ? 's' : ''}` : 'À retourner aujourd\'hui'}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
        
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <span>Renouvellements: {loan.renewals}/{loan.maxRenewals}</span>
          {loan.returnDate && (
            <span>Retourné le: {new Date(loan.returnDate).toLocaleDateString('fr-FR')}</span>
          )}
        </div>
        
        <div className="flex space-x-2">
          {loan.status === 'active' && (
            <>
              <button 
                onClick={() => setSelectedLoan(loan)}
                className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
              >
                <RotateCcw className="w-4 h-4 inline mr-1" />
                Retourner
              </button>
              {loan.renewals < loan.maxRenewals && loan.daysOverdue === 0 && (
                <button className="bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  <RefreshCw className="w-4 h-4 inline mr-1" />
                  Renouveler
                </button>
              )}
            </>
          )}
          <button className="bg-gray-100 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors text-sm">
            <Eye className="w-4 h-4 inline mr-1" />
            Détails
          </button>
        </div>
      </div>
    );
  };

  const NewLoanModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Nouveau Prêt</h2>
            <button 
              onClick={() => setShowNewLoanModal(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Étape 1: Sélection de l'utilisateur */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">1. Sélectionner l'utilisateur</h3>
            <div className="space-y-4">
              <div className="flex space-x-3">
                <div className="flex-1">
                  <input 
                    type="text" 
                    placeholder="Rechercher par nom, ID étudiant ou email..."
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                  <Search className="w-4 h-4" />
                </button>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex items-center space-x-3">
                  <QrCode className="w-8 h-8 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Scanner la carte étudiante</p>
                    <p className="text-xs text-gray-500">Utilisez le scanner pour identifier rapidement l'utilisateur</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Étape 2: Sélection du livre */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">2. Sélectionner l'ouvrage</h3>
            <div className="space-y-4">
              <div className="flex space-x-3">
                <div className="flex-1">
                  <input 
                    type="text" 
                    placeholder="Rechercher par titre, auteur ou ISBN..."
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                  <Search className="w-4 h-4" />
                </button>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex items-center space-x-3">
                  <Barcode className="w-8 h-8 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Scanner le code-barres</p>
                    <p className="text-xs text-gray-500">Scannez le code-barres de l'ouvrage</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Étape 3: Configuration du prêt */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">3. Configuration du prêt</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date de prêt</label>
                <input 
                  type="date" 
                  defaultValue={new Date().toISOString().split('T')[0]}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date de retour prévue</label>
                <input 
                  type="date" 
                  defaultValue={new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
          </div>
          
          {/* Récapitulatif */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Récapitulatif du prêt</h4>
            <div className="text-sm text-blue-800 space-y-1">
              <p>• Utilisateur: [À sélectionner]</p>
              <p>• Ouvrage: [À sélectionner]</p>
              <p>• Durée: 14 jours</p>
              <p>• Renouvellements possibles: 2</p>
            </div>
          </div>
        </div>
        
        <div className="p-6 border-t border-gray-200 flex space-x-3">
          <button 
            onClick={() => setShowNewLoanModal(false)}
            className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Annuler
          </button>
          <button className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors">
            Enregistrer le prêt
          </button>
        </div>
      </div>
    </div>
  );

  const ReturnModal = () => (
    selectedLoan && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-lg w-full">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Retour d'Ouvrage</h2>
              <button 
                onClick={() => setSelectedLoan(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          <div className="p-6 space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">{selectedLoan.book.title}</h3>
              <p className="text-sm text-gray-600">{selectedLoan.book.author}</p>
              <p className="text-xs text-gray-500 mt-1">ISBN: {selectedLoan.book.isbn}</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-2">{selectedLoan.user.name}</h3>
              <p className="text-sm text-gray-600">{selectedLoan.user.id} • {selectedLoan.user.program}</p>
              <p className="text-xs text-gray-500 mt-1">{selectedLoan.user.email}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Date de prêt:</span>
                <p className="font-medium">{new Date(selectedLoan.loanDate).toLocaleDateString('fr-FR')}</p>
              </div>
              <div>
                <span className="text-gray-500">Date prévue:</span>
                <p className="font-medium">{new Date(selectedLoan.dueDate).toLocaleDateString('fr-FR')}</p>
              </div>
            </div>
            
            {selectedLoan.daysOverdue > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span className="font-medium text-red-800">Retour en retard</span>
                </div>
                <p className="text-sm text-red-700">
                  Retard de {selectedLoan.daysOverdue} jour{selectedLoan.daysOverdue > 1 ? 's' : ''}
                </p>
                <p className="text-sm text-red-700 font-medium">
                  Amende à percevoir: {formatPrice(selectedLoan.fine)}
                </p>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">État de l'ouvrage</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-primary-500 focus:border-primary-500">
                <option value="excellent">Excellent état</option>
                <option value="good">Bon état</option>
                <option value="fair">État moyen</option>
                <option value="poor">Mauvais état</option>
                <option value="damaged">Endommagé</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Commentaires (optionnel)</label>
              <textarea 
                rows="3"
                placeholder="Observations sur l'état de l'ouvrage..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
              ></textarea>
            </div>
          </div>
          
          <div className="p-6 border-t border-gray-200 flex space-x-3">
            <button 
              onClick={() => setSelectedLoan(null)}
              className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Annuler
            </button>
            <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
              Confirmer le retour
            </button>
          </div>
        </div>
      </div>
    )
  );

  const filteredLoans = getFilteredLoans();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Prêts Actifs</p>
              <p className="text-2xl font-bold text-blue-600">
                {loans.filter(l => l.status === 'active').length}
              </p>
            </div>
            <BookOpen className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">En Retard</p>
              <p className="text-2xl font-bold text-red-600">
                {loans.filter(l => l.status === 'active' && l.daysOverdue > 0).length}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Retours Aujourd'hui</p>
              <p className="text-2xl font-bold text-green-600">
                {loans.filter(l => l.status === 'returned' && 
                  new Date(l.returnDate).toDateString() === new Date().toDateString()).length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">À retourner bientôt</p>
              <p className="text-2xl font-bold text-yellow-600">
                {loans.filter(l => l.status === 'active' && 
                  calculateDaysRemaining(l.dueDate) <= 3 && calculateDaysRemaining(l.dueDate) >= 0).length}
              </p>
            </div>
            <Timer className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Barre d'outils */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher par utilisateur ou livre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 w-full sm:w-80"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">Tous les statuts</option>
              <option value="active">Actif</option>
              <option value="returned">Retourné</option>
            </select>
          </div>
          
          <div className="flex space-x-3">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
              <Scan className="w-4 h-4 mr-2" />
              Scanner
            </button>
            <button
              onClick={() => setShowNewLoanModal(true)}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nouveau Prêt
            </button>
          </div>
        </div>
      </div>

      {/* Onglets */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'active', label: 'Prêts Actifs', count: loans.filter(l => l.status === 'active').length },
              { id: 'overdue', label: 'En Retard', count: loans.filter(l => l.status === 'active' && l.daysOverdue > 0).length },
              { id: 'returned', label: 'Retournés', count: loans.filter(l => l.status === 'returned').length },
              { id: 'all', label: 'Tous', count: loans.length }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </nav>
        </div>
        
        <div className="p-6">
          {filteredLoans.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Aucun prêt trouvé</p>
              <p className="text-sm text-gray-400 mt-1">
                {activeTab === 'active' && 'Aucun prêt actif pour le moment'}
                {activeTab === 'overdue' && 'Aucun prêt en retard'}
                {activeTab === 'returned' && 'Aucun retour récent'}
                {activeTab === 'all' && 'Modifiez vos critères de recherche'}
              </p>
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

      {/* Modals */}
      {showNewLoanModal && <NewLoanModal />}
      {selectedLoan && <ReturnModal />}
    </div>
  );
};

export default LoansManagement;
