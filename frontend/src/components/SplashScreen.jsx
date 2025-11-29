import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

export default function SplashScreen({ onFinish }) {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 2.5, duration: 0.5 }}
      onAnimationComplete={onFinish}
      className="fixed inset-0 bg-truth-bg z-[100] flex flex-col items-center justify-center"
    >
      <div className="relative mb-6">
        {/* Animated Rings (Infinity Loop Concept) */}
        <motion.div 
          animate={{ scale: [0.8, 1.2, 1], opacity: [0, 1, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative z-10 w-24 h-24 bg-white rounded-full shadow-xl flex items-center justify-center text-truth-blue"
        >
          <Search size={48} strokeWidth={2.5} />
        </motion.div>
        
        {/* Pulse Effect */}
        <motion.div 
          animate={{ scale: [1, 2], opacity: [0.5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute inset-0 bg-truth-blue/20 rounded-full z-0"
        />
      </div>

      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-3xl font-bold text-gray-900 tracking-tight"
      >
        TruthScroll
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-sm text-gray-400 mt-2 font-medium"
      >
        The truth, one scroll at a time.
      </motion.p>
    </motion.div>
  );
}