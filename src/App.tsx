import { useState } from 'react';
import './App.css';
import { Col, Container, Row } from 'react-bootstrap';
import MemoCard from './MemoCard';

function App() {
  
  // const [board] = useState(new Board)
  const colCount = 6;
  const rowCount = colCount;

  const rows = [];
  for (let r = 0; r < rowCount; r++) {
    const cols = [];
    for (let c = 0; c < colCount; c++) {
      cols.push(<Col><MemoCard/></Col>);
    }
    rows.push(<Row>{cols}</Row>);
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
