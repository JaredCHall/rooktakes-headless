import type {Piece} from "Piece";
import type {SquareType} from "Square/Square";

export class MoveStep {

    squareName: SquareType

    piece: Piece|null

    constructor(squareName: SquareType, piece: Piece|null) {
        this.squareName = squareName
        this.piece = piece
    }

}