import {Color, type ColorType} from "@chess/Color";
import {SquareCoordinates} from "@chess/Square/SquareCoordinates";
import {Squares144} from "@chess/Position/Squares144";
import {Squares64} from "@chess/Position/Squares64";
import type {Piece} from "@chess/Piece";

export type SquareType = 'a1'|'a2'|'a3'|'a4'|'a5'|'a6'|'a7'|'a8'|
    'b1'|'b2'|'b3'|'b4'|'b5'|'b6'|'b7'|'b8'|
    'c1'|'c2'|'c3'|'c4'|'c5'|'c6'|'c7'|'c8'|
    'd1'|'d2'|'d3'|'d4'|'d5'|'d6'|'d7'|'d8'|
    'e1'|'e2'|'e3'|'e4'|'e5'|'e6'|'e7'|'e8'|
    'f1'|'f2'|'f3'|'f4'|'f5'|'f6'|'f7'|'f8'|
    'g1'|'g2'|'g3'|'g4'|'g5'|'g6'|'g7'|'g8'|
    'h1'|'h2'|'h3'|'h4'|'h5'|'h6'|'h7'|'h8'

export interface SquaresList {[squareType: string]: true}

export class Square {

    static getCoordinates(squareName: SquareType) {
        const index = Squares64.squaresOrder.indexOf(squareName);
        const col = index % 8;
        const row = Math.floor(index / 8)

        // return coordinates for both orientations
        return {
            white: new SquareCoordinates(col, row),
            black: new SquareCoordinates(col * -1 + 7, row * -1 + 7)
        }
    }

    name: SquareType

    color: ColorType

    rank: number

    file: string

    coordinatesWhite: SquareCoordinates

    coordinatesBlack: SquareCoordinates

    index144: number

    piece: Piece | null

    constructor(name: SquareType, piece: Piece | null = null) {

        this.name = name

        // @ts-ignore
        this.color = Squares64.whiteSquares.indexOf(this.name) !== -1 ? Color.WHITE : Color.BLACK

        this.rank = parseInt(name.charAt(1))

        this.file = name.charAt(0)

        this.index144 = Squares144.getIndex(this.name)

        this.piece = piece

        const coordinates = Square.getCoordinates(this.name)
        this.coordinatesWhite = coordinates.white
        this.coordinatesBlack = coordinates.black

    }

    setPiece(piece:null|Piece): void
    {
        this.piece = piece
    }

    getPiece(): null|Piece
    {
        return this.piece
    }

    static getFileAndRank(squareName: SquareType): [file: string, rank: number]
    {
        const square = new Square(squareName)

        return [
            square.file,
            square.rank
        ]
    }
}