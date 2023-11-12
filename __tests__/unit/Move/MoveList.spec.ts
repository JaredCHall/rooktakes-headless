import { describe, it, expect, vi } from 'vitest'
import {MoveList} from "@chess/Move/MoveList";
import {ChessMove} from "@chess/Move/MoveType/ChessMove";
import {PawnPromotionMove} from "@chess/Move/MoveType/PawnPromotionMove";

vi.mock("@chess/Move/MoveType/ChessMove")
vi.mock("@chess/Move/MoveType/PawnPromotionMove")

const getMockMove = (): ChessMove =>
{
    //@ts-ignore
    return new ChessMove()
}


describe('MoveList',()=>{
    it('it adds new move',() => {
        const list = new MoveList()
        // @ts-ignore
        const item = getMockMove()
        list.add(item)
        expect(list.moves[0]).toBe(item)
    })

    it('it gets length',() => {

        const list = new MoveList()
        expect(list.length).toEqual(0)

        list.add(getMockMove())
        list.add(getMockMove())
        expect(list.length).toEqual(2)
    })

    it('it loops with each', ()=> {

        const list = new MoveList()
        list.add(getMockMove())
        list.add(getMockMove())

        let i = 0
        list.each((move: any) => {
            expect(move).toBeInstanceOf(ChessMove)
            i++
        })
        expect(i).toEqual(2)
    })

    it('it loops with map', ()=> {
        const list = new MoveList()
        list.add(getMockMove())
        list.add(getMockMove())
        list.map((move: any) => {
            return new PawnPromotionMove(move)
        })
        expect(list.moves[0]).toBeInstanceOf(PawnPromotionMove)
        expect(list.moves[1]).toBeInstanceOf(PawnPromotionMove)
    })
})



