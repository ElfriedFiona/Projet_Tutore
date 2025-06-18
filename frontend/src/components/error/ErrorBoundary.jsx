import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    console.log(error)
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Vous pouvez aussi logger l'erreur à un service de reporting
    console.error('ErrorBoundary a attrapé une erreur:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      // Interface d'erreur de secours personnalisée
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
            {/* Icône d'erreur */}
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-500 to-rose-600 rounded-2xl mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>

            {/* Titre */}
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Oups ! Une erreur s'est produite
            </h2>

            {/* Message */}
            <p className="text-gray-600 mb-6">
              Nous sommes désolés, mais quelque chose s'est mal passé. 
              Veuillez réessayer ou contacter le support si le problème persiste.
            </p>

            {/* Détails de l'erreur (en mode développement) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="text-left bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                  Détails de l'erreur (mode développement) :
                </h3>
                <pre className="text-xs text-red-600 overflow-auto max-h-32">
                  {this.state.error && this.state.error.toString()}
                  {this.state.errorInfo.componentStack}
                </pre>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={this.handleRetry}
                className="flex-1 bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-red-600 hover:to-rose-700 transition-all duration-200 hover:scale-105"
              >
                Réessayer
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="flex-1 bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-200 transition-all duration-200"
              >
                Retour à l'accueil
              </button>
            </div>

            {/* Contact support */}
            <p className="text-sm text-gray-500 mt-6">
              Problème persistant ? {' '}
              <a href="mailto:support@enspd.edu" className="text-red-600 hover:text-red-700 font-medium">
                Contactez le support
              </a>
            </p>
          </div>
        </div>
      );
    }

    // Si aucune erreur, afficher les enfants normalement
    return this.props.children;
  }
}

export default ErrorBoundary;
