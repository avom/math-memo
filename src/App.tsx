import './App.css';
import { Col, Container, Row } from 'react-bootstrap';
import MemoCard from './MemoCard';
import Board from './model/Board';
import { useBoardContext } from './context/BoardContext';
import { useEffect } from 'react';
import { LimitExpressionGenerator } from './model/ExpressionGenerator';

function App() {

  const colCount = 4;
  const rowCount = colCount;

  const {setBoard} = useBoardContext();

  useEffect(() => {
    setBoard(new Board(colCount, rowCount, new LimitExpressionGenerator(10)));
  }, [setBoard]);

  const rows = [];
  for (let r = 0; r < rowCount; r++) {
    const cols = [];
    for (let c = 0; c < colCount; c++) {
      cols.push(
        <Col key={c}>
          <MemoCard col={c} row={r}/>
        </Col>);
    }
    rows.push(<Row key={r}>{cols}</Row>);
  }

  return (
    <>
      <Container fluid className="board-container">
        {rows}
      </Container>
    </>
  )
}

export default App
