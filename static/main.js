import Game from './Game'

window.onload = () => {
    let game;

    const getCellsClicked = ({ target }) => {
        if (target.nodeName.toLocaleLowerCase() !== 'td') return;
        const row = target.parentElement;
        const collumn = row.parentElement;
        const listRows = [].slice.call(row.children).filter(({ classList }) => !classList.contains('header'));
        const listCollumns = [].slice.call(collumn.children).filter(({ classList }) => !classList.contains('header'));
        const xCor = listRows.indexOf(target);
        const yCor = listCollumns.indexOf(row);

        if (xCor === -1 || yCor === -1) return;

        const cordenate = String.fromCharCode(65 + xCor) + yCor;
        switch (game.hasBeenHit(cordenate)) {
            case 'winner':
                target.style.backgroundColor = 'red';
                alert('WELL DONE');
                break;
            case 'hit':
                target.style.backgroundColor = 'red';
                break;
            case 'miss':
                target.style.backgroundColor = 'blue';
                break;
        }
        console.log('Coordenate', cordenate);
    };
    document.getElementById('startTheGame').addEventListener('click', () => {
        game = new Game();
        game.startGame();
        console.log(game.loc);
        document.getElementById('board').addEventListener('click', getCellsClicked);
    });
}