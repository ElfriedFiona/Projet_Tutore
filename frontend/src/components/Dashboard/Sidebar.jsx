import React from 'react'
import { NavLink } from 'react-router-dom';
import {LibraryIcon} from 'lucide-react'; 
import {
  FaBook,            // Pour BookIcon
  FaBookmark,        // Pour BookmarkIcon
  FaBookOpen,        // Pour BookOpenIcon
  FaSyncAlt,         // Pour RefreshCcwIcon (Refresh, tourner)
  FaBell,            // Pour BellIcon
  FaClock,           // Pour ClockIcon
  FaUsers,           // Pour UsersIcon
  FaTag,             // Pour TagIcon
  FaInbox,           // Pour InboxIcon
  FaUniversity,      // Pour LibraryIcon (ou FaBuilding, FaBookReader)
  FaChartBar,        // Pour BarChartIcon
  FaUser,            // Pour UserIcon
  FaShieldAlt,       // Pour ShieldIcon
  FaCog,             // Pour SettingsIcon (ou FaWrench)
  FaChartLine,       // Pour LineChartIcon
  FaDatabase,        // Pour DatabaseIcon
} from 'react-icons/fa';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 shadow-sm">
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <div className="flex items-center">
          <LibraryIcon size={24} className="text-blue-600" />
          <h1 className="ml-2 text-xl font-bold text-gray-800">UniLib</h1>
        </div>
      </div>
      <div className='w-64 h-full bg-white p-4 fixed shadow-lg'>
        <h2 className='text-gray-400 py-3'>LIBRARIAN PORTAL</h2>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center px-6 py-3 hover:bg-blue-50 hover:text-blue-600 hover:cursor-pointer ${isActive ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : ''
              }`
            }
          >
            <FaChartBar className="text-blue-600 mr-2" size={20} />
            Dashboard
          </NavLink>

          <NavLink
          to="/students"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 hover:bg-blue-50 hover:text-blue-600 hover:cursor-pointer 
            ${isActive ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : ''
            }`
          }
          >
            <FaUsers
              className='text-blue-600 mr-2'
              size={20}
            />
            Students
          </NavLink>

          <NavLink
          to="/categories"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 hover:bg-blue-50 hover:text-blue-600 hover:cursor-pointer 
            ${isActive ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : ''
            }`
           }
          >
            <FaTag
              className='text-blue-600 mr-2'
              size={20}
            />
            Categories
          </NavLink>

          <NavLink
          to="/loans"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 hover:bg-blue-50 hover:text-blue-600 hover:cursor-pointer 
            ${isActive ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : ''
            }`
           }
          >
            <FaInbox
              className='text-blue-600 mr-2'
              size={20}
            />
            Loan Requests
          </NavLink>

          <NavLink
          to="/books"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 hover:bg-blue-50 hover:text-blue-600 hover:cursor-pointer 
            ${isActive ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : ''
            }`
           }
          >
            <FaBook
              className='text-blue-600 mr-2'
              size={20}
            />
            Book Management
          </NavLink>

          <NavLink
          to="/activeloans"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 hover:bg-blue-50 hover:text-blue-600 hover:cursor-pointer 
            ${isActive ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : ''
            }`
           }
          >
            <FaSyncAlt
              className='text-blue-600 mr-2'
              size={20}
            />
            Active Loans
          </NavLink>

          <NavLink
          to="/reservations"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 hover:bg-blue-50 hover:text-blue-600 hover:cursor-pointer 
            ${isActive ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : ''
            }`
           }
          >
            <FaBookmark
              className='text-blue-600 mr-2'
              size={20}
            />
            Reservations
          </NavLink>

          <NavLink
          to="/analytics"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 hover:bg-blue-50 hover:text-blue-600 hover:cursor-pointer 
            ${isActive ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : ''
            }`
           }
          >
            <FaChartLine
              className='text-blue-600 mr-2'
              size={20}
            />
            Analytics
          </NavLink>
          
        
      </div>
    </aside>
  )
}

export default Sidebar