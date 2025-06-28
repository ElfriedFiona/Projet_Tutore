import {
  AlertCircle,
  BookOpen,
  Calendar,
  CheckCircle,
  ChevronDown,
  Clock,
  Eye,
  Heart,
  MapPin,
  MessageCircle,
  Share2,
  Star,
  Tag,
  User
} from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../components/common/BackButton';
import {
  ResponsiveContainer,
  ResponsiveHeading,
  ResponsiveImage,
  ResponsiveTwoColumns
} from '../components/common/ResponsiveComponents';
import { useToast } from '../context/ToastContext';
import api from '../services/apiService';

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { success, error } = useToast();
  
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [isReserving, setIsReserving] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  // Mock authentication state - À remplacer par votre système d'auth
  const isAuthenticated = true;
  // const userRole = 'student'; // 'student', 'professor', 'admin'

  // Mock data pour les avis
  const mockReviews = [
    {
      id: 1,
      userName: 'Marie Dubois',
      userRole: 'Étudiante en Littérature',
      rating: 5,
      comment: 'Un chef-d\'œuvre intemporel ! Victor Hugo a créé une œuvre magistrale qui nous plonge dans les bas-fonds de Paris. L\'analyse des personnages est remarquable.',
      date: '2024-01-15',
      helpful: 12,
      avatar: '👩‍🎓'
    },
    {
      id: 2,
      userName: 'Dr. Pierre Martin',
      userRole: 'Professeur de Littérature',
      rating: 4,
      comment: 'Lecture indispensable pour comprendre l\'évolution de la société française au XIXe siècle. Parfait pour les cours d\'histoire littéraire.',
      date: '2024-01-10',
      helpful: 8,
      avatar: '👨‍🏫'
    }
  ];

  // Simulation de chargement des données
  useEffect(() => {
    const fetchBookDetails = async () => {
  try {
    setLoading(true);
    const response = await api.get(`/ouvrages/${id}`);
    const data = response.data;

    setBook({
      id: data.id,
      title: data.titre,
      author: data.auteur,
      coverImage: `http://localhost:8000/${data.imageCouverture}`,
      description: data.description,
      fullDescription: data.description_longue || '',
      category: data.categorie?.nom || 'Inconnue',
      subcategory: data.sousCategorie?.nom || '',
      available: data.statut === 'disponible',
      isbn: data.isbn,
      publisher: data.editeur,
      publishDate: data.anneePublication,
      pages: data.nbPages,
      language: data.langue,
      location: data.emplacement || '',
      borrowCount: data.nbrEmprunts || 0,
      reservationCount: data.nbrReservations || 0,
      rating: data.noteMoyenne || 0,
      reviewCount: data.nbAvis || 0,
      tags: data.tags || [],
      edition: data.edition || '',
      condition: data.etat || '',
      deweyDecimal: data.classificationDewey || '',
      subjects: data.sujets || [],
      targetAudience: data.publicCible || [],
      relatedBooks: data.livresSimilaires || []
    });
  } catch (err) {
    console.error('Erreur lors du chargement du livre:', err);
    setApiError("Livre introuvable ou erreur serveur.");
  } finally {
    setLoading(false);
  }
};


    if (id) {
      fetchBookDetails();
    }
  }, [id]);

  const handleReserve = useCallback(async () => {
  if (!isAuthenticated) {
    error('Veuillez vous connecter pour réserver ce livre.');
    navigate('/login');
    return;
  }

  if (!book?.available) {
    error('Ce livre n\'est pas disponible actuellement.');
    return;
  }

  setIsReserving(true);

  try {
    // ✅ Appel direct vers l'API Laravel pour créer un emprunt
    await api.post('/emprunts', {
      ouvrages_id: book.id,
    });

    success('Demande d\'emprunt envoyée. Vous serez notifié lorsque le livre sera prêt.');

    // Mise à jour locale de l'état du livre (optionnel pour UI immédiat)
    setBook(prev => ({
      ...prev,
      available: false,
      reservationCount: prev.reservationCount + 1,
    }));
  } catch (err) {
    console.error('Erreur réservation:', err);

    if (err.response?.status === 400 && err.response?.data?.message) {
      error(err.response.data.message);
    } else {
      error('Erreur lors de la réservation. Veuillez réessayer.');
    }
  } finally {
    setIsReserving(false);
  }
}, [isAuthenticated, book?.available, book?.id, error, navigate, success]);

  const handleToggleFavorite = useCallback(() => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      success('Livre ajouté à vos favoris !');
    } else {
      success('Livre retiré de vos favoris.');
    }
  }, [isFavorite, success]);

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: book?.title,
        text: `Découvrez "${book?.title}" de ${book?.author}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      success('Lien copié dans le presse-papiers !');
    }
  }, [book?.title, book?.author, success]);

  // Composant pour les étoiles de notation (memoized for performance)
  const StarRating = useMemo(() => ({ rating, size = 'sm', showCount = false, count = 0 }) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const sizeClass = size === 'lg' ? 'w-6 h-6' : size === 'md' ? 'w-5 h-5' : 'w-4 h-4';
    
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star 
          key={i}
          className={`${sizeClass} ${
            i < fullStars 
              ? 'text-yellow-400 fill-yellow-400' 
              : i === fullStars && hasHalfStar 
                ? 'text-yellow-400 fill-yellow-200' 
                : 'text-neutral-300'
          }`}
        />
      );
    }
    
    return (
      <div className="flex items-center gap-1">
        <div className="flex">{stars}</div>
        <span className="text-sm font-medium text-neutral-600 ml-1">
          {rating.toFixed(1)}
        </span>
        {showCount && (
          <span className="text-sm text-neutral-500">
            ({count} avis)
          </span>
        )}
      </div>
    );
  }, []);
  
  // Composant pour les tabs (memoized)
  const TabButton = useCallback(({ id, label, icon: IconComponent, isActive, onClick }) => (
    <button
      role="tab"
      aria-selected={isActive}
      aria-controls={`${id}-panel`}
      tabIndex={isActive ? 0 : -1}
      onClick={() => onClick(id)}
      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
        isActive 
          ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25' 
          : 'bg-white text-neutral-600 hover:bg-neutral-50 border border-neutral-200'
      }`}
    >
      {IconComponent && <IconComponent className="w-4 h-4" />}
      {label}
    </button>
  ), []);

  // Composant pour les cartes d'avis (memoized)
  const ReviewCard = useCallback(({ review }) => (
    <div className="bg-white p-6 rounded-xl border border-neutral-200 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-2xl">
          {review.avatar}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h4 className="font-semibold text-neutral-800">{review.userName}</h4>
              <p className="text-sm text-neutral-500">{review.userRole}</p>
            </div>
            <span className="text-sm text-neutral-400">
              {new Date(review.date).toLocaleDateString('fr-FR')}
            </span>
          </div>
          <div className="mb-3">
            <StarRating rating={review.rating} size="sm" />
          </div>
          <p className="text-neutral-700 leading-relaxed mb-3">{review.comment}</p>
          <div className="flex items-center gap-4 text-sm text-neutral-500">
            <button className="flex items-center gap-1 hover:text-primary-600">
              <Heart className="w-4 h-4" />
              Utile ({review.helpful})
            </button>
            <button className="flex items-center gap-1 hover:text-primary-600">
              <MessageCircle className="w-4 h-4" />
              Répondre
            </button>
          </div>
        </div>
      </div>
    </div>
  ), []);
  // Keyboard navigation for tabs
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.target.closest('.tab-navigation')) {
        const tabs = ['overview', 'details', 'reviews'];
        const currentIndex = tabs.indexOf(activeTab);
        
        switch (event.key) {
          case 'ArrowLeft': {
            event.preventDefault();
            const prevIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
            setActiveTab(tabs[prevIndex]);
            break;
          }
          case 'ArrowRight': {
            event.preventDefault();
            const nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
            setActiveTab(tabs[nextIndex]);
            break;
          }
          case 'Home': {
            event.preventDefault();
            setActiveTab(tabs[0]);
            break;
          }
          case 'End': {
            event.preventDefault();
            setActiveTab(tabs[tabs.length - 1]);
            break;
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab]);

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <ResponsiveContainer>
          <div className="flex flex-col items-center justify-center py-24">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-secondary-500 rounded-full animate-spin" style={{animationDelay: '0.3s'}}></div>
            </div>
            <p className="mt-6 text-neutral-600 font-medium">Chargement des détails du livre...</p>
          </div>
        </ResponsiveContainer>
      </div>
    );
  }

  if (apiError) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <ResponsiveContainer>
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <AlertCircle className="w-12 h-12 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-800 mb-4">Erreur de chargement</h2>
            <p className="text-neutral-600 text-center mb-8 max-w-md">{apiError}</p>
            <div className="flex gap-4 pt-4">
              <BackButton />
              <button 
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Réessayer
              </button>
            </div>
          </div>
        </ResponsiveContainer>
      </div>
    );
  }

  if (!book) return null;

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Breadcrumbs */}      
      <ResponsiveContainer>
        {/* Navigation */}
        <div className="mb-8 pt-4">
          <BackButton />
        </div>

        {/* Section principale */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <ResponsiveTwoColumns
            left={
              <div className="p-8">
                {/* Image de couverture */}
                <div className="relative group mb-6">
                  <div className="absolute -inset-2 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
                  <ResponsiveImage
                    src={book.coverImage}
                    alt={`Couverture de ${book.title}`}
                    aspectRatio="auto"
                    className="relative rounded-xl shadow-xl transform group-hover:scale-105 transition-transform duration-300"
                    onLoad={() => setImageLoaded(true)}
                  />
                  {!imageLoaded && (
                    <div className="absolute inset-0 bg-neutral-200 animate-pulse rounded-xl"></div>
                  )}
                </div>

                {/* Actions rapides */}
                <div className="flex gap-3 mb-6">
                  <button
                    onClick={handleToggleFavorite}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg border transition-all ${
                      isFavorite 
                        ? 'bg-red-50 border-red-200 text-red-600' 
                        : 'bg-neutral-50 border-neutral-200 text-neutral-600 hover:bg-neutral-100'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500' : ''}`} />
                    <span className="hidden sm:inline">
                      {isFavorite ? 'Retiré' : 'Favoris'}
                    </span>
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-neutral-50 border border-neutral-200 text-neutral-600 hover:bg-neutral-100 transition-all"
                  >
                    <Share2 className="w-5 h-5" />
                    <span className="hidden sm:inline">Partager</span>
                  </button>
                </div>

                {/* Statut et réservation */}
                <div className="space-y-4">
                  <div className={`flex items-center gap-3 p-4 rounded-lg ${
                    book.available 
                      ? 'bg-green-50 border border-green-200' 
                      : 'bg-orange-50 border border-orange-200'
                  }`}>
                    {book.available ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <Clock className="w-6 h-6 text-orange-600" />
                    )}
                    <div>
                      <p className={`font-semibold ${
                        book.available ? 'text-green-800' : 'text-orange-800'
                      }`}>
                        {book.available ? 'Disponible' : 'Emprunté'}
                      </p>
                      <p className={`text-sm ${
                        book.available ? 'text-green-600' : 'text-orange-600'
                      }`}>
                        {book.available 
                          ? 'Prêt à être emprunté' 
                          : `${book.reservationCount} personnes en attente`
                        }
                      </p>
                    </div>
                  </div>

                  {book.available ? (
                    <button
                      onClick={handleReserve}
                      disabled={isReserving}
                      className="w-full py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-semibold hover:from-primary-700 hover:to-primary-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
                    >
                      {isReserving ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Réservation...
                        </div>
                      ) : (
                        'Réserver ce livre'
                      )}
                    </button>
                  ) : (
                    <button className="w-full py-4 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors">
                      Rejoindre la liste d'attente
                    </button>
                  )}
                </div>
              </div>
            }
            right={
              <div className="p-8">
                {/* En-tête du livre */}
                <div className="mb-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <ResponsiveHeading variant="h1" className="text-3xl font-bold text-neutral-800 mb-2">
                        {book.title}
                      </ResponsiveHeading>
                      <p className="text-xl text-neutral-600 mb-4">par {book.author}</p>
                    </div>
                  </div>

                  {/* Rating et statistiques */}
                  <div className="flex items-center gap-6 mb-6">
                    <StarRating rating={book.rating} size="md" showCount count={book.reviewCount} />
                    <div className="flex items-center gap-1 text-sm text-neutral-500">
                      <Eye className="w-4 h-4" />
                      {book.borrowCount} emprunts
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {book.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>                {/* Tabs de navigation */}
                <div className="mb-8">
                  <div className="flex gap-2 mb-6 overflow-x-auto tab-navigation" role="tablist" aria-label="Sections du livre">
                    <TabButton
                      id="overview"
                      label="Aperçu"
                      icon={BookOpen}
                      isActive={activeTab === 'overview'}
                      onClick={setActiveTab}
                    />
                    <TabButton
                      id="details"
                      label="Détails"
                      icon={Tag}
                      isActive={activeTab === 'details'}
                      onClick={setActiveTab}
                    />
                    <TabButton
                      id="reviews"
                      label="Avis"
                      icon={MessageCircle}
                      isActive={activeTab === 'reviews'}
                      onClick={setActiveTab}
                    />
                  </div>

                  {/* Contenu des tabs */}
                  {activeTab === 'overview' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-neutral-800 mb-3">Description</h3>
                        <p className="text-neutral-700 leading-relaxed">
                          {showFullDescription ? book.fullDescription : book.description}
                        </p>
                        {book.fullDescription && book.fullDescription !== book.description && (
                          <button
                            onClick={() => setShowFullDescription(!showFullDescription)}
                            className="mt-3 text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
                          >
                            {showFullDescription ? 'Voir moins' : 'Voir plus'}
                            <ChevronDown className={`w-4 h-4 transition-transform ${showFullDescription ? 'rotate-180' : ''}`} />
                          </button>
                        )}
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-neutral-800 mb-3">Public cible</h3>
                        <div className="flex flex-wrap gap-2">
                          {book.targetAudience.map((audience, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-lg text-sm"
                            >
                              {audience}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'details' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-neutral-500" />
                          <div>
                            <p className="text-sm text-neutral-500">Date de publication</p>
                            <p className="font-medium">{book.publishDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <BookOpen className="w-5 h-5 text-neutral-500" />
                          <div>
                            <p className="text-sm text-neutral-500">Nombre de pages</p>
                            <p className="font-medium">{book.pages} pages</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <User className="w-5 h-5 text-neutral-500" />
                          <div>
                            <p className="text-sm text-neutral-500">Éditeur</p>
                            <p className="font-medium">{book.publisher}</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Tag className="w-5 h-5 text-neutral-500" />
                          <div>
                            <p className="text-sm text-neutral-500">ISBN</p>
                            <p className="font-medium font-mono text-sm">{book.isbn}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <MapPin className="w-5 h-5 text-neutral-500" />
                          <div>
                            <p className="text-sm text-neutral-500">Localisation</p>
                            <p className="font-medium">{book.location}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <BookOpen className="w-5 h-5 text-neutral-500" />
                          <div>
                            <p className="text-sm text-neutral-500">Catégorie</p>
                            <p className="font-medium">{book.category}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'reviews' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-neutral-800">
                          Avis des lecteurs ({mockReviews.length})
                        </h3>
                        <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                          Écrire un avis
                        </button>
                      </div>
                      <div className="space-y-4">
                        {mockReviews.map(review => (
                          <ReviewCard key={review.id} review={review} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            }
          />
        </div>

        {/* Livres similaires */}
        {book.relatedBooks && book.relatedBooks.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-neutral-800 mb-6">Livres similaires</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {book.relatedBooks.map(relatedBook => (
                <div
                  key={relatedBook.id}
                  className="p-4 border border-neutral-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate(`/book/${relatedBook.id}`)}
                >
                  <h4 className="font-semibold text-neutral-800 mb-1">{relatedBook.title}</h4>
                  <p className="text-sm text-neutral-600">{relatedBook.author}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default BookDetail;
