export interface Question {
  id: number;
  section: string;
  question: string;
  options: string[];
  answer_index: number;
}

export interface QuizState {
  currentQuestionIndex: number;
  answers: Record<number, { answerIndex: number; timeTaken: number }>;
  isFinished: boolean;
  score: number;
}

export interface QuestionResult {
  questionId: number;
  isCorrect: boolean;
  timeTaken: number;
  score: number;
  accuracyScore: number;
  speedScore: number;
  selectedAnswerIndex: number;
}
