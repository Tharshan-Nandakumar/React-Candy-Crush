import { useState, useEffect } from "react";
import ScoreBoard from "./components/ScoreBoard";
import BlueCandy from "./Images/blue-candy.png";
import GreenCandy from "./Images/green-candy.png";
import OrangeCandy from "./Images/orange-candy.png";
import PurpleCandy from "./Images/purple-candy.png";
import RedCandy from "./Images/red-candy.png";
import YellowCandy from "./Images/yellow-candy.png";
import Blank from "./Images/blank.png";

const width = 8;
const candyColours = [
  BlueCandy,
  OrangeCandy,
  PurpleCandy,
  RedCandy,
  YellowCandy,
  GreenCandy,
];

const App = () => {
  const [currentColourArrangement, setCurrentColourArrangement] = useState([]);
  const [squareBeingDragged, setSquareBeingDragged] = useState(null);
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null);
  const [scoreDisplay, setScoreDisplay] = useState(0);

  const checkForColumnOfFour = () => {
    for (let i = 0; i <= 39; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColour = currentColourArrangement[i];
      const isBlank = currentColourArrangement[i] === Blank;

      if (
        columnOfFour.every(
          (square) =>
            currentColourArrangement[square] === decidedColour && !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 4);
        columnOfFour.forEach(
          (square) => (currentColourArrangement[square] = Blank)
        );
        return true;
      }
    }
  };

  const checkForColumnOfThree = () => {
    for (let i = 0; i <= 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColour = currentColourArrangement[i];
      const isBlank = currentColourArrangement[i] === Blank;

      if (
        columnOfThree.every(
          (square) =>
            currentColourArrangement[square] === decidedColour && !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 3);
        columnOfThree.forEach(
          (square) => (currentColourArrangement[square] = Blank)
        );
        return true;
      }
    }
  };

  const checkForRowOfFour = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 4];
      const decidedColour = currentColourArrangement[i];
      const isBlank = currentColourArrangement[i] === Blank;
      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55, 62, 63, 64,
      ];

      if (notValid.includes(i)) continue;

      if (
        rowOfFour.every(
          (square) =>
            currentColourArrangement[square] === decidedColour && !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 4);
        rowOfFour.forEach(
          (square) => (currentColourArrangement[square] = Blank)
        );
        return true;
      }
    }
  };

  const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidedColour = currentColourArrangement[i];
      const isBlank = currentColourArrangement[i] === Blank;
      const notValid = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
      ];

      if (notValid.includes(i)) continue;

      if (
        rowOfThree.every(
          (square) =>
            currentColourArrangement[square] === decidedColour && !isBlank
        )
      ) {
        setScoreDisplay((score) => score + 3);
        rowOfThree.forEach(
          (square) => (currentColourArrangement[square] = Blank)
        );
        return true;
      }
    }
  };

  const moveIntoSquareBelow = () => {
    for (let i = 0; i < 64 - width; i++) {
      const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = firstRow.includes(i);

      if (isFirstRow && currentColourArrangement[i] === Blank) {
        let randomNumber = Math.floor(Math.random() * candyColours.length);
        currentColourArrangement[i] = candyColours[randomNumber];
      }

      if (currentColourArrangement[i + width] === Blank) {
        currentColourArrangement[i + width] = currentColourArrangement[i];
        currentColourArrangement[i] = Blank;
      }
    }
  };

  const dragStart = (e) => {
    setSquareBeingDragged(e.target);
  };

  const dragDrop = (e) => {
    setSquareBeingReplaced(e.target);
  };

  const dragEnd = () => {
    const squareBeingDraggedId = parseInt(
      squareBeingDragged.getAttribute("data-id")
    );
    const squareBeingReplacedId = parseInt(
      squareBeingReplaced.getAttribute("data-id")
    );

    currentColourArrangement[squareBeingReplacedId] =
      squareBeingDragged.getAttribute("src");
    currentColourArrangement[squareBeingDraggedId] =
      squareBeingReplaced.getAttribute("src");

    const validMoves = [
      squareBeingDraggedId - 1,
      squareBeingDraggedId - width,
      squareBeingDraggedId + 1,
      squareBeingDraggedId + width,
    ];

    const validMove = validMoves.includes(squareBeingReplacedId);

    const isAColumnOfFour = checkForColumnOfFour();
    const isARowOfFour = checkForRowOfFour();
    const isARowOfThree = checkForRowOfThree();
    const isAColumnOfThree = checkForColumnOfThree();

    if (
      squareBeingReplacedId &&
      validMove &&
      (isAColumnOfFour || isAColumnOfThree || isARowOfFour || isARowOfThree)
    ) {
      setSquareBeingDragged(null);
      setSquareBeingReplaced(null);
    } else {
      currentColourArrangement[squareBeingReplacedId] =
        squareBeingReplaced.getAttribute("src");
      currentColourArrangement[squareBeingDraggedId] =
        squareBeingDragged.getAttribute("src");
      setCurrentColourArrangement([...currentColourArrangement]);
    }
  };

  const createBoard = () => {
    const randomColourArrangement = [];
    for (let i = 0; i < width * width; i++) {
      const randomColour =
        candyColours[Math.floor(Math.random() * candyColours.length)]; //random colour from colours array
      randomColourArrangement.push(randomColour);
    }
    setCurrentColourArrangement(randomColourArrangement);
  };

  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      checkForColumnOfFour();
      checkForRowOfFour();
      checkForColumnOfThree();
      checkForRowOfThree();
      moveIntoSquareBelow();
      setCurrentColourArrangement([...currentColourArrangement]);
    }, 100);
    return () => clearInterval(timer);
  }, [
    checkForColumnOfFour,
    checkForRowOfFour,
    checkForColumnOfThree,
    checkForRowOfThree,
    moveIntoSquareBelow,
    currentColourArrangement,
  ]);

  console.log(currentColourArrangement);
  return (
    <div className="app">
      <ScoreBoard score={scoreDisplay} />
      <div className="game">
        {currentColourArrangement.map((candyColour, index) => (
          <img
            key={index}
            src={candyColour}
            alt={candyColour}
            data-id={index}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={(e) => e.preventDefault()}
            onDragLeave={(e) => e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
