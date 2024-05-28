import ReactCardFlip from "react-card-flip";
import "./MemoCard.css";
import { useState } from "react";

const MemoCard = () => {
  const [isFlipped, setFlipped] = useState(false);

  const onClick = (ev: any) => {
    ev.preventDefault();
    setFlipped(!isFlipped);
  };

  return (
    <div className="memo-card">
      <ReactCardFlip isFlipped={isFlipped} >
        <div className="memo-card-content" onClick={onClick}>Front</div>
        <div className="memo-card-content" onClick={onClick}>Back</div>
      </ReactCardFlip>
    </div>);
};

export default MemoCard;
