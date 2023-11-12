import { describe, it, expect } from 'vitest'
import {Piece} from "@chess/Piece";
import {MoveStep} from "@chess/Move/MoveStep";


describe('MoveStep', () => {
    it('it constructs itself', () => {

        const piece = Piece.knightWhite()
        let moveStep = new MoveStep('e4', piece)

        expect(moveStep).toHaveProperty('squareName', 'e4')
        expect(moveStep.piece).toBe(piece)

        moveStep = new MoveStep('e4', null)

        expect(moveStep).toHaveProperty('squareName', 'e4')
        expect(moveStep.piece).toBeNull()

    })

})
