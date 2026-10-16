import { useState } from 'react'

interface Question {
  question: string;
  options: string[];
  answer: number;
}

const questions: Question[] = [
  {
    question: "What tool is used as the lightning-fast dev server for this app?",
    options: ["Webpack", "Vite", "Parcel", "Gulp"],
    answer: 1
  },
  {
    question: "Which library is used for building the user interface components?",
    options: ["Vue", "React", "Angular", "Svelte"],
    answer: 1
  },
  {
    question: "How are styles primarily applied in this project?",
    options: ["Inline styles", "Tailwind CSS utility classes", "Bootstrap", "Vanilla CSS files"],
    answer: 1
  }
];

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleAnswer = (index: number) => {
    setSelectedOption(index);
  };

  const handleNext = () => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedOption(null);
    } else {
      setIsFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
        {!isFinished ? (
          <div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                Question {currentQuestion + 1} of {questions.length}
              </span>
            </div>
            
            <h2 className="text-xl font-bold text-slate-900 mb-6">
              {questions[currentQuestion].question}
            </h2>

            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className={`w-full text-left p-4 rounded-xl font-medium transition border ${
                    selectedOption === index
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            <button
              disabled={selectedOption === null}
              onClick={handleNext}
              className={`mt-6 w-full py-3 rounded-xl font-semibold transition shadow-sm ${
                selectedOption === null
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              Next Question
            </button>
          </div>
        ) : (
          <div className="text-center py-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Quiz Completed! 🎉</h2>
            <p className="text-slate-500 mb-6">
              You scored <span className="font-bold text-indigo-600">{score}</span> out of <span className="font-bold">{questions.length}</span>
            </p>
            <button
              onClick={restartQuiz}
              className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-500 transition shadow-md"
            >
              Restart Quiz
            </button>
          </div>
        )}
      </div>
    </main>
  );
}