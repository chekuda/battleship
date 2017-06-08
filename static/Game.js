var shipsLocation = ['A1', 'A2', 'A3', 'A4', 'F1', 'F2', 'F3', 'F4', 'D5', 'E5', 'F5', 'G5', 'I5'];
class Game {
    constructor() {
        this.loc = [];
        this.subLoc = [];
        this.counter = 0; //TODO: remove it
    }
    hasBeenHit(shot) {
        const missHit = this.subLoc.filter(ele => ele === shot).length === 0 ? 'miss' : 'hit';
        if (missHit === 'hit') {
            this.loc = this.loc.filter(ele => ele !== shot);
            ++this.counter;
            console.log(this.counter);
        }
        return this.checkifWin(missHit);
    }
    checkifWin(missHit) {
        return (this.counter === 13) ? 'winner' : missHit;
    }
    getShip(loc, startC, start, shipSize, isHorizontal, count) {
        var ship = [];
        var fit = (start + shipSize < 10) ? 1 : -1;
        if (isHorizontal && count < 3) {
            for (var i = 0; i < shipSize; i++) {
                (loc.map(([e]) => e.toString() == [startC[0] + (i * fit), startC[1]].toString())
                    .filter(e => e == true).length) == 0 ?
                    ship.push([startC[0] + (i * fit), startC[1]]) : this.checkifWingetShip(loc, startC, startC[1], shipSize, false, count++);
            }
        } else if (!isHorizontal && count < 3) {
            for (var i = 0; i < shipSize; i++) {
                (loc.map(([e]) => e.toString() == [startC[0], startC[1] + (i * fit)].toString())
                    .filter(e => e == true).length) == 0 ?
                    ship.push([startC[0], startC[1] + (i * fit)]) : this.getShip(loc, startC, startC[0], shipSize, true, count++);
            }
        } else {
            return [];
        }
        return ship;
    }
    convertToCoordenates(ship) {
        return ship.map(coor => String.fromCharCode(65 + coor[0]) + coor[1])
    }
    getStartLocation() {
        let startLocation = Math.floor(Math.random() * 100);
        return (startLocation % 10 !== 0 || startLocation === 100) ? startLocation : startLocation + 1;
    }
    startGame() {
        let loc = [];
        [4, 4, 5].forEach(shipSize => {
            do {
                var startLocation = this.getStartLocation(); //give me a number between 1-100
                var startCell = [Math.floor(startLocation / 10), Math.floor(startLocation % 10)]; //get the cell never 0
                var isHorizontal = !!Math.floor(Math.random() * 2); // false or tru
                var start = isHorizontal ? startCell[0] : startCell[1]; //get the 
                var ship = this.getShip(loc, startCell, start, shipSize, isHorizontal, 1);
            } while (ship.length === 0)
            this.loc.push(this.convertToCoordenates(ship));
        })
        this.loc = this.loc.join().split(',');
        this.subLoc = JSON.parse(JSON.stringify(this.loc));
    }

}
export default Game;