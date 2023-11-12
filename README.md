# Rook Takes - Headless
Headless Chess Package for NPM - Wire up your own user interface or AI


# Usage


### Installation

`npm install mynpmaccount/rooktakes-headless`

### Playing a Game

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

# Development

`npm run build` - build /dist ES modules

`npm run test` - test against source typescript files

`npm run dist-test` - test against compiled ES modules

`npm run publish` - publish latest changes to npm

