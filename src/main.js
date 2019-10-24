// Board 
const grid = () => {
    return Array.from(document.getElementsByClassName('t'));
};



const board = () => {

   

    const getId = (el) => {
        return Number.parseInt(el.id[1]);
    };

    return { getId };

};

const createPlayer = (mark, name) => {
    return {mark, name};
}



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

      const getElementsAll = (arr) => arr.forEach((el) => {return el.innerText });


      const winGame = () => {
          let victory = false;
            winningCombos.forEach((combo) => {
                const _grid = grid();
                const getClassCombo = [_grid[combo[0]],_grid[combo[1]], _grid[combo[2]] ];
                if (getElementsAll(getClassCombo)) {
                    victory = true;
                }
            });
      };


    const playerTurn = (index, markPlayer) => {
        return grid()[index].innerText = markPlayer;
    };

    return { playerTurn, winGame};


};





const runGame = () => {

    

    let turn = true;
    const newGame = board();
    const game = gameEngine();
    let playerOne = createPlayer('x', 'Player One');
    let playerTwo = createPlayer('o', 'Player Two');


    

    const playerTurns = ($event) => {
        if (!game.winGame()) {
            if (turn == true) {
                game.playerTurn(newGame.getId($event.target), playerOne.mark );
                turn = false;    
    
            }else {
                game.playerTurn(newGame.getId($event.target), playerTwo.mark);
                turn = true;
            }
        }
    }



    const playerOneListen = () => {
        grid().forEach(el => el.addEventListener('click', playerTurns) );
    };


    return{ playerOneListen  };
};

let launch = runGame();

launch.playerOneListen();


