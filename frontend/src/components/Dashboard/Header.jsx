import React, { useState, useRef, useEffect } from 'react'
import { BellIcon, SearchIcon } from 'lucide-react'
import { FaChevronDown, FaBars } from 'react-icons/fa'
import { Link } from 'react-router-dom';

const Header = ({ onMenuClick }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Fermer le menu si clic en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <header className="flex items-center justify-between px-4 md:px-6 py-[14px] bg-white border-b border-gray-200 shadow-sm">
      
      {/* Left: Menu + Search */}
      <div className="flex items-center space-x-4 w-full md:w-1/2">
        <button onClick={onMenuClick} className="md:hidden text-gray-600">
          <FaBars size={20} />
        </button>

        <div className="relative w-full">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Right: Notifications + User Dropdown */}
      <div className="relative flex items-center space-x-6 ml-4" ref={dropdownRef}>
        <button className="relative text-gray-600 hover:text-blue-600">
          <BellIcon size={20} />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Avatar */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <img
              src="https://i.pravatar.cc/40"
              alt="User"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm font-medium text-gray-800 hidden sm:inline">John Doe</span>
            <FaChevronDown className="text-gray-500" size={12} />
          </button>

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border border-gray-100 z-50">
              <ul className="py-1 text-sm text-gray-700">
                <Link 
                to="/profil" 
                className="block px-4 py-2 hover:bg-gray-100">
                  Mon Compte
                </Link>
                {/* <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Mon compte
                  </a>
                </li> */}
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Déconnexion
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
