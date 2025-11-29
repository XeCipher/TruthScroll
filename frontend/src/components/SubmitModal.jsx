import { X, Link as LinkIcon, Image, Type, UploadCloud, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function SubmitModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('image');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        setTimeout(() => {
            setIsSuccess(false);
            onClose();
        }, 1500);
    }, 1500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/60 z-[60] flex items-end justify-center backdrop-blur-sm" onClick={onClose}>
        <motion.div 
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white w-full max-w-md rounded-t-[32px] p-6 pb-safe shadow-2xl relative overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          {isSuccess ? (
             <div className="h-64 flex flex-col items-center justify-center text-center space-y-4">
                <motion.div 
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600"
                >
                    <CheckCircle size={32} />
                </motion.div>
                <div>
                    <h3 className="text-xl font-bold text-gray-900">Received!</h3>
                    <p className="text-gray-500 text-sm mt-1">Agent is analyzing your submission.</p>
                </div>
             </div>
          ) : (
            <>
                {/* Drag Handle */}
                <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-6"></div>

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Submit a Claim</h2>
                    <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 active:scale-90 transition-all">
                    <X size={20} />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-xl">
                    {['link', 'image', 'text'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-3 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                        activeTab === tab ? 'bg-white shadow-sm text-truth-blue' : 'text-gray-400 hover:text-gray-600'
                        }`}
                    >
                        {tab === 'link' && <LinkIcon size={16} />}
                        {tab === 'image' && <Image size={16} />}
                        {tab === 'text' && <Type size={16} />}
                        {tab}
                    </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="h-48 border-2 border-dashed border-truth-blue/20 bg-blue-50/50 rounded-2xl flex flex-col items-center justify-center text-truth-blue mb-6 hover:bg-blue-50 transition-colors cursor-pointer">
                    <div className="p-4 bg-white rounded-full shadow-sm mb-3 text-truth-blue">
                    <UploadCloud size={32} />
                    </div>
                    <p className="font-semibold text-sm">Upload WhatsApp Screenshot</p>
                    <p className="text-xs opacity-50 mt-1">Agent will analyze text & context</p>
                </div>

                {/* Submit Button */}
                <button 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full bg-truth-blue text-white py-4 rounded-xl font-bold text-lg active:scale-95 transition-all shadow-lg shadow-blue-200 disabled:opacity-70 disabled:scale-100 flex items-center justify-center gap-2"
                >
                    {isSubmitting ? 'Uploading...' : 'Submit for Investigation'}
                </button>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}