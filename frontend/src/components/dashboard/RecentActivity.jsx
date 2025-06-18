import React from 'react';

const RecentActivity = () => {
  // Mock data - à remplacer par de vraies données
  const activities = [
    {
      id: 1,
      type: 'loan',
      title: 'Emprunté "Introduction aux Algorithmes"',
      description: 'Par Thomas H. Cormen',
      time: 'Il y a 2 heures',
      icon: '📚',
      color: 'text-blue-600'
    },
    {
      id: 2,
      type: 'return',
      title: 'Retourné "Clean Code"',
      description: 'Par Robert C. Martin',
      time: 'Il y a 1 jour',
      icon: '✅',
      color: 'text-green-600'
    },
    {
      id: 3,
      type: 'reservation',
      title: 'Réservé "Design Patterns"',
      description: 'Par Gang of Four',
      time: 'Il y a 2 jours',
      icon: '📅',
      color: 'text-purple-600'
    },
    {
      id: 4,
      type: 'favorite',
      title: 'Ajouté aux favoris "The Pragmatic Programmer"',
      description: 'Par David Thomas',
      time: 'Il y a 3 jours',
      icon: '❤️',
      color: 'text-red-600'
    },
    {
      id: 5,
      type: 'recommendation',
      title: 'Recommandé "Artificial Intelligence"',
      description: 'Par Stuart Russell',
      time: 'Il y a 4 jours',
      icon: '💡',
      color: 'text-yellow-600'
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Activité récente</h2>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          Voir tout
        </button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-150">
            <div className={`text-xl ${activity.color} mt-0.5`}>
              {activity.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">
                {activity.title}
              </p>
              <p className="text-sm text-gray-500">
                {activity.description}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {activity.time}
              </p>
            </div>
            <div className="flex-shrink-0">
              <button className="text-gray-400 hover:text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {activities.length === 0 && (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">📋</div>
          <p className="text-gray-500">Aucune activité récente</p>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;
