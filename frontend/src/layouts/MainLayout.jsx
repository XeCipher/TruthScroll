import { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import RightPanel from '../components/RightPanel';
import SubmitModal from '../components/SubmitModal';

export default function MainLayout({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-truth-bg overflow-hidden">
      
      {/* --- LEFT COLUMN: Sidebar (Desktop Only) --- */}
      {/* Visible on md (Tablet) and up */}
      <div className="hidden md:flex w-64 flex-col border-r border-gray-200 bg-white z-20">
        <Sidebar onOpenSubmit={() => setIsModalOpen(true)} />
      </div>

      {/* --- CENTER COLUMN: Main Content --- */}
      {/* Flex-1 takes remaining space. 'relative' allows scrolling inside. */}
      <div className="flex-1 relative flex justify-center bg-gray-50">
        <main className="w-full max-w-[600px] h-full bg-white shadow-xl overflow-y-auto no-scrollbar scroll-smooth snap-y snap-mandatory">
          {children}
        </main>
      </div>

      {/* --- RIGHT COLUMN: Agent Console (Large Screens Only) --- */}
      {/* Visible only on lg (Large Desktop) and up */}
      <div className="hidden lg:flex w-80 flex-col border-l border-gray-200 bg-white z-20">
        <RightPanel />
      </div>

      {/* --- MOBILE: Bottom Nav (Phone Only) --- */}
      <div className="md:hidden">
        <Navbar />
      </div>

      {/* Global Modal */}
      <SubmitModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}