import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, DollarSign, User, Calendar, Book,
  Search, Filter, Mail, Phone, CreditCard, Eye,
  CheckCircle, Clock, Ban, Download, FileText
} from 'lucide-react';

const FineManagement = () => {
  const [fines, setFines] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedFine, setSelectedFine] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock data pour les amendes
  const mockFines = [
    {
      id: 1,
      student: {
        id: 102,
        name: "Jean Mballa",
        email: "jean.mballa@enspd.edu.cm",
        phone: "+237 6XX XXX XXX",
        studentId: "20231089",
        program: "Licence Histoire"
      },
      book: {
        title: "Histoire du Cameroun Contemporain",
        author: "Prof. Marie Bamileke",
        isbn: "978-2-987654-32-1"
      },
      loanId: 2,
      amount: 1200,
      reason: "Retard de restitution",
      daysOverdue: 12,
      dateCreated: "2024-02-01",
      dateDue: "2024-02-15",
      datePaid: null,
      status: "Impayée",
      paymentMethod: null,
      notes: "Livre rendu le 01/02/2024 avec 12 jours de retard (100 FCFA/jour)"
    },
    {
      id: 2,
      student: {
        id: 104,
        name: "Alice Fotso",
        email: "alice.fotso@enspd.edu.cm",
        phone: "+237 6XX XXX XXX",
        studentId: "20231203",
        program: "Master Mathématiques"
      },
      book: {
        title: "Analyse Complexe Avancée",
        author: "Dr. Paul Kamga",
        isbn: "978-2-789123-45-6"
      },
      loanId: 5,
      amount: 2500,
      reason: "Livre endommagé",
      daysOverdue: 0,
      dateCreated: "2024-01-28",
      dateDue: "2024-02-12",
      datePaid: "2024-02-10",
      status: "Payée",
      paymentMethod: "Espèces",
      notes: "Dégâts d'eau sur plusieurs pages. Paiement effectué en espèces."
    },
    {
      id: 3,
      student: {
        id: 105,
        name: "Robert Ndiaye",
        email: "robert.ndiaye@enspd.edu.cm",
        phone: "+237 6XX XXX XXX",
        studentId: "20231087",
        program: "Licence Physique"
      },
      book: {
        title: "Mécanique Quantique",
        author: "Dr. Sophie Ateba",
        isbn: "978-2-345678-90-1"
      },
      loanId: 8,
      amount: 500,
      reason: "Retard de restitution",
      daysOverdue: 5,
      dateCreated: "2024-02-03",
      dateDue: "2024-02-17",
      datePaid: null,
      status: "En cours",
      paymentMethod: null,
      notes: "Première amende - Étudiant contacté par email"
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'Toutes les amendes', count: 23 },
    { value: 'Impayée', label: 'Impayées', count: 12 },
    { value: 'En cours', label: 'En cours', count: 8 },
    { value: 'Payée', label: 'Payées', count: 3 }
  ];

  const reasonOptions = [
    'Retard de restitution',
    'Livre endommagé',
    'Livre perdu',
    'Non-respect du règlement'
  ];

  useEffect(() => {
    setTimeout(() => {
      setFines(mockFines);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredFines = fines.filter(fine => {
    const matchesSearch = 
      fine.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fine.student.studentId.includes(searchTerm) ||
      fine.book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fine.book.isbn.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || fine.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Payée': return 'bg-green-100 text-green-800';
      case 'Impayée': return 'bg-red-100 text-red-800';
      case 'En cours': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getReasionIcon = (reason) => {
    switch (reason) {
      case 'Retard de restitution': return <Clock className="w-4 h-4" />;
      case 'Livre endommagé': return <AlertTriangle className="w-4 h-4" />;
      case 'Livre perdu': return <Ban className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const handlePayment = (fineId, paymentMethod) => {
    setFines(prevFines =>
      prevFines.map(fine =>
        fine.id === fineId
          ? { 
              ...fine, 
              status: 'Payée', 
              datePaid: new Date().toISOString().split('T')[0],
              paymentMethod 
            }
          : fine
      )
    );
  };

  const FineCard = ({ fine }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            {getReasionIcon(fine.reason)}
            <h3 className="font-semibold text-gray-900">{fine.reason}</h3>
          </div>
          <p className="text-2xl font-bold text-red-600 mb-1">{fine.amount.toLocaleString()} FCFA</p>
          <p className="text-sm text-gray-500">Créée le {new Date(fine.dateCreated).toLocaleDateString('fr-FR')}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(fine.status)}`}>
          {fine.status}
        </span>
      </div>

      <div className="border-t border-gray-100 pt-4 mb-4">
        <div className="flex items-center space-x-3 mb-3">
          <User className="w-4 h-4 text-gray-400" />
          <div>
            <p className="font-medium text-gray-900">{fine.student.name}</p>
            <p className="text-sm text-gray-500">{fine.student.studentId} • {fine.student.program}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 mb-3">
          <Book className="w-4 h-4 text-gray-400" />
          <div>
            <p className="font-medium text-gray-900 text-sm">{fine.book.title}</p>
            <p className="text-xs text-gray-500">{fine.book.author}</p>
          </div>
        </div>
      </div>

      {fine.daysOverdue > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
          <p className="text-sm text-red-800">
            <Clock className="w-4 h-4 inline mr-1" />
            {fine.daysOverdue} jour{fine.daysOverdue > 1 ? 's' : ''} de retard
          </p>
        </div>
      )}

      <div className="flex space-x-2">
        {fine.status === 'Impayée' || fine.status === 'En cours' ? (
          <>
            <button
              onClick={() => handlePayment(fine.id, 'Espèces')}
              className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
            >
              <CheckCircle className="w-4 h-4 inline mr-1" />
              Marquer payée
            </button>
            <button
              onClick={() => setSelectedFine(fine)}
              className="flex-1 bg-primary-600 text-white py-2 px-3 rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
            >
              <Eye className="w-4 h-4 inline mr-1" />
              Détails
            </button>
          </>
        ) : (
          <button
            onClick={() => setSelectedFine(fine)}
            className="flex-1 bg-primary-600 text-white py-2 px-3 rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
          >
            <Eye className="w-4 h-4 inline mr-1" />
            Voir reçu
          </button>
        )}
      </div>

      {fine.dateDue && (
        <div className="mt-3 text-xs text-gray-500">
          Échéance: {new Date(fine.dateDue).toLocaleDateString('fr-FR')}
        </div>
      )}
    </div>
  );

  const FineDetailModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Détails de l'Amende</h2>
            <button
              onClick={() => setSelectedFine(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Informations de l'amende */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Amende</h3>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                {getReasionIcon(selectedFine?.reason)}
                <span className="font-medium text-red-900">{selectedFine?.reason}</span>
              </div>
              <p className="text-2xl font-bold text-red-600 mb-2">
                {selectedFine?.amount.toLocaleString()} FCFA
              </p>
              <div className="text-sm text-red-700 space-y-1">
                <p>Créée le: {new Date(selectedFine?.dateCreated).toLocaleDateString('fr-FR')}</p>
                {selectedFine?.dateDue && (
                  <p>Échéance: {new Date(selectedFine?.dateDue).toLocaleDateString('fr-FR')}</p>
                )}
                {selectedFine?.datePaid && (
                  <p>Payée le: {new Date(selectedFine?.datePaid).toLocaleDateString('fr-FR')}</p>
                )}
              </div>
            </div>
          </div>

          {/* Informations de l'étudiant */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Étudiant</h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium text-gray-900">{selectedFine?.student.name}</p>
                  <p className="text-sm text-gray-500">{selectedFine?.student.studentId}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{selectedFine?.student.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{selectedFine?.student.phone}</span>
              </div>
            </div>
          </div>

          {/* Informations du livre */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Ouvrage concerné</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-1">{selectedFine?.book.title}</h4>
              <p className="text-gray-600 mb-2">{selectedFine?.book.author}</p>
              <p className="text-sm text-gray-500">ISBN: {selectedFine?.book.isbn}</p>
            </div>
          </div>

          {/* Détails du paiement */}
          {selectedFine?.status === 'Payée' && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Paiement</h3>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-green-900">Amende payée</span>
                </div>
                <div className="text-sm text-green-700 space-y-1">
                  <p>Montant: {selectedFine?.amount.toLocaleString()} FCFA</p>
                  <p>Mode de paiement: {selectedFine?.paymentMethod}</p>
                  <p>Date: {new Date(selectedFine?.datePaid).toLocaleDateString('fr-FR')}</p>
                </div>
              </div>
            </div>
          )}

          {/* Notes */}
          {selectedFine?.notes && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Notes</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-700">{selectedFine?.notes}</p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-3">
            {selectedFine?.status !== 'Payée' && (
              <button
                onClick={() => {
                  handlePayment(selectedFine.id, 'Espèces');
                  setSelectedFine(null);
                }}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <CheckCircle className="w-4 h-4 inline mr-2" />
                Marquer comme payée
              </button>
            )}
            <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
              <FileText className="w-4 h-4 inline mr-2" />
              Générer reçu
            </button>
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

  const totalFines = fines.reduce((sum, fine) => sum + fine.amount, 0);
  const unpaidFines = fines.filter(fine => fine.status === 'Impayée');
  const paidFines = fines.filter(fine => fine.status === 'Payée');

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Gestion des Amendes</h1>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total amendes</p>
              <p className="text-2xl font-bold text-gray-900">{totalFines.toLocaleString()} F</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Impayées</p>
              <p className="text-2xl font-bold text-gray-900">{unpaidFines.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Payées</p>
              <p className="text-2xl font-bold text-gray-900">{paidFines.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Recettes du mois</p>
              <p className="text-2xl font-bold text-gray-900">
                {paidFines.reduce((sum, fine) => sum + fine.amount, 0).toLocaleString()} F
              </p>
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
                placeholder="Rechercher par étudiant, livre ou ID..."
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
              Rapport mensuel
            </button>
          </div>
        </div>
      </div>

      {/* Liste des amendes */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Amendes ({filteredFines.length})
          </h3>
        </div>
        
        <div className="p-6">
          {filteredFines.length === 0 ? (
            <div className="text-center py-16">
              <DollarSign className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Aucune amende trouvée</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredFines.map(fine => (
                <FineCard key={fine.id} fine={fine} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal de détails */}
      {selectedFine && <FineDetailModal />}
    </div>
  );
};

export default FineManagement;
