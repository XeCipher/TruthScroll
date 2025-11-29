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
      setIsSearching(true);
      setResult(null);
      setTimeout(() => {
        setIsSearching(false);
        setResult(claims[2]); 
      }, 2000);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setResult(null);
    setIsSearching(false);
  };

  return (
    <div className="min-h-full bg-white p-4 pt-12 pb-32">
        <h1 className="text-3xl font-extrabold mb-6 text-gray-900 px-2">Investigation Desk</h1>
        
        {/* Search Bar */}
        <div className="relative mb-6">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleSearch}
            placeholder="Search claims..."
            className="w-full pl-12 pr-10 py-4 rounded-2xl border border-gray-100 shadow-sm bg-white focus:ring-2 focus:ring-truth-blue outline-none text-base"
            />
            {query && (
            <button onClick={clearSearch} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                <X size={16} />
            </button>
            )}
        </div>

        {/* Mobile-Only Console (Hidden on Desktop because RightPanel has it) */}
        <div className="lg:hidden mb-8">
            <AgentConsole />
        </div>

        {/* Results Logic */}
        {isSearching && (
            <div className="flex flex-col items-center justify-center py-12 space-y-4 animate-pulse">
            <Loader2 className="animate-spin text-truth-blue" size={32} />
            <p className="text-sm text-gray-500">Verifying sources...</p>
            </div>
        )}

        {result && !isSearching && (
            <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100 bg-white">
                {/* Adjust height to fit */}
                <div className="h-[600px] relative overflow-y-auto">
                <FeedCard data={result} />
                </div>
            </div>
        )}

        {!isSearching && !result && (
            <div className="px-2">
            <h2 className="font-bold text-gray-400 mb-4 uppercase text-[10px] tracking-widest">Trending</h2>
            <div className="space-y-3">
                {[
                { label: "Deepfake Video of PM", count: "45 claims" },
                { label: "New Health Scam", count: "32 claims" },
                { label: "Viral Political Tweet", count: "128 claims" }
                ].map((item, i) => (
                <button 
                    key={i} 
                    onClick={() => setQuery(item.label)}
                    className="w-full bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center"
                >
                    <span className="font-semibold text-gray-700 text-sm">{item.label}</span>
                    <ArrowRight size={14} className="text-gray-300" />
                </button>
                ))}
            </div>
            </div>
        )}
    </div>
  );
}