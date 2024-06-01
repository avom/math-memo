import ReactCardFlip from "react-card-flip";
import "./MemoCard.css";
import { useBoardContext } from "./context/BoardContext";

const MemoCard = (props: {col: number, row: number}) => {

  const {board, setBoard} = useBoardContext();

  const onClick = (ev: any) => {
    ev.preventDefault();
    if (board) {
      board.flip(props.col, props.row);
      setBoard(board.clone());
    }
  };

  const isVanished = board?.isVanished(props.col, props.row);
  const isFlipped = board?.isFlipped(props.col, props.row) || isVanished;

  return (
    <div className={"memo-card" + (isVanished ? " vanish" : "")}>
      <ReactCardFlip isFlipped={isFlipped} >
        <div className="memo-card-content memo-card-front" onClick={onClick}></div>
        <div className="memo-card-content memo-card-back" onClick={onClick}>{board?.getExpression(props.col, props.row)}</div>
      </ReactCardFlip>
    </div>
  );
};

export default MemoCard;
