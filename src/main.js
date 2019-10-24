// Board 



const board = () => {

    const grid = () => {
        return Array.from(document.getElementsByClassName('t'));
    };

    const getId = (el) => {
        return Number.parseInt(el.id[1]);
    };

    return { grid, getId };

};

const createPlayer = (mark, name) => {
    return {mark, name};
}


const game = () => {
    let turn = true;
    const newGame = board();
    let playerOne = createPlayer('x', 'Player One');
    let playerTwo = createPlayer('o', 'Player Two');


    const playerTurn = (index, markPlayer) => {
        return newGame.grid()[index].innerText = markPlayer;
    };





    const playerTurns = ($event) => {
        if (turn == true) {
            playerTurn(newGame.getId($event.target), playerOne.mark);
            turn = false;
        }else {
            playerTurn(newGame.getId($event.target), playerTwo.mark);
            turn = true;
        }
    }



    const playerOneListen = () => {
        newGame.grid().forEach(el => el.addEventListener('click', playerTurns) );
    };


    return{ playerOneListen  };
};

let launch = game();

launch.playerOneListen();

