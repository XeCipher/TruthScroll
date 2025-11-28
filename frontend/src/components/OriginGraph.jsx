import { motion } from 'framer-motion';
import { Twitter, MessageCircle, Globe, ShieldCheck, Video, AlertTriangle, ArrowDown } from 'lucide-react';

const IconMap = {
  twitter: Twitter,
  message: MessageCircle,
  globe: Globe,
  shield: ShieldCheck,
  video: Video,
  alert: AlertTriangle
};

const ColorMap = {
  origin: 'bg-red-100 text-red-600 border-red-200',
  spread: 'bg-yellow-100 text-yellow-600 border-yellow-200',
  verdict: 'bg-green-100 text-green-600 border-green-200'
};

export default function OriginGraph({ timeline }) {
  return (
    <div className="w-full bg-gray-50 rounded-2xl p-5 border border-gray-100 mb-6">
      <div className="flex items-center gap-2 mb-6">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-truth-blue opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-truth-blue"></span>
        </span>
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Forensic Trace</h3>
      </div>

      <div className="relative pl-2">
        {/* The Vertical Connecting Line */}
        <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-gray-200" />

        {timeline.map((item, idx) => {
          const Icon = IconMap[item.icon] || Globe;
          
          return (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.2 }}
              className="relative flex gap-4 mb-6 last:mb-0"
            >
              {/* Icon Node */}
              <div className={`relative z-10 w-10 h-10 rounded-full border-2 flex items-center justify-center shrink-0 bg-white ${item.type === 'verdict' ? 'border-green-500 text-green-600' : item.type === 'origin' ? 'border-red-500 text-red-600' : 'border-yellow-500 text-yellow-600'}`}>
                <Icon size={18} />
              </div>

              {/* Content Card */}
              <div className={`flex-1 p-3 rounded-xl border ${ColorMap[item.type]} bg-opacity-50`}>
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold uppercase opacity-70">{item.platform}</span>
                  <span className="text-[10px] font-mono opacity-60 bg-white px-2 py-0.5 rounded-full">{item.time}</span>
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