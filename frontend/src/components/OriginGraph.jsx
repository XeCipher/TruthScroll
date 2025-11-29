import { motion } from 'framer-motion';
import { Twitter, MessageCircle, Globe, ShieldCheck, Video, AlertTriangle } from 'lucide-react';

const IconMap = {
  twitter: Twitter,
  message: MessageCircle,
  globe: Globe,
  shield: ShieldCheck,
  video: Video,
  alert: AlertTriangle
};

const ColorMap = {
  origin: 'bg-red-50 text-red-600 border-red-100',
  spread: 'bg-yellow-50 text-yellow-600 border-yellow-100',
  verdict: 'bg-green-50 text-green-600 border-green-100'
};

export default function OriginGraph({ timeline }) {
  return (
    <div className="w-full bg-white rounded-2xl p-5 border border-gray-100 shadow-sm mb-6">
      <div className="flex items-center gap-2 mb-6">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-truth-blue opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-truth-blue"></span>
        </span>
        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Forensic Trace</h3>
      </div>

      <div className="relative pl-2">
        {/* The Vertical Connecting Line */}
        <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-gray-100" />

        {timeline.map((item, idx) => {
          const Icon = IconMap[item.icon] || Globe;
          
          return (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="relative flex gap-4 mb-6 last:mb-0"
            >
              {/* Icon Node */}
              <div className={`relative z-10 w-10 h-10 rounded-full border-4 border-white flex items-center justify-center shrink-0 shadow-sm ${item.type === 'verdict' ? 'bg-green-500 text-white' : item.type === 'origin' ? 'bg-red-500 text-white' : 'bg-yellow-400 text-white'}`}>
                <Icon size={16} />
              </div>

              {/* Content Card */}
              <div className={`flex-1 p-3 rounded-xl border ${ColorMap[item.type]}`}>
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold uppercase opacity-80 tracking-wide">{item.platform}</span>
                  <span className="text-[10px] font-mono opacity-70">{item.time}</span>
                </div>
                <p className="text-sm font-semibold mt-1 leading-snug">
                  {item.label}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}