import {describe, it, expect} from 'vitest'

//@ts-ignore
import {Game} from "@compiled/Game/Game";
//@ts-ignore
import {PgnFile} from "@compiled/PgnFile/PgnFile";
//@ts-ignore
import {Player} from "@compiled/Player";

describe('PlaysTestGames', () => {

    it('Unknown - Black Resigns Early', () => {
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
2. exd5
`)

    })

    it('Carsen and Nakamura bong cloud', () => {
        const game = Game.makeNewGame();
        game.setPlayer(new Player('white', 'Magnus Carlsen', 2881))
        game.setPlayer(new Player('black', 'Hikaru Nakamura', 2829))
        game.setEventName('Magnus Carlsen Invitational 2021')
        game.setEventRound(10)

        game.makeMove('e4')
        game.makeMove('e5')
        game.makeMove('Ke2')
        game.makeMove('Ke7')
        game.makeMove('Ke1')
        game.makeMove('Ke8')
        game.makeMove('Ke2')
        game.makeMove('Ke7')
        game.makeMove('Ke1')
        game.makeMove('Ke8')
        game.makeMove('Ke2')
        game.makeMove('Ke7')

        expect(game.gameResult?.type).toEqual('Draw')
        expect(game.gameResult?.drawType).toEqual('3Fold')

        const file = PgnFile.make(game)
        expect(file.content).toEqual(`[Event "Magnus Carlsen Invitational 2021"]
[Site "Sol System"]
[Date "2023.11.12"]
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
`)

    })

    it('Morphy\'s Opera Game' , () => {
        const game = Game.makeNewGame();
        game.setPlayer(new Player('white', 'Paul Morphy'))
        game.setPlayer(new Player('black', 'Duke of Brunswich and Count Isouard'))
        game.setEventDate(new Date('1858-10-31'))

        game.makeMove('e4')
        game.makeMove('e5')
        game.makeMove('Nf3')
        game.makeMove('d6')

        game.makeMove('d4')
        game.makeMove('Bg4')

        game.makeMove('dxe5')
        game.makeMove('Bxf3')

        game.makeMove('Qxf3')
        game.makeMove('dxe5')

        game.makeMove('Bc4')
        game.makeMove('Nf6')

        game.makeMove('Qb3')
        game.makeMove('Qe7')

        game.makeMove('Nc3')
        game.makeMove('c6')

        game.makeMove('Bg5')
        game.makeMove('b5')

        game.makeMove('Nxb5')
        game.makeMove('cxb5')

        game.makeMove('Bxb5')
        game.makeMove('Nbd7')

        game.makeMove('O-O-O')
        game.makeMove('Rd8')

        game.makeMove('Rxd7')
        game.makeMove('Rxd7')

        game.makeMove('Rd1')
        game.makeMove('Qe6')

        game.makeMove('Bxd7')
        game.makeMove('Nxd7')

        game.makeMove('Qb8')
        game.makeMove('Nxb8')

        game.makeMove('Rd8')

        const file = PgnFile.make(game)

        expect(file.content).toEqual(`[Event "Casual Game"]
[Site "Sol System"]
[Date "1858.10.30"]
[Round "1"]
[Result "1-0"]
[Termination "Normal"]
[White "Paul Morphy"]
[Black "Duke of Brunswich and Count Isouard"]
[WhiteElo "?"]
[BlackElo "?"]

1. e4 e5
2. Nf3 d6
3. d4 Bg4
4. dxe5 Bxf3
5. Qxf3 dxe5
6. Bc4 Nf6
7. Qb3 Qe7
8. Nc3 c6
9. Bg5 b5
10. Nxb5 cxb5
11. Bxb5+ Nbd7
12. O-O-O Rd8
13. Rxd7 Rxd7
14. Rd1 Qe6
15. Bxd7+ Nxd7
16. Qb8+ Nxb8
17. Rd8#
`)

    })


})