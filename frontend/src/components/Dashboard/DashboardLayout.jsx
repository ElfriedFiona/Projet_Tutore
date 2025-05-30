import React from 'react'
import Sidebar from './Sidebar';
// import Sidebar from './Libraire/Sidebar'

const DashboardLayout = ({children}) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar/>
      <div className="flex-1 flex flex-col bg-gray-100">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 shadow-sm flex items-center px-6">
          <h2 className="text-lg font-semibold text-gray-800">Bienvenue sur le Dashboard</h2>
        </header>
      
      <main className="p-6">
        {children}
      </main>
    </div>
  </div>
  )
}

export default DashboardLayout;