import { useState, useEffect } from 'react';
import type { Question } from '../types/quiz';
import { Timer as TimerIcon, ArrowRight } from 'lucide-react';

interface QuizScreenProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  timePerQuestion: number;
  onAnswer: (questionId: number, answerIndex: number, timeTaken: number) => void;
}

export function QuizScreen({ 
  question, 
  questionIndex, 
  totalQuestions, 
  timePerQuestion,
  onAnswer 
}: QuizScreenProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(timePerQuestion);
  // const [startTime] = useState(Date.now()); // Unused

  // Reset state when question changes
  useEffect(() => {
    setSelectedOption(null);
    setTimeLeft(timePerQuestion); // Reset timer
  }, [question, timePerQuestion]);

  // Timer logic
  useEffect(() => {
    if (selectedOption !== null) return; // Stop timer if answered

    if (timeLeft <= 0) {
      // Auto submit if time runs out
      handleConfirm(); 
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, selectedOption]);

  const handleSelect = (index: number) => {
    if (selectedOption === null) {
      setSelectedOption(index);
    }
  };

  const handleConfirm = () => {
    // If no option selected and time ran out, we can maybe submit -1 or force a selection?
    // For now, if user acts manually, they must have selected something. 
    // If auto-called by timer, selectedOption might be null.
    
    // Calculate precise time taken
    // We approximate using timeLeft, but for better precision we could use Date.now()
    const timeTaken = timePerQuestion - timeLeft; 
    
    // If no selection (timeout), we treat selection as -1 (wrong)
    onAnswer(question.id, selectedOption ?? -1, timeTaken);
  };

  const progressPercentage = ((questionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4 h-[calc(100vh-120px)] flex flex-col">
      {/* Header Stats */}
      <div className="flex items-center justify-between text-sm font-medium text-slate-400">
        <div>Question {questionIndex + 1} / {totalQuestions}</div>
        <div className="flex items-center gap-2 text-indigo-400">
          <TimerIcon className="w-4 h-4" />
          <span>{timeLeft}s</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-indigo-500 transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-slate-800/50 border border-slate-700/50 backdrop-blur-xl rounded-2xl p-5 shadow-2xl">
        <div className="mb-4">
          <span className="inline-block px-2 py-0.5 rounded-lg bg-indigo-500/10 text-indigo-400 text-xs font-semibold tracking-wider mb-2 border border-indigo-500/20">
            {question.section}
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-white leading-snug">
            {question.question}
          </h2>
        </div>

        <div className="grid gap-2">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className={`
                group relative w-full p-3 rounded-xl text-left transition-all duration-200 border-2
                ${selectedOption === idx 
                  ? 'bg-indigo-600 border-indigo-500 shadow-lg shadow-indigo-900/20' 
                  : 'bg-slate-700/30 border-transparent hover:bg-slate-700/50 hover:border-slate-600'}
              `}
            >
              <div className="flex items-center justify-between">
                <span className={`text-base transition-colors ${selectedOption === idx ? 'text-white' : 'text-slate-200'}`}>
                  {option}
                </span>
                {selectedOption === idx && (
                  <div className="w-3 h-3 rounded-full bg-white shadow-sm" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex justify-end">
        <button
          onClick={handleConfirm}
          disabled={selectedOption === null && timeLeft > 0}
          className={`
            flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-base transition-all duration-200
            ${selectedOption !== null || timeLeft <= 0
              ? 'bg-white text-slate-900 hover:bg-indigo-50 shadow-lg hover:shadow-indigo-500/20 translate-y-0 opacity-100'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50'}
          `}
        >
          {timeLeft <= 0 ? 'Time Up - Next' : 'Confirm & Next'}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
