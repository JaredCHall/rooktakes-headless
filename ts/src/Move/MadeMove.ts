import type {ChessMove} from "@chess/Move/MoveType/ChessMove";
import type {ExtendedFen} from "@chess/Position/ExtendedFEN";
import type {ColorType} from "@chess/Color";
import type {GamePosition} from "@chess/Position/GamePosition";
import {CoordinateNotation} from "@chess/MoveNotary/CoordinateNotation";

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
        return notationType !== 'SAN' ? this.getCoordinateNotation() : this.sanNotation
    }

    getCoordinateNotation(): string
    {
        if(this.coordinateNotation){
           return this.coordinateNotation
        }

        return this.coordinateNotation = new CoordinateNotation(
            this.move.oldSquare,
            this.move.newSquare,
            this.move.getPromoteToType()
        ).serialize()
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