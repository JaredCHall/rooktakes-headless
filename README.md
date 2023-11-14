# Rook Takes - Headless
Headless Chess Package for NPM - Wire up your own user interface or AI


# Development

`npm run test:unit` - run the unit tests

`npm run test:integration` - select tests against compiled ES modules and benchmarking

`npm run test:watch` - run all tests in browser GUI with `vitest --ui`

`npm run build` - build /dist ES modules

# Usage

### Installation

`npm install mynpmaccount/rooktakes-headless`

### Play Game

```
import {Game} from @mynpmaccount/rooktakes-headless/Game;

const game = Game.makeNewGame();

game.setEventDate(new Date('2021-11-01'))
game.setPlayer('white', 'Magnus Carlsen', 2881)
game.setPlayer('black', 'Hikaru Nakamura', 2829)
game.setEventName('Magnus Carlsen Invitational 2021')
game.setEventRound(10)

game.makeMove('e4')
game.makeMove('e5')
game.makeMove('Ke2')
game.makeMove('Ke7')

```


