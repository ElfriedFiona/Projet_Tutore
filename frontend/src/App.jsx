import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import './App.css'

import MainLayout from './layouts/MainLayout.jsx'
import DashboardLayout from './layouts/DashboardLayout.jsx'
import ErrorBoundary from './components/error/ErrorBoundary.jsx'
import Loading from './components/common/Loading.jsx'

import Home from './pages/Home.jsx'
import Catalog from './pages/Catalog.jsx'
import BookDetail from './pages/BookDetail.jsx'
import Contact from './pages/Contact.jsx'
import Login from './pages/auth/Login.jsx'
import Register from './pages/auth/Register.jsx'
import ForgotPassword from './pages/auth/ForgotPassword.jsx'
import PasswordReset from './pages/auth/PasswordReset.jsx'
import VerifyEmail from './pages/auth/VerifyEmail.jsx'
import ConfirmPassword from './pages/auth/ConfirmPassword.jsx'

import ProtectedRoute from './components/auth/ProtectedRoute.jsx'
import { ToastProvider } from './context/ToastContext.jsx'
import { FavoritesProvider } from './context/FavoritesContext.jsx'
import { AppProvider } from './context/AppContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { LibraryProvider } from './context/LibraryContext.jsx'

// Lazy loaded components
const Admin = lazy(() => import('./pages/Admin'))
const TestAccounts = lazy(() => import('./pages/TestAccounts'))

// Dashboard pages
const Dashboard = lazy(() => import('./pages/Dashboard'))
const DashboardLoans = lazy(() => import('./pages/dashboard/DashboardLoans'))
const DashboardReservations = lazy(() => import('./pages/dashboard/DashboardReservations'))
const DashboardProfile = lazy(() => import('./pages/dashboard/DashboardProfile'))
const DashboardFavorites = lazy(() => import('./pages/dashboard/DashboardFavorites'))
const DashboardRecommendations = lazy(() => import('./pages/dashboard/DashboardRecommendations'))
const DashboardAcquisitions = lazy(() => import('./pages/dashboard/DashboardAcquisitions'))
const DashboardLibrarian = lazy(() => import('./pages/dashboard/DashboardLibrarian'))
const DashboardAdministrator = lazy(() => import('./pages/dashboard/DashboardAdministrator'))

// Dashboard modules - Routes dédiées pour accès direct
const CatalogManagement = lazy(() => import('./pages/dashboard/modules/CatalogManagement'))
const LoanManagement = lazy(() => import('./pages/dashboard/modules/LoanManagement'))
const FineManagement = lazy(() => import('./pages/dashboard/modules/FineManagement'))
const UserManagement = lazy(() => import('./pages/dashboard/modules/UserManagement'))
const AccessRightsManagement = lazy(() => import('./pages/dashboard/modules/AccessRightsManagement'))
const SystemConfiguration = lazy(() => import('./pages/dashboard/modules/SystemConfiguration'))
const ReportsManagement = lazy(() => import('./pages/dashboard/modules/ReportsManagement'))
const BackupManagement = lazy(() => import('./pages/dashboard/modules/BackupManagement'))

function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <AuthProvider>
          <ToastProvider>
            <FavoritesProvider>
              <LibraryProvider>
                <Router>
                  <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/test-accounts" element={<TestAccounts />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/password-reset" element={<PasswordReset />} />
                    <Route path="/verify-email" element={<VerifyEmail />} />
                    <Route path="/confirm-password" element={<ConfirmPassword />} />

                    <Route path="/" element={<MainLayout />}>
                      <Route index element={<Home />} />
                      <Route path="/catalog" element={<Catalog />} />
                      <Route path="/book/:id" element={<BookDetail />} />
                      <Route path="/contact" element={<Contact />} />

                      {/* Test Accounts Page (Development Only) */}
                      <Route
                        path="/test-accounts"
                        element={
                          <Suspense fallback={<Loading fullScreen message="Chargement des comptes de test..." />}>
                            <TestAccounts />
                          </Suspense>
                        }
                      />

                      {/* Redirect old routes to dashboard */}
                      <Route path="/loans" element={<Navigate to="/dashboard/loans" replace />} />
                      <Route path="/reservations" element={<Navigate to="/dashboard/reservations" replace />} />
                      <Route path="/profile" element={<Navigate to="/dashboard/profile" replace />} />

                      {/* Admin route */}
                      <Route
                        path="/admin"
                        element={
                          <ProtectedRoute requireAdmin={true}>
                            <Suspense fallback={<Loading fullScreen message="Chargement du panneau d'administration..." />}>
                              <Admin />
                            </Suspense>
                          </ProtectedRoute>
                        }
                      />

                      {/* 404 fallback */}
                      <Route path="*" element={
                        <div className="py-10 text-center">
                          <h2 className="text-3xl font-bold text-red-500 mb-4">Page non trouvée</h2>
                          <p className="text-lg text-gray-300">La page que vous recherchez n'existe pas.</p>
                        </div>
                      } />
                    </Route>

                    {/* Dashboard routes */}
                    <Route 
                      path="/dashboard" 
                      element={
                        <ProtectedRoute>
                          <DashboardLayout />
                        </ProtectedRoute>
                      }
                    >
                      <Route 
                        index 
                        element={
                          <Suspense fallback={<Loading fullScreen message="Chargement du tableau de bord..." />}>
                            <Dashboard />
                          </Suspense>
                        } 
                      />
                      <Route 
                        path="loans" 
                        element={
                          <Suspense fallback={<Loading fullScreen message="Chargement des emprunts..." />}>
                            <DashboardLoans />
                          </Suspense>
                        } 
                      />
                      <Route 
                        path="reservations" 
                        element={
                          <Suspense fallback={<Loading fullScreen message="Chargement des réservations..." />}>
                            <DashboardReservations />
                          </Suspense>
                        } 
                      />
                      <Route 
                        path="profile" 
                        element={
                          <Suspense fallback={<Loading fullScreen message="Chargement du profil..." />}>
                            <DashboardProfile />
                          </Suspense>
                        } 
                      />
                      <Route 
                        path="favorites" 
                        element={
                          <Suspense fallback={<Loading fullScreen message="Chargement des favoris..." />}>
                            <DashboardFavorites />
                          </Suspense>
                        } 
                      />
                      <Route 
                        path="recommendations" 
                        element={
                          <ProtectedRoute requireTeacher={true}>
                            <Suspense fallback={<Loading fullScreen message="Chargement des recommandations..." />}>
                              <DashboardRecommendations />
                            </Suspense>
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="acquisitions" 
                        element={
                          <ProtectedRoute requireTeacher={true}>
                            <Suspense fallback={<Loading fullScreen message="Chargement des demandes d'acquisition..." />}>
                              <DashboardAcquisitions />
                            </Suspense>
                          </ProtectedRoute>
                        } 
                      />
                      
                      {/* Routes principales des dashboards */}
                      <Route 
                        path="librarian" 
                        element={
                          <ProtectedRoute requireLibrarian={true}>
                            <Suspense fallback={<Loading fullScreen message="Chargement du tableau de bord bibliothécaire..." />}>
                              <DashboardLibrarian />
                            </Suspense>
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="administrator" 
                        element={
                          <ProtectedRoute requireAdmin={true}>
                            <Suspense fallback={<Loading fullScreen message="Chargement du tableau de bord administrateur..." />}>
                              <DashboardAdministrator />
                            </Suspense>
                          </ProtectedRoute>
                        } 
                      />

                      {/* Routes modules pour accès direct - Bibliothécaire */}
                      <Route 
                        path="catalog-management" 
                        element={
                          <ProtectedRoute requireLibrarian={true}>
                            <Suspense fallback={<Loading fullScreen message="Chargement de la gestion du catalogue..." />}>
                              <CatalogManagement />
                            </Suspense>
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="loans-management" 
                        element={
                          <ProtectedRoute requireLibrarian={true}>
                            <Suspense fallback={<Loading fullScreen message="Chargement de la gestion des prêts..." />}>
                              <LoanManagement />
                            </Suspense>
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="fines-management" 
                        element={
                          <ProtectedRoute requireLibrarian={true}>
                            <Suspense fallback={<Loading fullScreen message="Chargement de la gestion des amendes..." />}>
                              <FineManagement />
                            </Suspense>
                          </ProtectedRoute>
                        } 
                      />

                      {/* Routes modules pour accès direct - Administrateur */}
                      <Route 
                        path="user-management" 
                        element={
                          <ProtectedRoute requireAdmin={true}>
                            <Suspense fallback={<Loading fullScreen message="Chargement de la gestion des utilisateurs..." />}>
                              <UserManagement />
                            </Suspense>
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="permissions" 
                        element={
                          <ProtectedRoute requireAdmin={true}>
                            <Suspense fallback={<Loading fullScreen message="Chargement de la gestion des droits d'accès..." />}>
                              <AccessRightsManagement />
                            </Suspense>
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="system-config" 
                        element={
                          <ProtectedRoute requireAdmin={true}>
                            <Suspense fallback={<Loading fullScreen message="Chargement de la configuration système..." />}>
                              <SystemConfiguration />
                            </Suspense>
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="system-reports" 
                        element={
                          <ProtectedRoute requireAdmin={true}>
                            <Suspense fallback={<Loading fullScreen message="Chargement des rapports système..." />}>
                              <ReportsManagement />
                            </Suspense>
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="backups" 
                        element={
                          <ProtectedRoute requireAdmin={true}>
                            <Suspense fallback={<Loading fullScreen message="Chargement de la gestion des sauvegardes..." />}>
                              <BackupManagement />
                            </Suspense>
                          </ProtectedRoute>
                        } 
                      />
                    </Route>
                  </Routes>
                </Router>
              </LibraryProvider>
            </FavoritesProvider>
          </ToastProvider>
        </AuthProvider>
      </AppProvider>
    </ErrorBoundary>
  )
}

export default App
