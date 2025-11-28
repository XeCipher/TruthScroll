import { useState } from 'react';
import { motion } from 'framer-motion';
import OriginGraph from './OriginGraph';
import { Share2, Info, ChevronUp, CheckCircle, XCircle, BarChart2 } from 'lucide-react';

export default function FeedCard({ data }) {
  const [quizState, setQuizState] = useState(null); // null, 'correct', 'wrong'
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);

  // Theme Colors
  const getColors = (type) => {
    switch(type) {
      case 'verified': return 'bg-truth-green';
      case 'false': return 'bg-truth-red';
      case 'misleading': return 'bg-truth-yellow';
      case 'unproven': return 'bg-blue-500';
      default: return 'bg-truth-blue';
    }
  };

  // --- SUB-COMPONENTS ---

  const Timeline = () => (
    <div className="mb-8 pl-2">
      <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide opacity-70">Origin Trace</h3>
      <div className="space-y-0">
        {data.timeline?.map((item, idx) => (
          <div key={idx} className="flex gap-4 relative">
            {/* Line */}
            {idx !== data.timeline.length - 1 && (
              <div className="absolute left-[7px] top-2 h-full w-[2px] bg-gray-200"></div>
            )}
            {/* Dot */}
            <div className={`w-4 h-4 rounded-full z-10 border-2 border-white shadow-sm ${item.color === 'green' ? 'bg-green-500' : item.color === 'red' ? 'bg-red-500' : item.color === 'yellow' ? 'bg-yellow-400' : 'bg-gray-400'}`}></div>
            <div className="pb-6">
              <p className="text-sm font-medium text-gray-700">{item.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const QuizModule = () => (
    <div className="w-full space-y-3 mb-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">{data.question}</h3>
      <div className="space-y-3">
        {data.options.map((opt) => (
          <button
            key={opt.id}
            disabled={quizState !== null}
            onClick={() => {
              setSelectedOption(opt.id);
              setQuizState(opt.isCorrect ? 'correct' : 'wrong');
            }}
            className={`w-full p-4 rounded-xl text-left text-sm font-semibold transition-all duration-200 border-2 active:scale-95
              ${quizState === null ? 'bg-white border-gray-100 hover:border-truth-blue shadow-sm' : ''}
              ${quizState !== null && opt.isCorrect ? 'bg-green-50 border-green-500 text-green-700' : ''}
              ${quizState !== null && !opt.isCorrect && selectedOption === opt.id ? 'bg-red-50 border-red-500 text-red-700' : ''}
              ${quizState !== null && !opt.isCorrect && selectedOption !== opt.id ? 'opacity-50 border-transparent' : ''}
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
      {/* Quiz Explanation */}
      {quizState && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 p-4 rounded-xl text-sm text-blue-800 mt-4"
        >
          <strong>Analysis:</strong> {data.options.find(o => o.isCorrect).explanation}
        </motion.div>
      )}
    </div>
  );

  const PollModule = () => (
    <div className="w-full mb-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 leading-tight">{data.question}</h3>
      {!hasVoted ? (
        <div className="flex gap-4">
          <button 
            onClick={() => setHasVoted(true)}
            className="flex-1 bg-white border-2 border-gray-200 py-4 rounded-2xl font-bold text-gray-700 hover:border-truth-blue hover:text-truth-blue active:scale-95 transition-all"
          >
            Yes
          </button>
          <button 
            onClick={() => setHasVoted(true)}
            className="flex-1 bg-white border-2 border-gray-200 py-4 rounded-2xl font-bold text-gray-700 hover:border-truth-red hover:text-truth-red active:scale-95 transition-all"
          >
            No
          </button>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div>
            <div className="flex justify-between text-sm font-bold mb-1">
              <span>Yes</span>
              <span>{data.votes.yes}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }} 
                animate={{ width: `${data.votes.yes}%` }} 
                transition={{ duration: 1, ease: "easeOut" }}
                className="bg-truth-blue h-full rounded-full"
              ></motion.div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm font-bold mb-1">
              <span>No</span>
              <span>{data.votes.no}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }} 
                animate={{ width: `${data.votes.no}%` }} 
                transition={{ duration: 1, ease: "easeOut" }}
                className="bg-gray-400 h-full rounded-full"
              ></motion.div>
            </div>
          </div>
          <p className="text-center text-xs text-gray-400 mt-4">Based on 1,240 community votes</p>
        </motion.div>
      )}
    </div>
  );

  return (
    <div className="h-[100dvh] w-full snap-start relative bg-white flex flex-col px-6 pt-safe overflow-y-auto no-scrollbar">
      
      {/* Spacer for top safe area */}
      <div className="h-24 shrink-0"></div>

      {/* Content Container */}
      <div className="flex-1 pb-32">
        {/* Verdict Banner */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          className={`${getColors(data.type)} text-white font-black text-xs py-2 px-4 rounded-full self-start mb-6 uppercase tracking-widest shadow-sm inline-block`}
        >
          {data.verdict}
        </motion.div>

        {/* Dynamic Content Switching */}
        {data.cardType === 'quiz' ? <QuizModule /> : data.cardType === 'poll' ? <PollModule /> : (
          <>
            <h1 className="text-3xl font-bold text-truth-text mb-6 leading-tight">
              {data.title}
            </h1>
            {data.timeline && <OriginGraph timeline={data.timeline} />}
          </>
        )}

        {/* Summary Card */}
        <div className="bg-truth-bg p-5 rounded-2xl border border-gray-100 mb-6 shadow-sm">
          <div className="flex items-center gap-2 text-truth-blue font-bold text-xs uppercase tracking-wide mb-2">
            <Info size={14} />
            <span>Agent Analysis</span>
          </div>
          <p className="text-gray-700 text-base leading-relaxed">
            {data.summary}
          </p>
        </div>

        {/* Footer Meta */}
        <div className="flex justify-between items-center text-xs text-gray-400 font-medium">
          <span>Source: {data.source}</span>
          <button className="p-2 rounded-full hover:bg-gray-100 active:scale-95 transition-all text-gray-600">
            <Share2 size={20} />
          </button>
        </div>
      </div>

      {/* Floating Swipe Hint */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-24 left-0 w-full flex justify-center text-gray-300 pointer-events-none"
      >
        <ChevronUp size={24} />
      </motion.div>
    </div>
  );
}
