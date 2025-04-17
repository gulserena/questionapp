import { useContext, useEffect } from "react";
import { QuizContext } from "../context/quiz";
import confetti from "canvas-confetti";

import "./GameOver.css";

const GameOver = () => {
  const [quizState, dispatch] = useContext(QuizContext);

  const correctAnswers = quizState.correctAnswers || 0;
  const wrongAnswers = quizState.wrongAnswers || 0;
  const unanswered = quizState.unanswered || 0;

  useEffect(() => {
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <div id="gameover">
      <h2>Oyun Bitti!</h2>
      <p>Puan: {quizState.score}</p>
      <p>
        {correctAnswers} doğru ve {wrongAnswers} yanlış yanıtınız var.
      </p>
      <p>Boş bırakılan soru sayısı: {unanswered}</p>

      <div className="question-review">
        <h3>Soru İncelemesi:</h3>
        {quizState.questions.map((question, index) => {
          const userAnswerObj = quizState.userAnswers.find(
            (ua) => ua?.questionId === question.id
          );

          const userAnswer = userAnswerObj?.answer;
          const isUnanswered = userAnswer === null || userAnswer === undefined;
          const isCorrect = userAnswer === question.answer;

          return (
            <div
              key={index}
              className={`question-item ${
                isUnanswered ? "unanswered" : isCorrect ? "correct" : "wrong"
              }`}
            >
              <p>
                <strong>{index + 1}. Soru:</strong> {question.question}
              </p>
              <p>
                <strong>Verilen Cevap:</strong>{" "}
                {isUnanswered ? "Boş bırakıldı" : userAnswer}
              </p>
              <p>
                <strong>Doğru Cevap:</strong> {question.answer}
              </p>
            </div>
          );
        })}
      </div>

      <button onClick={() => dispatch({ type: "NEW_GAME" })}>
        Yeniden Başlat
      </button>
    </div>
  );
};

export default GameOver;
