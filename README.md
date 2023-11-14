# Rook Takes - Headless
Headless Chess Package for NPM - Wire up your own user interface or AI


# Development

`npm run test:unit` - test against source typescript files

`npm run test:integration` - test against compiled ES modules

`npm run test:watch` - run all tests in vitest ui

`npm run build` - build /dist ES modules


# Usage


### Installation

`npm install mynpmaccount/rooktakes-headless`

### Play Game

```
import {Game} from @mynpmaccount/rooktakes-headless/Game;

const fenNumber = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
const game = new Game(fenNumber);

game.setNotationType('SAN'); // switch from default coordinate notation to standard algebraic notation

game.makeMove('e4'); // white pawn to e4
game.makeMove('e5'); // black pawn to e5
game.makeMove('Ke2'); // white king to e2
game.makeMove('Ke7'); // black king to e7

```


