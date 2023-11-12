import type {SquareType} from "@chess/Square/Square";
import type {ColorType} from "@chess/Color";
import type {Piece} from "@chess/Piece";

export class CastlesType {
    readonly rooksOldSquare: SquareType
    readonly rooksNewSquare: SquareType
    readonly kingsOldSquare: SquareType
    readonly kingsNewSquare: SquareType
    readonly squaresThatMustBeEmpty: SquareType[]
    readonly squaresThatMustBeSafe: SquareType[]
    readonly type: 'K'|'Q'|'q'|'k'
    readonly notation: 'O-O'|'O-O-O'

    constructor(
        rooksOldSquare: SquareType,
        rooksNewSquare: SquareType,
        kingsOldSquare: SquareType,
        kingsNewSquare: SquareType,
        squaresThatMustBeEmpty: SquareType[],
        squaresThatMustBeSafe: SquareType[],
        type: 'K'|'Q'|'q'|'k',
        notation: 'O-O'|'O-O-O'
    ) {
        this.rooksOldSquare = rooksOldSquare
        this.rooksNewSquare = rooksNewSquare
        this.kingsOldSquare = kingsOldSquare
        this.kingsNewSquare = kingsNewSquare
        this.squaresThatMustBeEmpty = squaresThatMustBeEmpty
        this.squaresThatMustBeSafe = squaresThatMustBeSafe
        this.type = type
        this.notation = notation
    }


    static create(castlesType: 'K'|'Q'|'q'|'k'|'O-O-O'|'O-O', color: ColorType|null = null): CastlesType
    {
        switch(castlesType){
            case 'Q': return new CastlesType(
                'a1',
                'd1',
                'e1',
                'c1',
                ['d1','c1','b1'],
                ['e1','d1','c1'],
                'Q',
                'O-O-O'
                )
            case 'K': return new CastlesType(
                'h1',
                'f1',
                'e1',
                'g1',
                ['f1','g1'],
                ['e1','f1','g1'],
                'K',
                'O-O',
            )
            case 'q': return new CastlesType(
                'a8',
                'd8',
                'e8',
                'c8',
                ['d8','c8','b8'],
                ['e8','d8','c8'],
                'q',
                'O-O-O'
            )
            case 'k': return new CastlesType(
                'h8',
                'f8',
                'e8',
                'g8',
                ['f8','g8'],
                ['e8','f8','g8'],
                'k',
                'O-O'
            )
            case 'O-O':
                if(!color){
                    throw new Error('must pass color with O-O')
                }
                return CastlesType.create(color === 'white' ? 'K' : 'k')
            case 'O-O-O':
                if(!color){
                    throw new Error('must pass color with O-O-O')
                }
                return CastlesType.create(color === 'white' ? 'Q' : 'q')
        }
    }

    static forColor(color: ColorType, castleRights: string|null): CastlesType[]
    {
        if(!castleRights){
            return []
        }

        const typeNames = color === 'black' ? ['k','q'] : ['K','Q']

        let types: CastlesType[] = [];
        for(const i in typeNames){
            const type = typeNames[i];
            if(castleRights.indexOf(type) !== -1){
                //@ts-ignore
                types.push(CastlesType.create(type))
            }
        }

        return types
    }

    static fromRooksSquare(square: SquareType, rook: Piece): CastlesType|null
    {
        if(rook.color === 'black'){
            switch(square){
                case 'a8': return CastlesType.create('q')
                case 'h8': return CastlesType.create('k')
                default: return null
            }
        }

        switch(square){
            case 'a1': return CastlesType.create('Q')
            case 'h1': return CastlesType.create('K')
            default: return null
        }
    }

}