import { useState } from 'react';
import { Home, Search, PlusCircle, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import SubmitModal from './SubmitModal';

export default function Navbar() {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const NavItem = ({ to, icon: Icon, label }) => {
    const isActive = location.pathname === to;
    return (
      <Link to={to} className="flex flex-col items-center gap-1 w-16">
        <Icon 
          size={24} 
          className={isActive ? 'text-truth-blue' : 'text-gray-400'} 
          strokeWidth={isActive ? 2.5 : 2}
        />
        <span className={`text-[10px] font-medium ${isActive ? 'text-truth-blue' : 'text-gray-400'}`}>
          {label}
        </span>
      </Link>
    );
  };

  return (
    <>
      <div className="fixed bottom-0 w-full bg-white border-t border-gray-100 py-3 pb-6 px-6 flex justify-between items-end z-40 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <NavItem to="/" icon={Home} label="Feed" />
        
        <NavItem to="/search" icon={Search} label="Investigate" />
        
        <div className="relative -top-1">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-truth-blue text-white p-4 rounded-full shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all"
          >
            <PlusCircle size={28} />
          </button>
        </div>
        
        <div className="w-16 flex flex-col items-center gap-1 opacity-50">
           {/* Placeholder for future features */}
           <User size={24} />
           <span className="text-[10px]">Profile</span>
        </div>
      </div>

      {/* The Submit Modal Component */}
      <SubmitModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}