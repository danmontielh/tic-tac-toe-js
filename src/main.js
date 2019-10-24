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

const grid = () => Array.from(document.getElementsByClassName("q"));

const qNumId = qEl => {
  return Number.parseInt(qEl.id[1]);
};
const emtyQs = () => grid().filter(_qEl => _qEl.innerText === "");
const allSame = arr =>
  arr.every(
    _qEl => _qEl.innerText === arr[0].innerText && _qEl.innerText !== ""
  );

const takeTurn = (index, letter) => {
  return (grid()[index].innerText = letter);
};

const oponentChoice = () => {
  return qNumId(emtyQs()[Math.floor(Math.random() * emtyQs().length)]);
};

const endGame = winningSequence => {
  winningSequence.forEach(_qEl => {
    _qEl.classList.add("winner");
  });
  disableListeners();
};

const checkForVictory = () => {
  let victory = false;

  winningCombos.forEach(_c => {
    const _grid = grid();
    const sequence = [_grid[_c[0]], _grid[_c[1]], _grid[_c[2]]];
    if (allSame(sequence)) {
      victory = true;
      endGame(sequence);
    }
  });
};

const oponentTurn = () => {
  disableListeners();
  setTimeout(() => {
    takeTurn(oponentChoice(), "o");
    if (!checkForVictory()) {
      enableListeners();
    }
  }, 1000);
};
const clickfn = $event => {
  takeTurn(qNumId($event.target), "x");
  if (!checkForVictory()) {
    oponentTurn();
  }
};

const enableListeners = () => {
  grid().forEach(_qE1 => _qE1.addEventListener("click", clickfn));
};
const disableListeners = () => {
  grid().forEach(_qE1 => _qE1.removeEventListener("click", clickfn));
};

enableListeners();
