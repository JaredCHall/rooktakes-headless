import { describe, it, expect} from 'vitest'
import {MoveHistory} from "@chess/Move/MoveHistory";
import {ExtendedFen} from "@chess/Position/ExtendedFEN";
import {GamePosition} from "@chess/Position/GamePosition";


describe('MoveHistory',()=>{

    const dummyPosition = function(fen: string = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'){
        return new GamePosition(new ExtendedFen(fen))
    }

    const dummyMove = function(halfStepIndex: number, positionAfter: GamePosition|null = null){
        return {
            halfStepIndex: halfStepIndex,
            fenAfter: {
                toString: () => 'PARTIAL FEN'+halfStepIndex
            },
            positionAfter: positionAfter
        }
    }


    it('it constructs itself', () => {
        const startPosition = dummyPosition()
        const history = new MoveHistory(startPosition)
        expect(history.startPosition).toBe(startPosition)
        expect(history.startHalfStep).toEqual(1)
        expect(() => {history.last()}).toThrow()
    })

    it('it adds new move',() => {
        const history = new MoveHistory(dummyPosition())
        const item = dummyMove(1)
        // @ts-ignore
        history.add(item)
        expect(history.moves[1]).toBe(item)
    })

    it('it gets length',() => {

        const history = new MoveHistory(dummyPosition())
        expect(history.length).toEqual(0)

        // @ts-ignore
        history.add(dummyMove(1))
        // @ts-ignore
        history.add(dummyMove(2))
        console.log(history)
        console.log(history.moves)
        expect(history.length).toEqual(2)
    })

    it('it gets made move', () => {
        const history = new MoveHistory(dummyPosition())
        expect(history.length).toEqual(0)
        const move1 = dummyMove(1)
        const move2 = dummyMove(2)
        const move3 = dummyMove(3)

        // @ts-ignore
        history.add(move1)
        // @ts-ignore
        history.add(move2)
        // @ts-ignore
        history.add(move3)
        expect(history.get(1)).toEqual(move1)
        expect(history.get(2)).toEqual(move2)
        expect(history.get(3)).toEqual(move3)

        expect(() => history.get(4)).toThrowError('Move at half step 4 does not exist')

    })

    it('it pops last move', () => {

        const history = new MoveHistory(dummyPosition())
        expect(history.length).toEqual(0)
        const move1 = dummyMove(1)
        const move2 = dummyMove(2)
        const move3 = dummyMove(3)

        // @ts-ignore
        history.add(move1)
        // @ts-ignore
        history.add(move2)
        // @ts-ignore
        history.add(move3)
        expect(history.pop()).toEqual(move3)
        expect(history.pop()).toEqual(move2)
        expect(history.pop()).toEqual(move1)

        expect(history).toHaveLength(0)

        expect(() => {history.pop()}).toThrowError('Cannot get move at half step 0 No moves in list')

    })

    it('it gets fen before', () => {

        const startPosition = dummyPosition()
        const history = new MoveHistory(startPosition)
        expect(history.getPositionBefore(1)).toBe(startPosition)
        expect(history.getPositionBefore(123)).toBe(startPosition)

        const positionAfter1 = dummyPosition()
        const move1 = dummyMove(1, positionAfter1)
        // @ts-ignore
        history.add(move1)
        expect(history.getPositionBefore(1)).toEqual(startPosition)

        const positionAfter2 = dummyPosition()
        const move2 = dummyMove(2, positionAfter2)
        // @ts-ignore
        history.add(move2)

        expect(history.getPositionBefore(1)).toBe(startPosition)
        expect(history.getPositionBefore(2)).toBe(positionAfter1)

    })
})