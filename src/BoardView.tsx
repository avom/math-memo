import MemoCard from "./MemoCard";
import { useBoardContext } from "./context/BoardContext";
import "./BoardView.css";

function BoardView() {
  const { board } = useBoardContext();

  const cards = [];
  if (board) {
    for (let r = 0; r < board.getRowCount(); r++) {
      for (let c = 0; c < board.getColCount(); c++) {
        cards.push(
          <div
            className={"memo-card-container"}
            key={r * board.getColCount() + c}
          >
            <MemoCard col={c} row={r} />
          </div>
        );
      }
    }
  }

  return (
    <>
      <div className={"board-container-" + board?.getColCount()}>{cards}</div>
    </>
  );
}

export default BoardView;
