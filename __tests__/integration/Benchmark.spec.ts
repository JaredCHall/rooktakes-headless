import {describe, it} from 'vitest'

//@ts-ignore
import {Game} from "@compiled/Game/Game";
//@ts-ignore
import {MadeMove} from "@compiled/Move/MadeMove";
//@ts-ignore
import {RunTimeProfiler} from "../RunTimeProfiler";



describe('Benchmark', () => {

    it('Plays the opera game 100 times', () => {
        const playGame = () => {
            const game = Game.makeNewGame();

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
        }

        const benchmark = new RunTimeProfiler('Opera Game [SAN]', 100)
        benchmark.start()
        for(let i = 0; i < 100; i++) {
            playGame()
        }
        benchmark.stop()
        benchmark.print()

    })

    it('Plays the opera game is coordinate notation', () => {
        const playGame = () => {
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
        }

        const benchmark = new RunTimeProfiler('Opera Game [Coordinate]', 100)
        benchmark.start()
        for(let i = 0; i < 100; i++) {
            playGame()
        }
        benchmark.stop()
        benchmark.print()

    })





    it('plays immortal game in coordinate notation' , () => {
        const playGame = () => {
            const game = Game.makeNewGame();
            game.setInputType('Coordinate')

            const moves = [
                'c2c4', 'e7e6', 'g1f3', 'd7d5', 'd2d4', 'g8f6',
                'b1c3', 'f8e7', 'c1g5', 'e8g8', 'e2e3', 'h7h6',
                'g5h4', 'b7b6', 'c4d5', 'f6d5', 'h4e7', 'd8e7',
                'c3d5', 'e6d5', 'a1c1', 'c8e6', 'd1a4', 'c7c5',
                'a4a3', 'f8c8', 'f1b5', 'a7a6', 'd4c5', 'b6c5',
                'e1g1', 'a8a7', 'b5e2', 'b8d7', 'f3d4', 'e7f8',
                'd4e6', 'f7e6', 'e3e4', 'd5d4', 'f2f4', 'f8e7',
                'e4e5', 'c8b8', 'e2c4', 'g8h8', 'a3h3', 'd7f8',
                'b2b3', 'a6a5', 'f4f5', 'e6f5', 'f1f5', 'f8h7',
                'c1f1', 'e7d8', 'h3g3', 'a7e7', 'h2h4', 'b8b7',
                'e5e6', 'b7c7', 'g3e5', 'd8e8', 'a2a4', 'e8d8',
                'f1f2', 'd8e8', 'f2f3', 'e8d8', 'c4d3', 'd8e8',
                'e5e4', 'h7f6', 'f5f6', 'g7f6', 'f3f6', 'h8g8',
                'd3c4', 'g8h8', 'e4f4'
            ]

            moves.forEach((move) => {
                game.makeMove(move)
            })
            game.setResigns('black')
        }

        const benchmark = new RunTimeProfiler('Immortal Game [Coordinate]', 100)
        benchmark.start()
        for(let i = 0; i < 100; i++) {
            playGame()
        }
        benchmark.stop()
        benchmark.print()
    })

    it('Plays the immortal game 100 times', () => {

        const playGame = () => {
            const game = Game.makeNewGame();

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
        }


        const benchmark = new RunTimeProfiler('Immortal Game [SAN]', 100)
        benchmark.start()
        for(let i = 0; i < 100; i++) {
            playGame()
        }
        benchmark.stop()
        benchmark.print()

    })

})