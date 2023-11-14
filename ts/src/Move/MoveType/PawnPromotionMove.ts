import {ChessMove} from "@chess/Move/MoveType/ChessMove";
import {MoveStep} from "@chess/Move/MoveStep";
import {Square} from "@chess/Square/Square";
import {type ChessPieceType, Piece} from "@chess/Piece";
import type {SquareType} from "@chess/Square/Square";


export class PawnPromotionMove extends ChessMove
{

    promoteToType: ChessPieceType

    constructor(chessMove: ChessMove, promoteToType: ChessPieceType = 'queen') {
        super(chessMove.oldSquare, chessMove.newSquare, chessMove.movingPiece, chessMove.capturedPiece)
        this.promoteToType = promoteToType
    }

    getPromoteToType(): ChessPieceType | null {
        return this.promoteToType
    }

    getMoveSteps(): Array<MoveStep> {
        return [
            new MoveStep(this.oldSquare, null),
            new MoveStep(
                this.newSquare,
                new Piece(this.promoteToType, this.movingPiece.color)
            ),
        ]
    }

    getUndoSteps(): Array<MoveStep> {
        return [
            new MoveStep(this.newSquare, null),
            new MoveStep(
                this.oldSquare,
                new Piece('pawn', this.movingPiece.color)
            ),
        ]
    }

    static squareIsOnFinalRank(squareName: SquareType, piece: Piece): boolean
    {
        const square = new Square(squareName);

        return square.rank === (piece.color === 'white' ? 8 : 1)
    }

    clone(): ChessMove {
        return new PawnPromotionMove(super.clone())
    }
}