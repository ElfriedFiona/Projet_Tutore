import React from 'react';
import { Info, Navigation } from 'lucide-react';

const DemoModeInfo = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <Info className="w-5 h-5 text-blue-600 mt-0.5" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-blue-900">
            Mode Démonstration - Navigation Libre
          </h3>
          <div className="mt-2 text-sm text-blue-800">
            <p className="mb-2">
              Le contexte d'authentification a été retiré pour permettre la navigation manuelle entre les différentes pages.
            </p>
            <div className="flex items-center space-x-2 text-xs">
              <Navigation className="w-4 h-4" />
              <span>Utilisez le sélecteur de rôle dans la sidebar ou les liens ci-dessus pour naviguer</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoModeInfo;
