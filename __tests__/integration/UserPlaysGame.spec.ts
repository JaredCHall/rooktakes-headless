import {describe, it, expect} from 'vitest'

//@ts-ignore
import {Game} from "@compiled/Game/Game";
//@ts-ignore
import {PgnFile} from "@compiled/PgnFile/PgnFile";

describe('UserPlaysGame', () => {

    it('works', () => {
        const game = Game.makeNewGame();
        game.setInputType('Coordinate')
        game.makeMove('e2e4');
        game.makeMove('d7d5');
        game.makeMove('e4d5')
        game.setResigns('black');

        expect(game.gameResult.winner).toEqual('white')

        const file = PgnFile.make(game)

        expect(file.content).toEqual(`[Event "Casual Game"]
[Site "Sol System"]
[Date "2023.11.12"]
[Round "1"]
[Result "1-0"]
[Termination "Normal"]
[White "White"]
[Black "Black"]
[WhiteElo "?"]
[BlackElo "?"]

1. e4 d5
2. exd5`)

    })

})