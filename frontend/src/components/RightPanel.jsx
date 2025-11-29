import AgentConsole from './AgentConsole';
import { ArrowRight, TrendingUp, Search } from 'lucide-react'; // Added Search here

export default function RightPanel() {
  return (
    <div className="hidden lg:block w-96 h-screen fixed right-0 top-0 border-l border-gray-100 bg-white p-8 overflow-y-auto z-50">
      
      {/* Search Bar Placeholder */}
      <div className="bg-gray-100 rounded-full px-5 py-3 text-gray-400 text-sm mb-8 flex items-center gap-2">
        <Search size={16} />
        <span>Search claims, topics...</span>
      </div>

      {/* The Agent Console - Always Visible! */}
      <div className="mb-10">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Agent Live Activity
        </h2>
        <AgentConsole />
      </div>

      {/* Trending Topics */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-truth-blue" />
            Viral Trends
        </h2>
        <div className="space-y-4">
            {[
              { label: "Deepfake Video of PM", count: "45 claims", color: "bg-red-50 text-red-600" },
              { label: "New Health Scam", count: "32 claims", color: "bg-orange-50 text-orange-600" },
              { label: "Viral Political Tweet", count: "128 claims", color: "bg-blue-50 text-blue-600" }
            ].map((item, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="flex justify-between items-start mb-1">
                    <span className="font-semibold text-gray-700 group-hover:text-truth-blue transition-colors">{item.label}</span>
                    <ArrowRight size={16} className="text-gray-300 group-hover:text-truth-blue transition-colors" />
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${item.color}`}>
                    {item.count}
                </span>
              </div>
            ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 pt-6 border-t border-gray-100 text-xs text-gray-400 leading-relaxed">
        TruthScroll Agent v2.4 • MumbaiHacks 2025 <br />
        Powered by Gemini 1.5 Pro & Reddit API
      </div>
    </div>
  );
}