import { describe, it, expect } from 'vitest'
import {Game} from "@chess/Game/Game";

describe('PgnFile' , () => {

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

        expect(game.getPGNFileContent()).toEqual(`[Event "Casual Game"]
[Site "Sol System"]
[Date "1970.01.01"]
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

        expect(game.getPGNFileContent()).toEqual(`[Event "Casual Game"]
[Site "Sol System"]
[Date "1970.01.01"]
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

        game.setPlayer('white','player 1',2000)
        game.setPlayer('black','player 2',2400)

        game.setDraw();

        expect(game.getPGNFileContent()).toEqual(`[Event "Casual Game"]
[Site "Sol System"]
[Date "1970.01.01"]
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

        expect(game.getPGNFileContent()).toEqual(`[Event "Casual Game"]
[Site "Sol System"]
[Date "1970.01.01"]
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

        expect(game.getPGNFileContent()).toEqual(`[Event "Casual Game"]
[Site "Sol System"]
[Date "1970.01.01"]
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
        game.setPlayer('white', 'Magnus Carlsen', 2881)
        game.setPlayer('black', 'Hikaru Nakamura', 2829)
        game.setEventDate(new Date(0))
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

        expect(game.getPGNFileContent()).toEqual(`[Event "Magnus Carlsen Invitational 2021"]
[Site "Sol System"]
[Date "1970.01.01"]
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
        game.setPlayer('white', 'Paul Morphy')
        game.setPlayer('black', 'Duke of Brunswich and Count Isouard')
        game.setEventDate(new Date('1858-10-31'))

        const moves = [
            'e4',    'e5',   'Nf3',   'd6',
            'd4',    'Bg4',  'dxe5',  'Bxf3',
            'Qxf3',  'dxe5', 'Bc4',   'Nf6',
            'Qb3',   'Qe7',  'Nc3',   'c6',
            'Bg5',   'b5',   'Nxb5',  'cxb5',
            'Bxb5+', 'Nbd7', 'O-O-O', 'Rd8',
            'Rxd7',  'Rxd7', 'Rd1',   'Qe6',
            'Bxd7+', 'Nxd7', 'Qb8+',  'Nxb8',
            'Rd8#'
        ]

        moves.forEach((move) => {
            game.makeMove(move)
        })

        expect(game.getPGNFileContent()).toEqual(`[Event "Casual Game"]
[Site "Sol System"]
[Date "1858.10.31"]
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

    it('Plays the opera game in coordinate notation', () => {

        const game = Game.makeNewGame();

        game.setInputType('Coordinate')

        const moves = [
            'e2e4', 'e7e5', 'g1f3', 'd7d6',
            'd2d4', 'c8g4', 'd4e5', 'g4f3',
            'd1f3', 'd6e5', 'f1c4', 'g8f6',
            'f3b3', 'd8e7', 'b1c3', 'c7c6',
            'c1g5', 'b7b5', 'c3b5', 'c6b5',
            'c4b5', 'b8d7', 'e1c1', 'a8d8',
            'd1d7', 'd8d7', 'h1d1', 'e7e6',
            'b5d7', 'f6d7', 'b3b8', 'd7b8',
            'd1d8'
        ]

        moves.forEach((move) => {
            game.makeMove(move)
        })
    })


    it('plays the Immortal Game' , () => {

        const game = Game.makeNewGame();
        game.setPlayer('white', 'Bobby Fischer')
        game.setPlayer('black', 'Boris Spassky')
        game.setEventDate(new Date('1972-09-01'))

        const moves = [
            'c4',   'e6',   'Nf3',  'd5',   'd4',   'Nf6',  'Nc3',
            'Be7',  'Bg5',  'O-O',  'e3',   'h6',   'Bh4',  'b6',
            'cxd5', 'Nxd5', 'Bxe7', 'Qxe7', 'Nxd5', 'exd5', 'Rc1',
            'Be6',  'Qa4',  'c5',   'Qa3',  'Rc8',  'Bb5',  'a6',
            'dxc5', 'bxc5', 'O-O',  'Ra7',  'Be2',  'Nd7',  'Nd4',
            'Qf8',  'Nxe6', 'fxe6', 'e4',   'd4',   'f4',   'Qe7',
            'e5',   'Rb8',  'Bc4',  'Kh8',  'Qh3',  'Nf8',  'b3',
            'a5',   'f5',   'exf5', 'Rxf5', 'Nh7',  'Rcf1', 'Qd8',
            'Qg3',  'Re7',  'h4',   'R8b7', 'e6',   'Rbc7', 'Qe5',
            'Qe8',  'a4',   'Qd8',  'R1f2', 'Qe8',  'R2f3', 'Qd8',
            'Bd3',  'Qe8',  'Qe4',  'Nf6',  'Rxf6', 'gxf6', 'Rxf6',
            'Kg8',  'Bc4',  'Kh8',  'Qf4'
        ]

        moves.forEach((move) => {
            game.makeMove(move)
        })
        game.setResigns('black')
        expect(game.getPGNFileContent()).toEqual(`[Event "Casual Game"]
[Site "Sol System"]
[Date "1972.09.01"]
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