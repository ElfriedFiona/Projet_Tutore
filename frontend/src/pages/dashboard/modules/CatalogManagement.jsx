import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Plus, Search, Filter, Edit, Trash2, Eye, 
  Star, Calendar, Users, CheckCircle, AlertTriangle,
  Upload, Download, Settings, Grid, List, SortAsc,
  Tag, BookMarked, FileText, Image, Save, X
} from 'lucide-react';
import { formatPrice } from '../../../utils/formatters';
import api from '../../../services/apiService';

const CatalogManagement = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

useEffect(() => {
  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories');
      const result = res.data;

      // Ajoute "Toutes les catégories" manuellement en haut
      const allOption = { id: 'all', nom: 'Toutes les catégories' };
      setCategories([allOption, ...result]);
    } catch (err) {
      console.error("Erreur chargement catégories :", err);
    }
  };

  fetchCategories();
}, []);

  // État pour gérer le formulaire
const [formData, setFormData] = useState({
  titre: '',
  auteur: '',
  isbn: '',
  categorie_id: '',
  editeur: '',
  anneePublication: '',
  nbPages: '',
  nbExemplaire: '',
  description: '',
  langue: 'Français',
  statut: 'disponible'
});
const [selectedImage, setSelectedImage] = useState(null);
const [isSubmitting, setIsSubmitting] = useState(false);

// Fonction pour gérer les changements dans les inputs
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
};

// Fonction pour gérer le fichier image
const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file && file.size <= 2 * 1024 * 1024) { // 2MB max
    setSelectedImage(file);
  } else {
    alert('L\'image doit faire moins de 2MB');
  }
};

// Fonction pour soumettre le formulaire
const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Validation des champs requis
  if (!formData.titre || !formData.auteur || !formData.isbn || !formData.categorie_id || !formData.nbExemplaire) {
    alert('Veuillez remplir tous les champs obligatoires');
    return;
  }

  setIsSubmitting(true);

  try {
    // Créer un FormData pour envoyer le fichier et les données
    const submitData = new FormData();
    
    // Ajouter tous les champs du formulaire
    Object.keys(formData).forEach(key => {
      if (formData[key]) {
        submitData.append(key, formData[key]);
      }
    });
    
    // Ajouter l'image si elle existe
    if (selectedImage) {
      submitData.append('imageCouverture', selectedImage);
    }

    console.log('Données envoyées :', formData);

    // Envoyer la requête POST
    const response = await api.post('/ouvrages', submitData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Réinitialiser le formulaire
    setFormData({
      titre: '',
      auteur: '',
      isbn: '',
      categorie_id: '',
      editeur: '',
      anneePublication: '',
      nbPages: '',
      nbExemplaire: '',
      description: '',
      langue: 'Français',
      statut: 'disponible'
    });
    setSelectedImage(null);
    
    // Fermer la modal
    setShowAddModal(false);
    
    // Recharger la liste des livres
    const booksResponse = await api.get('/ouvrages');
    const data = booksResponse.data;
    const formatted = data.map(book => ({
      id: book.id,
      title: book.titre,
      author: book.auteur,
      isbn: book.isbn,
      category: book.categorie?.nom || 'Inconnue',
      year: new Date(book.anneePublication).getFullYear(),
      image: `http://localhost:8000/${book.imageCouverture}`,
      rating: 4.3,
      borrowed: 2,
      reserved: 1,
      availableCopies: book.nbExemplaire,
      totalCopies: book.nbExemplaire,
      status: book.statut === 'disponible' ? 'Disponible' : 'Indisponible',
      publisher: book.editeur || "Non spécifié",
      pages: book.nbPages,
      language: book.langue,
      description: book.description || "Pas de description disponible",
    }));
    setBooks(formatted);
    
    alert('Ouvrage ajouté avec succès !');
    
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'ouvrage:', error);
    alert('Erreur lors de l\'ajout de l\'ouvrage. Veuillez réessayer.');
  } finally {
    setIsSubmitting(false);
  }
};

  // Mock data pour les livres
  // const mockBooks = [
  //   {
  //     id: 1,
  //     title: "Introduction à la Physique Quantique",
  //     author: "Dr. Ahmed Kouassi",
  //     isbn: "978-2-123456-78-9",
  //     category: "Sciences",
  //     availableCopies: 5,
  //     totalCopies: 8,
  //     publisher: "Éditions ENSPD",
  //     year: 2023,
  //     pages: 456,
  //     language: "Français",
  //     status: "Disponible",
  //     rating: 4.5,
  //     borrowed: 3,
  //     reserved: 2,
  //     image: null,
  //     description: "Un guide complet sur la physique quantique moderne..."
  //   },
  //   {
  //     id: 2,
  //     title: "Histoire du Cameroun Contemporain",
  //     author: "Prof. Marie Bamileke",
  //     isbn: "978-2-987654-32-1",
  //     category: "Histoire",
  //     availableCopies: 0,
  //     totalCopies: 6,
  //     publisher: "Presses Universitaires",
  //     year: 2022,
  //     pages: 320,
  //     language: "Français",
  //     status: "Épuisé",
  //     rating: 4.8,
  //     borrowed: 6,
  //     reserved: 5,
  //     image: null,
  //     description: "Une analyse approfondie de l'histoire camerounaise..."
  //   },
  //   {
  //     id: 3,
  //     title: "Algorithmes et Structures de Données",
  //     author: "Dr. Jean-Claude Assi",
  //     isbn: "978-2-456789-12-3",
  //     category: "Informatique",
  //     availableCopies: 12,
  //     totalCopies: 15,
  //     publisher: "TechBooks",
  //     year: 2024,
  //     pages: 542,
  //     language: "Français",
  //     status: "Disponible",
  //     rating: 4.7,
  //     borrowed: 3,
  //     reserved: 1,
  //     image: null,
  //     description: "Concepts fondamentaux des algorithmes..."
  //   }
  // ];

  // const categories = [
  //   { id: 'all', name: 'Toutes les catégories', count: 156 },
  //   { id: 'Sciences', name: 'Sciences', count: 45 },
  //   { id: 'Histoire', name: 'Histoire', count: 32 },
  //   { id: 'Informatique', name: 'Informatique', count: 28 },
  //   { id: 'Littérature', name: 'Littérature', count: 24 },
  //   { id: 'Mathématiques', name: 'Mathématiques', count: 27 }
  // ];

  // useEffect(() => {
  //   // Simulation de chargement des données
  //   setTimeout(() => {
  //     setBooks(mockBooks);
  //     setLoading(false);
  //   }, 1000);
  // }, []);

  useEffect(() => {
  const fetchBooks = async () => {
    try {
      const response = await api.get('/ouvrages'); // ajuste l’URL si nécessaire
      const data = response.data; // si tu renvoies un objet avec une clé `data`
      
      // Assure-toi d’adapter les noms de propriétés à ton modèle Laravel
      const formatted = data.map(book => ({
        id: book.id,
        title: book.titre,
        author: book.auteur,
        isbn: book.isbn,
        categorie_id: book.categorie?.id,
        category: book.categorie?.nom || 'Inconnue',
        year: new Date(book.anneePublication).getFullYear(),
        image: `http://localhost:8000/${book.imageCouverture}`,
        rating: 4.3,
        borrowed: 2,
        reserved: 1,
        availableCopies: book.nbExemplaire,
        totalCopies: book.nbExemplaire,
        status: book.statut === 'disponible' ? 'Disponible' : 'Indisponible',
        publisher: book.editeur || "Non spécifié",
        pages: book.nbPages,
        language: book.langue,
        description: book.description || "Pas de description disponible",
}));


      setBooks(formatted);
    } catch (err) {
      console.error('Erreur lors du chargement des ouvrages:', err);
    } finally {
      setLoading(false);
    }
  };

  fetchBooks();
}, []);


  const filteredBooks = books.filter(book => {
  const matchesSearch =
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.isbn.includes(searchTerm);

  const matchesCategory =
    selectedCategory === 'all' ||
    book.categorie_id === parseInt(selectedCategory); // 👈 important : comparer des `id` numériques

  return matchesSearch && matchesCategory;
});


  const BookCard = ({ book }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 overflow-hidden">
      <div className="relative">
        <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
          {book.image ? (
            <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
          ) : (
            <BookOpen className="w-16 h-16 text-primary-600" />
          )}
        </div>
        <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
          book.status === 'Disponible' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {book.status}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">{book.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{book.author}</p>
        <p className="text-xs text-gray-500 mb-3">{book.category} • {book.year}</p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600">{book.rating}</span>
          </div>
          <span className="text-sm text-gray-600">
            {book.availableCopies}/{book.totalCopies} dispo.
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 mb-3">
          <div>Emprunts: {book.borrowed}</div>
          <div>Réservations: {book.reserved}</div>
        </div>

        <div className="flex space-x-2">
          <button 
            onClick={() => setSelectedBook(book)}
            className="flex-1 bg-primary-600 text-white py-2 px-3 rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
          >
            <Eye className="w-4 h-4 inline mr-1" />
            Détails
          </button>
          <button className="bg-gray-100 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors">
            <Edit className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const BookListItem = ({ book }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-all duration-200">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center flex-shrink-0">
          {book.image ? (
            <img src={book.image} alt={book.title} className="w-full h-full object-cover rounded-lg" />
          ) : (
            <BookOpen className="w-8 h-8 text-primary-600" />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 line-clamp-1">{book.title}</h3>
              <p className="text-sm text-gray-600">{book.author}</p>
              <p className="text-xs text-gray-500">{book.category} • {book.year} • ISBN: {book.isbn}</p>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              book.status === 'Disponible' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {book.status}
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>Copies: {book.availableCopies}/{book.totalCopies}</span>
              <span>Emprunts: {book.borrowed}</span>
              <span>Réservations: {book.reserved}</span>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span>{book.rating}</span>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button 
                onClick={() => setSelectedBook(book)}
                className="bg-primary-600 text-white py-1 px-3 rounded-lg hover:bg-primary-700 transition-colors text-sm"
              >
                Détails
              </button>
              <button className="bg-gray-100 text-gray-700 py-1 px-3 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                Modifier
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  

  const BookDetailModal = () => (
    selectedBook && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Détails de l'Ouvrage</h2>
              <button 
                onClick={() => setSelectedBook(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <div className="h-64 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center mb-4">
                  {selectedBook.image ? (
                    <img src={selectedBook.image} alt={selectedBook.title} className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <BookOpen className="w-24 h-24 text-primary-600" />
                  )}
                </div>
                <div className="space-y-3">
                  <div className={`px-3 py-2 rounded-lg text-center font-medium ${
                    selectedBook.status === 'Disponible' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {selectedBook.status}
                  </div>
                  <div className="flex items-center justify-center space-x-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-medium">{selectedBook.rating}/5</span>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-2 space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedBook.title}</h3>
                  <p className="text-lg text-gray-600 mb-1">par {selectedBook.author}</p>
                  <p className="text-sm text-gray-500">{selectedBook.category} • {selectedBook.year}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">ISBN:</span>
                    <span className="ml-2 text-gray-600">{selectedBook.isbn}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Éditeur:</span>
                    <span className="ml-2 text-gray-600">{selectedBook.publisher}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Pages:</span>
                    <span className="ml-2 text-gray-600">{selectedBook.pages}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Langue:</span>
                    <span className="ml-2 text-gray-600">{selectedBook.language}</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Disponibilité</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary-600">{selectedBook.availableCopies}</div>
                      <div className="text-gray-600">Disponibles</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">{selectedBook.borrowed}</div>
                      <div className="text-gray-600">Empruntés</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-purple-600">{selectedBook.reserved}</div>
                      <div className="text-gray-600">Réservés</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{selectedBook.description}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6 border-t border-gray-200 flex space-x-3">
            <button className="bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors">
              <Edit className="w-4 h-4 inline mr-2" />
              Modifier
            </button>
            <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4 inline mr-2" />
              Ajouter exemplaire
            </button>
            <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
              <Download className="w-4 h-4 inline mr-2" />
              Exporter
            </button>
          </div>
        </div>
      </div>
    )
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 px-4 md:px-8 lg:px-12">
      {/* En-tête avec statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Ouvrages</p>
              <p className="text-2xl font-bold text-primary-600">{books.length}</p>
            </div>
            <BookOpen className="w-8 h-8 text-primary-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Disponibles</p>
              <p className="text-2xl font-bold text-green-600">
                {books.filter(b => b.status === 'Disponible').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Épuisés</p>
              <p className="text-2xl font-bold text-red-600">
                {books.filter(b => b.status !== 'Disponible').length}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Catégories</p>
              <p className="text-2xl font-bold text-purple-600">{categories.length - 1}</p>
            </div>
            <Tag className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Barre d'outils */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            {/* Champ de recherche */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher par titre, auteur ou ISBN..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 w-full sm:w-80"
              />
            </div>

            {/* Select dynamique des catégories */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.nom}
                </option>
              ))}
            </select>
          </div>

          {/* Modes d’affichage + bouton */}
          <div className="flex items-center space-x-3">
            <div className="flex bg-gray-100 rounded-lg p-1 gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-600'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-600'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un Ouvrage
            </button>
          </div>
        </div>
      </div>


      {/* Liste des livres */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Catalogue ({filteredBooks.length} ouvrage{filteredBooks.length !== 1 ? 's' : ''})
          </h3>
        </div>

        <div className="p-6">
          {filteredBooks.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Aucun ouvrage trouvé</p>
              <p className="text-sm text-gray-400 mt-1">
                Modifiez vos critères de recherche ou ajoutez un nouvel ouvrage
              </p>
            </div>
          ) : (
            <div className={
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-4'
            }>
              {filteredBooks.map(book => (
                viewMode === 'grid' ? (
                  <BookCard key={book.id} book={book} />
                ) : (
                  <BookListItem key={book.id} book={book} />
                )
              ))}
            </div>
          )}
        </div>
      </div>


      {/* Modals */}
      {showAddModal && (
        <AddBookModal
          formData={formData}
          handleInputChange={handleInputChange}
          handleImageChange={handleImageChange}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          setShowAddModal={setShowAddModal}
          selectedImage={selectedImage}
          categories={categories}
        />
      )}
      {selectedBook && <BookDetailModal />}
    </div>
  );
};

  // Composant de la modal
const AddBookModal = ({ 
  formData,
  handleInputChange,
  handleImageChange,
  handleSubmit,
  isSubmitting,
  setShowAddModal,
  selectedImage,
  categories, 
}) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Ajouter un Nouvel Ouvrage</h2>
          <button 
            onClick={() => setShowAddModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Titre *</label>
            <input 
              type="text" 
              name="titre"
              value={formData.titre}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Titre de l'ouvrage"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Auteur *</label>
            <input 
              type="text" 
              name="auteur"
              value={formData.auteur}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Nom de l'auteur"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ISBN *</label>
            <input 
              type="text" 
              name="isbn"
              value={formData.isbn}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="978-x-xxxxxx-xx-x"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie *</label>
            <select 
              name="categorie_id"
              value={formData.categorie_id}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
              required
            >
              <option value="">Sélectionner une catégorie</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.nom}</option>
              ))}
            </select>

          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Éditeur</label>
            <input 
              type="text" 
              name="editeur"
              value={formData.editeur}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Nom de l'éditeur"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Année de publication</label>
            <input 
              type="number" 
              name="anneePublication"
              value={formData.anneePublication}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="2024"
              min="1900"
              max="2024"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de pages</label>
            <input 
              type="number" 
              name="nbPages"
              value={formData.nbPages}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="456"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nombre d'exemplaires *</label>
            <input 
              type="number" 
              name="nbExemplaire"
              value={formData.nbExemplaire}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="5"
              min="1"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea 
            rows="3"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Description de l'ouvrage..."
          ></textarea>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Image de couverture</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-500 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="image-upload"
            />
            <label htmlFor="image-upload" className="cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">
                {selectedImage ? selectedImage.name : 'Glissez une image ou cliquez pour parcourir'}
              </p>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG jusqu'à 2MB</p>
            </label>
          </div>
        </div>
        
        <div className="p-6 border-t border-gray-200 flex space-x-3">
          <button 
            type="button"
            onClick={() => setShowAddModal(false)}
            className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
            disabled={isSubmitting}
          >
            Annuler
          </button>
          <button 
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Ajout en cours...' : 'Ajouter l\'ouvrage'}
          </button>
        </div>
      </form>
    </div>
  </div>
);

export default CatalogManagement;
