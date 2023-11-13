import {describe, it} from 'vitest'

//@ts-ignore
import {Game} from "@compiled/Game/Game";


describe('Benchmark', () => {

    it('Plays the opera game 100 times', () => {



        const playOperaGame = () => {
            const game = Game.makeNewGame();

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
        }

        const startTime = (new Date).getTime()
        for(let i = 0; i < 100; i++) {
            playOperaGame()
        }
        const elapsedTime = (new Date()).getTime() - startTime
        console.log(`Opera Game: ${elapsedTime} ms`)

    })

    it('Plays the immortal game 100 times', () => {

        const playGame = () => {
            const game = Game.makeNewGame();

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
        }

        const startTime = (new Date).getTime()
        for(let i = 0; i < 100; i++) {
            playGame()
        }
        const elapsedTime = (new Date()).getTime() - startTime
        console.log(`Immortal Game: ${elapsedTime} ms`)

    })


})