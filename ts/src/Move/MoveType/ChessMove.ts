import {MoveStep} from "Move/MoveStep";
import type {Piece} from "Piece";
import type {SquareType} from "Square/Square";

/**
 * This represents any full chess move
 */
export class ChessMove {

    oldSquare: SquareType

    newSquare: SquareType

    movingPiece: Piece

    capturedPiece: Piece | null

    constructor(oldSquare: SquareType, newSquare: SquareType, movingPiece: Piece, capturedPiece: Piece|null = null) {
        this.oldSquare = oldSquare
        this.newSquare = newSquare
        this.movingPiece = movingPiece
        this.capturedPiece = capturedPiece
    }

    getMoveSteps(): Array<MoveStep>
    {
        return [
            new MoveStep(this.oldSquare, null),
            new MoveStep(this.newSquare, this.movingPiece)
        ]
    }

    getUndoSteps(): Array<MoveStep>
    {
        return [
            new MoveStep(this.newSquare, this.capturedPiece),
            new MoveStep(this.oldSquare, this.movingPiece)
        ]

    }

    clone(): ChessMove
    {
        const movingPiece = this.movingPiece.clone()
        const capturedPiece = this.capturedPiece ? this.capturedPiece.clone() : null
        return new ChessMove(this.oldSquare, this.newSquare, movingPiece, capturedPiece)
    }

}