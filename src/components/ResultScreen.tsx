import type { Question, QuestionResult } from '../types/quiz';
import { Timer, CheckCircle, XCircle, RotateCcw, Zap, Home } from 'lucide-react';

interface ResultScreenProps {
  stats: {
    totalScore: number;
    totalMaxScore: number;
    totalQuestions: number;
  };
  answers: Record<number, QuestionResult>;
  questions: Question[];
  onRestart: () => void;
  onBackToQuizzes?: () => void;
}

export function ResultScreen({ stats, answers, questions, onRestart, onBackToQuizzes }: ResultScreenProps) {
  // Calculate aggregate stats
  const correctCount = Object.values(answers).filter(a => a.isCorrect).length;
  const accuracyPercentage = Math.round((correctCount / stats.totalQuestions) * 100);
  const avgTime = Math.round(
    Object.values(answers).reduce((acc, curr) => acc + curr.timeTaken, 0) / stats.totalQuestions
  );

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-white mb-2">Quiz Completed!</h2>
        <p className="text-slate-400">Here's how you performed</p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard 
          label="Total Score" 
          value={stats.totalScore.toFixed(2)} 
          subValue={`/ ${stats.totalMaxScore}`}
          icon={<Zap className="w-5 h-5 text-yellow-400" />}
          color="bg-yellow-500/10 border-yellow-500/20"
        />
        <StatCard 
          label="Accuracy" 
          value={`${accuracyPercentage}%`} 
          subValue={`${correctCount}/${stats.totalQuestions} Correct`}
          icon={<CheckCircle className="w-5 h-5 text-green-400" />}
          color="bg-green-500/10 border-green-500/20"
        />
        <StatCard 
          label="Avg. Time" 
          value={`${avgTime}s`} 
          subValue="Per Question"
          icon={<Timer className="w-5 h-5 text-blue-400" />}
          color="bg-blue-500/10 border-blue-500/20"
        />
        <div 
          onClick={onRestart}
          className="cursor-pointer group relative p-6 rounded-2xl bg-indigo-600 hover:bg-indigo-500 transition-all duration-200 shadow-lg shadow-indigo-900/30 flex flex-col justify-between items-center text-center"
        >
          <RotateCcw className="w-8 h-8 text-white/50 group-hover:rotate-180 transition-transform duration-500" />
          <div>
            <div className="font-bold text-white text-lg">Try Again</div>
            <div className="text-indigo-200 text-xs mt-1">Beat your score</div>
          </div>
        </div>
      </div>

      {/* Back to Start */}
      {onBackToQuizzes && (
        <div className="flex justify-center">
          <button
            onClick={onBackToQuizzes}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all"
          >
            <Home className="w-4 h-4" />
            Start New Quiz
          </button>
        </div>
      )}

      {/* Detailed Breakdown */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden mt-4">
        <div className="p-6 border-b border-slate-800">
          <h3 className="text-lg font-bold text-white">Performance Analysis</h3>
        </div>
        
        <div className="divide-y divide-slate-800">
          {questions.map((q, idx) => {
            const result = answers[q.id];
            // Handle case where question wasn't answered (should generally not happen if finished)
            if (!result) return null;

            return (
              <div key={q.id} className="p-6 hover:bg-slate-800/30 transition-colors">
                <div className="flex flex-col md:flex-row gap-4 justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-slate-500 text-sm font-mono">#{idx + 1}</span>
                      {result.isCorrect ? (
                        <span className="flex items-center gap-1 text-green-400 text-xs font-bold uppercase tracking-wider bg-green-400/10 px-2 py-1 rounded">
                          <CheckCircle className="w-3 h-3" /> Correct
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-red-400 text-xs font-bold uppercase tracking-wider bg-red-400/10 px-2 py-1 rounded">
                          <XCircle className="w-3 h-3" /> Incorrect
                        </span>
                      )}
                    </div>
                    <p className="text-white font-medium mb-3">{q.question}</p>
                    <div className="space-y-1">
                      <p className="text-sm text-slate-400">
                        Your Answer: <span className={result.isCorrect ? 'text-green-400' : 'text-red-400'}>
                          {result.selectedAnswerIndex >= 0 
                            ? q.options[result.selectedAnswerIndex] 
                            : "No Answer"}
                        </span>
                      </p>
                      {!result.isCorrect && (
                         <p className="text-sm text-indigo-400">
                           Correct Answer: {q.options[q.answer_index]}
                         </p>
                      )}
                    </div>
                  </div>

                  <div className="flex md:flex-col items-center md:items-end justify-between gap-4 md:gap-1 min-w-[140px]">
                    <div className="text-right">
                      <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">Score</div>
                      <div className="text-2xl font-bold text-white">{result.score.toFixed(2)}</div>
                    </div>
                    <div className="text-right">
                       <span className="text-xs text-slate-500">Speed Bonus: </span>
                       <span className="text-xs text-indigo-400">+{result.speedScore.toFixed(2)}</span>
                    </div>
                    <div className="text-right text-xs text-slate-500">
                      Time: {result.timeTaken}s
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string;
  subValue: string;
  icon: React.ReactNode;
  color: string;
}

function StatCard({ label, value, subValue, icon, color }: StatCardProps) {
  return (
    <div className={`p-6 rounded-2xl border backdrop-blur-sm ${color}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="text-slate-400 text-sm font-medium mb-1">{label}</div>
          <div className="text-3xl font-bold text-white">{value}</div>
        </div>
        <div className="p-2 bg-white/5 rounded-lg">{icon}</div>
      </div>
      <div className="text-xs text-slate-400">{subValue}</div>
    </div>
  );
}
