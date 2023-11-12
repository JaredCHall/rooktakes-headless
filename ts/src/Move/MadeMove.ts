import type {ChessMove} from "Move/MoveType/ChessMove";
import type {ExtendedFen} from "Position/ExtendedFEN";
import type {ColorType} from "Color";
import type {GamePosition} from "Position/GamePosition";

export class MadeMove {

    readonly move: ChessMove

    readonly positionAfter: GamePosition

    readonly halfStepIndex: number

    private sanNotation: null|string = null

    private coordinateNotation: null|string = null

    constructor(
        move: ChessMove,
        positionAfter: GamePosition,
    ) {
        this.move = move
        this.positionAfter = positionAfter
        this.halfStepIndex = positionAfter.extendedFEN.halfStepCounter - 1
    }



    getNotation(notationType: 'SAN'|'Coordinate'): string|null
    {
        return notationType !== 'SAN' ? this.coordinateNotation : this.sanNotation
    }

    setSanNotation(notation: string)
    {
        this.sanNotation = notation
    }

    setCoordinateNotation(notation: string)
    {
        this.coordinateNotation = notation
    }

    get fenAfter(): ExtendedFen
    {
        return this.positionAfter.extendedFEN
    }

    get movingColor(): ColorType {
        return this.move.movingPiece.color
    }
}