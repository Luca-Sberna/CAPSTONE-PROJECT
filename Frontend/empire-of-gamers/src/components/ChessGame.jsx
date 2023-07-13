import React, { useState, useEffect } from "react";
import "../App.css";
import Chessboard from "chessboardjsx";
import { ChessInstance, ShortMove } from "chess.js";
import { Alert, Button } from "react-bootstrap";

const Chess = require("chess.js").Chess;

const ChessGame = () => {
  const [chess, setChess] = useState(
    new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"),
  );
  const [fen, setFen] = useState(chess.fen());
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [moveCount, setMoveCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [selectedPieceSquare, setSelectedPieceSquare] = useState(null);
  const [hoveredPiece, setHoveredPiece] = useState(null);

  useEffect(() => {
    let interval;
    if (startTime && !endTime && !gameOver) {
      interval = setInterval(() => {
        const now = Date.now();
        const elapsedSeconds = Math.floor((now - startTime) / 1000);
        setTimeElapsed(elapsedSeconds);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [startTime, gameOver, endTime]);

  const handleSquareClick = (square) => {
    const piece = chess.get(square);
    if (piece && piece.color === chess.turn()) {
      setSelectedSquare(square);
      setSelectedPieceSquare(square);
    }
  };

  const handleMove = (move) => {
    try {
      const result = chess.move(move);
      if (result !== null) {
        setTimeout(() => {
          const moves = chess.moves();
          if (moves.length > 0) {
            const computerMove =
              moves[Math.floor(Math.random() * moves.length)];
            chess.move(computerMove);
            setFen(chess.fen());
            // Rimuovi l'incremento delle mosse totali per il turno del computer
          } else {
            setGameOver(true);
          }
        }, 300);
        setFen(chess.fen());
        setMoveCount((prevCount) => prevCount + 1); // Incrementa solo le mosse dell'utente
      } else {
        alert("Mossa non valida. Riprova.");
        setFen(chess.fen());
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = (move) => {
    // ... altre logiche ...

    const isPlayerTurn = chess.turn() === "w" && !gameOver;

    if (isPlayerTurn) {
      handleMove({
        from: move.sourceSquare,
        to: move.targetSquare,
        promotion: "q",
      });
    }

    setSelectedSquare(null); // Deseleziona la casella alla fine della mossa
  };

  const handleRestart = () => {
    const newChess = new Chess();
    setChess(newChess);
    setFen(newChess.fen());
    setStartTime(null);
    setEndTime(null);
    setMoveCount(0);
    setGameOver(false);
  };

  const handleGameOver = () => {
    setEndTime(Date.now());
    setGameOver(true);
  };

  const handleStart = (sourceSquare) => {
    setSelectedSquare(sourceSquare);
    setSelectedPieceSquare(sourceSquare);
    setStartTime(Date.now());
    setHoveredPiece(null); // Ripulisci lo stato di hoveredPiece al trascinamento del pezzo
  };

  const handleSquareHover = (square, piece) => {
    if (piece) {
      setHoveredPiece(piece);
    } else {
      setHoveredPiece(null);
    }
  };

  const getPieceStyle = ({ pieceSquare }) => {
    if (pieceSquare === hoveredPiece?.square) {
      return { transform: "scale(1.5)" };
    }
    return {};
  };

  return (
    <div className="flex-center ">
      <h1 className="title-center">Mini Chess Game</h1>
      <Chessboard
        width={700}
        position={fen}
        onDrop={handleDrop}
        dropOffBoard="snapback"
        onDragStart={handleStart}
        onSnapEnd={handleGameOver}
        className="scacchiera"
        onSquareClick={handleSquareClick}
        onMouseOverSquare={handleSquareHover}
        pieceStyle={getPieceStyle}
        transitionDuration={200} // Aggiunto il tempo di durata della transizione
        boardStyle={{
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)", // Aggiunto uno stile di ombra per il bordo
        }}
        squareStyles={{
          transition: "background-color 0.3s",
          ...(selectedSquare && {
            [selectedSquare]: { backgroundColor: "rgba(255, 255, 0, 0.5)" },
          }),
          ...(selectedPieceSquare && {
            [selectedPieceSquare]: {
              backgroundColor: "rgba(255, 255, 0, 0.5)",
            },
          }),
        }}
      />

      {gameOver && (
        <div className="overlay">
          <Alert
            variant="success"
            className={`overlay-alert ${gameOver ? "show" : ""}`}
          >
            <Alert.Heading>Congratulazioni!!!</Alert.Heading>
            <p>Scacco matto! Hai vinto la partita.</p>
            <p>Tempo totale: {timeElapsed} secondi</p>
            <p>Mosse totali: {moveCount}</p>
            <hr />
            <Button onClick={handleRestart} variant="outline-success">
              Riprova
            </Button>
          </Alert>
        </div>
      )}
    </div>
  );
};

export default ChessGame;
