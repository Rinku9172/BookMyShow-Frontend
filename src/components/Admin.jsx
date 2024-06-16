// AdminLayout.js

import React from 'react';
import { Link } from 'react-router-dom';
const Admin = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="flex flex-col h-full">
          {/* Logo and Title */}
          <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
            <span className="text-xl font-semibold text-gray-800 dark:text-gray-200">Admin Panel</span>
          </div>
          
          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto">
            <Link to="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 rounded-lg">Movies</Link>
            <Link to="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 rounded-lg">Settings</Link>
            <Link to="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 rounded-lg">Dashboard</Link>
            {/* Add more links as needed */}
          </nav>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Dashboard Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Dashboard</h1>
          
          {/* Dashboard Content Goes Here */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Example Cards or Widgets */}
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 shadow-md">
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">Total Users</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-300">248</p>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 shadow-md">
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">Theaters</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-300">2</p>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 shadow-md">
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">Movies</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-300">4</p>
            </div>
             <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 shadow-md">
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">Bookings</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-300">6</p>
            </div>
            
            {/* Add more dashboard elements here */}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Admin;
