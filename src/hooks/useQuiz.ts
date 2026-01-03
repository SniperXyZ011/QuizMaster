import { useState, useCallback } from 'react';
import type { Question, QuestionResult } from '../types/quiz';

const TOTAL_TIME_PER_QUESTION = 60; // seconds

export function useQuiz(questions: Question[]) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, QuestionResult>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const startQuiz = useCallback(() => {
    setIsStarted(true);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setIsFinished(false);
  }, []);

  const submitAnswer = useCallback((questionId: number, answerIndex: number, timeTaken: number) => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return;

    const isCorrect = question.answer_index === answerIndex;
    
    // Scoring Logic
    const accuracyScore = isCorrect ? 1 : 0;
    const remainingTime = Math.max(0, TOTAL_TIME_PER_QUESTION - timeTaken);
    const speedScore = isCorrect ? (remainingTime / TOTAL_TIME_PER_QUESTION) * 1 : 0;
    const totalScore = accuracyScore + speedScore;

    setAnswers(prev => ({
      ...prev,
      [questionId]: {
        questionId,
        isCorrect,
        timeTaken,
        accuracyScore,
        speedScore,
        score: totalScore,
        selectedAnswerIndex: answerIndex
      }
    }));

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  }, [currentQuestionIndex, questions]);

  const restartQuiz = useCallback(() => {
    setIsStarted(false);
    setIsFinished(false);
    setCurrentQuestionIndex(0);
    setAnswers({});
  }, []);

  const totalScore = Object.values(answers).reduce((acc, curr) => acc + curr.score, 0);
  const totalMaxScore = questions.length * 2;

  return {
    questions,
    currentQuestion: questions[currentQuestionIndex],
    currentQuestionIndex,
    answers,
    isStarted,
    isFinished,
    startQuiz,
    submitAnswer,
    restartQuiz,
    stats: {
      totalScore,
      totalMaxScore,
      totalQuestions: questions.length
    },
    config: {
      timePerQuestion: TOTAL_TIME_PER_QUESTION
    }
  };
}
