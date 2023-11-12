import {ChessMove} from "@chess/Move/MoveType/ChessMove";
import {MoveStep} from "@chess/Move/MoveStep";
import {Square} from "@chess/Square/Square";
import type {Piece} from "@chess/Piece";
import type {SquareType} from "@chess/Square/Square";


export class EnPassantMove extends ChessMove
{

    capturedSquare: SquareType

    constructor(move: ChessMove, capturedPiece: Piece, capturedSquare: SquareType) {
        super(move.oldSquare, move.newSquare, move.movingPiece, capturedPiece)
        this.capturedSquare = capturedSquare
    }

    static getOpponentPawnSquare(move: ChessMove): SquareType
    {
        const newSquare = new Square(move.newSquare)
        const oldSquare = new Square(move.oldSquare)

        //@ts-ignore
        return newSquare.file + oldSquare.rank.toString()
    }

    getMoveSteps(): Array<MoveStep>
    {
        let steps = super.getMoveSteps();
        steps.push(new MoveStep(this.capturedSquare , null))

        return steps
    }

    getUndoSteps(): Array<MoveStep> {
        return [
            new MoveStep(this.capturedSquare , this.capturedPiece),
            new MoveStep(this.oldSquare, this.movingPiece),
            new MoveStep(this.newSquare, null),
        ]
    }
}