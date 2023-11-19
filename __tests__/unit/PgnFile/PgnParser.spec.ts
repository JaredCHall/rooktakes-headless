import { describe, it, expect } from 'vitest'
import {PgnParser} from "@chess/PgnFile/PgnParser";
import {MoveHistory} from "@chess/Move/MoveHistory";

describe('PgnParser', () => {

    it('it parses game', () => {

        const fileContent = `[Event "Magnus Carlsen Invitational 2021"]
[Site "Alpha Centauri"]
[Date "2021.10.01"]
[Round "10"]
[Result "1/2-1/2"]
[Termination "Normal"]
[White "Magnus Carlsen"]
[Black "Hikaru Nakamura"]
[WhiteElo "2881"]
[BlackElo "2829"]

1. e4 e5
2. Ke2 Ke7
3. Ke1 Ke8
4. Ke2 Ke7
5. Ke1 Ke8
6. Ke2 Ke7
`

        const parser = new PgnParser()
        const game = parser.parse(fileContent)
        expect(game.getPGNFileContent()).toEqual(fileContent)
    })


    it('it parses test game 2', () => {

        const fileContent = `[Event "Magnus Carlsen Invitational 2021"]
[Site "Alpha Centauri"]
[Termination "Normal"]

1. e4 e5 {This is a standard opening move.} 2. Nf3 Nc6 (2... d6 {The Philidor Defense}) 3. Bb5 {The Ruy Lopez opening.}
`
        const parser = new PgnParser()
        const game = parser.parse(fileContent)

        console.log(game.getPGNFileContent())

        const variation = game.moveHistory.variations[3][0];
        expect(variation).toBeInstanceOf(MoveHistory)
        expect(
            variation.startPosition.extendedFEN.toString()
        ).toEqual('rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2')
        expect(
            variation.last().positionAfter.extendedFEN.toString()
        ).toEqual('rnbqkbnr/ppp2ppp/3p4/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 3')

    })
})