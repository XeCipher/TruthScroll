import { useState } from 'react';
import { Search as SearchIcon, X, Loader2, ArrowRight } from 'lucide-react';
import AgentConsole from '../components/AgentConsole';
import FeedCard from '../components/FeedCard';
import { claims } from '../data/mockData';

export default function Search() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState(null);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && query.length > 0) {
      // 1. Start Simulation
      setIsSearching(true);
      setResult(null);

      // 2. Fake Agent Delay (2 seconds)
      setTimeout(() => {
        setIsSearching(false);
        // 3. Show a specific card (The UPI Tax one is index 2)
        setResult(claims[2]); 
      }, 2500);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setResult(null);
    setIsSearching(false);
  };

  return (
    <div className="min-h-screen bg-truth-bg p-4 pt-12 pb-32 font-sans">
      <h1 className="text-3xl font-bold mb-6 text-truth-text px-2">Investigation Desk</h1>
      
      {/* Search Input Area */}
      <div className="relative mb-6">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleSearch}
          placeholder="Paste link or type claim..."
          className="w-full pl-12 pr-10 py-4 rounded-2xl border-none shadow-sm bg-white focus:ring-2 focus:ring-truth-blue outline-none text-lg placeholder:text-gray-400"
        />
        {query && (
          <button 
            onClick={clearSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* The Agent Console - Always visible to show "background activity" */}
      <div className="mb-8">
        <div className="flex justify-between items-end mb-2 px-2">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Live Agent Activity</h2>
        </div>
        <AgentConsole />
      </div>

      {/* DYNAMIC CONTENT AREA */}
      
      {/* State 1: Searching Animation */}
      {isSearching && (
        <div className="flex flex-col items-center justify-center py-10 space-y-4 animate-pulse">
          <Loader2 className="animate-spin text-truth-blue" size={40} />
          <p className="text-sm font-medium text-gray-500">Agent is verifying across 14 sources...</p>
        </div>
      )}

      {/* State 2: Result Found */}
      {result && !isSearching && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-2 mb-4 px-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <h3 className="font-bold text-gray-800">Investigation Complete</h3>
          </div>
          {/* We wrap the card in a div with some padding to make it look good in the list */}
          <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100">
             {/* Override h-screen to h-auto for the search result view */}
             <div className="h-[600px] relative">
               <FeedCard data={result} />
             </div>
          </div>
        </div>
      )}

      {/* State 3: Default Trending List (Only show if not searching and no result) */}
      {!isSearching && !result && (
        <div className="px-2">
          <h2 className="font-bold text-gray-400 mb-4 uppercase text-xs tracking-wider">Trending Now</h2>
          <div className="space-y-3">
            {[
              { label: "Deepfake Video of PM", count: "45 claims" },
              { label: "New Health Scam", count: "32 claims" },
              { label: "Viral Political Tweet", count: "128 claims" }
            ].map((item, i) => (
              <button 
                key={i} 
                onClick={() => setQuery(item.label)}
                className="w-full bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center active:scale-95 transition-transform"
              >
                <span className="font-semibold text-gray-700">{item.label}</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-500 font-medium">{item.count}</span>
                  <ArrowRight size={16} className="text-gray-300" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}