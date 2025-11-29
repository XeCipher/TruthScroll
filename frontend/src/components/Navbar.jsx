import { useState } from 'react';
import { Home, Search, PlusCircle, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import SubmitModal from './SubmitModal';

export default function Navbar() {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const NavItem = ({ to, icon: Icon, label }) => {
    const isActive = location.pathname === to;
    return (
      <Link to={to} className="flex flex-col items-center gap-1 w-16 group relative">
        <div className="relative">
            <Icon 
            size={24} 
            className={`transition-colors duration-300 ${isActive ? 'text-truth-blue' : 'text-gray-400 group-hover:text-gray-600'}`} 
            strokeWidth={isActive ? 2.5 : 2}
            />
            {/* Animated Active Dot */}
            {isActive && (
              <motion.div 
                layoutId="nav-dot" 
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-truth-blue rounded-full" 
              />
            )}
        </div>
        <span className={`text-[10px] font-medium transition-colors ${isActive ? 'text-truth-blue' : 'text-gray-400'}`}>
          {label}
        </span>
      </Link>
    );
  };

  return (
    <>
      <div className="fixed bottom-0 w-full bg-white/90 backdrop-blur-lg border-t border-gray-100 py-2 pb-safe px-6 flex justify-between items-end z-40">
        {/* Feed Link */}
        <NavItem to="/" icon={Home} label="Feed" />
        
        {/* Search Link */}
        <NavItem to="/search" icon={Search} label="Search" />
        
        {/* Submit Button (Center) */}
        <div className="relative -top-3">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-truth-blue text-white p-4 rounded-full shadow-xl shadow-blue-500/30 hover:bg-blue-600 active:scale-95 transition-all"
          >
            <PlusCircle size={28} />
          </button>
        </div>
        
        {/* Profile Link (Fixed: Now clickable) */}
        <NavItem to="/profile" icon={User} label="Profile" />
      </div>

      <SubmitModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}