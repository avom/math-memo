import { PropsWithChildren, createContext, useContext, useState } from "react";
import Board from "../model/Board";

interface BoardContextValue {
  board: Board | null;
  setBoard: (board: Board | null) => void;
}

export const BoardContext = createContext<BoardContextValue | undefined>(undefined);

export function useBoardContext() {
  const context = useContext(BoardContext);

  if (context === undefined) {
    throw Error("We do not seem to be instide the provider");
  }

  return context;
}

export function BoardProvider({ children }: PropsWithChildren<unknown>) {
  const [board, setBoard] = useState<Board | null>(null);

  return (
    <BoardContext.Provider value={{board, setBoard}}>
      {children}
    </BoardContext.Provider>
  );
}
