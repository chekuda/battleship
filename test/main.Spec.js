'use strict';

import Game from '../static/Game';

describe('BattleShip', () => {
	var game;

	beforeEach(() => {
		game = new Game();
	});
	it('player miss the shot', ()=> {
		expect(game.hasBeenHit('A5')).toEqual('miss');
	});
	it('player hit the ship', () => {
		expect(game.hasBeenHit('A1')).toEqual('hit');
	});
	it('player hit all the locations for every ship', () => {
		let listofShots = ['A1','A2','A3','A4','F1','F2','F3','F4','D5','E5','F5','G5','I5'];
		let allMisstHits = listofShots.map(e => game.hasBeenHit(e));

		expect(allMisstHits.filter(e => e === 'winner').length).toEqual(1);
	});
	it('hit start the game, the ships are located', () =>{
		game.starGame();

		expect(game.loc.length).toEqual(13);
	})
})