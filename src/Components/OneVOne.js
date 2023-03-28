import React, { useEffect, useState } from "react";
import axios from "axios";
import "./OneVOne.css";
import { ResultModal } from "./ResultModal";

function OneVOne() {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [stat_category, setStatCategory] = useState("");
  const [playerPhoto, setPlayerPhoto] = useState([]);
  const [resultModal, setResultModal] = useState(false);
  const [result, setResult] = useState("")

  const categories = ["PTS", "REB", "AST"];

  const handlePlayer1Change = (event) => {
    setPlayer1(event.target.value);
  };

  const handlePlayer2Change = (event) => {
    setPlayer2(event.target.value);
  };

  const statCategoryChange = (event) => {
    let value = event.target.value;
    setStatCategory(value);
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/players")
      .then((response) => {
        const playersWithPhoto = Object.values(response.data).map((player) => {
          let name = player.name;
          const photo = player.photo
            ? require(`../assets/${player.photo}`)
            : null;
          return { name, photo };
        });
        setPlayerPhoto(playersWithPhoto);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function getResults() {
    axios
      .get(
        `http://127.0.0.1:5000/compare-players?player1_name=${player1}&player2_name=${player2}&stat_category=${stat_category}`,
        {
          params: {
            player1: player1,
            player2: player2,
            stat_category: stat_category,
          },
        }
      )
      .then((response) => {
        const results = response.data.result;
        console.log(results)
        setResult(results)

      })
      .catch((err) => {
        console.log(err);
      });
  }
  console.log(getResults())




  return (
    <>
      <div className="input-container">
        <div className="input-one">
          <select onChange={handlePlayer1Change}>
            {Object.values(playerPhoto).map((player, index) => (
              <option key={index}>{player.name}</option>
            ))}
          </select>
        </div>
        <div>
          {player1 && (
            <img
              src={
                playerPhoto.find((player, index) => player.name === player1)
                  ?.photo
              }
              alt={`${player1}`}
            />
          )}
        </div>
        <div className="input-two">
          {player2 && (
            <img
              src={playerPhoto.find((player) => player.name === player2)?.photo}
              alt={`${player2}`}
            />
          )}
        </div>
        <div>
          <select onChange={handlePlayer2Change}>
            {Object.values(playerPhoto).map((player, index) => (
              <option key={index}>{player.name}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="stat-input">
        <select onChange={statCategoryChange}>
          {categories.map((stat, index) => (
            <option key={stat}>{stat}</option>
          ))}
        </select>
      </div>
      <div className="face-off">
        <button className="face-off-button" onClick={() => {setResultModal(prev => !prev)}}>
          Face Off
        </button>
        {resultModal && <ResultModal closeResultModal={setResultModal} result={result}/>}

      </div>
    </>
  );
}

export default OneVOne;