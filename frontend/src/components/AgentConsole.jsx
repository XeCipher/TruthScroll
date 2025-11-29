import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Activity } from 'lucide-react';

export default function AgentConsole() {
  const [logs, setLogs] = useState([]);
  
  useEffect(() => {
    const messages = [
      "Initializing Agent Core v2.4...",
      "Connecting to Reddit API (r/India)...",
      "Scanning trend: 'Mumbai Hacks'...",
      "Analyzing 42 WhatsApp forwards...",
      "Detected anomaly in sentiment...",
      "Cross-referencing with Google FactCheck...",
      "Verdict: MISLEADING (87% confidence)...",
      "Generating report card..."
    ];
    
    let i = 0;
    const interval = setInterval(() => {
      setLogs(prev => {
        const newLogs = [...prev, messages[i % messages.length]];
        return newLogs.slice(-3); // Keep only last 3
      });
      i++;
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black text-green-400 p-4 text-[10px] font-mono rounded-xl mb-6 border border-green-900/50 shadow-2xl relative overflow-hidden">
      {/* Scanline Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/5 to-transparent opacity-20 pointer-events-none animate-scan"></div>
      
      <div className="flex items-center gap-2 mb-3 border-b border-green-900/50 pb-2">
        <Terminal size={12} />
        <span className="font-bold tracking-wider">AGENT_LIVE_LOGS</span>
        <div className="ml-auto flex items-center gap-2">
          <Activity size={12} className="animate-pulse" />
          <span className="text-green-600">ONLINE</span>
        </div>
      </div>
      
      <div className="space-y-1.5 h-16 overflow-hidden relative">
        <AnimatePresence mode="popLayout">
          {logs.map((log, index) => (
            <motion.div 
              key={index} // Using index as key for rolling log effect
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="flex gap-2"
            >
              <span className="opacity-50">{new Date().toLocaleTimeString('en-US', {hour12: false, hour: "2-digit", minute:"2-digit", second:"2-digit"})}</span>
              <span>{`> ${log}`}</span>
            </motion.div>
          ))}
        </AnimatePresence>
        {/* Fade out at bottom */}
        <div className="absolute bottom-0 left-0 w-full h-4 bg-gradient-to-t from-black to-transparent"></div>
      </div>
    </div>
  );
}