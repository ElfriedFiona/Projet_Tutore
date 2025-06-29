import React, { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Search, Edit, Trash2, Clock, CheckCircle, XCircle, DollarSign, Package, BookOpen, Monitor, Zap, Calendar, TrendingUp } from 'lucide-react';

const DashboardAcquisitions = () => {
  const [acquisitionRequests, setAcquisitionRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingRequest, setEditingRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  // Enhanced mock data with more comprehensive information
  useEffect(() => {
    const mockRequests = [
      {
        id: 1,
        type: 'book',
        title: "Clean Code: A Handbook of Agile Software Craftsmanship",
        author: "Robert C. Martin",
        isbn: "978-0132350884",
        publisher: "Prentice Hall",
        publicationYear: 2008,
        category: "Génie Logiciel",
        quantity: 5,
        unitPrice: 45.99,
        totalPrice: 229.95,
        supplier: "Amazon Business",
        description: "Guide pratique pour écrire du code propre et maintenable",
        justification: "Livre de référence pour le cours de génie logiciel",
        urgency: "medium",
        status: "pending",
        submissionDate: "2024-01-20",
        expectedDelivery: "2024-02-15",
        budgetCode: "DEPT-INFO-2024",
        reviewNotes: "",
        priority: "medium",
        department: "Informatique",
        estimatedSavings: 15.50,
        rating: 4.8
      },
      {
        id: 2,
        type: 'equipment',
        title: "Projecteur Interactif Epson EB-695Wi",
        author: "",
        isbn: "",
        publisher: "Epson",
        publicationYear: 2023,
        category: "Équipement Pédagogique",
        quantity: 1,
        unitPrice: 1299.00,
        totalPrice: 1299.00,
        supplier: "LDLC Pro",
        description: "Projecteur ultra-courte focale avec tableau blanc interactif",
        justification: "Nécessaire pour moderniser la salle de cours C201",
        urgency: "high",
        status: "approved",
        submissionDate: "2024-01-15",
        expectedDelivery: "2024-02-01",
        budgetCode: "DEPT-EQUIP-2024",
        reviewNotes: "Approuvé par le comité budgétaire",
        priority: "high",
        department: "Équipement",
        estimatedSavings: 200.00,
        rating: 4.9
      },
      {
        id: 3,
        type: 'book',
        title: "Introduction to Statistical Learning",
        author: "Gareth James, Daniela Witten",
        isbn: "978-1461471370",
        publisher: "Springer",
        publicationYear: 2021,
        category: "Statistiques",
        quantity: 10,
        unitPrice: 89.99,
        totalPrice: 899.90,
        supplier: "Springer Direct",
        description: "Manuel d'apprentissage statistique avec R",
        justification: "Support de cours pour le nouveau module de Data Science",
        urgency: "low",
        status: "rejected",
        submissionDate: "2024-01-10",
        expectedDelivery: "2024-02-20",
        budgetCode: "DEPT-INFO-2024",
        reviewNotes: "Budget dépassé pour cette catégorie cette année",
        priority: "low",
        department: "Mathématiques",
        estimatedSavings: 0,
        rating: 4.6
      },
      {
        id: 4,
        type: 'software',
        title: "Adobe Creative Suite Educational License",
        author: "",
        isbn: "",
        publisher: "Adobe",
        publicationYear: 2024,
        category: "Logiciels",
        quantity: 50,
        unitPrice: 29.99,
        totalPrice: 1499.50,
        supplier: "Adobe Education",
        description: "Suite complète de logiciels de création graphique pour étudiants",
        justification: "Nécessaire pour les cours de design et multimédia",
        urgency: "high",
        status: "pending",
        submissionDate: "2024-01-25",
        expectedDelivery: "2024-02-10",
        budgetCode: "DEPT-ART-2024",
        reviewNotes: "",
        priority: "high",
        department: "Arts Numériques",
        estimatedSavings: 750.25,
        rating: 4.7
      },
      {
        id: 5,
        type: 'subscription',
        title: "IEEE Digital Library Access",
        author: "",
        isbn: "",
        publisher: "IEEE",
        publicationYear: 2024,
        category: "Abonnement",
        quantity: 1,
        unitPrice: 2500.00,
        totalPrice: 2500.00,
        supplier: "IEEE Direct",
        description: "Accès complet à la bibliothèque numérique IEEE",
        justification: "Accès aux dernières publications scientifiques en ingénierie",
        urgency: "medium",
        status: "approved",
        submissionDate: "2024-01-12",
        expectedDelivery: "2024-02-01",
        budgetCode: "DEPT-BIBLIO-2024",
        reviewNotes: "Approuvé pour 1 an avec possibilité de renouvellement",
        priority: "medium",
        department: "Bibliothèque",
        estimatedSavings: 500.00,
        rating: 4.9
      }
    ];
    
    setTimeout(() => {
      setAcquisitionRequests(mockRequests);
      setLoading(false);
      setIsVisible(true);
    }, 1000);
  }, []);

  const [newRequest, setNewRequest] = useState({
    type: 'book',
    title: '',
    author: '',
    isbn: '',
    publisher: '',
    publicationYear: '',
    category: '',
    quantity: 1,
    unitPrice: '',
    supplier: '',
    description: '',
    justification: '',
    urgency: 'medium',
    expectedDelivery: '',
    budgetCode: ''
  });
  const filteredRequests = acquisitionRequests.filter(req => {
    const matchesSearch = req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         req.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || req.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Enhanced helper functions for visual design
  const getCategoryColor = (category) => {
    const colors = {
      'Génie Logiciel': 'from-primary-500 to-primary-600',
      'Équipement Pédagogique': 'from-green-500 to-emerald-600',
      'Statistiques': 'from-secondary-500 to-secondary-600',
      'Logiciels': 'from-secondary-500 to-red-600',
      'Abonnement': 'from-primary-500 to-secondary-600',
      'Informatique': 'from-primary-500 to-primary-600',
      'Mathématiques': 'from-primary-500 to-secondary-600',
      'Arts Numériques': 'from-secondary-500 to-secondary-600',
      'Bibliothèque': 'from-primary-500 to-primary-600',
    };
    return colors[category] || 'from-gray-500 to-gray-600';
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'book':
        return <BookOpen className="w-5 h-5" />;
      case 'equipment':
        return <Monitor className="w-5 h-5" />;
      case 'software':
        return <Zap className="w-5 h-5" />;
      case 'subscription':
        return <Calendar className="w-5 h-5" />;
      default:
        return <Package className="w-5 h-5" />;
    }
  };

  const getTypeEmoji = (type) => {
    switch (type) {
      case 'book':
        return '📚';
      case 'equipment':
        return '🖥️';
      case 'software':
        return '💻';
      case 'subscription':
        return '📅';
      default:
        return '📦';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-sm ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ★
      </span>
    ));
  };
  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'pending':
      default:
        return <Clock className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'approved':
        return 'Approuvée';
      case 'rejected':
        return 'Rejetée';
      case 'pending':
      default:
        return 'En attente';
    }
  };

  const calculateTotalPrice = () => {
    const quantity = parseInt(newRequest.quantity) || 0;
    const unitPrice = parseFloat(newRequest.unitPrice) || 0;
    return (quantity * unitPrice).toFixed(2);
  };

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    
    const request = {
      ...newRequest,
      id: Date.now(),
      totalPrice: calculateTotalPrice(),
      status: 'pending',
      submissionDate: new Date().toISOString().split('T')[0],
      reviewNotes: ''
    };

    if (editingRequest) {
      setAcquisitionRequests(prev => 
        prev.map(req => req.id === editingRequest.id ? 
          { ...request, id: editingRequest.id } : req
        )
      );
      setEditingRequest(null);
    } else {
      setAcquisitionRequests(prev => [...prev, request]);
    }

    setNewRequest({
      type: 'book',
      title: '',
      author: '',
      isbn: '',
      publisher: '',
      publicationYear: '',
      category: '',
      quantity: 1,
      unitPrice: '',
      supplier: '',
      description: '',
      justification: '',
      urgency: 'medium',
      expectedDelivery: '',
      budgetCode: ''
    });
    setShowAddModal(false);
  };

  const handleEdit = (request) => {
    setEditingRequest(request);
    setNewRequest(request);
    setShowAddModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette demande ?')) {
      setAcquisitionRequests(prev => prev.filter(req => req.id !== id));
    }
  };
  const RequestModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-primary-500 to-secondary-600 text-white p-4 rounded-xl w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              {editingRequest ? 'Modifier la demande' : 'Nouvelle demande d\'acquisition'}
            </h3>
            <p className="text-gray-600 mt-2">
              Remplissez les informations nécessaires pour votre demande
            </p>
          </div>
          
          <form onSubmit={handleSubmitRequest} className="space-y-6">
            {/* Type de demande */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                📦 Type de demande *
              </label>
              <select
                required
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-white"
                value={newRequest.type}
                onChange={(e) => setNewRequest(prev => ({ ...prev, type: e.target.value }))}
              >
                <option value="book">📚 Livre / Ouvrage</option>
                <option value="equipment">🖥️ Équipement</option>
                <option value="software">💻 Logiciel</option>
                <option value="subscription">📅 Abonnement</option>
                <option value="other">📦 Autre</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  ✏️ Titre / Nom *
                </label>
                <input
                  type="text"
                  required                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                  value={newRequest.title}
                  onChange={(e) => setNewRequest(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Nom du produit ou de l'ouvrage"
                />
              </div>
              
              {newRequest.type === 'book' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    👤 Auteur
                  </label>
                  <input
                    type="text"
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                    value={newRequest.author}
                    onChange={(e) => setNewRequest(prev => ({ ...prev, author: e.target.value }))}
                    placeholder="Nom de l'auteur"
                  />
                </div>
              )}
              
              {newRequest.type === 'book' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    🔢 ISBN
                  </label>
                  <input
                    type="text"                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                    value={newRequest.isbn}
                    onChange={(e) => setNewRequest(prev => ({ ...prev, isbn: e.target.value }))}
                    placeholder="978-XXXXXXXXXX"
                  />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  🏢 {newRequest.type === 'book' ? 'Éditeur' : 'Fabricant/Fournisseur'}
                </label>
                <input
                  type="text"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                  value={newRequest.publisher}
                  onChange={(e) => setNewRequest(prev => ({ ...prev, publisher: e.target.value }))}
                  placeholder="Nom de l'éditeur ou fabricant"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  📅 Année
                </label>
                <input
                  type="number"
                  min="1900"
                  max="2025"                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                  value={newRequest.publicationYear}
                  onChange={(e) => setNewRequest(prev => ({ ...prev, publicationYear: e.target.value }))}
                  placeholder="2024"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  📚 Catégorie *
                </label>
                <select
                  required
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                  value={newRequest.category}
                  onChange={(e) => setNewRequest(prev => ({ ...prev, category: e.target.value }))}
                >
                  <option value="">Sélectionner une catégorie</option>
                  <option value="Informatique">💻 Informatique</option>
                  <option value="Mathématiques">📊 Mathématiques</option>
                  <option value="Physique">⚛️ Physique</option>
                  <option value="Génie Logiciel">⚙️ Génie Logiciel</option>
                  <option value="Intelligence Artificielle">🤖 Intelligence Artificielle</option>
                  <option value="Équipement Pédagogique">🎓 Équipement Pédagogique</option>
                  <option value="Logiciels">💾 Logiciels</option>
                  <option value="Autre">📦 Autre</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  🔢 Quantité *
                </label>
                <input
                  type="number"
                  min="1"
                  required                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                  value={newRequest.quantity}
                  onChange={(e) => setNewRequest(prev => ({ ...prev, quantity: e.target.value }))}
                  placeholder="1"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  💰 Prix unitaire (FCFA) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                  value={newRequest.unitPrice}
                  onChange={(e) => setNewRequest(prev => ({ ...prev, unitPrice: e.target.value }))}
                  placeholder="0.00"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  🏪 Fournisseur suggéré
                </label>
                <input
                  type="text"                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                  value={newRequest.supplier}
                  onChange={(e) => setNewRequest(prev => ({ ...prev, supplier: e.target.value }))}
                  placeholder="Ex: Amazon, FNAC, LDLC..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  ⚡ Urgence
                </label>
                <select
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                  value={newRequest.urgency}
                  onChange={(e) => setNewRequest(prev => ({ ...prev, urgency: e.target.value }))}
                >
                  <option value="low">🟢 Faible</option>
                  <option value="medium">🟡 Moyenne</option>
                  <option value="high">🔴 Élevée</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  🚚 Livraison souhaitée
                </label>
                <input
                  type="date"                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                  value={newRequest.expectedDelivery}
                  onChange={(e) => setNewRequest(prev => ({ ...prev, expectedDelivery: e.target.value }))}
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  🏷️ Code budgétaire
                </label>
                <input
                  type="text"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                  value={newRequest.budgetCode}
                  onChange={(e) => setNewRequest(prev => ({ ...prev, budgetCode: e.target.value }))}
                  placeholder="Ex: DEPT-INFO-2024"
                />
              </div>
            </div>
            
            {/* Prix total calculé */}
            {newRequest.quantity && newRequest.unitPrice && (              <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-6 rounded-2xl border border-primary-200">
                <div className="flex items-center justify-center">
                  <DollarSign className="w-8 h-8 text-primary-600 mr-3" />
                  <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                    Prix total: {calculateTotalPrice().toFixed(0)} FCFA
                  </span>
                </div>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                📝 Description *
              </label>
              <textarea
                required
                rows="4"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                value={newRequest.description}
                onChange={(e) => setNewRequest(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Description détaillée de l'article..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🎯 Justification pédagogique *
              </label>
              <textarea
                required
                rows="4"                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                value={newRequest.justification}
                onChange={(e) => setNewRequest(prev => ({ ...prev, justification: e.target.value }))}
                placeholder="Pourquoi cet achat est-il nécessaire ?"
              />
            </div>

            <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => {
                  setShowAddModal(false);
                  setEditingRequest(null);
                  setNewRequest({
                    type: 'book',
                    title: '',
                    author: '',
                    isbn: '',
                    publisher: '',
                    publicationYear: '',
                    category: '',
                    quantity: 1,
                    unitPrice: '',
                    supplier: '',
                    description: '',
                    justification: '',
                    urgency: 'medium',
                    expectedDelivery: '',
                    budgetCode: ''
                  });
                }}
                className="px-6 py-3 text-gray-700 bg-gray-200 rounded-xl hover:bg-gray-300 transition-all duration-300 hover:scale-105"
              >
                ❌ Annuler
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-primary-500 to-secondary-600 text-white rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
              >
                {editingRequest ? '✏️ Modifier' : '✅ Soumettre'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            {/* Header skeleton */}
            <div className="mb-8">
              <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-2/3 mb-4"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-1/2 mb-8"></div>
              
              {/* Stats skeleton */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl mr-4"></div>
                      <div className="flex-1">
                        <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-2"></div>
                        <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-2/3"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Cards skeleton */}
            <div className="space-y-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
                  <div className="animate-pulse">
                    <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4 mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
                      <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-5/6"></div>
                      <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-4/6"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const totalPendingValue = acquisitionRequests
    .filter(req => req.status === 'pending')
    .reduce((sum, req) => sum + parseFloat(req.totalPrice), 0);  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Enhanced Header */}
        <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 via-primary-700 to-secondary-600 bg-clip-text text-transparent mb-4 flex items-center justify-center">
              <ShoppingCart className="w-10 h-10 md:w-12 md:h-12 mr-4 text-primary-600" />
              Demandes d'acquisition
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Gérez vos demandes d'achat d'ouvrages et d'équipements pédagogiques avec un système moderne et efficace
            </p>
          </div>
          
          {/* Enhanced Statistics Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">            {[
              {
                icon: <Clock className="w-8 h-8" />,
                value: acquisitionRequests.filter(r => r.status === 'pending').length,
                label: 'En attente',
                color: 'from-secondary-400 to-secondary-500',
                bgColor: 'from-secondary-50 to-secondary-100'
              },
              {
                icon: <CheckCircle className="w-8 h-8" />,
                value: acquisitionRequests.filter(r => r.status === 'approved').length,
                label: 'Approuvées',
                color: 'from-green-400 to-emerald-500',
                bgColor: 'from-green-50 to-emerald-50'
              },
              {
                icon: <XCircle className="w-8 h-8" />,
                value: acquisitionRequests.filter(r => r.status === 'rejected').length,
                label: 'Rejetées',
                color: 'from-red-400 to-rose-500',
                bgColor: 'from-red-50 to-rose-50'
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                value: `${totalPendingValue.toFixed(0)} FCFA`,
                label: 'Valeur en attente',
                color: 'from-primary-400 to-primary-500',
                bgColor: 'from-primary-50 to-primary-100'
              }
            ].map((stat, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${stat.bgColor} backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 hover:scale-105 transition-all duration-300 hover:shadow-2xl`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: isVisible ? 'slideInUp 0.6s ease-out forwards' : 'none'
                }}
              >
                <div className="flex items-center">
                  <div className={`bg-gradient-to-r ${stat.color} text-white p-3 rounded-xl mr-4 shadow-lg`}>
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </p>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>        {/* Enhanced Actions Bar */}
        <div className={`flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ animationDelay: '400ms' }}>
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            {/* Enhanced Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher par titre, auteur..."
                className="pl-12 pr-4 py-3 w-full sm:w-80 bg-white/80 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 shadow-lg hover:shadow-xl"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Enhanced Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 bg-white/80 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <option value="all">📋 Tous les statuts</option>
              <option value="pending">⏳ En attente</option>
              <option value="approved">✅ Approuvées</option>
              <option value="rejected">❌ Rejetées</option>
            </select>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:scale-105 transition-all duration-300 flex items-center shadow-lg hover:shadow-2xl w-full sm:w-auto justify-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Nouvelle demande
          </button>
        </div>        {/* Enhanced Request List */}
        <div className={`space-y-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ animationDelay: '600ms' }}>
          {filteredRequests.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 shadow-xl border border-white/20 max-w-md mx-auto">
                <div className="bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                  <ShoppingCart className="w-12 h-12 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {searchTerm || statusFilter !== 'all' 
                    ? 'Aucune demande trouvée' 
                    : 'Aucune demande pour le moment'
                  }
                </h3>
                <p className="text-gray-600 mb-8">
                  {searchTerm || statusFilter !== 'all'
                    ? 'Essayez de modifier vos critères de recherche.'
                    : 'Commencez par créer votre première demande d\'acquisition.'
                  }
                </p>
                {(!searchTerm && statusFilter === 'all') && (
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-xl hover:scale-105 transition-all duration-300 flex items-center mx-auto shadow-lg hover:shadow-2xl"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Nouvelle demande
                  </button>
                )}
              </div>
            </div>
          ) : (
            filteredRequests.map((request, index) => (
              <div 
                key={request.id} 
                className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6 hover:scale-[1.01] transition-all duration-300 hover:shadow-2xl"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: isVisible ? 'slideInUp 0.6s ease-out forwards' : 'none'
                }}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${getCategoryColor(request.category)} text-white`}>
                        {getTypeIcon(request.type)}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{request.title}</h3>
                        {request.author && <p className="text-gray-600">Par {request.author}</p>}
                      </div>
                      <div className="flex items-center gap-2 ml-auto">
                        {getStatusIcon(request.status)}
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(request.priority)}`}>
                          {getTypeEmoji(request.type)} {request.urgency === 'high' ? 'Urgent' : request.urgency === 'medium' ? 'Normal' : 'Faible'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <span className="text-gray-500 block">Catégorie</span>
                        <span className="font-semibold text-gray-900">{request.category}</span>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <span className="text-gray-500 block">Quantité</span>
                        <span className="font-semibold text-gray-900">{request.quantity}</span>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <span className="text-gray-500 block">Prix unitaire</span>
                        <span className="font-semibold text-gray-900">{parseFloat(request.unitPrice).toFixed(0)} FCFA</span>
                      </div>
                      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-3">
                        <span className="text-indigo-600 block">Total</span>
                        <span className="font-bold text-indigo-900 text-lg">{parseFloat(request.totalPrice).toFixed(0)} FCFA</span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-gray-700 mb-2 bg-gray-50 rounded-lg p-3">
                        <strong className="text-gray-900">Description:</strong> {request.description}
                      </p>
                      <p className="text-gray-700 bg-blue-50 rounded-lg p-3">
                        <strong className="text-blue-900">Justification:</strong> {request.justification}
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Soumis le {new Date(request.submissionDate).toLocaleDateString()}
                      </span>
                      {request.expectedDelivery && (
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          Livraison: {new Date(request.expectedDelivery).toLocaleDateString()}
                        </span>
                      )}
                      {request.supplier && (
                        <span className="flex items-center">
                          <Package className="w-4 h-4 mr-1" />
                          {request.supplier}
                        </span>
                      )}
                      {request.rating && (
                        <div className="flex items-center">
                          {renderStars(Math.floor(request.rating))}
                          <span className="ml-1 text-gray-600">({request.rating})</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(request.status)}
                    <span className="text-sm font-semibold text-gray-700">
                      {getStatusText(request.status)}
                    </span>
                    {request.estimatedSavings > 0 && (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                        💰 Économie: {request.estimatedSavings}€
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {request.status === 'pending' && (
                      <button
                        onClick={() => handleEdit(request)}
                        className="p-3 text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-300 hover:scale-105"
                        title="Modifier"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(request.id)}
                      className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 hover:scale-105"
                      title="Supprimer"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {request.reviewNotes && (
                  <div className="mt-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                    <p className="text-sm text-amber-800">
                      <strong>📝 Notes de révision:</strong> {request.reviewNotes}
                    </p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Modal */}
        {showAddModal && <RequestModal />}
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default DashboardAcquisitions;
