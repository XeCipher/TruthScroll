import { User, Award, Shield, Zap, ChevronRight, Settings, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Profile() {
  const stats = [
    { label: "Claims Verified", value: "142", icon: Shield, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Accuracy Rate", value: "89%", icon: Zap, color: "text-yellow-500", bg: "bg-yellow-50" },
    { label: "Impact Score", value: "9.2", icon: Award, color: "text-green-500", bg: "bg-green-50" },
  ];

  const badges = [
    { name: "Deepfake Hunter", level: "Gold", color: "bg-yellow-100 text-yellow-700" },
    { name: "First Responder", level: "Silver", color: "bg-gray-100 text-gray-700" },
    { name: "Fact Checker", level: "Bronze", color: "bg-orange-100 text-orange-700" }
  ];

  return (
    <div className="min-h-screen bg-truth-bg pb-32">
      {/* Header / Banner */}
      <div className="bg-white p-6 pt-12 rounded-b-[2.5rem] shadow-sm border-b border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-truth-blue/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="flex items-center gap-4 mb-8 relative z-10">
          <div className="w-20 h-20 rounded-full bg-gray-200 border-4 border-white shadow-lg overflow-hidden">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" className="w-full h-full" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Alex Carter</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="bg-truth-blue text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Level 5</span>
              <span className="text-sm text-gray-500">Truth Seeker</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center p-3 bg-white rounded-2xl border border-gray-100 shadow-sm"
            >
              <div className={`p-2 rounded-full mb-2 ${stat.bg} ${stat.color}`}>
                <stat.icon size={18} />
              </div>
              <span className="text-xl font-bold text-gray-900">{stat.value}</span>
              <span className="text-[10px] font-medium text-gray-400 uppercase text-center leading-tight mt-1">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Badges Section */}
      <div className="px-6 mt-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Award size={20} className="text-truth-blue" />
          Earned Badges
        </h2>
        <div className="space-y-3">
          {badges.map((badge, i) => (
            <motion.div 
              key={i}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 + (i * 0.1) }}
              className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${badge.color}`}>
                  {badge.name[0]}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-sm">{badge.name}</h3>
                  <p className="text-xs text-gray-400">Awarded for accuracy</p>
                </div>
              </div>
              <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase ${badge.color}`}>
                {badge.level}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Settings List */}
      <div className="px-6 mt-8 space-y-2">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Settings</h2>
        <button className="w-full flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 text-left active:scale-95 transition-transform">
          <div className="flex items-center gap-3 text-gray-700 font-medium">
            <Settings size={20} />
            <span>Preferences</span>
          </div>
          <ChevronRight size={20} className="text-gray-300" />
        </button>
        <button className="w-full flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 text-left active:scale-95 transition-transform text-red-500">
          <div className="flex items-center gap-3 font-medium">
            <LogOut size={20} />
            <span>Log Out</span>
          </div>
        </button>
      </div>
    </div>
  );
}