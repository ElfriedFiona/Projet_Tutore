import React from 'react';

const UserStats = () => {
  // Mock data - à remplacer par de vraies données
  const stats = [
    {
      label: 'Livres empruntés',
      value: '12',
      change: '+2',
      changeType: 'increase',
      icon: '📚'
    },
    {
      label: 'Livres retournés',
      value: '45',
      change: '+5',
      changeType: 'increase',
      icon: '✅'
    },
    {
      label: 'En retard',
      value: '1',
      change: '-1',
      changeType: 'decrease',
      icon: '⚠️'
    },
    {
      label: 'Favoris',
      value: '8',
      change: '+3',
      changeType: 'increase',
      icon: '❤️'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <div className="flex items-center mt-2">
                <span className={`text-sm font-medium ${
                  stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 ml-1">ce mois</span>
              </div>
            </div>
            <div className="text-2xl opacity-60">
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserStats;
