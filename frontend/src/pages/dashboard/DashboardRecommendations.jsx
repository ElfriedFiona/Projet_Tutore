import React, { useState, useEffect } from 'react';
import { BookOpen, Plus, Search, Edit, Trash2, CheckCircle, XCircle, Clock, Star, TrendingUp, Award, Target, Calendar, DollarSign, BookmarkPlus, Lightbulb } from 'lucide-react';

const DashboardRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingRecommendation, setEditingRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Enhanced mock data pour les recommandations avec plus de détails
  useEffect(() => {
    const mockRecommendations = [
      {
        id: 1,
        title: "L'Art de la Programmation",
        author: "Donald Knuth",
        isbn: "978-0201896831",
        publisher: "Addison-Wesley",
        publicationYear: 2011,
        category: "Informatique",
        description: "Un ouvrage fondamental pour tout étudiant en informatique, couvrant les algorithmes et structures de données avancées",
        justification: "Référence incontournable pour les algorithmes avancés. Ce livre complète parfaitement notre cursus d'algorithmique.",
        targetAudience: "Étudiants en Master Informatique",
        status: "pending",
        submissionDate: "2024-01-15",
        reviewDate: null,
        reviewNotes: "",
        estimatedCost: 85.50,
        priority: "high",
        rating: 4.8,
        reviews: 1247,
        pages: 896,
        language: "Français",
        submittedBy: "Prof. Martin Dubois",
        department: "Informatique",
        coursesRelated: ["Algorithmes Avancés", "Structures de Données"],
        expectedStudents: 45,
        academicLevel: "Master",
        urgency: "Prochain semestre"
      },
      {
        id: 2,
        title: "Machine Learning: A Probabilistic Perspective",
        author: "Kevin Murphy",
        isbn: "978-0262018029",
        publisher: "MIT Press",
        publicationYear: 2012,
        category: "Intelligence Artificielle",
        description: "Guide complet sur l'apprentissage automatique avec une approche probabiliste moderne",
        justification: "Essentiel pour le nouveau cours d'IA. Approche mathématique rigoureuse nécessaire pour nos étudiants.",
        targetAudience: "Étudiants en Master IA",
        status: "approved",
        submissionDate: "2024-01-10",
        reviewDate: "2024-01-20",
        reviewNotes: "Approuvé pour achat prioritaire. Budget alloué: 150 000 FCFA pour 5 exemplaires.",
        estimatedCost: 120.00,
        priority: "high",
        rating: 4.9,
        reviews: 892,
        pages: 1104,
        language: "Anglais",
        submittedBy: "Dr. Sophie Laurent",
        department: "Intelligence Artificielle",
        coursesRelated: ["Machine Learning", "Statistiques Bayésiennes"],
        expectedStudents: 32,
        academicLevel: "Master",
        urgency: "Immédiat"
      },
      {
        id: 3,
        title: "Design Patterns",
        author: "Gang of Four",
        isbn: "978-0201633610",
        publisher: "Addison-Wesley",
        publicationYear: 1994,
        category: "Génie Logiciel",
        description: "Patterns de conception orientée objet - référence mondiale pour l'architecture logicielle",
        justification: "Complément nécessaire au cours de génie logiciel. Patterns essentiels pour tout développeur.",
        targetAudience: "Étudiants en Licence et Master",
        status: "rejected",
        submissionDate: "2024-01-05",
        reviewDate: "2024-01-18",
        reviewNotes: "Budget insuffisant cette année, reporter à l'année prochaine. Priorité réduite car version numérique disponible.",
        estimatedCost: 65.00,
        priority: "medium",
        rating: 4.6,
        reviews: 2156,
        pages: 395,
        language: "Français",
        submittedBy: "Prof. Jean Lefebvre",
        department: "Génie Logiciel",
        coursesRelated: ["Architecture Logicielle", "Conception OO"],
        expectedStudents: 78,
        academicLevel: "Licence/Master",
        urgency: "Fin d'année"
      },
      {
        id: 4,
        title: "Deep Learning",
        author: "Ian Goodfellow, Yoshua Bengio, Aaron Courville",
        isbn: "978-0262035613",
        publisher: "MIT Press",
        publicationYear: 2016,
        category: "Intelligence Artificielle",
        description: "Le manuel de référence sur l'apprentissage profond par les pionniers du domaine",
        justification: "Indispensable pour le nouveau programme de Deep Learning. Auteurs reconnus mondialement.",
        targetAudience: "Master IA et Doctorants",
        status: "pending",
        submissionDate: "2024-02-01",
        reviewDate: null,
        reviewNotes: "",
        estimatedCost: 95.00,
        priority: "high",
        rating: 4.7,
        reviews: 743,
        pages: 800,
        language: "Anglais",
        submittedBy: "Dr. Claire Moreau",
        department: "Intelligence Artificielle",
        coursesRelated: ["Deep Learning", "Réseaux de Neurones"],
        expectedStudents: 28,
        academicLevel: "Master/Doctorat",
        urgency: "Rentrée prochaine"
      }
    ];
    
    setTimeout(() => {
      setRecommendations(mockRecommendations);
      setLoading(false);
    }, 1000);
  }, []);

  const [newRecommendation, setNewRecommendation] = useState({
    title: '',
    author: '',
    isbn: '',
    publisher: '',
    publicationYear: '',
    category: '',
    description: '',
    justification: '',
    targetAudience: '',
    estimatedCost: '',
    priority: 'medium',
    department: '',
    coursesRelated: [],
    expectedStudents: '',
    academicLevel: '',    urgency: ''
  });

  // Helper functions
  const getCategoryColor = (category) => {
    const colors = {
      'Informatique': 'bg-primary-100 text-primary-800 border-primary-200',
      'Intelligence Artificielle': 'bg-secondary-100 text-secondary-800 border-secondary-200',
      'Génie Logiciel': 'bg-primary-200 text-primary-800 border-primary-300',
      'Mathématiques': 'bg-secondary-200 text-secondary-800 border-secondary-300',
      'Physique': 'bg-primary-100 text-primary-800 border-primary-200',
      'Réseaux': 'bg-secondary-100 text-secondary-800 border-secondary-200'
    };
    return colors[category] || 'bg-neutral-100 text-neutral-800 border-neutral-200';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Informatique': '💻',
      'Intelligence Artificielle': '🤖',
      'Génie Logiciel': '⚙️',
      'Mathématiques': '📐',
      'Physique': '⚛️',
      'Réseaux': '🌐'
    };
    return icons[category] || '📚';
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />);
    }
    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-3 h-3 fill-yellow-400/50 text-yellow-400" />);
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push(<Star key={i} className="w-3 h-3 text-gray-300" />);
    }
    return stars;
  };
  const getUrgencyColor = (urgency) => {
    const colors = {
      'Immédiat': 'bg-red-500/20 text-red-700 border-red-200',
      'Prochain semestre': 'bg-secondary-500/20 text-secondary-700 border-secondary-200',
      'Rentrée prochaine': 'bg-primary-500/20 text-primary-700 border-primary-200',
      'Fin d\'année': 'bg-green-500/20 text-green-700 border-green-200'
    };
    return colors[urgency] || 'bg-gray-500/20 text-gray-700 border-gray-200';
  };

  const filteredRecommendations = recommendations.filter(rec => {
    const matchesSearch = rec.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rec.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rec.submittedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || rec.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-secondary-100 text-secondary-800 border-secondary-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleSubmitRecommendation = (e) => {
    e.preventDefault();
    
    const recommendation = {
      ...newRecommendation,
      id: Date.now(),
      status: 'pending',
      submissionDate: new Date().toISOString().split('T')[0],
      reviewDate: null,
      reviewNotes: '',
      rating: (Math.random() * 1.5 + 3.5).toFixed(1),
      reviews: Math.floor(Math.random() * 1000 + 100),
      pages: Math.floor(Math.random() * 800 + 200),
      language: 'Français',
      submittedBy: 'Utilisateur actuel'
    };

    if (editingRecommendation) {
      setRecommendations(prev => 
        prev.map(rec => rec.id === editingRecommendation.id ? 
          { ...recommendation, id: editingRecommendation.id } : rec
        )
      );
      setEditingRecommendation(null);
    } else {
      setRecommendations(prev => [...prev, recommendation]);
    }

    setNewRecommendation({
      title: '',
      author: '',
      isbn: '',
      publisher: '',
      publicationYear: '',
      category: '',
      description: '',
      justification: '',
      targetAudience: '',
      estimatedCost: '',
      priority: 'medium',
      department: '',
      coursesRelated: [],
      expectedStudents: '',
      academicLevel: '',
      urgency: ''
    });
    setShowAddModal(false);
  };

  const handleEdit = (recommendation) => {
    setEditingRecommendation(recommendation);
    setNewRecommendation(recommendation);
    setShowAddModal(true);
  };
  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette recommandation ?')) {
      setRecommendations(prev => prev.filter(rec => rec.id !== id));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="p-6">
          <div className="animate-pulse">
            <div className="h-10 bg-gradient-to-r from-primary-200 to-secondary-200 rounded-xl w-1/3 mb-4"></div>
            <div className="h-6 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-lg w-1/2 mb-8"></div>
            <div className="space-y-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-32 bg-white/60 backdrop-blur-sm rounded-xl shadow-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const RecommendationModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
        <div className="p-8">
          <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            {editingRecommendation ? 'Modifier la recommandation' : 'Nouvelle recommandation'}
          </h3>
          
          <form onSubmit={handleSubmitRecommendation} className="space-y-6">            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Titre *
                </label>
                <input
                  type="text"
                  required
                  className="w-full border-2 border-primary-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-white/70 backdrop-blur-sm"
                  value={newRecommendation.title}
                  onChange={(e) => setNewRecommendation(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Auteur *
                </label>                <input
                  type="text"
                  required
                  className="w-full border-2 border-primary-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-white/70 backdrop-blur-sm"
                  value={newRecommendation.author}
                  onChange={(e) => setNewRecommendation(prev => ({ ...prev, author: e.target.value }))}
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  ISBN
                </label>
                <input
                  type="text"
                  className="w-full border-2 border-primary-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-white/70 backdrop-blur-sm"
                  value={newRecommendation.isbn}
                  onChange={(e) => setNewRecommendation(prev => ({ ...prev, isbn: e.target.value }))}
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Éditeur
                </label>
                <input
                  type="text"
                  className="w-full border-2 border-primary-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-white/70 backdrop-blur-sm"
                  value={newRecommendation.publisher}
                  onChange={(e) => setNewRecommendation(prev => ({ ...prev, publisher: e.target.value }))}
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Année de publication
                </label>
                <input
                  type="number"
                  min="1900"
                  max="2025"
                  className="w-full border-2 border-primary-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-white/70 backdrop-blur-sm"
                  value={newRecommendation.publicationYear}
                  onChange={(e) => setNewRecommendation(prev => ({ ...prev, publicationYear: e.target.value }))}
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Catégorie *
                </label>
                <select
                  required
                  className="w-full border-2 border-primary-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-white/70 backdrop-blur-sm"
                  value={newRecommendation.category}
                  onChange={(e) => setNewRecommendation(prev => ({ ...prev, category: e.target.value }))}
                >
                  <option value="">Sélectionner une catégorie</option>
                  <option value="Informatique">💻 Informatique</option>
                  <option value="Intelligence Artificielle">🤖 Intelligence Artificielle</option>
                  <option value="Génie Logiciel">⚙️ Génie Logiciel</option>
                  <option value="Mathématiques">📐 Mathématiques</option>
                  <option value="Physique">⚛️ Physique</option>
                  <option value="Réseaux">🌐 Réseaux</option>
                  <option value="Base de données">🗄️ Base de données</option>
                  <option value="Autre">📚 Autre</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Coût estimé (FCFA)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  className="w-full border-2 border-primary-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-white/70 backdrop-blur-sm"
                  value={newRecommendation.estimatedCost}
                  onChange={(e) => setNewRecommendation(prev => ({ ...prev, estimatedCost: e.target.value }))}
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Priorité
                </label>
                <select
                  className="w-full border-2 border-primary-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-white/70 backdrop-blur-sm"
                  value={newRecommendation.priority}
                  onChange={(e) => setNewRecommendation(prev => ({ ...prev, priority: e.target.value }))}
                >
                  <option value="low">🟢 Faible</option>
                  <option value="medium">🟡 Moyenne</option>
                  <option value="high">🔴 Élevée</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Département
                </label>
                <input
                  type="text"
                  className="w-full border-2 border-primary-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-white/70 backdrop-blur-sm"
                  value={newRecommendation.department}
                  onChange={(e) => setNewRecommendation(prev => ({ ...prev, department: e.target.value }))}
                  placeholder="Ex: Informatique"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Étudiants concernés
                </label>
                <input
                  type="number"
                  min="1"
                  className="w-full border-2 border-primary-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-white/70 backdrop-blur-sm"
                  value={newRecommendation.expectedStudents}
                  onChange={(e) => setNewRecommendation(prev => ({ ...prev, expectedStudents: e.target.value }))}
                  placeholder="Nombre d'étudiants"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Niveau académique
                </label>
                <select
                  className="w-full border-2 border-primary-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-white/70 backdrop-blur-sm"
                  value={newRecommendation.academicLevel}
                  onChange={(e) => setNewRecommendation(prev => ({ ...prev, academicLevel: e.target.value }))}
                >
                  <option value="">Sélectionner un niveau</option>
                  <option value="Licence">🎓 Licence</option>
                  <option value="Master">🎓 Master</option>
                  <option value="Doctorat">🎓 Doctorat</option>
                  <option value="Licence/Master">🎓 Licence/Master</option>
                  <option value="Master/Doctorat">🎓 Master/Doctorat</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Urgence
                </label>
                <select
                  className="w-full border-2 border-primary-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-white/70 backdrop-blur-sm"
                  value={newRecommendation.urgency}
                  onChange={(e) => setNewRecommendation(prev => ({ ...prev, urgency: e.target.value }))}
                >
                  <option value="">Sélectionner l'urgence</option>
                  <option value="Immédiat">🔴 Immédiat</option>
                  <option value="Prochain semestre">🟡 Prochain semestre</option>
                  <option value="Rentrée prochaine">🟢 Rentrée prochaine</option>
                  <option value="Fin d'année">🔵 Fin d'année</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                required
                rows="3"
                className="w-full border-2 border-primary-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-white/70 backdrop-blur-sm"
                value={newRecommendation.description}
                onChange={(e) => setNewRecommendation(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Description détaillée du livre..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Justification pédagogique *
              </label>
              <textarea
                required
                rows="3"
                className="w-full border-2 border-primary-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-white/70 backdrop-blur-sm"
                value={newRecommendation.justification}
                onChange={(e) => setNewRecommendation(prev => ({ ...prev, justification: e.target.value }))}
                placeholder="Pourquoi ce livre est-il nécessaire pour vos cours ?"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Public cible *
              </label>
              <input
                type="text"
                required
                className="w-full border-2 border-primary-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-white/70 backdrop-blur-sm"
                value={newRecommendation.targetAudience}
                onChange={(e) => setNewRecommendation(prev => ({ ...prev, targetAudience: e.target.value }))}
                placeholder="Ex: Étudiants en Master Informatique"
              />
            </div>

            <div className="flex justify-end gap-4 pt-6">
              <button
                type="button"
                onClick={() => {
                  setShowAddModal(false);
                  setEditingRecommendation(null);
                  setNewRecommendation({
                    title: '',
                    author: '',
                    isbn: '',
                    publisher: '',
                    publicationYear: '',
                    category: '',
                    description: '',
                    justification: '',
                    targetAudience: '',
                    estimatedCost: '',
                    priority: 'medium',
                    department: '',
                    coursesRelated: [],
                    expectedStudents: '',
                    academicLevel: '',
                    urgency: ''
                  });
                }}
                className="px-6 py-3 text-gray-700 bg-gray-200 rounded-xl hover:bg-gray-300 transition-all duration-200 font-medium"
              >
                Annuler
              </button>              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl hover:from-primary-700 hover:to-secondary-700 transition-all duration-200 transform hover:scale-105 shadow-lg font-medium"
              >
                {editingRecommendation ? 'Modifier' : 'Soumettre'}
              </button>
            </div>          </form>        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="p-6">
        {/* En-tête */}
        <div className={`mb-8 transition-all duration-500 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent flex items-center">
            <Lightbulb className="w-10 h-10 mr-3 text-yellow-500 animate-pulse" />
            Recommandations d'acquisition
          </h1>
          <p className="text-gray-600 mt-2 flex items-center">
            <BookmarkPlus className="w-4 h-4 mr-2 text-primary-500" />
            Proposez des ouvrages pour enrichir la collection de la bibliothèque
          </p>
        </div>

        {/* Statistiques rapides */}
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 transition-all duration-500 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total</p>
                <p className="text-2xl font-bold text-primary-600">{recommendations.length}</p>
              </div>
              <BookOpen className="w-8 h-8 text-primary-500" />
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">En attente</p>
                <p className="text-2xl font-bold text-yellow-600">{recommendations.filter(r => r.status === 'pending').length}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Approuvées</p>
                <p className="text-2xl font-bold text-green-600">{recommendations.filter(r => r.status === 'approved').length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Budget total</p>                <p className="text-2xl font-bold text-secondary-600">
                  {recommendations.reduce((sum, r) => sum + (parseFloat(r.estimatedCost) || 0), 0).toFixed(0)} FCFA
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-secondary-500" />
            </div>
          </div>
        </div>

        {/* Actions principales */}
        <div className={`flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6 transition-all duration-300 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            {/* Recherche */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher une recommandation..."
                className="pl-10 pr-4 py-3 border-2 border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-white/70 backdrop-blur-sm w-full sm:w-80"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filtre par statut */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border-2 border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-white/70 backdrop-blur-sm"
            >
              <option value="all">Tous les statuts</option>
              <option value="pending">⏳ En attente</option>
              <option value="approved">✅ Approuvées</option>
              <option value="rejected">❌ Rejetées</option>
            </select>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-6 py-3 rounded-xl hover:from-primary-700 hover:to-secondary-700 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center font-medium"
          >
            <Plus className="w-5 h-5 mr-2" />
            Nouvelle recommandation
          </button>
        </div>

        {/* Liste des recommandations */}
        <div className="space-y-6">
          {filteredRecommendations.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 shadow-xl border border-white/20 max-w-md mx-auto">
                <Lightbulb className="w-20 h-20 text-secondary-300 mx-auto mb-6 animate-pulse" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {searchTerm || statusFilter !== 'all' 
                    ? 'Aucune recommandation trouvée' 
                    : 'Aucune recommandation pour le moment'
                  }
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  {searchTerm || statusFilter !== 'all'
                    ? 'Essayez de modifier vos critères de recherche.'
                    : 'Commencez par proposer votre première recommandation d\'acquisition.'
                  }
                </p>
                {(!searchTerm && statusFilter === 'all') && (
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl hover:from-primary-700 hover:to-secondary-700 transition-all duration-200 transform hover:scale-105 shadow-lg font-medium"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Nouvelle recommandation
                  </button>
                )}
              </div>
            </div>
          ) : (
            filteredRecommendations.map((recommendation, index) => (
              <div 
                key={recommendation.id} 
                className={`group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col lg:flex-row justify-between items-start mb-6">
                  <div className="flex-1 mb-4 lg:mb-0">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{getCategoryIcon(recommendation.category)}</span>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                        {recommendation.title}
                      </h3>
                      {getStatusIcon(recommendation.status)}
                    </div>
                      <p className="text-gray-600 mb-3 flex items-center">
                      <Award className="w-4 h-4 mr-2 text-secondary-500" />
                      Par {recommendation.author}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(recommendation.category)}`}>
                        {recommendation.category}
                      </div>
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(recommendation.priority)}`}>
                        Priorité {recommendation.priority === 'high' ? 'élevée' : recommendation.priority === 'medium' ? 'moyenne' : 'faible'}
                      </div>
                      {recommendation.urgency && (
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(recommendation.urgency)}`}>
                          {recommendation.urgency}
                        </div>
                      )}
                      <div className="flex items-center space-x-1">
                        {renderStars(recommendation.rating)}
                        <span className="text-xs text-gray-500 ml-1">
                          ({recommendation.rating} - {recommendation.reviews} avis)
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-primary-500" />
                        Soumis le {new Date(recommendation.submissionDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Target className="w-4 h-4 mr-2 text-green-500" />
                        {recommendation.expectedStudents} étudiants
                      </div>
                      <div className="flex items-center">
                        <BookOpen className="w-4 h-4 mr-2 text-purple-500" />
                        {recommendation.pages} pages
                      </div>
                      {recommendation.estimatedCost && (
                        <div className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-2 text-orange-500" />
                          {parseFloat(recommendation.estimatedCost).toFixed(0)} FCFA
                        </div>
                      )}
                    </div>
                    
                    <p className="text-gray-700 mb-3 leading-relaxed">{recommendation.description}</p>
                    
                    <div className="space-y-2 text-sm">
                      <p className="text-gray-600">
                        <strong className="text-primary-600">Justification:</strong> {recommendation.justification}
                      </p>
                      <p className="text-gray-600">
                        <strong className="text-purple-600">Public cible:</strong> {recommendation.targetAudience}
                      </p>
                      {recommendation.submittedBy && (
                        <p className="text-gray-600">
                          <strong className="text-green-600">Proposé par:</strong> {recommendation.submittedBy}
                          {recommendation.department && ` (${recommendation.department})`}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(recommendation.status)}
                    <span className="text-sm font-semibold">
                      {getStatusText(recommendation.status)}
                    </span>
                    {recommendation.reviewDate && (
                      <span className="text-xs text-gray-500">
                        - Évalué le {new Date(recommendation.reviewDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-3">
                    {recommendation.status === 'pending' && (
                      <button
                        onClick={() => handleEdit(recommendation)}
                        className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200 group"
                        title="Modifier"
                      >
                        <Edit className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(recommendation.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 group"
                      title="Supprimer"
                    >
                      <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                </div>

                {recommendation.reviewNotes && (
                  <div className="mt-6 p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl border border-primary-200">
                    <p className="text-sm text-gray-700">
                      <strong className="text-primary-600">Notes de l'évaluation:</strong> {recommendation.reviewNotes}
                    </p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Modal */}
        {showAddModal && <RecommendationModal />}
      </div>
    </div>
  );
};

export default DashboardRecommendations;
