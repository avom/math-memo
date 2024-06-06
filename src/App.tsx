import "./App.css";
import Board from "./model/Board";
import { useBoardContext } from "./context/BoardContext";
import { LimitExpressionGenerator } from "./model/ExpressionGenerator";
import MainMenu from "./MainMenu";
import BoardView from "./BoardView";
import { DifficultyLevel, GameSettings } from "./model/Game";

function App() {
  const { board, setBoard } = useBoardContext();

  function createExpressionGenerator(difficulty: DifficultyLevel) {
    switch (difficulty) {
      case DifficultyLevel.VeryEasy:
        return new LimitExpressionGenerator(5);
      case DifficultyLevel.Easy:
        return new LimitExpressionGenerator(10);
      case DifficultyLevel.Medium:
        return new LimitExpressionGenerator(20);
      case DifficultyLevel.Hard:
        return new LimitExpressionGenerator(100);
      case DifficultyLevel.VeryHard:
        return new LimitExpressionGenerator(1000);
      default:
        console.error("Unsupported difficulty level");
        return new LimitExpressionGenerator(1000);
    }
  }

  function startGame(settings: GameSettings) {
    const expressionGenerator = createExpressionGenerator(settings.difficulty);
    setBoard(new Board(settings.cols, settings.rows, expressionGenerator));
  }

  if (board) {
    return <BoardView />;
  } else {
    return <MainMenu startGame={startGame} />;
  }
}

export default App;
