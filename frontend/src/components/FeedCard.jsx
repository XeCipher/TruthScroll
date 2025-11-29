import { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Info, ChevronUp, CheckCircle, XCircle, BarChart2 } from 'lucide-react';
import OriginGraph from './OriginGraph';

export default function FeedCard({ data }) {
  const [quizState, setQuizState] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);

  const getColors = (type) => {
    switch(type) {
      case 'verified': return 'bg-truth-green shadow-green-200';
      case 'false': return 'bg-truth-red shadow-red-200';
      case 'misleading': return 'bg-truth-yellow shadow-yellow-200';
      default: return 'bg-truth-blue shadow-blue-200';
    }
  };

  // --- SUB-COMPONENTS (Keep logic same, just structure updates) ---
  const QuizModule = () => (
    <div className="w-full space-y-3 mb-8">
      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">{data.question}</h3>
      <div className="space-y-3">
        {data.options.map((opt) => (
          <button
            key={opt.id}
            disabled={quizState !== null}
            onClick={() => { setSelectedOption(opt.id); setQuizState(opt.isCorrect ? 'correct' : 'wrong'); }}
            className={`w-full p-4 rounded-xl text-left text-sm font-semibold border-2 transition-all active:scale-95
              ${quizState === null ? 'bg-white border-gray-100 hover:border-truth-blue' : ''}
              ${quizState !== null && opt.isCorrect ? 'bg-green-50 border-green-500 text-green-700' : ''}
              ${quizState !== null && !opt.isCorrect && selectedOption === opt.id ? 'bg-red-50 border-red-500 text-red-700' : ''}
              ${quizState !== null && !opt.isCorrect && selectedOption !== opt.id ? 'opacity-40 border-transparent' : ''}
            `}
          >
            <div className="flex justify-between items-center">
              <span>{opt.text}</span>
              {quizState !== null && opt.isCorrect && <CheckCircle size={18} />}
              {quizState !== null && !opt.isCorrect && selectedOption === opt.id && <XCircle size={18} />}
            </div>
          </button>
        ))}
      </div>
      {quizState && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-blue-50 p-4 rounded-xl text-sm text-blue-800 mt-4 border border-blue-100">
          <strong>Analysis:</strong> {data.options.find(o => o.isCorrect).explanation}
        </motion.div>
      )}
    </div>
  );

  const PollModule = () => (
    <div className="w-full mb-8">
      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-8">{data.question}</h3>
      {!hasVoted ? (
        <div className="flex gap-4">
          <button onClick={() => setHasVoted(true)} className="flex-1 bg-white border-b-4 border-gray-200 py-6 rounded-2xl font-bold text-gray-700 hover:text-truth-blue active:scale-95 transition-all">Yes</button>
          <button onClick={() => setHasVoted(true)} className="flex-1 bg-white border-b-4 border-gray-200 py-6 rounded-2xl font-bold text-gray-700 hover:text-truth-red active:scale-95 transition-all">No</button>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          {/* Poll Results UI */}
          <div className="bg-gray-100 p-4 rounded-xl text-center text-gray-500 text-sm">Results shown after voting...</div>
        </motion.div>
      )}
    </div>
  );

  return (
    // FIX: Using h-full inside the scroll container instead of screen height hacks
    <div className="h-full min-h-[100dvh] w-full snap-start bg-white flex flex-col px-6 pt-safe border-b border-gray-100">
      
      <div className="h-20 shrink-0"></div> {/* Top Spacer */}

      <div className="flex-1 pb-32">
        {/* Verdict Banner */}
        <div className={`${getColors(data.type)} text-white font-black text-[10px] py-2 px-4 rounded-full mb-6 uppercase tracking-widest inline-block`}>
          {data.verdict}
        </div>

        {data.cardType === 'quiz' ? <QuizModule /> : data.cardType === 'poll' ? <PollModule /> : (
          <>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-6 leading-tight">
              {data.title}
            </h1>
            {data.timeline && <OriginGraph timeline={data.timeline} />}
          </>
        )}

        {/* Summary */}
        <div className="bg-[#F8F9FE] p-5 rounded-2xl border border-blue-50/50 mb-6">
          <div className="flex items-center gap-2 text-truth-blue font-bold text-xs uppercase tracking-wide mb-3">
            <Info size={14} /> <span>Agent Analysis</span>
          </div>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed font-medium">
            {data.summary}
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center text-xs text-gray-400 font-medium">
          <span>Src: {data.source}</span>
          <button className="p-2 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-600"><Share2 size={18} /></button>
        </div>
      </div>

      {/* Swipe Hint */}
      <div className="h-20 flex items-center justify-center text-gray-300 pb-8">
        <ChevronUp size={24} className="animate-bounce" />
      </div>
    </div>
  );
}