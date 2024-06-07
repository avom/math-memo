import { useState } from "react";
import { Button, ButtonGroup, ToggleButton } from "react-bootstrap";
import "./MainMenu.css";
import { DifficultyLevel, GameSettings } from "./model/Game";

function MainMenu(props: { startGame: (settings: GameSettings) => void }) {
  const [boardSize, setBoardSize] = useState(4);
  const [difficulty, setDifficulty] = useState(0);

  const boardSizeRadios = [
    { name: "4 × 4", value: 4 },
    { name: "6 × 6", value: 6 },
  ];

  const difficultyRadios = [
    { name: "Väga lihtne", value: DifficultyLevel.VeryEasy },
    { name: "Lihtne", value: DifficultyLevel.Easy },
    { name: "Keskmine", value: DifficultyLevel.Medium },
    { name: "Raske", value: DifficultyLevel.Hard },
    { name: "Väga raske", value: DifficultyLevel.VeryHard },
  ];

  function onClickPlay(event: any) {
    event.preventDefault();
    props.startGame({ cols: boardSize, rows: boardSize, difficulty: difficulty });
  }

  return (
    <div className="main-menu">
      <ButtonGroup className="mb-5">
        {boardSizeRadios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`board-size-radio-${idx}`}
            type="radio"
            variant="outline-primary"
            name="board-size-radio"
            size="lg"
            value={radio.value}
            checked={boardSize === radio.value}
            onChange={(e) => setBoardSize(parseInt(e.currentTarget.value))}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
      <br />
      <ButtonGroup className="mb-5" vertical>
        {difficultyRadios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`difficulty-radio-${idx}`}
            type="radio"
            variant="outline-primary"
            name="difficulty-radio"
            size="lg"
            value={radio.value}
            checked={difficulty === radio.value}
            onChange={(e) => setDifficulty(parseInt(e.currentTarget.value))}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
      <br />
      <Button className="px-5" size="lg" variant="primary" onClick={onClickPlay}>
        Alusta
      </Button>
    </div>
  );
};

export default MainMenu;
