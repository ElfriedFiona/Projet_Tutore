# Bibliothèque ENSPD - Système de Gestion de Bibliothèque

Application web responsive pour la gestion de la bibliothèque de l'École Nationale Supérieure Polytechnique de Douala (ENSPD). Ce projet est construit avec React et Vite, utilisant Tailwind CSS pour un design moderne et responsive.

## Fonctionnalités

- Consultation du catalogue de livres
- Recherche avancée d'ouvrages
- Système de réservation et d'emprunt
- Espace utilisateur personnel
- Interface admin pour la gestion des livres

## Design Responsive

Cette application est entièrement responsive, offrant une expérience utilisateur optimale sur tous les appareils:

- **Mobile-first**: Conçue d'abord pour les petits écrans, puis adaptée pour les écrans plus grands
- **Composants responsifs**: Utilisation de composants React spécialement conçus pour s'adapter à toutes les tailles d'écran
- **Breakpoints personnalisés**: Optimisations spécifiques pour 6 tailles d'écran différentes
- **Couleurs ENSPD**: Respect de la charte graphique de l'école

Pour plus d'informations sur l'implémentation responsive:

- [Guide de Design Responsive](./RESPONSIVE-DESIGN.md)
- [Implémentation Technique](./RESPONSIVE-IMPLEMENTATION.md)
- [Résumé des Améliorations](./RESPONSIVE-SUMMARY.md)
- [Roadmap Responsive](./RESPONSIVE-ROADMAP.md)
- [Guide de Test Responsive](./RESPONSIVE-TESTING-GUIDE.md)

## Technologies

- **Frontend**: React 18, Tailwind CSS
- **Build**: Vite
- **Tests**: Jest
- **Déploiement**: GitHub Actions

## Installation

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev

# Construire pour la production
npm run build
```
