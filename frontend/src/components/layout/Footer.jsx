import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ResponsiveContainer, ResponsiveSection } from '../common/ResponsiveComponents';
import './Newsletter.css';
import  footerBg from '/images/footer-bg.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { user } = useAuth();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  
  const handleSubscribe = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to your backend
    console.log('Subscribed with email:', email);
    setSubscribed(true);
    setEmail('');
    // Reset the subscription message after 5 seconds
    setTimeout(() => setSubscribed(false), 5000);
  };  return (
    <footer className="bg-primary-500 text-white relative overflow-hidden bg-cover bg-center fixed-light-theme" style={{ backgroundImage: `url(${footerBg})` }}>
      {/* Decorative wave element */}
      <div className="absolute top-0 left-0 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="text-white fill-current opacity-10">
          <path d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,213.3C1248,235,1344,213,1392,202.7L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
        </svg>
      </div>
        {/* Newsletter subscription - Top section */}
      <div className="bg-primary-600 relative z-10 overflow-hidden fixed-light-theme">
        {/* Decorative patterns */}
        <div className="absolute top-0 left-0 w-24 sm:w-32 h-24 sm:h-32 opacity-10">
          <div className="absolute inset-0" style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "12px 12px"
          }}></div>
        </div>
        <div className="absolute bottom-0 right-0 w-32 sm:w-48 h-32 sm:h-48 opacity-10">
          <div className="absolute inset-0" style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.4) 2px, transparent 2px)",
            backgroundSize: "16px 16px"
          }}></div>
        </div>
        
        {/* Decorative icon */}
        <div className="absolute right-4 sm:right-10 md:right-20 -top-6 sm:-top-8 text-white opacity-10">
          <svg className="w-24 h-24 sm:w-32 sm:h-32" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
            <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
          </svg>
        </div>
        
        <ResponsiveContainer variant="standard">
          <div className="py-6 sm:py-8 md:py-10 px-4 sm:px-0">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
              <div className="w-full md:max-w-xl">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 text-white drop-shadow-sm flex items-center">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 text-secondary-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                  Inscrivez-vous à notre newsletter
                </h2>
                <p className="text-primary-100 text-base sm:text-lg">
                  Recevez les dernières actualités de la bibliothèque ENSPD et soyez informé(e) des nouvelles acquisitions, événements et ressources disponibles.
                </p>
                
                <div className="flex flex-wrap gap-2 mt-3 sm:mt-4">
                  <div className="flex items-center bg-primary-500 px-3 py-1 rounded-full">
                    <span className="w-2 h-2 bg-secondary-400 rounded-full mr-2"></span>
                    <span className="text-white text-xs">Acquisitions</span>
                  </div>
                  <div className="flex items-center bg-primary-500 px-3 py-1 rounded-full">
                    <span className="w-2 h-2 bg-secondary-400 rounded-full mr-2"></span>
                    <span className="text-white text-xs">Événements</span>
                  </div>
                  <div className="flex items-center bg-primary-500 px-3 py-1 rounded-full">
                    <span className="w-2 h-2 bg-secondary-400 rounded-full mr-2"></span>
                    <span className="text-white text-xs">Publications</span>
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-auto">
                <div className="backdrop-blur-sm bg-white/5 p-4 sm:p-5 rounded-lg shadow-lg">
                  <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 newsletter-form">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                        </svg>
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Votre adresse email"
                        required
                        className="bg-white text-gray-900 pl-10 pr-4 py-2.5 sm:py-3 rounded-lg w-full min-w-[250px] sm:w-72 outline-secondary-500 focus:outline-none focus:ring-2 focus:ring-secondary-500 transition-all duration-200 shadow-sm"
                      />                    {subscribed && (
                      <div className="absolute mt-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-md text-sm success-message">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Inscription réussie !
                        </div>
                      </div>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="bg-secondary-500 hover:bg-secondary-600 text-white font-medium py-2.5 sm:py-3 px-5 sm:px-6 rounded-lg transition-all shadow-md hover:shadow-lg transform hover:translate-y-[-1px] newsletter-button flex items-center justify-center"
                  >
                    <span>S'inscrire</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </button>
                </form>
                <p className="text-xs text-primary-200 mt-3 text-center">
                  En vous inscrivant, vous acceptez notre politique de confidentialité
                </p>
              </div>
            </div>
          </div>
          </div>
        </ResponsiveContainer>
      </div>
        {/* Main footer content */}
      <ResponsiveSection size="standard" className="relative z-10">
        <ResponsiveContainer variant="standard">
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {/* Column 1 - About */}
            <div className="col-span-1 xs:col-span-2 md:col-span-1">
              <h3 className="text-xl font-bold mb-4 sm:mb-6 flex items-center">
                <span className="text-secondary-400 mr-1">Biblio</span>
                <span>ENSPD</span>
              </h3>
              <p className="text-primary-100 mb-4 sm:mb-6 text-sm sm:text-base">
                Découvrez des livres et ressources académiques de qualité.
                Recherchez, empruntez, et explorez notre vaste collection universitaire.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary-600 p-2 sm:p-2.5 rounded-full text-white hover:text-secondary-400 hover:bg-primary-700 transition-colors shadow-md"
                  aria-label="GitHub"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a
                  href="https://x.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary-600 p-2 sm:p-2.5 rounded-full text-white hover:text-secondary-400 hover:bg-primary-700 transition-colors shadow-md"
                  aria-label="X (Twitter)"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary-600 p-2 sm:p-2.5 rounded-full text-white hover:text-secondary-400 hover:bg-primary-700 transition-colors shadow-md"
                  aria-label="LinkedIn"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Column 2 - Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 sm:mb-6 text-white border-b-2 border-secondary-400 pb-2 inline-block">Liens Rapides</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <Link to="/" className="text-primary-100 hover:text-secondary-400 transition-colors flex items-center group">
                    <svg className="w-4 h-4 mr-2 transition-transform duration-300 transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link to="/catalog" className="text-primary-100 hover:text-secondary-400 transition-colors flex items-center group">
                    <svg className="w-4 h-4 mr-2 transition-transform duration-300 transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                    Catalogue
                  </Link>
                </li>              <li>
                  <Link to="/contact" className="text-primary-100 hover:text-secondary-400 transition-colors flex items-center group">
                    <svg className="w-4 h-4 mr-2 transition-transform duration-300 transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to={user ? "/favorites" : "/login"} className="text-primary-100 hover:text-secondary-400 transition-colors flex items-center group">
                    <svg className="w-4 h-4 mr-2 transition-transform duration-300 transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                    {user ? "Mes Favoris" : "Connexion"}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3 - Popular Categories */}
            <div className="hidden xs:block">
              <h3 className="text-lg font-semibold mb-4 sm:mb-6 text-white border-b-2 border-secondary-400 pb-2 inline-block">Catégories</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <Link to="/category/literature" className="text-primary-100 hover:text-secondary-400 transition-colors flex items-center group">
                    <svg className="w-4 h-4 mr-2 transition-transform duration-300 transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                    Littérature
                  </Link>
                </li>
                <li>
                  <Link to="/category/science" className="text-primary-100 hover:text-secondary-400 transition-colors flex items-center group">
                    <svg className="w-4 h-4 mr-2 transition-transform duration-300 transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                    Sciences
                  </Link>
                </li>
                <li>
                  <Link to="/category/history" className="text-primary-100 hover:text-secondary-400 transition-colors flex items-center group">
                    <svg className="w-4 h-4 mr-2 transition-transform duration-300 transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                    Histoire
                  </Link>
                </li>
                <li>
                  <Link to="/category/technology" className="text-primary-100 hover:text-secondary-400 transition-colors flex items-center group">
                    <svg className="w-4 h-4 mr-2 transition-transform duration-300 transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                    Technologie
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Column 4 - Contact */}          <div>
              <h3 className="text-lg font-semibold mb-4 sm:mb-6 text-white border-b-2 border-secondary-400 pb-2 inline-block">Contact</h3>
              <ul className="space-y-3 sm:space-y-4">
                <li className="flex items-start group">
                  <div className="bg-primary-600 p-1.5 sm:p-2 rounded-full mr-2 sm:mr-3 shadow-md group-hover:bg-secondary-500 transition-colors">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-primary-200 mb-0.5 sm:mb-1">Email</p>
                    <a href="mailto:contact@enspd-biblio.edu" className="text-white hover:text-secondary-400 transition-colors text-sm sm:text-base">
                      contact@enspd-biblio.edu
                    </a>
                  </div>
                </li>
                <li className="flex items-start group">
                  <div className="bg-primary-600 p-1.5 sm:p-2 rounded-full mr-2 sm:mr-3 shadow-md group-hover:bg-secondary-500 transition-colors">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-primary-200 mb-0.5 sm:mb-1">Téléphone</p>
                    <a href="tel:+237123456789" className="text-white hover:text-secondary-400 transition-colors text-sm sm:text-base">
                      +237 697 542 240
                    </a>
                  </div>
                </li>
                <li className="flex items-start group">
                  <div className="bg-primary-600 p-1.5 sm:p-2 rounded-full mr-2 sm:mr-3 shadow-md group-hover:bg-secondary-500 transition-colors">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-primary-200 mb-0.5 sm:mb-1">Adresse</p>
                    <address className="text-white not-italic text-sm sm:text-base">
                      Campus de Douala-Bassa<br />
                      BP 8698, Douala, Cameroun
                    </address>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </ResponsiveContainer>
      </ResponsiveSection>      {/* Bottom footer */}
      <div className="border-t border-primary-600 bg-primary-700 relative z-10 fixed-light-theme">
        <ResponsiveContainer variant="standard">
          <div className="py-4 sm:py-6"><div className="flex flex-col md:flex-row justify-between items-center">              <div className="flex items-center gap-3 mb-4 md:mb-0">
                <p className="text-primary-100 text-xs sm:text-sm text-center md:text-left">
                  &copy; {currentYear} Bibliothèque ENSPD. Tous droits réservés.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-6 gap-y-2">
                <Link to="/privacy-policy" className="text-primary-200 hover:text-secondary-400 text-xs sm:text-sm transition-colors">
                  Politique de confidentialité
                </Link>
                <Link to="/terms-of-service" className="text-primary-200 hover:text-secondary-400 text-xs sm:text-sm transition-colors">
                  Conditions d'utilisation
                </Link>
                <Link to="/sitemap" className="text-primary-200 hover:text-secondary-400 text-xs sm:text-sm transition-colors">
                  Plan du site
                </Link>
              </div>
            </div>
            <div className="mt-4 sm:mt-6 text-center text-primary-300 text-xs flex flex-col sm:flex-row justify-center items-center gap-2">
              <p className="sm:border-r sm:border-primary-500 sm:pr-3">Développé par Fiona, Pharel et Harold</p>
              <p>École Nationale Supérieure Polytechnique de Douala</p>
            </div>
          </div>
        </ResponsiveContainer>
      </div>      
      {/* Decorative dot pattern */}
      <div className="absolute bottom-0 right-0 w-32 sm:w-64 h-32 sm:h-64 opacity-5">
        <div className="absolute inset-0" style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "20px 20px"
        }}></div>
      </div>
    </footer>
  );
};

export default Footer;
