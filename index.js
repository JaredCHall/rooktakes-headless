import {Game} from "./dist/src/Game/Game.js";
import {PgnFile} from "./dist/src/PgnFile/PgnFile.js";

const game = Game.makeNewGame();
game.setInputType('Coordinate')
game.makeMove('e2e4');
game.makeMove('e7e5');
game.setResigns('white');

const file = PgnFile.make(game)
console.log(file.content);