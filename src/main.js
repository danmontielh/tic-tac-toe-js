// Board
const grid = () => {
  return Array.from(document.getElementsByClassName('t'));
};

const board = () => {
  const getId = el => Number.parseInt(el.id[1], 10);

  return { getId };
};

const createPlayer = (mark, name) => {
  return { mark, name };
};

const restartGame = document.querySelector('button');
const setPlayerName = document.querySelector('a');

const totalMoves = 0;

const gameEngine = () => {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];

  const getElementsAll = (arr) => {
    return arr.every((el) => {
      return el.innerText === arr[0].innerText && el.innerText !== '';
    });
  };

  const endGame = (comboWin) => {
    comboWin.forEach((el) => {
      el.classList.add('winner');
    });
  };

  const winGame = (disable) => {
    let victory = false;
    winningCombos.forEach((combo) => {
      const _grid = grid();
      const getClassCombo = [_grid[combo[0]], _grid[combo[1]], _grid[combo[2]]];
      if (getElementsAll(getClassCombo)) {
        victory = true;
        endGame(getClassCombo);
        disable();
        const winner = document.getElementById('player').innerText;
        const msg = confirm(winner + ' win this game! Do you want to play again?');
        if (msg === true) {
          window.location.reload();
        }
      }
    });
  };

  const playerTurn = (index, markPlayer) => {
    grid()[index].style.pointerEvents = 'none';
    grid()[index].innerText = markPlayer;
  };

  return { playerTurn, winGame, totalMoves };
};


const runGame = () => {
  let turn = true;
  const newGame = board();
  const game = gameEngine();
  const playerOne = createPlayer('x', document.getElementById('playerOne').value);
  const playerTwo = createPlayer('o', document.getElementById('playerTwo').value);

  const PlayerEnd = () => {
    grid().forEach((el) => {
      return el.removeEventListener('click', playerTurns);
    });
  };

  const playerTurns = ($event) => {
    if (turn === true) {
      game.playerTurn(newGame.getId($event.target), playerOne.mark);
      turn = false;
      if (!game.winGame(PlayerEnd)) {
        document.getElementById('player').innerText = playerTwo.name;
        document.getElementById('player').style.color = 'red';
      }
    } else {
      game.playerTurn(newGame.getId($event.target), playerTwo.mark);
      turn = true;
      if (!game.winGame(PlayerEnd)) {
        document.getElementById('player').innerText = playerOne.name;
        document.getElementById('player').style.color = 'skyblue';
      }
    }
    if (++game.totalMoves === 9 && !game.winGame(PlayerEnd)) {
      document.getElementById('info').innerHTML += `<div class='alert alert-warning' role='alert'>It's tie! </div>`;
    }
  };

  const playerOneListen = () => {
    grid().forEach((el) => {
      return el.addEventListener('click', playerTurns);
    });
  };

  return { playerOneListen };
};

restartGame.addEventListener('click', () => {
  window.location.reload();
});

setPlayerName.addEventListener('click', () => {
  document.getElementById('displayPlayerName').style.display = 'block';
  document.getElementById('start').style.display = 'none';
  const launch = runGame();
  launch.playerOneListen();
});