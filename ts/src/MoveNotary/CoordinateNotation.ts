import type {SquareType} from "@chess/Square/Square";
import type {ChessPieceType} from "@chess/Piece";
import {MoveNotation} from "@chess/MoveNotary/MoveNotation";

export class CoordinateNotation extends MoveNotation {

    readonly oldSquare: SquareType

    readonly newSquare: SquareType

    readonly promoteToType: ChessPieceType|null

    constructor(oldSquare: SquareType,newSquare: SquareType, promotionType: string|null = null) {
        super()
        this.oldSquare = oldSquare
        this.newSquare = newSquare
        this.promoteToType = promotionType ? CoordinateNotation.getPromotionType(promotionType) : null
    }

    getPromoteToType(): ChessPieceType | null {
        return this.promoteToType;
    }

    static fromInput(input: string)
    {
        const parts = input.match(/^([a-h][1-8])(\s)?([a-h][1-8])(\s)?(=)?([QBNR])?$/)
        if(parts === null){
            throw new Error('Unreadable Coordinate notation')
        }

        const oldSquare = parts[1]
        const newSquare = parts[3]
        const promoteType = parts[6] || null

        //@ts-ignore
        return new CoordinateNotation(oldSquare, newSquare, promoteType)
    }

    serialize(): string
    {
        return this.oldSquare
            + this.newSquare
            + (this.promoteToType ?? '')
    }
}