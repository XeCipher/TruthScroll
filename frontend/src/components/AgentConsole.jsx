import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal } from 'lucide-react';

export default function AgentConsole() {
  const [logs, setLogs] = useState([]);
  
  useEffect(() => {
    const messages = [
      "Connecting to Reddit API...",
      "Scanning r/India for keywords...",
      "Detected spike in topic: 'UPI Tax'...",
      "Cross-referencing with GNews API...",
      "Sentiment Analysis: NEGATIVE...",
      "Verdict Generated. Pushing to Feed..."
    ];
    
    let i = 0;
    const interval = setInterval(() => {
      setLogs(prev => [...prev.slice(-2), messages[i % messages.length]]);
      i++;
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black text-green-400 p-3 text-xs font-mono rounded-lg mb-4 opacity-90 border border-green-900 shadow-xl">
      <div className="flex items-center gap-2 mb-2 border-b border-green-900 pb-1">
        <Terminal size={12} />
        <span className="font-bold">AGENT_CORE_V1</span>
        <div className="ml-auto flex items-center gap-1">
          <span className="animate-pulse w-2 h-2 bg-green-500 rounded-full"></span>
          <span>LIVE</span>
        </div>
      </div>
      <div className="space-y-1 h-16 overflow-hidden">
        <AnimatePresence>
          {logs.map((log, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
            >
              > {log}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
