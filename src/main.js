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



