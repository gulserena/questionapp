import { useContext ,useEffect} from "react";
import { QuizContext } from "../context/quiz";
import confetti from "canvas-confetti"; // Confetti kütüphanesi

import "./GameOver.css";

const GameOver = () => {
  const [quizState, dispatch] = useContext(QuizContext);

  // Burada doğru, yanlış ve boş sayıları quiz.jsxden alıyoruz
  const correctAnswers = quizState.correctAnswers || 0;
  const wrongAnswers = quizState.wrongAnswers || 0;
  const unanswered = quizState.unanswered || 0;

    //  Konfeti patlamasını component yüklendiğinde tetikle
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
      <p>
        Boş bırakılan soru sayısı: {unanswered}
      </p>
      <button onClick={() => dispatch({ type: "NEW_GAME" })}>Yeniden Başlat</button>
    </div>
  );
};

export default GameOver;
