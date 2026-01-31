
import React from 'react';
import { ViewType } from '../types';

interface HeaderProps {
  setView: (view: ViewType) => void;
  currentView: ViewType;
}

const Header: React.FC<HeaderProps> = ({ setView, currentView }) => {
  return (
    <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setView('home')}>
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-blue-200">
            G
          </div>
          <div>
            <h1 className="text-lg font-bold text-blue-900 leading-tight">GULISTON DAVLAT</h1>
            <p className="text-xs font-semibold text-blue-600 tracking-wider">PEDAGOGIKA INSTITUTI</p>
          </div>
        </div>

        <nav className="flex bg-slate-100 p-1 rounded-xl">
          <button 
            onClick={() => setView('home')}
            className={`px-6 py-2 rounded-lg transition-all duration-300 text-sm font-medium ${
              currentView === 'home' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <i className="fas fa-home mr-2"></i>
            Bosh sahifa
          </button>
          <button 
            onClick={() => setView('admin')}
            className={`px-6 py-2 rounded-lg transition-all duration-300 text-sm font-medium ${
              currentView === 'admin' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <i className="fas fa-user-shield mr-2"></i>
            Admin Panel
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
