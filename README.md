# 🧠 QuizMaster

A modern, premium MCQ quiz practice application built with React and TypeScript. Features a sleek dark UI, timed questions with speed-based scoring, and detailed performance analytics.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)

## ✨ Features

- **🎯 Custom Question Count** - Choose 20, 30, 40, or 50 questions per quiz
- **🔀 Random Selection** - Questions are shuffled and randomly selected from the question pool
- **⏱️ Timed Questions** - 60 seconds per question with visual countdown
- **📊 Dual Scoring System**
  - **Accuracy Score**: 1 point for correct answer
  - **Speed Bonus**: Up to 1 additional point based on remaining time
- **📈 Detailed Analytics** - Performance breakdown with per-question analysis
- **🌙 Premium Dark UI** - Glassmorphism, gradients, and smooth animations
- **📱 Responsive Design** - Works on desktop and mobile devices

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/quizmaster.git
cd quizmaster

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 📝 Adding Questions

Questions are stored in `src/data/questions.json`. Add your questions following this format:

```json
{
  "questions": [
    {
      "id": 1,
      "section": "Category Name",
      "question": "Your question text here?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "answer_index": 0
    }
  ]
}
```

| Field | Type | Description |
|-------|------|-------------|
| `id` | number | Unique identifier for the question |
| `section` | string | Category/topic of the question |
| `question` | string | The question text |
| `options` | string[] | Array of 4 answer options |
| `answer_index` | number | Index of correct answer (0-3) |

## 🎮 How Scoring Works

Each question is worth a maximum of **2 points**:

1. **Accuracy (1 point)**: Awarded for selecting the correct answer
2. **Speed Bonus (0-1 point)**: Calculated as `(Remaining Time / 60) × 1`

**Example**: If you answer correctly in 15 seconds:
- Accuracy: 1 point
- Speed: (45/60) × 1 = 0.75 points
- **Total: 1.75 points**

## 🛠️ Tech Stack

- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS 3.4
- **Build Tool**: Vite 7
- **Icons**: Lucide React

## 📁 Project Structure

```
src/
├── components/
│   ├── Layout.tsx        # Main layout wrapper
│   ├── StartScreen.tsx   # Home screen with settings
│   ├── QuizScreen.tsx    # Question display & timer
│   └── ResultScreen.tsx  # Score & analytics
├── hooks/
│   └── useQuiz.ts        # Quiz state management
├── data/
│   └── questions.json    # Question database
├── types/
│   └── quiz.ts           # TypeScript interfaces
└── App.tsx               # Main app component
```

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Made with ❤️ for knowledge seekers
