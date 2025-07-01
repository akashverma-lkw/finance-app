import React, { useState } from "react";

const questions = [
  {
    question: "What is your main financial goal?",
    options: ["Wealth Creation", "Family Protection", "Health Security", "Retirement Planning"]
  },
  {
    question: "What is your current age group?",
    options: ["18-25", "26-35", "36-50", "51+"]
  },
  {
    question: "What is your monthly income?",
    options: ["< ₹20,000", "₹20,000 - ₹50,000", "₹50,000 - ₹1,00,000", "₹1,00,000+"]
  },
  {
    question: "Do you prefer guaranteed returns or market-linked growth?",
    options: ["Guaranteed", "Market-linked", "Mix of both"]
  }
];

const resultsMap = {
  "Wealth Creation|26-35|₹50,000 - ₹1,00,000|Market-linked": "ULIP Investment Plan",
  "Family Protection|26-35|₹20,000 - ₹50,000|Guaranteed": "Term Life Insurance Plan",
  "Health Security|36-50|₹50,000 - ₹1,00,000|Guaranteed": "Family Health Insurance",
  "Retirement Planning|51+|₹1,00,000+|Mix of both": "Pension + Annuity Plan",
};

const IdealPlanQuiz = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState("");

  const handleAnswer = (answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      const key = newAnswers.join("|");
      const matchedResult = resultsMap[key] || "Balanced Plan (Custom Recommendation)";
      setResult(matchedResult);
    }
  };

  const resetQuiz = () => {
    setAnswers([]);
    setStep(0);
    setResult("");
  };

  return (
    <section className="py-16 bg-blue-50">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">Find Your Ideal Plan in 60 Seconds</h2>
        <p className="text-gray-600 mb-8">Answer a few quick questions and discover the best plan for you!</p>

        {!result ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{questions[step].question}</h3>
            <div className="grid gap-3">
              {questions[step].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt)}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
                >
                  {opt}
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-4">Step {step + 1} of {questions.length}</p>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-green-600 mb-2">Recommended Plan:</h3>
            <p className="text-xl text-gray-800 mb-4">{result}</p>
            <button onClick={resetQuiz} className="mt-4 text-blue-600 hover:underline">
              Retake Quiz
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default IdealPlanQuiz;
