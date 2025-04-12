import { useContext, useEffect, useRef, useState } from "react";
import { QuizContext } from "../context/quiz";
import Option from "./Option";
import "./Question.css";

// Görselleri içe aktar
import Seddi from "../img/cin-seddi.jpg";
import Pamuk from "../img/pamuk.jpg";
import Tarkan from "../img/tarkan.jpg";
import Fobi from "../img/fobi.jpg";
import Balik from "../img/balik.jpg";
import Bandira from "../img/bandira.jpg";
import Billboard from "../img/billboard.jpg";
import Parfum from "../img/parfum.jpg";
import Trex from "../img/trex.jpg";
import Mutluluk from "../img/mutluluk.jpg";

const Question = () => {
  const [quizState, dispatch] = useContext(QuizContext);
  const currentQuestion = quizState.questions[quizState.currentQuestion];

  const [timeLeft, setTimeLeft] = useState(30);
  const [showOptions, setShowOptions] = useState(false);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);
  const hasAdvancedRef = useRef(false);

  // Şık seçilince çağrılır
  const onSelectOption = (option) => {
    dispatch({
      type: "CHECK_ANSWER",
      payload: {
        answer: currentQuestion.answer,
        option,
      },
    });
  };

  // Sonraki soruya geç
  const goToNext = () => {
    if (hasAdvancedRef.current) return;
    hasAdvancedRef.current = true;
    dispatch({ type: "CHANGE_QUESTION" });
  };

  // Resmi getir
  const getImage = () => {
    switch (currentQuestion.media) {
      case "Seddi":
        return Seddi;
      case "Pamuk":
        return Pamuk;
      case "Tarkan":
        return Tarkan;
      case "Fobi":
        return Fobi;
      case "Balik":
        return Balik;
      case "Bandira":
        return Bandira;
      case "Billboard":
        return Billboard;
      case "Parfum":
        return Parfum;
      case "Trex":
        return Trex;
      case "Mutluluk":
        return Mutluluk;
      default:
        return null;
    }
  };

  // Timer ve seçenek gösterimini ayarla
  useEffect(() => {
    setTimeLeft(30);
    setShowOptions(false);
    hasAdvancedRef.current = false;

    timeoutRef.current = setTimeout(() => {
      setShowOptions(true);
    }, 4000);

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          goToNext();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(timeoutRef.current);
    };
  }, [quizState.currentQuestion]);

  return (
    <div className="question">
      <p>
        Soru {quizState.currentQuestion + 1} / {quizState.questions.length}
      </p>

      <h2>{currentQuestion.question}</h2>

      {/* Resim gösterimi */}
      {getImage() && (
        <div className="question-image">
          <img src={getImage()} alt="Soru görseli" />
        </div>
      )}

      <div id="timer">
        <p>{timeLeft} saniye kaldı...</p>
      </div>

      {showOptions && (
        <div className="options">
          {currentQuestion.options.map((option) => (
            <Option
              key={option}
              option={option}
              answer={currentQuestion.answer}
              selectOption={() => onSelectOption(option)}
            />
          ))}
        </div>
      )}

      {(quizState.answerSelected || timeLeft === 0) && (
        <button onClick={goToNext}>Devam Et</button>
      )}
    </div>
  );
};

export default Question;
