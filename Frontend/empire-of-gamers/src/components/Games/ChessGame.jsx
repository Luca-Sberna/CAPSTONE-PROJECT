import React, { useState, useEffect } from "react";
import "../../App.css";
import Chessboard from "chessboardjsx";
import { ChessInstance, ShortMove } from "chess.js";
import { Alert, Button } from "react-bootstrap";
import { setCurrentGame } from "../../redux/slices/userSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const Chess = require("chess.js").Chess;

const ChessGame = () => {
  const [chess, setChess] = useState(
    new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"),
  );
  const [fen, setFen] = useState(chess.fen());
  const [startTime, setStartTime] = useState(false);
  const [moveCount, setMoveCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [selectedPieceSquare, setSelectedPieceSquare] = useState(null);
  const [hoveredPiece, setHoveredPiece] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [score, setScore] = useState(0);
  const token = useSelector((state) => state.user.token);
  const currentGame = useSelector((state) => state.user.currentGame);
  const userCurrent = useSelector((state) => state.user.userCurrent);
  const userId = userCurrent.idUser;
  const dispatch = useDispatch();

  const getChessboardWidth = () => {
    if (windowWidth < 576) {
      return 280;
    } else if (windowWidth >= 576 && windowWidth < 992) {
      return 400;
    } else if (windowWidth >= 992 && windowWidth < 1200) {
      return 500;
    } else {
      return 600;
    }
  };

  const fetchSaveScore = async () => {
    try {
      if (currentGame) {
        const { score: initialScore } = currentGame;
        let response;

        try {
          response = await axios.get(
            `${process.env.REACT_APP_API_URL}/ranking/user/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
        } catch (error) {
          if (error.response && error.response.status === 404) {
            // L'utente non ha uno score associato, effettua una richiesta POST
            await axios.post(
              `${process.env.REACT_APP_API_URL}/ranking`,
              {
                score: initialScore,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
            );
            return; // Esce dalla funzione in caso di richiesta POST effettuata
          } else {
            throw error; // Rilancia l'errore in caso di errori diversi da 404
          }
        }

        if (response.data.content.length > 0) {
          // L'utente ha già uno score associato, effettua una richiesta PUT
          const rankingId = response.data.content[0].id;
          const updatedScore = response.data.content[0].score + score;
          await axios.put(
            `${process.env.REACT_APP_API_URL}/ranking/${rankingId}`,
            {
              score: updatedScore,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
        } else {
          // L'utente non ha uno score associato, effettua una richiesta POST
          await axios.post(
            `${process.env.REACT_APP_API_URL}/ranking`,
            {
              score: initialScore,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
        }
      }
    } catch (error) {
      console.log(
        "Si è verificato un errore durante il salvataggio dello score:",
        error,
      );
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    let interval;
    if (startTime && !gameOver) {
      interval = setInterval(() => {
        setTimeElapsed((elapsedSeconds) => elapsedSeconds + 1);
      }, 1000);
      return () => clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
      fetchSaveScore();
    };
  }, [startTime, gameOver]);

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
        if (!startTime) {
          setStartTime(true);
        }
        const capturedPiece = result.captured;
        if (capturedPiece) {
          const pieceValue = {
            p: 1, // pedone
            r: 2, // torre
            n: 2, // cavallo
            b: 2, // alfiere
            q: 3, // regina
          };
          const pieceScore = pieceValue[capturedPiece.toLowerCase()];
          setScore((prevScore) => prevScore + pieceScore);
        }
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
    setStartTime(false);
    setMoveCount(0);
    setGameOver(false);
    setTimeElapsed(0);
    setScore(0);
    setCurrentGame({
      gameId: "f69314d6-23c1-48d1-aa8c-1ec30071c603",
      score: score, // punteggio iniziale
    });
  };

  const handleGameOver = () => {
    setGameOver(true);
    setStartTime(false);

    if (startTime) {
      const elapsedSeconds = Math.floor(startTime / 1000);
      setTimeElapsed(elapsedSeconds);
    }

    fetchSaveScore();
  };

  const handleStart = (sourceSquare) => {
    setSelectedSquare(sourceSquare);
    setSelectedPieceSquare(sourceSquare);
    setStartTime(true);
    setHoveredPiece(null); // Ripulisci lo stato di hoveredPiece al trascinamento del pezzo
    setCurrentGame({
      gameId: "f69314d6-23c1-48d1-aa8c-1ec30071c603",
      score: score, // punteggio iniziale
    });
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

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <>
      <div className="chess-container py-2  py-sm-4">
        <div className="d-flex gap-5">
          <p>time: {formatTime(timeElapsed)}</p>
          <p>score: {score}</p>
          <p>moves: {moveCount}</p>
        </div>
        <Chessboard
          width={getChessboardWidth()}
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
              <p>score: {score}</p>
              <hr />
              <Button onClick={handleRestart} variant="outline-success">
                Riprova
              </Button>
            </Alert>
          </div>
        )}
      </div>
    </>
  );
};

export default ChessGame;
