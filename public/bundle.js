(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var shipsLocation = ['A1', 'A2', 'A3', 'A4', 'F1', 'F2', 'F3', 'F4', 'D5', 'E5', 'F5', 'G5', 'I5'];

var Game = function () {
    function Game() {
        _classCallCheck(this, Game);

        this.loc = [];
        this.subLoc = [];
        this.counter = 0; //TODO: remove it
    }

    _createClass(Game, [{
        key: 'hasBeenHit',
        value: function hasBeenHit(shot) {
            var missHit = this.subLoc.filter(function (ele) {
                return ele === shot;
            }).length === 0 ? 'miss' : 'hit';
            if (missHit === 'hit') {
                this.loc = this.loc.filter(function (ele) {
                    return ele !== shot;
                });
                ++this.counter;
                console.log(this.counter);
            }
            return this.checkifWin(missHit);
        }
    }, {
        key: 'checkifWin',
        value: function checkifWin(missHit) {
            return this.counter === 13 ? 'winner' : missHit;
        }
    }, {
        key: 'getShip',
        value: function getShip(loc, startC, start, shipSize, isHorizontal, count) {
            var ship = [];
            var fit = start + shipSize < 10 ? 1 : -1;
            if (isHorizontal && count < 3) {
                for (var i = 0; i < shipSize; i++) {
                    loc.map(function (_ref) {
                        var _ref2 = _slicedToArray(_ref, 1),
                            e = _ref2[0];

                        return e.toString() == [startC[0] + i * fit, startC[1]].toString();
                    }).filter(function (e) {
                        return e == true;
                    }).length == 0 ? ship.push([startC[0] + i * fit, startC[1]]) : this.checkifWingetShip(loc, startC, startC[1], shipSize, false, count++);
                }
            } else if (!isHorizontal && count < 3) {
                for (var i = 0; i < shipSize; i++) {
                    loc.map(function (_ref3) {
                        var _ref4 = _slicedToArray(_ref3, 1),
                            e = _ref4[0];

                        return e.toString() == [startC[0], startC[1] + i * fit].toString();
                    }).filter(function (e) {
                        return e == true;
                    }).length == 0 ? ship.push([startC[0], startC[1] + i * fit]) : this.getShip(loc, startC, startC[0], shipSize, true, count++);
                }
            } else {
                return [];
            }
            return ship;
        }
    }, {
        key: 'convertToCoordenates',
        value: function convertToCoordenates(ship) {
            return ship.map(function (coor) {
                return String.fromCharCode(65 + coor[0]) + coor[1];
            });
        }
    }, {
        key: 'getStartLocation',
        value: function getStartLocation() {
            var startLocation = Math.floor(Math.random() * 100);
            return startLocation % 10 !== 0 || startLocation === 100 ? startLocation : startLocation + 1;
        }
    }, {
        key: 'startGame',
        value: function startGame() {
            var _this = this;

            var loc = [];
            [4, 4, 5].forEach(function (shipSize) {
                do {
                    var startLocation = _this.getStartLocation(); //give me a number between 1-100
                    var startCell = [Math.floor(startLocation / 10), Math.floor(startLocation % 10)]; //get the cell never 0
                    var isHorizontal = !!Math.floor(Math.random() * 2); // false or tru
                    var start = isHorizontal ? startCell[0] : startCell[1]; //get the 
                    var ship = _this.getShip(loc, startCell, start, shipSize, isHorizontal, 1);
                } while (ship.length === 0);
                _this.loc.push(_this.convertToCoordenates(ship));
            });
            this.loc = this.loc.join().split(',');
            this.subLoc = JSON.parse(JSON.stringify(this.loc));
        }
    }]);

    return Game;
}();

exports.default = Game;

},{}],2:[function(require,module,exports){
'use strict';

var _Game = require('./Game');

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.onload = function () {
    var game = void 0;

    var getCellsClicked = function getCellsClicked(_ref) {
        var target = _ref.target;

        if (target.nodeName.toLocaleLowerCase() !== 'td') return;
        var row = target.parentElement;
        var collumn = row.parentElement;
        var listRows = [].slice.call(row.children).filter(function (_ref2) {
            var classList = _ref2.classList;
            return !classList.contains('header');
        });
        var listCollumns = [].slice.call(collumn.children).filter(function (_ref3) {
            var classList = _ref3.classList;
            return !classList.contains('header');
        });
        var xCor = listRows.indexOf(target);
        var yCor = listCollumns.indexOf(row);

        if (xCor === -1 || yCor === -1) return;

        var cordenate = String.fromCharCode(65 + xCor) + yCor;
        switch (game.hasBeenHit(cordenate)) {
            case 'winner':
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
    document.getElementById('startTheGame').addEventListener('click', function () {
        game = new _Game2.default();
        game.startGame();
        console.log(game.loc);
        document.getElementById('board').addEventListener('click', getCellsClicked);
    });
};

},{"./Game":1}]},{},[2]);
