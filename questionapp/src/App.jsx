import { useContext,useEffect } from "react";
import {QuizContext} from "./context/quiz";
import Start from "./components/Start";
import Question from "./components/Question";
import GameOver from "./components/GameOver";
import "./App.css";

function App() {
  const [quizState,dispatch]=useContext(QuizContext);

  return (
    <div className="App-container">
      <h1>Question App</h1>
      {quizState.gameStage === "Start" && <Start />}
      {quizState.gameStage === "Playing" && <Question />}
      {quizState.gameStage === "End" && <GameOver />}
      </div>

  );
}
export default App;


   