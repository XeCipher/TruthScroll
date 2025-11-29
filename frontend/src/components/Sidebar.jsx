import { Home, Search, User, PlusCircle, LogOut } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Sidebar({ onOpenSubmit }) {
  const NavItem = ({ to, icon: Icon, label }) => (
    <NavLink 
      to={to} 
      className={({ isActive }) => `
        flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-200 group
        ${isActive ? 'bg-truth-blue/10 text-truth-blue font-bold' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}
      `}
    >
      <Icon size={24} />
      <span className="text-lg">{label}</span>
    </NavLink>
  );

  return (
    <div className="hidden md:flex flex-col w-72 h-screen fixed left-0 top-0 border-r border-gray-100 bg-white p-6 z-50">
      {/* Logo Area */}
      <div className="flex items-center gap-3 px-4 mb-10">
        <div className="w-10 h-10 bg-truth-blue rounded-full flex items-center justify-center text-white">
            <Search size={20} strokeWidth={3} />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">TruthScroll</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        <NavItem to="/" icon={Home} label="Feed" />
        <NavItem to="/search" icon={Search} label="Investigation" />
        <NavItem to="/profile" icon={User} label="Profile" />
      </nav>

      {/* Action Button */}
      <button 
        onClick={onOpenSubmit}
        className="w-full bg-truth-blue text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-2 mb-6"
      >
        <PlusCircle size={24} />
        <span>Submit Claim</span>
      </button>

      {/* User Mini Profile */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" className="w-10 h-10 rounded-full bg-gray-200" />
        <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-900 truncate">Alex Carter</p>
            <p className="text-xs text-gray-500 truncate">Level 5 Truth Seeker</p>
        </div>
        <LogOut size={16} className="text-gray-400" />
      </div>
    </div>
  );
}