import { createContext, useReducer } from "react";
import questions from "../data/questions_complete";

// Aşamalar
const STAGES = ["Start", "Playing", "End"];

// Başlangıç durumu
const initialState = {
  gameStage: STAGES[0], // Oyun başlangıcı 
  questions, // Sorular
  currentQuestion: 0, // Şu anki soru 
  answerSelected: false, // Cevap seçilip seçilmediğini kontrol et
  score: 0, // Puan
  correctAnswers: 0, // Doğru cevap sayısı
  wrongAnswers: 0, // Yanlış cevap sayısı
  unanswered: 0, // Boş bırakılan cevap sayısı
  userAnswers: [],
};

const quizReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_STAGE":
      return {
        ...state,
        gameStage: STAGES[1], // Oyuna geçiş
      };

    case "START_GAME":
      return {
        ...state,
        gameStage: STAGES[1], // Oyun oynama aşamasına geçiş
      };

    case "REORDER_QUESTIONS":
      const reorderedQuestions = [...state.questions];
      for (let i = reorderedQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [reorderedQuestions[i], reorderedQuestions[j]] = [
          reorderedQuestions[j],
          reorderedQuestions[i],
        ]; 
      }
      return {
        ...state,
        questions: reorderedQuestions,
      };

      case "CHANGE_QUESTION": {
        const nextQuestion = state.currentQuestion + 1;
        let endGame = false;
      
        if (!state.questions[nextQuestion]) {
          endGame = true; // Eğer soru yoksa, oyun biter
        }
      
        // Eğer cevap seçilmeden sonraki soruya geçildiyse, unanswered'ı artır
        const unansweredIncrement = state.answerSelected ? 0 : 1;
      
        return {
          ...state,
          currentQuestion: nextQuestion,
          gameStage: endGame ? STAGES[2] : state.gameStage,
          answerSelected: false,
          unanswered: state.unanswered + unansweredIncrement, // boş geçilen soru sayısı güncelle
        };
      }
      

    case "NEW_GAME": {
      return initialState; // Yeni oyun başlatıldığında durumu sıfırla
    }

    case "CHECK_ANSWER": {
     
        if (state.answerSelected) return state;
      
        const { answer, option } = action.payload;
        let correctAnswer = 0;
        let wrongAnswer = 0;
      
        const currentQuestion = state.questions[state.currentQuestion];
      
        // Boş bırakıldıysa
        if (!option) {
          return {
            ...state,
            unanswered: state.unanswered + 1,
            answerSelected: true,
            userAnswers: [
              ...state.userAnswers,
              {
                questionId: currentQuestion.id,
                answer: null,
              },
            ],
          };
        }
      
        // Doğru veya yanlış kontrolü
        if (answer === option) {
          correctAnswer = 1;
        } else {
          wrongAnswer = 1;
        }
      
        return {
          ...state,
          score: state.score + correctAnswer,
          correctAnswers: state.correctAnswers + correctAnswer,
          wrongAnswers: state.wrongAnswers + wrongAnswer,
          answerSelected: true,
          userAnswers: [
            ...state.userAnswers,
            {
              questionId: currentQuestion.id,
              answer: option,
            },
          ],
        };
      }
      
    default:
      return state;
  }
};


export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const value = useReducer(quizReducer, initialState);

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
