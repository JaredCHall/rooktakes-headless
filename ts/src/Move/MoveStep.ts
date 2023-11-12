import type {Piece} from "@chess/Piece";
import type {SquareType} from "@chess/Square/Square";

export class MoveStep {

    squareName: SquareType

    piece: Piece|null

    constructor(squareName: SquareType, piece: Piece|null) {
        this.squareName = squareName
        this.piece = piece
    }

}