import { X, Link as LinkIcon, Image, Type, UploadCloud } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function SubmitModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('image'); // Default to image for the screenshot wow factor

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/60 z-[60] flex items-end justify-center backdrop-blur-sm" onClick={onClose}>
        <motion.div 
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          className="bg-white w-full max-w-md rounded-t-3xl p-6 pb-10"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Submit a Claim</h2>
            <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
              <X size={20} />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-xl">
            {['link', 'image', 'text'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold capitalize flex items-center justify-center gap-2 transition-all ${
                  activeTab === tab ? 'bg-white shadow-sm text-truth-blue' : 'text-gray-500'
                }`}
              >
                {tab === 'link' && <LinkIcon size={16} />}
                {tab === 'image' && <Image size={16} />}
                {tab === 'text' && <Type size={16} />}
                {tab}
              </button>
            ))}
          </div>

          {/* Content Area (The Screenshot Hook) */}
          <div className="h-48 border-2 border-dashed border-truth-blue/30 bg-blue-50 rounded-2xl flex flex-col items-center justify-center text-truth-blue mb-6">
            <div className="p-4 bg-white rounded-full shadow-sm mb-3">
              <UploadCloud size={32} />
            </div>
            <p className="font-semibold">Upload WhatsApp Screenshot</p>
            <p className="text-xs opacity-60 mt-1">Agent will analyze text & context</p>
          </div>

          {/* Submit Button */}
          <button className="w-full bg-truth-blue text-white py-4 rounded-xl font-bold text-lg active:scale-95 transition-transform shadow-lg shadow-blue-200">
            Submit for Investigation
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}