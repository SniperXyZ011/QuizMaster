import { useState } from 'react';
import { Layout } from './components/Layout';
import { StartScreen } from './components/StartScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultScreen } from './components/ResultScreen';
import { useQuiz } from './hooks/useQuiz';
import type { Question } from './types/quiz';
import allQuestions from './data/questions.json';

// Shuffle array utility
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function App() {
  const [selectedQuestions, setSelectedQuestions] = useState<Question[] | null>(null);

  const handleStartQuiz = (questionCount: number) => {
    const allQs = allQuestions.questions as Question[];
    // Shuffle and pick the requested number of questions
    const shuffled = shuffleArray(allQs);
    const selected = shuffled.slice(0, Math.min(questionCount, allQs.length));
    setSelectedQuestions(selected);
  };

  const handleBackToStart = () => {
    setSelectedQuestions(null);
  };

  if (!selectedQuestions) {
    return (
      <Layout>
        <StartScreen 
          onStart={handleStartQuiz} 
          totalAvailable={(allQuestions.questions as Question[]).length}
        />
      </Layout>
    );
  }

  return (
    <Layout onLogoClick={handleBackToStart}>
      <QuizContent 
        questions={selectedQuestions} 
        onBack={handleBackToStart} 
      />
    </Layout>
  );
}

// Separate component to use the hook with selected questions
function QuizContent({ questions, onBack }: { questions: Question[]; onBack: () => void }) {
  const { 
    isStarted, 
    isFinished, 
    startQuiz,
    restartQuiz,
    currentQuestion, 
    currentQuestionIndex,
    submitAnswer,
    stats,
    answers,
    config
  } = useQuiz(questions);

  // Auto-start the quiz when this component mounts
  if (!isStarted && !isFinished) {
    startQuiz();
  }

  const handleRestart = () => {
    restartQuiz();
    startQuiz();
  };

  return (
    <>
      {isStarted && !isFinished && currentQuestion && (
        <QuizScreen
          question={currentQuestion}
          questionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          timePerQuestion={config.timePerQuestion}
          onAnswer={submitAnswer}
        />
      )}

      {isFinished && (
        <ResultScreen 
          stats={stats}
          answers={answers}
          questions={questions}
          onRestart={handleRestart}
          onBackToQuizzes={onBack}
        />
      )}
    </>
  );
}

export default App;
