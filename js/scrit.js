document.getElementById("play-btn").addEventListener("click", startGame);

let clickedCells = [];
let bombs = [];
let maxClicks;

// Funzione principale del gioco
function startGame() {
  const level = document.getElementById("level").value;
  let gridSize;
  let cellSize;
  switch (level) {
    case "1":
      gridSize = 100;
      cellSize = 10;
      break;
    case "2":
      gridSize = 81;
      cellSize = 9;
      break;
    case "3":
      gridSize = 49;
      cellSize = 7;
      break;
    default:
      gridSize = 100;
      cellSize = 10;
      break;
  }
  console.log(gridSize);

  //   Generare le bombe
  bombs = generateBombs(gridSize);
  console.log(bombs);

  // Risettare l'array delle celle cliccate
  clickedCells = [];

  // Ricalcolo il numero massimo di tentativi
  maxClicks = gridSize - bombs.length;
  console.log(maxClicks);

  document.getElementById("title").classList.add("hidden");

  const gridElem = document.getElementById("grid");
  gridElem.innerHTML = "";
  gridElem.classList.remove("hidden");

  for (let i = 1; i <= gridSize; i++) {
    const newCell = createGridCell(i, cellSize);
    // newCell.addEventListener("click", function() {
    //   handleCellClick(this, bombs);
    // });
    newCell.addEventListener("click", handleCellClick);
    gridElem.append(newCell);
  }
}

/********************************
 * NON PURE FUNCTION - GAME SPECIFIC
 ************************/
// Non pure function, perché all'interno usa le variabili globali
function handleCellClick() {
  const clickedNumber = parseInt(this.textContent);
  if(bombs.includes(clickedNumber)) {
    this.classList.add("bomb");
    endGame("loose");
  } else {
    this.classList.add("clicked");
    if(!clickedCells.includes(clickedNumber)) {
      console.log("Conto questo numero");
      clickedCells.push(clickedNumber);
    }
    if(clickedCells.length === maxClicks) {
      endGame("win");
    }
  }
}

function endGame(result) {
  // Stampa del punteggio
  const titleElem = document.getElementById("title")
  titleElem.innerHTML = "Il tuo punteggio è " + clickedCells.length;
  titleElem.classList.remove("hidden");

  // Rimozione del click dalle celle
  const allCells = document.querySelectorAll(".square");
  for(let i = 0; i < allCells.length; i++) {
    const curCell = allCells[i];
    // curCell.style.pointerEvents = "none";
    curCell.removeEventListener("click", handleCellClick);
  }

  if(result === "loose") {
    // Scoprire le bombe
    for(let i = 0; i < allCells.length; i++) {
      const curCell = allCells[i];
      const curNumber = parseInt(curCell.textContent);
      if(bombs.includes(curNumber)) {
        curCell.classList.add("bomb");
      }
    }
    console.log("Hai perso");
  } else {
    console.log("Hai vinto");
  }
}

/*****************************
 * FUNCTIONS
 *****************************/

/**
 * Questa funzione genera una cella della griglia
 * @param {number} innerNumber il numero che deve essere inserito nella cella
 * @returns {any} HTML element che rappresenta la cella
 */
function createGridCell(innerNumber, cellSize) {
  const cell = document.createElement("div");
  cell.classList.add("square");
  cell.style.width = `calc(100% / ${cellSize})`;
  cell.style.height = `calc(100% / ${cellSize})`;
  cell.innerHTML = `<span>${innerNumber}</span>`;
  return cell;
}
// Test
// console.log(createGridCell(23));
// Passaggio con parametri
// function handleCellClick(clickedCell, bombsArray) {
//   console.log(clickedCell);
//   const clickedNumber = parseInt(clickedCell.textContent);
//   console.log(clickedNumber);
//   console.log(bombsArray);
// }

/**
 * Genera un numero random
 * @param {any} min
 * @param {any} max
 * @returns {any}
 */
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Genera array di 16 numeri casuali senza ripetizioni compresi tra 1 e max
 * @param {number} max
 * @returns {Array}
 */
function generateBombs(max) {
  const result = [];
  while (result.length < 16) {
    const rndNum = getRndInteger(1, max);
    if (!result.includes(rndNum)) {
      result.push(rndNum);
    }
  }
  return result;
}

// console.log(generateBombs(25));
