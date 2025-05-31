import React from 'react'
import { FaBook, FaInbox } from 'react-icons/fa'

const Dashboard = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 space-y-6 sm:space-y-0">
      
      {/* Bloc gauche : titre + sous-titre */}
      <div className="md:w-1/2">
        <h1 className="text-2xl font-bold mb-2">Librairian Dashboard</h1>
        <p className="text-lg text-gray-500">
          Welcome back, here's what's happening in your library today.
        </p>
      </div>

      {/* Bloc droit : cartes */}
      <div className="md:w-1/2 space-y-4">
        {/* Card 1 */}
        <div className="flex items-center bg-white shadow-sm px-4 py-4 rounded-lg border">
          <FaBook className="mr-3" size={20} />
          <span className="text-gray-800 font-medium">Manage Books</span>
        </div>

        {/* Card 2 */}
        <div className="flex items-center justify-between bg-blue-500 text-white px-4 py-4 rounded-lg shadow-md">
          <div className="flex items-center">
            <FaInbox className="mr-3" size={20} />
            <p className="text-white font-medium">Loan Requests</p>
          </div>
          <div className="bg-white text-blue-600 font-semibold px-3 py-1 ml-2">
            12
          </div>
        </div>
      </div>

      
    </div>
  )
}

export default Dashboard
