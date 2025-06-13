import React, { useState, useEffect } from 'react';
import { 
  Receipt, AlertTriangle, Check, X, Eye, Search, Filter,
  CreditCard, Clock, User, Book, Calendar, DollarSign,
  CheckCircle, XCircle, FileText, Download, Printer,
  Ban, RefreshCw, History, Mail, Phone
} from 'lucide-react';
import { formatPrice } from '../../../utils/formatters';

const FinesManagement = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showWaiverModal, setShowWaiverModal] = useState(false);
  const [selectedFine, setSelectedFine] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock data pour les amendes
  const mockFines = [
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
        title: 'Introduction à la Physique Quantique',
        author: 'Dr. Ahmed Kouassi',
        isbn: '978-2-123456-78-9'
      },
      loanId: 1,
      reason: 'Retard',
      amount: 1500,
      daysOverdue: 3,
      createdDate: '2024-01-27',
      dueDate: '2024-01-24',
      status: 'pending',
      description: 'Retour avec 3 jours de retard'
    },
    {
      id: 2,
      user: {
        id: 'ETU002',
        name: 'Paul Assi',
        email: 'paul.assi@etudiant.enspd.ci',
        phone: '+225 05 87 65 43 21',
        program: 'Génie Civil',
        year: 'L2'
      },
      book: {
        title: 'Mécanique des Fluides',
        author: 'Prof. Marie Diabaté',
        isbn: '978-2-987654-32-1'
      },
      loanId: 15,
      reason: 'Livre perdu',
      amount: 25000,
      createdDate: '2024-01-25',
      status: 'pending',
      description: 'Déclaration de perte - remplacement nécessaire'
    },
    {
      id: 3,
      user: {
        id: 'ETU003',
        name: 'Sophie Bamba',
        email: 'sophie.b@etudiant.enspd.ci',
        phone: '+225 01 23 45 67 89',
        program: 'Génie Électrique',
        year: 'M1'
      },
      book: {
        title: 'Circuits Électroniques',
        author: 'Dr. Kofi Mensah',
        isbn: '978-2-456789-12-3'
      },
      loanId: 8,
      reason: 'Retard',
      amount: 1000,
      daysOverdue: 2,
      createdDate: '2024-01-26',
      dueDate: '2024-01-24',
      status: 'paid',
      paidDate: '2024-01-27',
      paymentMethod: 'Espèces',
      description: 'Retour avec 2 jours de retard - Payé'
    },
    {
      id: 4,
      user: {
        id: 'ETU004',
        name: 'Ibrahim Traoré',
        email: 'ibrahim.t@etudiant.enspd.ci',
        phone: '+225 07 98 76 54 32',
        program: 'Génie Mécanique',
        year: 'L1'
      },
      book: {
        title: 'Thermodynamique Appliquée',
        author: 'Prof. Fatou Kone',
        isbn: '978-2-789123-45-6'
      },
      loanId: 22,
      reason: 'Livre endommagé',
      amount: 3000,
      createdDate: '2024-01-20',
      status: 'waived',
      waivedDate: '2024-01-22',
      waivedBy: 'Bibliothécaire Principal',
      waiverReason: 'Dommage mineur accepté',
      description: 'Pages cornées - Amende annulée'
    }
  ];

  // Statistiques des amendes
  const fineStats = {
    totalPending: mockFines.filter(f => f.status === 'pending').length,
    totalPendingAmount: mockFines.filter(f => f.status === 'pending').reduce((sum, f) => sum + f.amount, 0),
    totalPaid: mockFines.filter(f => f.status === 'paid').length,
    totalPaidAmount: mockFines.filter(f => f.status === 'paid').reduce((sum, f) => sum + f.amount, 0),
    totalWaived: mockFines.filter(f => f.status === 'waived').length,
    totalWaivedAmount: mockFines.filter(f => f.status === 'waived').reduce((sum, f) => sum + f.amount, 0),
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filtrer les amendes
  const filteredFines = mockFines.filter(fine => {
    const matchesSearch = 
      fine.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fine.user.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fine.book.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = activeTab === 'all' || fine.status === activeTab;
    const matchesFilter = filterStatus === 'all' || fine.reason.toLowerCase() === filterStatus;

    return matchesSearch && matchesTab && matchesFilter;
  });

  // Composant pour les cartes de statistiques
  const StatCard = ({ icon: Icon, title, value, subtitle, color = 'primary' }) => {
    const colorClasses = {
      primary: 'from-primary-600 to-primary-700',
      red: 'from-red-600 to-red-700',
      green: 'from-green-600 to-green-700',
      yellow: 'from-yellow-600 to-yellow-700'
    };

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          </div>
          <div className={`p-3 rounded-lg bg-gradient-to-br ${colorClasses[color]}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    );
  };

  // Composant pour les éléments d'amendes
  const FineItem = ({ fine }) => {
    const getStatusColor = (status) => {
      switch (status) {
        case 'pending': return 'text-yellow-600 bg-yellow-100';
        case 'paid': return 'text-green-600 bg-green-100';
        case 'waived': return 'text-blue-600 bg-blue-100';
        default: return 'text-gray-600 bg-gray-100';
      }
    };

    const getStatusText = (status) => {
      switch (status) {
        case 'pending': return 'En attente';
        case 'paid': return 'Payée';
        case 'waived': return 'Annulée';
        default: return status;
      }
    };

    const getReasonIcon = (reason) => {
      switch (reason.toLowerCase()) {
        case 'retard': return Clock;
        case 'livre perdu': return AlertTriangle;
        case 'livre endommagé': return XCircle;
        default: return FileText;
      }
    };

    const ReasonIcon = getReasonIcon(fine.reason);

    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <ReasonIcon className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">{fine.user.name}</h4>
              <p className="text-sm text-gray-500">{fine.user.id} • {fine.user.program}</p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(fine.status)}`}>
            {getStatusText(fine.status)}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Ouvrage concerné</p>
            <p className="font-medium text-gray-900">{fine.book.title}</p>
            <p className="text-sm text-gray-500">{fine.book.author}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Détails de l'amende</p>
            <p className="font-bold text-lg text-red-600">{formatPrice(fine.amount)}</p>
            <p className="text-sm text-gray-500">{fine.reason}</p>
          </div>
        </div>

        {fine.description && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-1">Description</p>
            <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded">{fine.description}</p>
          </div>
        )}

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Créée le {new Date(fine.createdDate).toLocaleDateString('fr-FR')}
            {fine.paidDate && (
              <span className="ml-2 text-green-600">
                • Payée le {new Date(fine.paidDate).toLocaleDateString('fr-FR')}
              </span>
            )}
            {fine.waivedDate && (
              <span className="ml-2 text-blue-600">
                • Annulée le {new Date(fine.waivedDate).toLocaleDateString('fr-FR')}
              </span>
            )}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => {
                setSelectedFine(fine);
                // Action pour voir les détails
              }}
              className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded"
              title="Voir détails"
            >
              <Eye className="w-4 h-4" />
            </button>
            {fine.status === 'pending' && (
              <>
                <button
                  onClick={() => {
                    setSelectedFine(fine);
                    setShowPaymentModal(true);
                  }}
                  className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded"
                  title="Marquer comme payée"
                >
                  <CheckCircle className="w-4 h-4" />
                </button>
                {fine.amount <= 5000 && (
                  <button
                    onClick={() => {
                      setSelectedFine(fine);
                      setShowWaiverModal(true);
                    }}
                    className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded"
                    title="Annuler l'amende"
                  >
                    <Ban className="w-4 h-4" />
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Modal de paiement
  const PaymentModal = () => {
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [notes, setNotes] = useState('');

    if (!showPaymentModal || !selectedFine) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-md">
          <h3 className="text-lg font-semibold mb-4">Confirmer le Paiement</h3>
          
          <div className="mb-4">
            <p className="text-sm text-gray-600">Utilisateur</p>
            <p className="font-semibold">{selectedFine.user.name}</p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-600">Montant à payer</p>
            <p className="text-2xl font-bold text-green-600">{formatPrice(selectedFine.amount)}</p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mode de paiement
            </label>
            <select 
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="cash">Espèces</option>
              <option value="check">Chèque</option>
              <option value="bank_transfer">Virement bancaire</option>
              <option value="mobile_money">Mobile Money</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes (optionnel)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="Commentaires sur le paiement..."
            />
          </div>

          <div className="flex space-x-3">
            <button
              onClick={() => {
                setShowPaymentModal(false);
                setSelectedFine(null);
              }}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              onClick={() => {
                // Logique de confirmation du paiement
                console.log('Paiement confirmé:', { fine: selectedFine, method: paymentMethod, notes });
                setShowPaymentModal(false);
                setSelectedFine(null);
              }}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Confirmer
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Modal d'annulation d'amende
  const WaiverModal = () => {
    const [reason, setReason] = useState('');

    if (!showWaiverModal || !selectedFine) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-md">
          <h3 className="text-lg font-semibold mb-4">Annuler l'Amende</h3>
          
          <div className="mb-4">
            <p className="text-sm text-gray-600">Utilisateur</p>
            <p className="font-semibold">{selectedFine.user.name}</p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-600">Montant de l'amende</p>
            <p className="text-2xl font-bold text-red-600">{formatPrice(selectedFine.amount)}</p>
          </div>

          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Limite bibliothécaire :</strong> Vous ne pouvez annuler que les amendes inférieures ou égales à 5 000 FCFA.
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Raison de l'annulation *
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="Expliquez pourquoi cette amende doit être annulée..."
              required
            />
          </div>

          <div className="flex space-x-3">
            <button
              onClick={() => {
                setShowWaiverModal(false);
                setSelectedFine(null);
                setReason('');
              }}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              onClick={() => {
                if (reason.trim()) {
                  // Logique d'annulation de l'amende
                  console.log('Amende annulée:', { fine: selectedFine, reason });
                  setShowWaiverModal(false);
                  setSelectedFine(null);
                  setReason('');
                }
              }}
              disabled={!reason.trim()}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirmer
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Receipt className="w-8 h-8 mr-3 text-primary-600" />
            Gestion des Amendes
          </h2>
          <p className="text-gray-600 mt-1">
            Gestion des amendes et pénalités - Limite d'annulation : {formatPrice(5000)}
          </p>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          icon={Clock} 
          title="En Attente" 
          value={fineStats.totalPending}
          subtitle={formatPrice(fineStats.totalPendingAmount)}
          color="yellow"
        />
        <StatCard 
          icon={CheckCircle} 
          title="Payées" 
          value={fineStats.totalPaid}
          subtitle={formatPrice(fineStats.totalPaidAmount)}
          color="green"
        />
        <StatCard 
          icon={Ban} 
          title="Annulées" 
          value={fineStats.totalWaived}
          subtitle={formatPrice(fineStats.totalWaivedAmount)}
          color="primary"
        />
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher par nom, ID étudiant, livre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">Tous les types</option>
            <option value="retard">Retard</option>
            <option value="livre perdu">Livre perdu</option>
            <option value="livre endommagé">Livre endommagé</option>
          </select>
          <div className="flex space-x-2">
            <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </button>
            <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
              <Printer className="w-4 h-4 mr-2" />
              Imprimer
            </button>
          </div>
        </div>
      </div>

      {/* Navigation par onglets */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'pending', label: 'En Attente', count: fineStats.totalPending, color: 'yellow' },
            { id: 'paid', label: 'Payées', count: fineStats.totalPaid, color: 'green' },
            { id: 'waived', label: 'Annulées', count: fineStats.totalWaived, color: 'blue' },
            { id: 'all', label: 'Toutes', count: mockFines.length, color: 'gray' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
              <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                tab.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                tab.color === 'green' ? 'bg-green-100 text-green-800' :
                tab.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Liste des amendes */}
      <div className="space-y-4">
        {filteredFines.length === 0 ? (
          <div className="text-center py-12">
            <Receipt className="w-12 h-12 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">Aucune amende trouvée</p>
            <p className="text-sm text-gray-400 mt-1">
              Modifiez vos critères de recherche ou vérifiez les filtres
            </p>
          </div>
        ) : (
          filteredFines.map(fine => (
            <FineItem key={fine.id} fine={fine} />
          ))
        )}
      </div>

      {/* Modals */}
      <PaymentModal />
      <WaiverModal />
    </div>
  );
};

export default FinesManagement;
