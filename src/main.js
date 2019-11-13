// Board
const grid = () => {
  return Array.from(document.getElementsByClassName("t"));
};

const board = () => {
  const getId = el => {
    return Number.parseInt(el.id[1]);
  };

  return { getId };
};

const createPlayer = (mark, name) => {
  return { mark, name };
};

let newGame = document.querySelector('button');

const gameEngine = () => {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
  ];

  const getElementsAll = arr =>
    arr.every(el => el.innerText === arr[0].innerText && el.innerText !== "");

  const endGame = comboWin => {
    comboWin.forEach(el => {
      el.classList.add("winner");
    });
  };

  const winGame = disable => {
    let victory = false;
    winningCombos.forEach(combo => {
      const _grid = grid();
      const getClassCombo = [_grid[combo[0]], _grid[combo[1]], _grid[combo[2]]];
      if (getElementsAll(getClassCombo)) {
        victory = true;
        endGame(getClassCombo)
        disable();
        const winner = document.getElementById("player").innerText;
        const msg = confirm(winner + ' win this game! Do you want to play again?');
        if (msg === true) {
          window.location.reload();
        }
      }
    });
  };

  const playerTurn = (index, markPlayer) => {
    grid()[index].style.pointerEvents = "none";
    grid()[index].innerText = markPlayer;
  };

  return { playerTurn, winGame };
};

const runGame = () => {
  let turn = true;
  const newGame = board();
  const game = gameEngine();
  let playerOne = createPlayer("x", "Player One");
  let playerTwo = createPlayer("o", "Player Two");

  const playerTurns = $event => {
    if (turn == true) {
      game.playerTurn(newGame.getId($event.target), playerOne.mark);
      turn = false;
      if (!game.winGame(PlayerEnd)) {
        document.getElementById("player").innerText = playerTwo.name;
      }
    } else {
      game.playerTurn(newGame.getId($event.target), playerTwo.mark);
      turn = true;
      if (!game.winGame(PlayerEnd)) {
        document.getElementById("player").innerText = playerOne.name;
      }
    }
  };

  const playerOneListen = () => {
    grid().forEach(el => el.addEventListener("click", playerTurns));
  };

  const PlayerEnd = () => {
    grid().forEach(el => el.removeEventListener("click", playerTurns));
  };

  return { playerOneListen };
};

newGame.addEventListener('click', () => {
	window.location.reload();
});

let launch = runGame();

launch.playerOneListen();
