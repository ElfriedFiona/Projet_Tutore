import React, { useState, useEffect } from 'react';
import { 
  HardDrive, Download, Upload, RefreshCw, Clock, Calendar,
  Database, File, Folder, Settings, AlertTriangle, CheckCircle,
  XCircle, Info, Play, Pause, Trash2, Eye, Copy,
  Server, Cloud, Archive, Shield, Zap, Timer
} from 'lucide-react';

const BackupManagement = () => {
  const [activeTab, setActiveTab] = useState('backups');
  const [loading, setLoading] = useState(false);
  const [isCreatingBackup, setIsCreatingBackup] = useState(false);
  const [selectedBackup, setSelectedBackup] = useState(null);
  const [showRestoreModal, setShowRestoreModal] = useState(false);

  // Configuration des sauvegardes
  const [backupConfig, setBackupConfig] = useState({
    autoBackup: true,
    frequency: 'daily',
    time: '02:00',
    retention: 30, // jours
    compression: true,
    encryption: true,
    location: 'local',
    maxSize: 500, // MB
    includeLogs: true,
    includeUploads: true
  });

  // Mock data pour les sauvegardes
  const [backups, setBackups] = useState([
    {
      id: 1,
      name: 'backup_2024-01-28_02-00',
      type: 'automatic',
      date: '2024-01-28',
      time: '02:00:15',
      size: 245.6, // MB
      status: 'completed',
      location: 'local',
      compressed: true,
      encrypted: true,
      duration: 342, // secondes
      tables: 12,
      records: 15420,
      description: 'Sauvegarde automatique quotidienne'
    },
    {
      id: 2,
      name: 'backup_manual_2024-01-27_15-30',
      type: 'manual',
      date: '2024-01-27',
      time: '15:30:42',
      size: 243.2,
      status: 'completed',
      location: 'local',
      compressed: true,
      encrypted: true,
      duration: 298,
      tables: 12,
      records: 15380,
      description: 'Sauvegarde manuelle avant mise à jour'
    },
    {
      id: 3,
      name: 'backup_2024-01-27_02-00',
      type: 'automatic',
      date: '2024-01-27',
      time: '02:00:08',
      size: 241.8,
      status: 'completed',
      location: 'local',
      compressed: true,
      encrypted: true,
      duration: 356,
      tables: 12,
      records: 15356,
      description: 'Sauvegarde automatique quotidienne'
    },
    {
      id: 4,
      name: 'backup_2024-01-26_02-00',
      type: 'automatic',
      date: '2024-01-26',
      time: '02:00:12',
      size: 239.4,
      status: 'error',
      location: 'local',
      compressed: false,
      encrypted: false,
      duration: 45,
      tables: 0,
      records: 0,
      error: 'Erreur de connexion à la base de données',
      description: 'Sauvegarde automatique quotidienne - ÉCHEC'
    },
    {
      id: 5,
      name: 'backup_2024-01-25_02-00',
      type: 'automatic',
      date: '2024-01-25',
      time: '02:00:05',
      size: 238.1,
      status: 'completed',
      location: 'local',
      compressed: true,
      encrypted: true,
      duration: 367,
      tables: 12,
      records: 15298,
      description: 'Sauvegarde automatique quotidienne'
    }
  ]);

  const createBackup = async () => {
    setIsCreatingBackup(true);
    try {
      // Simulation de création de sauvegarde
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const newBackup = {
        id: Date.now(),
        name: `backup_manual_${new Date().toISOString().slice(0,10)}_${new Date().toTimeString().slice(0,5).replace(':','-')}`,
        type: 'manual',
        date: new Date().toISOString().slice(0,10),
        time: new Date().toTimeString().slice(0,8),
        size: 246.8,
        status: 'completed',
        location: backupConfig.location,
        compressed: backupConfig.compression,
        encrypted: backupConfig.encryption,
        duration: 312,
        tables: 12,
        records: 15442,
        description: 'Sauvegarde manuelle'
      };
      
      setBackups(prev => [newBackup, ...prev]);
    } catch (error) {
      console.error('Erreur lors de la création de la sauvegarde:', error);
    } finally {
      setIsCreatingBackup(false);
    }
  };

  const deleteBackup = async (backupId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette sauvegarde ?')) {
      setBackups(prev => prev.filter(backup => backup.id !== backupId));
    }
  };

  const downloadBackup = (backup) => {
    console.log('Téléchargement de la sauvegarde:', backup.name);
    // Simulation du téléchargement
  };

  const restoreBackup = async (backup) => {
    setLoading(true);
    try {
      // Simulation de restauration
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Restauration de la sauvegarde:', backup.name);
      setShowRestoreModal(false);
    } catch (error) {
      console.error('Erreur lors de la restauration:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatSize = (sizeInMB) => {
    if (sizeInMB >= 1024) {
      return `${(sizeInMB / 1024).toFixed(2)} GB`;
    }
    return `${sizeInMB.toFixed(1)} MB`;
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'running':
        return <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'running':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Statistiques
  const stats = {
    totalBackups: backups.length,
    successfulBackups: backups.filter(b => b.status === 'completed').length,
    failedBackups: backups.filter(b => b.status === 'error').length,
    totalSize: backups.reduce((acc, b) => acc + (b.size || 0), 0),
    oldestBackup: backups.length > 0 ? backups[backups.length - 1].date : null,
    newestBackup: backups.length > 0 ? backups[0].date : null
  };

  // Composant pour les cartes de statistiques
  const StatCard = ({ icon: Icon, title, value, subtitle, color = 'primary' }) => {
    const colorClasses = {
      primary: 'from-primary-600 to-primary-700',
      blue: 'from-blue-600 to-blue-700',
      green: 'from-green-600 to-green-700',
      red: 'from-red-600 to-red-700',
      purple: 'from-purple-600 to-purple-700'
    };

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          </div>
          <div className={`p-3 rounded-lg bg-gradient-to-br ${colorClasses[color]}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>
    );
  };

  // Composant pour les éléments de sauvegarde
  const BackupItem = ({ backup }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-all duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            {getStatusIcon(backup.status)}
            <div>
              <h4 className="font-medium text-gray-900">{backup.name}</h4>
              <p className="text-sm text-gray-600">{backup.description}</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-right text-sm">
            <p className="text-gray-900 font-medium">{formatSize(backup.size)}</p>
            <p className="text-gray-500">{backup.date} {backup.time}</p>
          </div>
          
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(backup.status)}`}>
            {backup.status === 'completed' ? 'Réussie' : 
             backup.status === 'error' ? 'Échec' : 
             backup.status === 'running' ? 'En cours' : 'En attente'}
          </span>
        </div>
      </div>

      {backup.status === 'completed' && (
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 p-3 bg-gray-50 rounded-lg text-sm">
          <div>
            <span className="text-gray-600">Durée:</span>
            <span className="ml-2 font-medium">{formatDuration(backup.duration)}</span>
          </div>
          <div>
            <span className="text-gray-600">Tables:</span>
            <span className="ml-2 font-medium">{backup.tables}</span>
          </div>
          <div>
            <span className="text-gray-600">Enregistrements:</span>
            <span className="ml-2 font-medium">{backup.records?.toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            {backup.compressed && <Archive className="w-4 h-4 text-blue-600" title="Compressé" />}
            {backup.encrypted && <Shield className="w-4 h-4 text-green-600" title="Chiffré" />}
          </div>
        </div>
      )}

      {backup.status === 'error' && backup.error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <span className="text-sm text-red-800">{backup.error}</span>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded text-xs ${
            backup.type === 'automatic' 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-purple-100 text-purple-800'
          }`}>
            {backup.type === 'automatic' ? 'Automatique' : 'Manuelle'}
          </span>
          <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs">
            {backup.location === 'local' ? 'Local' : 'Cloud'}
          </span>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedBackup(backup)}
            className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded"
            title="Voir détails"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => downloadBackup(backup)}
            disabled={backup.status !== 'completed'}
            className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            title="Télécharger"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setSelectedBackup(backup);
              setShowRestoreModal(true);
            }}
            disabled={backup.status !== 'completed'}
            className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            title="Restaurer"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => deleteBackup(backup.id)}
            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded"
            title="Supprimer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  // Modal de restauration
  const RestoreModal = () => {
    if (!showRestoreModal || !selectedBackup) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-md">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-6 h-6 text-yellow-600 mr-3" />
            <h3 className="text-lg font-semibold">Confirmer la Restauration</h3>
          </div>
          
          <div className="mb-6">
            <p className="text-gray-600 mb-2">
              Vous êtes sur le point de restaurer la sauvegarde :
            </p>
            <p className="font-medium text-gray-900">{selectedBackup.name}</p>
            <p className="text-sm text-gray-500">
              Créée le {selectedBackup.date} à {selectedBackup.time}
            </p>
            
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Attention :</strong> Cette opération remplacera toutes les données actuelles. 
                Assurez-vous d'avoir créé une sauvegarde récente avant de continuer.
              </p>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => {
                setShowRestoreModal(false);
                setSelectedBackup(null);
              }}
              disabled={loading}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              Annuler
            </button>
            <button
              onClick={() => restoreBackup(selectedBackup)}
              disabled={loading}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Restauration...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Restaurer
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <HardDrive className="w-8 h-8 mr-3 text-primary-600" />
            Gestion des Sauvegardes
          </h2>
          <p className="text-gray-600 mt-1">
            Sauvegarde et restauration des données du système
          </p>
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={createBackup}
            disabled={isCreatingBackup}
            className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
          >
            {isCreatingBackup ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Création...
              </>
            ) : (
              <>
                <HardDrive className="w-4 h-4 mr-2" />
                Créer Sauvegarde
              </>
            )}
          </button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={Database} 
          title="Total Sauvegardes" 
          value={stats.totalBackups}
          subtitle={`${stats.successfulBackups} réussies`}
          color="primary"
        />
        <StatCard 
          icon={CheckCircle} 
          title="Taux de Réussite" 
          value={`${Math.round((stats.successfulBackups / stats.totalBackups) * 100)}%`}
          subtitle={`${stats.failedBackups} échecs`}
          color="green"
        />
        <StatCard 
          icon={HardDrive} 
          title="Espace Utilisé" 
          value={formatSize(stats.totalSize)}
          subtitle="Total des sauvegardes"
          color="blue"
        />
        <StatCard 
          icon={Calendar} 
          title="Dernière Sauvegarde" 
          value={stats.newestBackup ? new Date(stats.newestBackup).toLocaleDateString() : 'Aucune'}
          subtitle="Sauvegarde automatique"
          color="purple"
        />
      </div>

      {/* Navigation par onglets */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'backups', label: 'Sauvegardes', icon: Database },
            { id: 'schedule', label: 'Planification', icon: Calendar },
            { id: 'settings', label: 'Configuration', icon: Settings }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Contenu selon l'onglet */}
      {activeTab === 'backups' && (
        <div className="space-y-4">
          {backups.length === 0 ? (
            <div className="text-center py-12">
              <HardDrive className="w-12 h-12 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Aucune sauvegarde disponible</p>
              <button
                onClick={createBackup}
                className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                Créer la première sauvegarde
              </button>
            </div>
          ) : (
            backups.map(backup => (
              <BackupItem key={backup.id} backup={backup} />
            ))
          )}
        </div>
      )}

      {activeTab === 'schedule' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Planification des Sauvegardes</h3>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">Sauvegarde Automatique</h4>
                <p className="text-sm text-gray-600">
                  Sauvegarde quotidienne à {backupConfig.time}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  backupConfig.autoBackup 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {backupConfig.autoBackup ? 'Activé' : 'Désactivé'}
                </span>
                <button
                  onClick={() => setBackupConfig(prev => ({ ...prev, autoBackup: !prev.autoBackup }))}
                  className={`p-2 rounded ${
                    backupConfig.autoBackup 
                      ? 'text-red-600 hover:bg-red-50' 
                      : 'text-green-600 hover:bg-green-50'
                  }`}
                >
                  {backupConfig.autoBackup ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fréquence
                </label>
                <select
                  value={backupConfig.frequency}
                  onChange={(e) => setBackupConfig(prev => ({ ...prev, frequency: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="hourly">Toutes les heures</option>
                  <option value="daily">Quotidienne</option>
                  <option value="weekly">Hebdomadaire</option>
                  <option value="monthly">Mensuelle</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Heure d'exécution
                </label>
                <input
                  type="time"
                  value={backupConfig.time}
                  onChange={(e) => setBackupConfig(prev => ({ ...prev, time: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Configuration des Sauvegardes</h3>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rétention (jours)
                  </label>
                  <input
                    type="number"
                    value={backupConfig.retention}
                    onChange={(e) => setBackupConfig(prev => ({ ...prev, retention: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    min="1"
                    max="365"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Nombre de jours de conservation des sauvegardes
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Taille maximale (MB)
                  </label>
                  <input
                    type="number"
                    value={backupConfig.maxSize}
                    onChange={(e) => setBackupConfig(prev => ({ ...prev, maxSize: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    min="100"
                    max="5000"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Compression</label>
                    <p className="text-xs text-gray-500">Compresser les sauvegardes pour économiser l'espace</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={backupConfig.compression}
                    onChange={(e) => setBackupConfig(prev => ({ ...prev, compression: e.target.checked }))}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Chiffrement</label>
                    <p className="text-xs text-gray-500">Chiffrer les sauvegardes pour la sécurité</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={backupConfig.encryption}
                    onChange={(e) => setBackupConfig(prev => ({ ...prev, encryption: e.target.checked }))}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Inclure les logs</label>
                    <p className="text-xs text-gray-500">Inclure les fichiers de logs dans la sauvegarde</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={backupConfig.includeLogs}
                    onChange={(e) => setBackupConfig(prev => ({ ...prev, includeLogs: e.target.checked }))}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Inclure les fichiers uploadés</label>
                    <p className="text-xs text-gray-500">Inclure les images et documents uploadés</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={backupConfig.includeUploads}
                    onChange={(e) => setBackupConfig(prev => ({ ...prev, includeUploads: e.target.checked }))}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={() => console.log('Configuration sauvegardée')}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  Sauvegarder la Configuration
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <RestoreModal />
    </div>
  );
};

export default BackupManagement;
