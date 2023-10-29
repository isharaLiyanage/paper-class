"use client";
import React, { useState } from "react";

function QuizForm({ addQuiz }: any) {
  const [quiz, setQuestion] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState<any>();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    addQuiz({ quiz, answers, correctAnswer });
    setQuestion("");
    setAnswers(["", "", "", ""]);
    setCorrectAnswer(correctAnswer);
    console.log(addQuiz);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Question:
          <input
            type="text"
            required
            value={quiz}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setQuestion(e.target.value)}
          />
        </label>
        <span>Answers</span>
        <ul>
          {answers.map((answer, index) => (
            <li key={index}>
              <input
                type="text"
                value={answers[index]}
                required
                className="shadow  appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => {
                  const newAnswers = [...answers];
                  newAnswers[index] = e.target.value;
                  setAnswers(newAnswers);
                }}
              />
            </li>
          ))}
          <span> Correct Answer</span>
          <input
            type="text"
            name="correctAnswer"
            required
            value={correctAnswer}
            className="shadow  appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setCorrectAnswer(e.target.value)}
          />
        </ul>
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded"
        >
          Add Quiz
        </button>
      </form>
    </div>
  );
}

export default QuizForm;
