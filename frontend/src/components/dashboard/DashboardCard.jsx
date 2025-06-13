import React from 'react';
import { Link } from 'react-router-dom';

const DashboardCard = ({ title, icon, count, description, link, color = 'blue' }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
    green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
    red: 'from-red-500 to-red-600 hover:from-red-600 hover:to-red-700',
    purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
    yellow: 'from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700',
  };

  return (
    <Link to={link} className="group">
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group-hover:scale-105">
        <div className={`bg-gradient-to-r ${colorClasses[color]} p-6 text-white`}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-1">{title}</h3>
              <p className="text-white/80 text-sm">{description}</p>
            </div>
            <div className="text-3xl opacity-80">{icon}</div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="text-3xl font-bold text-gray-800 mb-2">{count}</div>
          <div className="flex items-center text-sm text-gray-500">
            <span>Voir tout</span>
            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DashboardCard;
