import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FadeInUp, ScaleIn, InteractiveCard } from '../components/animations/MotionComponents';
import SearchBar from '../components/common/SearchBar';
import { PrimaryButton, SecondaryButton } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('tous');
  const [faqOpen, setFaqOpen] = useState({});
  // Données du carousel hero - Design moderne et épuré
  const heroSlides = [
    {
      id: 1,
      title: "Bibliothèque ENSPD",
      subtitle: "Excellence académique et innovation technologique",
      description: "Découvrez plus de 50 000 ouvrages dans un environnement d'apprentissage moderne",
      cta: "Explorer le catalogue",
      overlay: "bg-gradient-to-br from-primary-700/95 via-primary-600/90 to-primary-500/85"
    },
    {
      id: 2,
      title: "Ressources Numériques",
      subtitle: "Accès 24h/24 à votre savoir",
      description: "Consultez notre bibliothèque numérique depuis n'importe où, à tout moment",
      cta: "Accéder en ligne",
      overlay: "bg-gradient-to-br from-secondary-700/95 via-secondary-600/90 to-secondary-500/85"
    },
    {
      id: 3,
      title: "Innovation Pédagogique",
      subtitle: "L'avenir de l'apprentissage",
      description: "Espaces collaboratifs et technologies avancées pour votre réussite",
      cta: "Découvrir nos services",
      overlay: "bg-gradient-to-br from-primary-600/95 via-secondary-600/90 to-primary-700/85"
    }
  ];

  // Statistiques de la bibliothèque
  const stats = [
    { label: "Ouvrages disponibles", value: "52,483", icon: "📚" },
    { label: "Étudiants inscrits", value: "3,247", icon: "👥" },
    { label: "Emprunts ce mois", value: "1,895", icon: "📖" },
    { label: "Ressources numériques", value: "12,456", icon: "💻" }
  ];
  // Accès rapides
  const quickAccess = [
    {
      title: "Catalogue en ligne",
      description: "Recherchez parmi nos collections",
      icon: "🔍",
      link: "/catalog",
      color: "bg-primary-500"
    },
    {
      title: "Réserver un livre",
      description: "Réservez vos ouvrages préférés",
      icon: "📅",
      link: "/reservations",
      color: "bg-secondary-500"
    },
    {
      title: "Espace personnel",
      description: "Gérez vos emprunts et favoris",
      icon: "👤",
      link: "/dashboard",
      color: "bg-primary-600"
    },
    {
      title: "Aide & Support",
      description: "Besoin d'assistance ?",
      icon: "💬",
      link: "/contact",
      color: "bg-neutral-600"
    }
  ];

  // Actualités
  const news = [
    {
      id: 1,
      title: "Nouvelle collection de livres",
      date: "15 Mai 2024",
      summary: "Découvrez notre nouvelle collection de 500 ouvrages techniques...",
      image: "/images/biblio1.jpg"
    },
    {
      id: 2,
      title: "Horaires d'été",
      date: "10 Mai 2024",
      summary: "Les horaires de la bibliothèque changent pour la période estivale...",
      image: "/images/biblio2.jpg"
    },
    {
      id: 3,
      title: "Atelier de recherche documentaire",
      date: "5 Mai 2024",
      summary: "Apprenez à optimiser vos recherches avec nos bibliothécaires...",
      image: "/images/biblio3.jpg"
    }
  ];

  // Services
  const services = [
    {
      title: "Prêt d'ouvrages",
      description: "Empruntez jusqu'à 5 livres pendant 2 semaines",
      icon: "📚"
    },
    {
      title: "Salles d'étude",
      description: "Espaces silencieux pour vos révisions",
      icon: "📖"
    },
    {
      title: "Ressources numériques",
      description: "Accès aux bases de données et e-books",
      icon: "💻"
    },
    {
      title: "Aide à la recherche",
      description: "Assistance personnalisée de nos bibliothécaires",
      icon: "🎯"
    }
  ];

  // FAQ
  const faqs = [
    {
      question: "Comment puis-je emprunter un livre ?",
      answer: "Connectez-vous à votre compte, recherchez le livre souhaité et cliquez sur 'Réserver'. Vous pourrez ensuite le retirer au comptoir avec votre carte étudiante."
    },
    {
      question: "Quelle est la durée d'emprunt ?",
      answer: "La durée standard d'emprunt est de 2 semaines pour les étudiants et 3 semaines pour les enseignants. Vous pouvez renouveler une fois si le livre n'est pas réservé."
    },
    {
      question: "Puis-je accéder aux ressources à distance ?",
      answer: "Oui, avec vos identifiants ENSPD, vous pouvez accéder à notre catalogue en ligne et aux ressources numériques 24h/24."
    },
    {
      question: "Que faire si je perds un livre emprunté ?",
      answer: "Contactez immédiatement la bibliothèque. Des frais de remplacement seront appliqués selon le tarif en vigueur."
    }
  ];

  // Livres populaires par catégorie
  const categories = [
    { id: 'tous', name: 'Tous' },
    { id: 'informatique', name: 'Informatique' },
    { id: 'mathematiques', name: 'Mathématiques' },
    { id: 'physique', name: 'Physique' },
    { id: 'chimie', name: 'Chimie' }
  ];

  const popularBooks = [
    {
      id: 1,
      title: "Introduction aux Algorithmes",
      author: "Thomas H. Cormen",
      category: "informatique",
      image: "/images/book-1.jpg",
      rating: 4.8,
      available: true
    },
    {
      id: 2,
      title: "Calcul Différentiel",
      author: "Jean-Marie Monier",
      category: "mathematiques",
      image: "/images/book-2.jpg",
      rating: 4.6,
      available: false
    },
    {
      id: 3,
      title: "Physique Générale",
      author: "Douglas C. Giancoli",
      category: "physique",
      image: "/images/book-3.jpg",
      rating: 4.7,
      available: true
    }
  ];

  // Auto-slide pour le carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const toggleFAQ = (index) => {
    setFaqOpen(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const filteredBooks = selectedCategory === 'tous' 
    ? popularBooks 
    : popularBooks.filter(book => book.category === selectedCategory);

  return (
    <div> {/* Supprimer la classe h-screen */}
      {/* 1. Carousel Hero avec Barre de Recherche */}
      <section className="relative h-screen overflow-hidden">
        {/* Carousel */}
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <motion.div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
              initial={{ scale: 1.1 }}
              animate={{ scale: index === currentSlide ? 1 : 1.1 }}
              transition={{ duration: 5 }}
            >
              <div className="w-full h-full bg-gradient-to-br from-primary-600 to-secondary-600">
                <div className={`absolute inset-0 ${slide.overlay}`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contenu du Hero */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4 max-w-4xl mx-auto">
            <FadeInUp>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                {heroSlides[currentSlide].title}
              </h1>
            </FadeInUp>
            <FadeInUp delay={0.2}>
              <p className="text-xl md:text-2xl mb-12 text-neutral-100">
                {heroSlides[currentSlide].subtitle}
              </p>
            </FadeInUp>
            
            <FadeInUp delay={0.6}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <PrimaryButton asChild size="lg" className="bg-white text-primary-600 hover:bg-neutral-100">
                  <Link to="/catalog">Explorer le catalogue</Link>
                </PrimaryButton>
                <SecondaryButton asChild size="lg" variant="outline" className='border-white text-white hover:bg-white hover:text-primary-600'>
                  <Link to="/register">S'inscrire</Link>
                </SecondaryButton>
              </div>
            </FadeInUp>
          </div>
        </div>

        {/* Indicateurs du carousel */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* 2. Statistiques */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-neutral-800 mb-16">
              La bibliothèque ENSPD en chiffres
            </h2>
          </FadeInUp>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <ScaleIn key={index} delay={index * 0.1}>
                <Card className="text-center p-8 hover:shadow-xl transition-shadow duration-300">
                  <div className="text-4xl mb-4">{stat.icon}</div>
                  <div className="text-3xl font-bold text-primary-600 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-neutral-600">{stat.label}</div>
                </Card>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Accès rapides */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-neutral-800 mb-4">
              Accès rapides
            </h2>
            <p className="text-xl text-neutral-600 text-center mb-16">
              Tout ce dont vous avez besoin, à portée de clic
            </p>
          </FadeInUp>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickAccess.map((item, index) => (
              <InteractiveCard key={index}>
                <Link to={item.link}>
                  <Card className="h-full p-6 text-center hover:shadow-xl transition-all duration-300">
                    <div className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center text-2xl text-white mx-auto mb-4`}>
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-800 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-neutral-600">{item.description}</p>
                  </Card>
                </Link>
              </InteractiveCard>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Actualités */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-neutral-800 mb-16">
              Dernières actualités
            </h2>
          </FadeInUp>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((article, index) => (
              <FadeInUp key={article.id} delay={index * 0.1}>
                <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="h-48 bg-gradient-to-br from-primary-200 to-secondary-200" />
                  <CardContent className="p-6">
                    <div className="text-sm text-secondary-600 mb-2">{article.date}</div>
                    <h3 className="text-xl font-semibold text-neutral-800 mb-3">
                      {article.title}
                    </h3>
                    <p className="text-neutral-600 mb-4">{article.summary}</p>
                    <Link 
                      to={`/news/${article.id}`}
                      className="text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Lire la suite →
                    </Link>
                  </CardContent>
                </Card>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Comment ça marche */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-neutral-800 mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-xl text-neutral-600 text-center mb-16">
              Emprunter un livre en 4 étapes simples
            </p>
          </FadeInUp>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Recherchez", desc: "Trouvez le livre qui vous intéresse", icon: "🔍" },
              { step: "2", title: "Réservez", desc: "Cliquez sur réserver et connectez-vous", icon: "📅" },
              { step: "3", title: "Retirez", desc: "Venez récupérer votre livre au comptoir", icon: "🏢" },
              { step: "4", title: "Profitez", desc: "Lisez et retournez avant l'échéance", icon: "📖" }
            ].map((item, index) => (
              <FadeInUp key={index} delay={index * 0.1}>
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold text-neutral-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-neutral-600">{item.desc}</p>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Services */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-neutral-800 mb-16">
              Nos services
            </h2>
          </FadeInUp>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <ScaleIn key={index} delay={index * 0.1}>
                <Card className="p-6 text-center h-full hover:shadow-xl transition-shadow duration-300">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold text-neutral-800 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-neutral-600">{service.description}</p>
                </Card>
              </ScaleIn>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-neutral-800 mb-16">
              Questions fréquentes
            </h2>
          </FadeInUp>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FadeInUp key={index} delay={index * 0.1}>
                <Card className="overflow-hidden">
                  <button
                    className="w-full px-6 py-4 text-left hover:bg-neutral-50 transition-colors duration-200"
                    onClick={() => toggleFAQ(index)}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-neutral-800">
                        {faq.question}
                      </h3>
                      <span className={`transform transition-transform duration-200 text-primary-500 ${
                        faqOpen[index] ? 'rotate-180' : ''
                      }`}>
                        ▼
                      </span>
                    </div>
                  </button>
                  {faqOpen[index] && (
                    <div className="px-6 pb-4">
                      <p className="text-neutral-600 pt-2">{faq.answer}</p>
                    </div>
                  )}
                </Card>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Livres populaires avec filtres */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInUp>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-neutral-800 mb-4">
              Livres populaires
            </h2>
            <p className="text-xl text-neutral-600 text-center mb-12">
              Découvrez les ouvrages les plus consultés
            </p>
          </FadeInUp>
          
          {/* Filtres par catégorie */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-primary-500 text-white'
                    : 'bg-white text-neutral-600 hover:bg-primary-50 hover:text-primary-600'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Grille de livres */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBooks.map((book, index) => (
              <ScaleIn key={book.id} delay={index * 0.1}>
                <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="h-64 bg-gradient-to-br from-primary-200 to-secondary-200" />
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-neutral-800 mb-2">
                      {book.title}
                    </h3>
                    <p className="text-neutral-600 mb-3">par {book.author}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="text-neutral-600 ml-1">{book.rating}</span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        book.available 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {book.available ? 'Disponible' : 'Emprunté'}
                      </span>
                    </div>
                    <PrimaryButton className="w-full mt-4" disabled={!book.available}>
                      {book.available ? 'Réserver' : 'Non disponible'}
                    </PrimaryButton>
                  </CardContent>
                </Card>
              </ScaleIn>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <PrimaryButton asChild size="lg" className='text-white bg-primary-600 hover:bg-primary-700'>
              <Link to="/catalog">Voir tous les livres</Link>
            </PrimaryButton>
          </div>
        </div>
      </section>

      {/* 9. CTA - Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInUp>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Prêt à commencer votre aventure littéraire ?
            </h2>
            <p className="text-xl text-neutral-100 mb-8">
              Rejoignez la communauté ENSPD et accédez à des milliers d'ouvrages
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <PrimaryButton asChild size="lg" className="bg-white text-primary-600 hover:bg-neutral-100">
                <Link to="/register">Créer mon compte</Link>
              </PrimaryButton>
              <SecondaryButton asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600">
                <Link to="/catalog">Explorer maintenant</Link>
              </SecondaryButton>
            </div>
          </FadeInUp>
        </div>
      </section>
    </div>
  );
};

export default Home;