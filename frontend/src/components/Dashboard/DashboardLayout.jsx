import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar responsive */}
      <div
        className={`fixed inset-y-0 left-0 z-30 transform bg-white transition-transform duration-200 ease-in-out md:relative md:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar />
      </div>

      {/* Overlay mobile (clic extérieur pour fermer) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black opacity-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col h-full">
        <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Main avec scroll interne */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
