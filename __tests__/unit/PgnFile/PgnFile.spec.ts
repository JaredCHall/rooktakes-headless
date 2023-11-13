import { describe, it, expect } from 'vitest'
import {PgnFile} from "@chess/PgnFile/PgnFile";
import {Game} from "@chess/Game/Game";
import {Player} from "../../../ts/src/Player";

describe('PgnFile' , () => {

    it('constructs itself' , () => {
        const file = new PgnFile()
        expect(file.content).toEqual('')
    })


    it('it creates PGN file of a Scholars Mate' , () => {

        const game = Game.makeNewGame()
        game.setInputType('Coordinate')
        game.setEventDate(new Date(0))

        game.makeMove('e2 e4')
        game.makeMove('e7 e5')

        game.makeMove('b1 c3')
        game.makeMove('d8 f6')

        game.makeMove('f1 c4')
        game.makeMove('f8 c5')

        game.makeMove('d2 d3')
        game.makeMove('f6 f2')

        const file = PgnFile.make(game)
        expect(file.content).toEqual(`[Event "Casual Game"]
[Site "Sol System"]
[Date "1969.12.31"]
[Round "1"]
[Result "0-1"]
[Termination "Normal"]
[White "White"]
[Black "Black"]
[WhiteElo "?"]
[BlackElo "?"]

1. e4 e5
2. Nc3 Qf6
3. Bc4 Bc5
4. d3 Qxf2#
`)



    })

    it('it creates PGN file of a Scholars Mate using SAN for moves' , () => {

        const game = Game.makeNewGame()
        game.setEventDate(new Date(0))

        game.makeMove('e4')
        game.makeMove('e5')

        game.makeMove('Nc3')
        game.makeMove('Qf6')

        game.makeMove('Bc4')
        game.makeMove('Bc5')

        game.makeMove('d3')
        game.makeMove('Qxf2')

        const file = PgnFile.make(game)
        expect(file.content).toEqual(`[Event "Casual Game"]
[Site "Sol System"]
[Date "1969.12.31"]
[Round "1"]
[Result "0-1"]
[Termination "Normal"]
[White "White"]
[Black "Black"]
[WhiteElo "?"]
[BlackElo "?"]

1. e4 e5
2. Nc3 Qf6
3. Bc4 Bc5
4. d3 Qxf2#
`)



    })

    it('it marks result for draws' , () => {
        const game = Game.makeNewGame()
        game.setEventDate(new Date(0))

        game.setPlayer(new Player('white','player 1',2000))
        game.setPlayer(new Player('black','player 2',2400))

        game.setDraw();

        const file = PgnFile.make(game)
        expect(file.content).toEqual(`[Event "Casual Game"]
[Site "Sol System"]
[Date "1969.12.31"]
[Round "1"]
[Result "1/2-1/2"]
[Termination "Normal"]
[White "player 1"]
[Black "player 2"]
[WhiteElo "2000"]
[BlackElo "2400"]

`      )
    })

    it('it marks result for game not finished' , () => {
        const game = Game.makeNewGame()
        game.setEventDate(new Date(0))

        const file = PgnFile.make(game)
        expect(file.content).toEqual(`[Event "Casual Game"]
[Site "Sol System"]
[Date "1969.12.31"]
[Round "1"]
[Result "*"]
[White "White"]
[Black "Black"]
[WhiteElo "?"]
[BlackElo "?"]

`      )
    })

    it('it marks result for time forfeit' , () => {
        const game = Game.makeNewGame()
        game.makeMove('Nf3')
        game.setEventDate(new Date(0))
        game.setOutOfTime('black')

        const file = PgnFile.make(game)
        expect(file.content).toEqual(`[Event "Casual Game"]
[Site "Sol System"]
[Date "1969.12.31"]
[Round "1"]
[Result "1-0"]
[Termination "Time Forfeit"]
[White "White"]
[Black "Black"]
[WhiteElo "?"]
[BlackElo "?"]

1. Nf3
`      )
    })
})