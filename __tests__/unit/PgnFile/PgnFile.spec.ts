import { describe, it, expect } from 'vitest'
import {PgnFile} from "@chess/PgnFile/PgnFile";
import {Game} from "@chess/Game/Game";
import {Player} from "@chess/Player";

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

    it('plays the Opera Game' , () => {
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

    it('plays the Immortal Game' , () => {

        const game = Game.makeNewGame();
        game.setPlayer(new Player('white', 'Bobby Fischer'))
        game.setPlayer(new Player('black', 'Boris Spassky'))
        game.setEventDate(new Date('1972-09-01'))

        game.makeMove('c4')
        game.makeMove('e6')

        game.makeMove('Nf3')
        game.makeMove('d5')

        game.makeMove('d4')
        game.makeMove('Nf6')

        game.makeMove('Nc3')
        game.makeMove('Be7')

        game.makeMove('Bg5')
        game.makeMove('O-O')

        game.makeMove('e3')
        game.makeMove('h6')

        game.makeMove('Bh4')
        game.makeMove('b6')

        game.makeMove('cxd5')
        game.makeMove('Nxd5')

        game.makeMove('Bxe7')
        game.makeMove('Qxe7')

        game.makeMove('Nxd5')
        game.makeMove('exd5')

        game.makeMove('Rc1')
        game.makeMove('Be6')

        game.makeMove('Qa4')
        game.makeMove('c5')

        game.makeMove('Qa3')
        game.makeMove('Rc8')

        game.makeMove('Bb5')
        game.makeMove('a6')

        game.makeMove('dxc5')
        game.makeMove('bxc5')

        game.makeMove('O-O')
        game.makeMove('Ra7')

        game.makeMove('Be2')
        game.makeMove('Nd7')

        game.makeMove('Nd4')
        game.makeMove('Qf8')

        game.makeMove('Nxe6')
        game.makeMove('fxe6')

        game.makeMove('e4')
        game.makeMove('d4')

        game.makeMove('f4')
        game.makeMove('Qe7')

        game.makeMove('e5')
        game.makeMove('Rb8')

        game.makeMove('Bc4')
        game.makeMove('Kh8')

        game.makeMove('Qh3')
        game.makeMove('Nf8')

        game.makeMove('b3')
        game.makeMove('a5')

        game.makeMove('f5')
        game.makeMove('exf5')

        game.makeMove('Rxf5')
        game.makeMove('Nh7')

        game.makeMove('Rcf1')
        game.makeMove('Qd8')

        game.makeMove('Qg3')
        game.makeMove('Re7')

        game.makeMove('h4')
        game.makeMove('R8b7')

        game.makeMove('e6')
        game.makeMove('Rbc7')

        game.makeMove('Qe5')
        game.makeMove('Qe8')

        game.makeMove('a4')
        game.makeMove('Qd8')

        game.makeMove('R1f2')
        game.makeMove('Qe8')

        game.makeMove('R2f3')
        game.makeMove('Qd8')

        game.makeMove('Bd3')
        game.makeMove('Qe8')

        game.makeMove('Qe4')
        game.makeMove('Nf6')

        game.makeMove('Rxf6')
        game.makeMove('gxf6')

        game.makeMove('Rxf6')
        game.makeMove('Kg8')

        game.makeMove('Bc4')
        game.makeMove('Kh8')

        game.makeMove('Qf4')
        game.setResigns('black')

        const file = PgnFile.make(game)

        expect(file.content).toEqual(`[Event "Casual Game"]
[Site "Sol System"]
[Date "1972.08.31"]
[Round "1"]
[Result "1-0"]
[Termination "Normal"]
[White "Bobby Fischer"]
[Black "Boris Spassky"]
[WhiteElo "?"]
[BlackElo "?"]

1. c4 e6
2. Nf3 d5
3. d4 Nf6
4. Nc3 Be7
5. Bg5 O-O
6. e3 h6
7. Bh4 b6
8. cxd5 Nxd5
9. Bxe7 Qxe7
10. Nxd5 exd5
11. Rc1 Be6
12. Qa4 c5
13. Qa3 Rc8
14. Bb5 a6
15. dxc5 bxc5
16. O-O Ra7
17. Be2 Nd7
18. Nd4 Qf8
19. Nxe6 fxe6
20. e4 d4
21. f4 Qe7
22. e5 Rb8
23. Bc4 Kh8
24. Qh3 Nf8
25. b3 a5
26. f5 exf5
27. Rxf5 Nh7
28. Rcf1 Qd8
29. Qg3 Re7
30. h4 R8b7
31. e6 Rbc7
32. Qe5 Qe8
33. a4 Qd8
34. R1f2 Qe8
35. R2f3 Qd8
36. Bd3 Qe8
37. Qe4 Nf6
38. Rxf6 gxf6
39. Rxf6 Kg8
40. Bc4 Kh8
41. Qf4
`)
    })

})