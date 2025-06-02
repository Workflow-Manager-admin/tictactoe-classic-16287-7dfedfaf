import React, { useState } from "react";

/**
 * PUBLIC_INTERFACE
 * Main container for TicTacToe Classic game.
 * Two player mode, handles game state, win/draw logic, and provides a light-themed UI.
 */
function TicTacToeClassic() {
  // Internal representation: null = empty, "X" or "O" = player mark
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [status, setStatus] = useState("playing"); // 'playing' | 'won' | 'draw'
  const [winner, setWinner] = useState(null);

  // Constants for UI
  const PLAYER_X = "X";
  const PLAYER_O = "O";

  // Light theme colors as per specifications
  const COLORS = {
    primary: "#ffffff",
    secondary: "#222222",
    accent: "#4caf50"
  };

  /**
   * Checks for a winner on the current board.
   * Returns "X", "O", or null.
   */
  // PUBLIC_INTERFACE
  function calculateWinner(bd) {
    const lines = [
      [0,1,2], [3,4,5], [6,7,8], // rows
      [0,3,6], [1,4,7], [2,5,8], // columns
      [0,4,8], [2,4,6]           // diagonals
    ];
    for (const [a,b,c] of lines) {
      if (bd[a] && bd[a] === bd[b] && bd[a] === bd[c]) {
        return bd[a];
      }
    }
    return null;
  }

  /**
   * Handles player's move on the cell.
   */
  // PUBLIC_INTERFACE
  function handleCellClick(idx) {
    if (board[idx] || status !== "playing") return;
    const nextBoard = board.slice();
    nextBoard[idx] = isXNext ? PLAYER_X : PLAYER_O;

    const theWinner = calculateWinner(nextBoard);
    if (theWinner) {
      setBoard(nextBoard);
      setStatus("won");
      setWinner(theWinner);
      return;
    }
    if (nextBoard.every(cell => cell !== null)) {
      setBoard(nextBoard);
      setStatus("draw");
      setWinner(null);
      return;
    }
    setBoard(nextBoard);
    setIsXNext(!isXNext);
  }

  /**
   * Restarts the game to initial state.
   */
  // PUBLIC_INTERFACE
  function handleRestart() {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setStatus("playing");
    setWinner(null);
  }

  /**
   * Returns status string for rendering under the board.
   */
  // PUBLIC_INTERFACE
  function getGameStatus() {
    if (status === "won") {
      return `Player ${winner} wins!`;
    }
    if (status === "draw") {
      return "It's a draw!";
    }
    return "";
  }

  // Inline styles for the light theme & layout
  const styles = {
    wrapper: {
      minHeight: "calc(100vh - 120px)", // fits nicely into your layout
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: COLORS.primary,
      paddingTop: 36,
      paddingBottom: 32,
    },
    turn: {
      fontSize: "1.3rem",
      marginBottom: 24,
      color: COLORS.secondary,
      fontWeight: 500,
      letterSpacing: 1,
    },
    board: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 64px)",
      gridTemplateRows: "repeat(3, 64px)",
      gap: 0,
      background: COLORS.accent + "22",
      borderRadius: "10px",
      boxShadow: "0 4px 14px 0 rgba(76, 175, 80, 0.13)",
      border: `2px solid ${COLORS.accent}`,
      marginBottom: 26,
      userSelect: "none",
    },
    cell: {
      width: 64,
      height: 64,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "2.35rem",
      cursor: "pointer",
      background: COLORS.primary,
      border: `1.5px solid ${COLORS.secondary}`,
      transition: "background 0.13s",
      fontWeight: 600,
    },
    cellHover: {
      background: COLORS.accent + "18",
    },
    status: {
      height: 35,
      fontSize: "1.1rem",
      color: COLORS.accent,
      fontWeight: 600,
      marginBottom: 16,
      minHeight: 28,
      textAlign: "center",
    },
    restartBtn: {
      background: COLORS.accent,
      color: COLORS.primary,
      border: "none",
      borderRadius: 5,
      padding: "10px 34px",
      fontSize: "1.07rem",
      fontWeight: "bold",
      cursor: "pointer",
      marginTop: 8,
      letterSpacing: 1,
      boxShadow: "0 2px 8px #4caf501c",
      transition: "background 0.14s",
    }
  };

  // Helper for rendering a single Cell
  function Cell({value, onClick, isDisabled}) {
    const [hover, setHover] = useState(false);
    return (
      <div
        style={{
          ...styles.cell,
          ...(hover && !value && !isDisabled ? styles.cellHover : {})
        }}
        onClick={() => { if (!isDisabled) onClick(); }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        aria-label={value ? `Cell ${value}` : "Cell empty"}
      >
        {value}
      </div>
    );
  }

  // UI render
  return (
    <div style={styles.wrapper}>
      <div style={styles.turn}>
        {status === "playing" ? (
          <span>
            Current turn:{" "}
            <span style={{ color: COLORS.accent, fontWeight: 700 }}>
              Player {isXNext ? PLAYER_X : PLAYER_O}
            </span>
          </span>
        ) : (
          <span>&nbsp;</span>
        )}
      </div>
      <div style={styles.board}>
        {board.map((cell, idx) => (
          <Cell
            key={idx}
            value={cell}
            onClick={() => handleCellClick(idx)}
            isDisabled={!!cell || status !== "playing"}
          />
        ))}
      </div>
      <div style={styles.status}>{getGameStatus()}</div>
      <button style={styles.restartBtn} onClick={handleRestart}>
        Restart Game
      </button>
    </div>
  );
}

export default TicTacToeClassic;
