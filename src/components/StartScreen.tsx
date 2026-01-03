import { Play, Timer, Award, Hash } from 'lucide-react';
import { useState } from 'react';

interface StartScreenProps {
  onStart: (questionCount: number) => void;
  totalAvailable: number;
}

const QUESTION_OPTIONS = [20, 30, 40, 50];

export function StartScreen({ onStart, totalAvailable }: StartScreenProps) {
  const [selectedCount, setSelectedCount] = useState<number>(20);

  const handleStart = () => {
    onStart(selectedCount);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-8 space-y-3">
        <h2 className="text-4xl font-bold tracking-tight text-white">
          Ready to Challenge<br />
          <span className="text-indigo-400">Your Knowledge?</span>
        </h2>
        <p className="text-base text-slate-400 max-w-lg mx-auto">
          Test your awareness on current events and schemes. Speed matters as much as accuracy.
        </p>
      </div>

      {/* Question Count Selector */}
      <div className="mb-8">
        <div className="text-center mb-4">
          <span className="text-sm text-slate-400">Select number of questions</span>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {QUESTION_OPTIONS.map((count) => {
            const isDisabled = count > totalAvailable;
            return (
              <button
                key={count}
                onClick={() => !isDisabled && setSelectedCount(count)}
                disabled={isDisabled}
                className={`
                  p-4 rounded-xl font-bold text-xl transition-all duration-200 border-2
                  ${selectedCount === count 
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-900/30' 
                    : isDisabled
                      ? 'bg-slate-800/30 border-transparent text-slate-600 cursor-not-allowed'
                      : 'bg-slate-800/50 border-transparent text-slate-300 hover:bg-slate-700/50 hover:border-slate-600'}
                `}
              >
                {count}
              </button>
            );
          })}
        </div>
        <div className="text-center mt-3">
          <span className="text-xs text-slate-500">
            {totalAvailable} questions available in pool
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <FeatureCard 
          icon={<Award className="w-6 h-6 text-purple-400" />}
          title="Accuracy"
          desc="1 Point/Question"
        />
        <FeatureCard 
          icon={<Timer className="w-6 h-6 text-pink-400" />}
          title="Speed"
          desc="Up to +1 Bonus"
        />
        <FeatureCard 
          icon={<Hash className="w-6 h-6 text-blue-400" />}
          title="Random"
          desc="Shuffled Questions"
        />
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleStart}
          className="group relative px-8 py-4 bg-white text-slate-900 rounded-2xl font-bold text-lg 
                     hover:bg-indigo-50 transition-all duration-200 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]
                     hover:shadow-[0_0_60px_-15px_rgba(99,102,241,0.5)] active:scale-95"
        >
          <span className="flex items-center gap-2">
            Start {selectedCount} Questions
            <Play className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
      <div className="mb-2">{icon}</div>
      <div className="font-semibold text-white">{title}</div>
      <div className="text-sm text-slate-400">{desc}</div>
    </div>
  );
}
