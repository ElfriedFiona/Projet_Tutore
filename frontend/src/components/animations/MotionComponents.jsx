import { memo } from 'react';
import { motion } from 'framer-motion';

// Composant d'animation pour les effets d'apparition
export const FadeInUp = memo(({ children, delay = 0, duration = 0.6, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration, delay }}
  >
    {children}
  </motion.div>
));

// Composant d'animation pour les effets de scale
export const ScaleIn = memo(({ children, delay = 0, className = "" }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {children}
  </motion.div>
));

// Composant d'animation pour les cartes interactives
export const InteractiveCard = memo(({ children, className = "" }) => (
  <motion.div
    className={`${className} cursor-pointer`}
    whileHover={{ 
      y: -8, 
      scale: 1.02,
      transition: { duration: 0.3 }
    }}
    whileTap={{ scale: 0.98 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    {children}
  </motion.div>
));

// Composant d'animation pour les boutons
export const AnimatedButton = memo(({ children, onClick, className = "", variant = "primary" }) => {
  const variants = {
    primary: "bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700",
    secondary: "bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700",
    outline: "border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white"
  };

  return (
    <motion.button
      className={`${variants[variant]} ${className} px-6 py-3 rounded-xl font-semibold text-white shadow-lg transition-all duration-300`}
      onClick={onClick}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {children}
    </motion.button>
  );
});

// Composant pour les animations de texte
export const AnimatedText = memo(({ text, className = "", delay = 0 }) => {
  const words = text.split(' ');
  
  return (
    <div className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5, 
            delay: delay + (index * 0.1) 
          }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
});

// Composant pour les animations de compteur
export const CounterAnimation = memo(({ value, duration = 2, className = "" }) => {
  return (
    <motion.div
      className={className}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration }}
      >
        {value}
      </motion.span>
    </motion.div>
  );
});

// Composant pour les animations de parallax
export const ParallaxSection = memo(({ children, offset = 50, className = "" }) => (
  <motion.div
    className={className}
    initial={{ y: offset }}
    animate={{ y: 0 }}
    transition={{ duration: 0.8 }}
    whileInView={{ y: 0 }}
    viewport={{ once: true }}
  >
    {children}
  </motion.div>
));

// Export par défaut
export default {
  FadeInUp,
  ScaleIn,
  InteractiveCard,
  AnimatedButton,
  AnimatedText,
  CounterAnimation,
  ParallaxSection
};
