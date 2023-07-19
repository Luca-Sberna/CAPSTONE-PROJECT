import React, { useState, useEffect, useCallback, useRef } from "react";
import { Button, Container } from "react-bootstrap";
import { setCurrentGame } from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Snake = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [time, setTime] = useState(0);
  const [snake, setSnake] = useState([[0, 0]]);
  const dispatch = useDispatch();
  const [food, setFood] = useState([
    Math.floor(Math.random() * 10),
    Math.floor(Math.random() * 10),
  ]);
  const [direction, setDirection] = useState("right");
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const snakeRef = useRef(null);
  const bottomRef = useRef(null);
  const token = useSelector((state) => state.user.token);
  const currentGame = useSelector((state) => state.user.currentGame);
  const userCurrent = useSelector((state) => state.user.userCurrent);
  const userId = userCurrent.idUser;

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

  //Funzione per gestire il click sul pulsante "Inizia partita"
  function handleStartClick() {
    setGameStarted(true);
    dispatch(
      setCurrentGame({
        gameId: "155d3957-1857-48f7-bcdc-9d56fce1712b",
        score: score, // punteggio iniziale
      }),
    );

    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  //Funzione per controllare se la testa del serpente ha toccato il proprio corpo o i bordi del campo
  const checkCollision = useCallback(() => {
    const head = snake[snake.length - 1];
    for (let i = 0; i < snake.length - 1; i++) {
      if (head[0] === snake[i][0] && head[1] === snake[i][1]) {
        return true;
      }
    }
    if (head[0] < 0 || head[0] > 9 || head[1] < 0 || head[1] > 9) {
      return true;
    }
    return false;
  }, [snake]);

  //Funzione per gestire il movimento del serpente
  const moveSnake = useCallback(() => {
    const head = snake[snake.length - 1];
    let newHead;
    switch (direction) {
      case "right":
        newHead = [head[0], head[1] + 1];
        break;
      case "down":
        newHead = [head[0] + 1, head[1]];
        break;
      case "left":
        newHead = [head[0], head[1] - 1];
        break;
      case "up":
        newHead = [head[0] - 1, head[1]];
        break;
      default:
        return;
    }
    const newSnake = [...snake, newHead];
    if (newHead[0] === food[0] && newHead[1] === food[1]) {
      setFood([Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]);
      setScore(score + 1); // Incrementa il punteggio quando il serpente mangia il cibo
    } else {
      newSnake.shift();
    }
    setSnake(newSnake);
  }, [direction, food, score, snake]);

  //Funzione per salvare il punteggio
  const saveScore = useCallback(() => {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push({ score, time });
    highScores.sort((a, b) => b.score - a.score);
    localStorage.setItem("highScores", JSON.stringify(highScores.slice(0, 10)));
  }, [score, time]);

  //Effetto per gestire il movimento del serpente
  useEffect(() => {
    if (gameStarted && !gameOver) {
      const interval = setInterval(() => {
        moveSnake();
        if (checkCollision()) {
          setGameOver(true);
          dispatch(fetchSaveScore);
          clearInterval(interval);
        }
      }, 500);
      return () => clearInterval(interval);
    }
  }, [snake, direction, checkCollision, moveSnake, gameStarted, gameOver]);

  //Effetto per gestire il focus del gioco , per non dover perforza far cliccare all'utente il div del gioco
  //per ricevere i comandi di movimento
  useEffect(() => {
    if (snakeRef.current) snakeRef.current.focus();
  }, []);

  //Effetto per gestire l'aggiornamento del tempo ogni secondo
  useEffect(() => {
    if (gameStarted && !gameOver) {
      const interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameStarted, gameOver]);

  // Funzione per gestire la pressione dei tasti per cambiare direzione
  function handleKeyDown(event) {
    switch (event.keyCode) {
      case 65: // Tasto A per sinistra
        if (direction !== "right") setDirection("left");
        break;
      case 87: // Tasto W per su
        if (direction !== "down") setDirection("up");
        break;
      case 68: // Tasto D per destra
        if (direction !== "left") setDirection("right");
        break;
      case 83: // Tasto S per giù
        if (direction !== "up") setDirection("down");
        break;
      default:
        return;
    }
  }

  //Funzione per riavviare il gioco
  function handleRestart() {
    setSnake([[0, 0]]);
    setFood([Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]);
    setDirection("right");
    setGameOver(false);
    setCurrentGame({
      gameId: "155d3957-1857-48f7-bcdc-9d56fce1712b",
      score: score, // punteggio iniziale
    });
    setScore(0);
    setTime(0);
  }

  //Effetto per salvare lo score a fine game
  useEffect(() => {
    if (gameOver) {
      saveScore();
    }
  }, [gameOver, saveScore]);

  return (
    <>
      {!gameStarted ? (
        <>
          <Container className="text-center py-5 border-top border-bottom bg-black">
            <button
              className="btn-vip rounded-3 p-3"
              onClick={handleStartClick}
            >
              Inizia partita
            </button>
          </Container>
        </>
      ) : (
        <div
          className="Snake my-3 pb-4 w-100"
          tabIndex="0"
          onKeyDown={handleKeyDown}
          ref={snakeRef}
        >
          {/* Visualizza il punteggio e il tempo */}
          <div className="Score text-black ps-2">
            Score: {score} Time: {time}
          </div>{" "}
          {/* Aggiungi pulsante per riavviare il gioco */}
          {gameOver ? (
            <>
              <Container className="text-center p-5 border-top border-bottom bg-black ">
                <div className="GameOver pb-2">Game Over</div>
                <button
                  className="btn-vip rounded-3 px-3 py-1"
                  onClick={handleRestart}
                >
                  Restart
                </button>
              </Container>
            </>
          ) : (
            <div className="Board mx-auto ">
              {Array.from({ length: 10 }).map((_, row) => (
                <div key={row} className="Row">
                  {Array.from({ length: 10 }).map((_, col) => (
                    <div
                      key={`${row}-${col}`}
                      className={`Cell ${
                        food[0] === row && food[1] === col ? "Food" : ""
                      } ${
                        snake.some((cell) => cell[0] === row && cell[1] === col)
                          ? "Snake"
                          : ""
                      }`}
                    ></div>
                  ))}
                </div>
              ))}
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      )}
    </>
  );
};

export default Snake;
