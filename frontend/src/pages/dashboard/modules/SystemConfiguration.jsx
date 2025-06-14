import React, { useState, useEffect } from 'react';
import { 
  Settings, Server, Database, Mail, Shield, Globe,
  Clock, Calendar, CreditCard, BookOpen, Users, AlertTriangle,
  Save, RefreshCw, Download, Upload, Eye, EyeOff,
  Zap, Bell, Lock, Key, FileText, CheckCircle,
  XCircle, Info, Edit, Trash2
} from 'lucide-react';

const SystemConfiguration = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({});
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  // Configuration générale du système
  const [generalConfig, setGeneralConfig] = useState({
    systemName: 'Bibliothèque Numérique ENSPD',
    systemVersion: '2.1.4',
    description: 'Système de gestion de bibliothèque pour l\'ENSPD',
    maintenanceMode: false,
    maxUsersOnline: 500,
    sessionTimeout: 30, // minutes
    backupFrequency: 'daily',
    logLevel: 'info'
  });

  // Configuration des prêts
  const [loanConfig, setLoanConfig] = useState({
    student: {
      maxLoans: 3,
      loanDuration: 14, // jours
      maxRenewals: 1,
      maxReservations: 3,
      finePerDay: 500 // FCFA
    },
    teacher: {
      maxLoans: 10,
      loanDuration: 30,
      maxRenewals: 3,
      maxReservations: 5,
      finePerDay: 500
    },
    librarian: {
      maxLoans: 0,
      loanDuration: 0,
      maxRenewals: 0,
      maxReservations: 0,
      finePerDay: 0
    }
  });

  // Configuration des notifications
  const [notificationConfig, setNotificationConfig] = useState({
    emailEnabled: true,
    smsEnabled: false,
    pushEnabled: true,
    reminderDays: [3, 1], // jours avant échéance
    overdueReminderFrequency: 2, // jours
    emailTemplates: {
      loanConfirmation: true,
      dueReminder: true,
      overdueNotice: true,
      fineNotice: true,
      reservationReady: true
    }
  });

  // Configuration de la base de données
  const [databaseConfig, setDatabaseConfig] = useState({
    host: 'localhost',
    port: 5432,
    database: 'enspd_library',
    username: 'library_admin',
    password: '••••••••••••',
    maxConnections: 100,
    connectionTimeout: 30,
    backupRetention: 30, // jours
    maintenanceWindow: '02:00'
  });

  // Configuration de sécurité
  const [securityConfig, setSecurityConfig] = useState({
    passwordMinLength: 8,
    passwordRequireUppercase: true,
    passwordRequireLowercase: true,
    passwordRequireNumbers: true,
    passwordRequireSymbols: false,
    passwordExpiry: 90, // jours
    maxLoginAttempts: 5,
    lockoutDuration: 15, // minutes
    twoFactorRequired: false,
    ipRestrictionEnabled: false,
    allowedIPs: [],
    auditLogRetention: 365 // jours
  });

  const handleSave = async (section) => {
    setLoading(true);
    try {
      // Simulation de sauvegarde
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUnsavedChanges(false);
      console.log(`Sauvegarde de la section ${section}`);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfigChange = (section, field, value) => {
    setUnsavedChanges(true);
    switch (section) {
      case 'general':
        setGeneralConfig(prev => ({ ...prev, [field]: value }));
        break;
      case 'loans':
        if (typeof field === 'object') {
          setLoanConfig(prev => ({
            ...prev,
            [field.role]: {
              ...prev[field.role],
              [field.setting]: value
            }
          }));
        }
        break;
      case 'notifications':
        if (field.includes('.')) {
          const [category, setting] = field.split('.');
          setNotificationConfig(prev => ({
            ...prev,
            [category]: {
              ...prev[category],
              [setting]: value
            }
          }));
        } else {
          setNotificationConfig(prev => ({ ...prev, [field]: value }));
        }
        break;
      case 'database':
        setDatabaseConfig(prev => ({ ...prev, [field]: value }));
        break;
      case 'security':
        setSecurityConfig(prev => ({ ...prev, [field]: value }));
        break;
    }
  };

  // Composant pour les champs de configuration
  const ConfigField = ({ label, value, onChange, type = 'text', options = [], description, required = false }) => {
    const fieldId = label.toLowerCase().replace(/\s+/g, '-');
    
    return (
      <div className="space-y-2">
        <label htmlFor={fieldId} className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {type === 'select' ? (
          <select
            id={fieldId}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : type === 'checkbox' ? (
          <div className="flex items-center">
            <input
              id={fieldId}
              type="checkbox"
              checked={value}
              onChange={(e) => onChange(e.target.checked)}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor={fieldId} className="ml-2 text-sm text-gray-600">
              {description || 'Activer cette option'}
            </label>
          </div>
        ) : type === 'number' ? (
          <input
            id={fieldId}
            type="number"
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        ) : type === 'password' ? (
          <div className="relative">
            <input
              id={fieldId}
              type={showPassword[fieldId] ? 'text' : 'password'}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => setShowPassword(prev => ({ ...prev, [fieldId]: !prev[fieldId] }))}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword[fieldId] ? (
                <EyeOff className="w-4 h-4 text-gray-400" />
              ) : (
                <Eye className="w-4 h-4 text-gray-400" />
              )}
            </button>
          </div>
        ) : (
          <input
            id={fieldId}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        )}
        {description && type !== 'checkbox' && (
          <p className="text-xs text-gray-500">{description}</p>
        )}
      </div>
    );
  };

  const ConfigSection = ({ title, children, onSave, showSave = true }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {showSave && (
          <button
            onClick={onSave}
            disabled={loading}
            className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
          >
            {loading ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Sauvegarder
          </button>
        )}
      </div>
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Settings className="w-8 h-8 mr-3 text-primary-600" />
            Configuration Système
          </h2>
          <p className="text-gray-600 mt-1">
            Paramètres globaux du système de bibliothèque
          </p>
        </div>
        
        {unsavedChanges && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-center">
            <AlertTriangle className="w-4 h-4 text-yellow-600 mr-2" />
            <span className="text-sm text-yellow-800">Modifications non sauvegardées</span>
          </div>
        )}
      </div>

      {/* Navigation par onglets */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'general', label: 'Général', icon: Settings },
            { id: 'loans', label: 'Prêts et Emprunts', icon: BookOpen },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'database', label: 'Base de Données', icon: Database },
            { id: 'security', label: 'Sécurité', icon: Shield }
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
      {activeTab === 'general' && (
        <ConfigSection 
          title="Configuration Générale" 
          onSave={() => handleSave('general')}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ConfigField
              label="Nom du Système"
              value={generalConfig.systemName}
              onChange={(value) => handleConfigChange('general', 'systemName', value)}
              required
            />
            <ConfigField
              label="Version"
              value={generalConfig.systemVersion}
              onChange={(value) => handleConfigChange('general', 'systemVersion', value)}
              description="Version actuelle du système"
            />
            <div className="md:col-span-2">
              <ConfigField
                label="Description"
                value={generalConfig.description}
                onChange={(value) => handleConfigChange('general', 'description', value)}
                description="Description du système affichée aux utilisateurs"
              />
            </div>
            <ConfigField
              label="Utilisateurs max en ligne"
              type="number"
              value={generalConfig.maxUsersOnline}
              onChange={(value) => handleConfigChange('general', 'maxUsersOnline', value)}
              description="Nombre maximum d'utilisateurs connectés simultanément"
            />
            <ConfigField
              label="Timeout de session (minutes)"
              type="number"
              value={generalConfig.sessionTimeout}
              onChange={(value) => handleConfigChange('general', 'sessionTimeout', value)}
              description="Durée d'inactivité avant déconnexion automatique"
            />
            <ConfigField
              label="Fréquence de sauvegarde"
              type="select"
              value={generalConfig.backupFrequency}
              onChange={(value) => handleConfigChange('general', 'backupFrequency', value)}
              options={[
                { value: 'hourly', label: 'Toutes les heures' },
                { value: 'daily', label: 'Quotidienne' },
                { value: 'weekly', label: 'Hebdomadaire' }
              ]}
            />
            <ConfigField
              label="Niveau de log"
              type="select"
              value={generalConfig.logLevel}
              onChange={(value) => handleConfigChange('general', 'logLevel', value)}
              options={[
                { value: 'error', label: 'Erreurs seulement' },
                { value: 'warn', label: 'Avertissements' },
                { value: 'info', label: 'Informations' },
                { value: 'debug', label: 'Debug' }
              ]}
            />
          </div>
          
          <div className="pt-6 border-t border-gray-200">
            <ConfigField
              label="Mode maintenance"
              type="checkbox"
              value={generalConfig.maintenanceMode}
              onChange={(value) => handleConfigChange('general', 'maintenanceMode', value)}
              description="Activer le mode maintenance (seuls les administrateurs peuvent se connecter)"
            />
          </div>
        </ConfigSection>
      )}

      {activeTab === 'loans' && (
        <ConfigSection 
          title="Configuration des Prêts" 
          onSave={() => handleSave('loans')}
        >
          {Object.entries(loanConfig).map(([role, config]) => (
            <div key={role} className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-4 capitalize">
                {role === 'student' ? 'Étudiants' : role === 'teacher' ? 'Enseignants' : 'Bibliothécaires'}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ConfigField
                  label="Emprunts maximum"
                  type="number"
                  value={config.maxLoans}
                  onChange={(value) => handleConfigChange('loans', { role, setting: 'maxLoans' }, value)}
                />
                <ConfigField
                  label="Durée (jours)"
                  type="number"
                  value={config.loanDuration}
                  onChange={(value) => handleConfigChange('loans', { role, setting: 'loanDuration' }, value)}
                />
                <ConfigField
                  label="Prolongations max"
                  type="number"
                  value={config.maxRenewals}
                  onChange={(value) => handleConfigChange('loans', { role, setting: 'maxRenewals' }, value)}
                />
                <ConfigField
                  label="Réservations max"
                  type="number"
                  value={config.maxReservations}
                  onChange={(value) => handleConfigChange('loans', { role, setting: 'maxReservations' }, value)}
                />
                <ConfigField
                  label="Amende/jour (FCFA)"
                  type="number"
                  value={config.finePerDay}
                  onChange={(value) => handleConfigChange('loans', { role, setting: 'finePerDay' }, value)}
                />
              </div>
            </div>
          ))}
        </ConfigSection>
      )}

      {activeTab === 'notifications' && (
        <ConfigSection 
          title="Configuration des Notifications" 
          onSave={() => handleSave('notifications')}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ConfigField
              label="Email activé"
              type="checkbox"
              value={notificationConfig.emailEnabled}
              onChange={(value) => handleConfigChange('notifications', 'emailEnabled', value)}
              description="Envoyer des notifications par email"
            />
            <ConfigField
              label="SMS activé"
              type="checkbox"
              value={notificationConfig.smsEnabled}
              onChange={(value) => handleConfigChange('notifications', 'smsEnabled', value)}
              description="Envoyer des notifications par SMS"
            />
            <ConfigField
              label="Push activé"
              type="checkbox"
              value={notificationConfig.pushEnabled}
              onChange={(value) => handleConfigChange('notifications', 'pushEnabled', value)}
              description="Envoyer des notifications push"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ConfigField
              label="Rappels avant échéance (jours)"
              value={notificationConfig.reminderDays.join(', ')}
              onChange={(value) => handleConfigChange('notifications', 'reminderDays', value.split(',').map(d => parseInt(d.trim())))}
              description="Jours avant échéance pour envoyer des rappels (séparés par des virgules)"
            />
            <ConfigField
              label="Fréquence rappels retard (jours)"
              type="number"
              value={notificationConfig.overdueReminderFrequency}
              onChange={(value) => handleConfigChange('notifications', 'overdueReminderFrequency', value)}
              description="Fréquence d'envoi des rappels pour les retards"
            />
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-4">Templates d'Email</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(notificationConfig.emailTemplates).map(([template, enabled]) => (
                <ConfigField
                  key={template}
                  label={template.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  type="checkbox"
                  value={enabled}
                  onChange={(value) => handleConfigChange('notifications', `emailTemplates.${template}`, value)}
                />
              ))}
            </div>
          </div>
        </ConfigSection>
      )}

      {activeTab === 'database' && (
        <ConfigSection 
          title="Configuration Base de Données" 
          onSave={() => handleSave('database')}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ConfigField
              label="Hôte"
              value={databaseConfig.host}
              onChange={(value) => handleConfigChange('database', 'host', value)}
              required
            />
            <ConfigField
              label="Port"
              type="number"
              value={databaseConfig.port}
              onChange={(value) => handleConfigChange('database', 'port', value)}
              required
            />
            <ConfigField
              label="Base de données"
              value={databaseConfig.database}
              onChange={(value) => handleConfigChange('database', 'database', value)}
              required
            />
            <ConfigField
              label="Nom d'utilisateur"
              value={databaseConfig.username}
              onChange={(value) => handleConfigChange('database', 'username', value)}
              required
            />
            <ConfigField
              label="Mot de passe"
              type="password"
              value={databaseConfig.password}
              onChange={(value) => handleConfigChange('database', 'password', value)}
              required
            />
            <ConfigField
              label="Connexions max"
              type="number"
              value={databaseConfig.maxConnections}
              onChange={(value) => handleConfigChange('database', 'maxConnections', value)}
            />
            <ConfigField
              label="Timeout connexion (sec)"
              type="number"
              value={databaseConfig.connectionTimeout}
              onChange={(value) => handleConfigChange('database', 'connectionTimeout', value)}
            />
            <ConfigField
              label="Rétention sauvegardes (jours)"
              type="number"
              value={databaseConfig.backupRetention}
              onChange={(value) => handleConfigChange('database', 'backupRetention', value)}
            />
            <div className="md:col-span-2">
              <ConfigField
                label="Fenêtre de maintenance"
                value={databaseConfig.maintenanceWindow}
                onChange={(value) => handleConfigChange('database', 'maintenanceWindow', value)}
                description="Heure de maintenance quotidienne (format HH:MM)"
              />
            </div>
          </div>
        </ConfigSection>
      )}

      {activeTab === 'security' && (
        <ConfigSection 
          title="Configuration Sécurité" 
          onSave={() => handleSave('security')}
        >
          <div className="space-y-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-4">Politique des Mots de Passe</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ConfigField
                  label="Longueur minimale"
                  type="number"
                  value={securityConfig.passwordMinLength}
                  onChange={(value) => handleConfigChange('security', 'passwordMinLength', value)}
                />
                <ConfigField
                  label="Expiration (jours)"
                  type="number"
                  value={securityConfig.passwordExpiry}
                  onChange={(value) => handleConfigChange('security', 'passwordExpiry', value)}
                />
                <ConfigField
                  label="Majuscules requises"
                  type="checkbox"
                  value={securityConfig.passwordRequireUppercase}
                  onChange={(value) => handleConfigChange('security', 'passwordRequireUppercase', value)}
                />
                <ConfigField
                  label="Minuscules requises"
                  type="checkbox"
                  value={securityConfig.passwordRequireLowercase}
                  onChange={(value) => handleConfigChange('security', 'passwordRequireLowercase', value)}
                />
                <ConfigField
                  label="Chiffres requis"
                  type="checkbox"
                  value={securityConfig.passwordRequireNumbers}
                  onChange={(value) => handleConfigChange('security', 'passwordRequireNumbers', value)}
                />
                <ConfigField
                  label="Symboles requis"
                  type="checkbox"
                  value={securityConfig.passwordRequireSymbols}
                  onChange={(value) => handleConfigChange('security', 'passwordRequireSymbols', value)}
                />
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-4">Contrôle d'Accès</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ConfigField
                  label="Tentatives max de connexion"
                  type="number"
                  value={securityConfig.maxLoginAttempts}
                  onChange={(value) => handleConfigChange('security', 'maxLoginAttempts', value)}
                />
                <ConfigField
                  label="Durée de verrouillage (min)"
                  type="number"
                  value={securityConfig.lockoutDuration}
                  onChange={(value) => handleConfigChange('security', 'lockoutDuration', value)}
                />
                <ConfigField
                  label="Authentification 2FA requise"
                  type="checkbox"
                  value={securityConfig.twoFactorRequired}
                  onChange={(value) => handleConfigChange('security', 'twoFactorRequired', value)}
                />
                <ConfigField
                  label="Restriction IP activée"
                  type="checkbox"
                  value={securityConfig.ipRestrictionEnabled}
                  onChange={(value) => handleConfigChange('security', 'ipRestrictionEnabled', value)}
                />
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-4">Audit et Logs</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ConfigField
                  label="Rétention logs audit (jours)"
                  type="number"
                  value={securityConfig.auditLogRetention}
                  onChange={(value) => handleConfigChange('security', 'auditLogRetention', value)}
                />
              </div>
            </div>
          </div>
        </ConfigSection>
      )}
    </div>
  );
};

export default SystemConfiguration;
