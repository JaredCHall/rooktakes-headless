import type {MoveArbiter} from "@chess/MoveArbiter/MoveArbiter";
import {SanNotation} from "@chess/MoveNotary/SanNotation";
import {CoordinateNotation} from "@chess/MoveNotary/CoordinateNotation";
import {ChessMove} from "@chess/Move/MoveType/ChessMove";
import {Square} from "@chess/Square/Square";
import {PawnPromotionMove} from "@chess/Move/MoveType/PawnPromotionMove";

export class MoveFactory {

    moveArbiter: MoveArbiter

    constructor(moveArbiter: MoveArbiter) {
        this.moveArbiter = moveArbiter
    }

    makeNotation(input: string, inputType: 'SAN'|'Coordinate')
    {
        switch(inputType){
            case 'SAN': return SanNotation.fromInput(input, this.moveArbiter.fenNumber.sideToMove)
            case 'Coordinate': return CoordinateNotation.fromInput(input)
        }

        throw new Error('Unrecognized input type: must be SAN or Coordinate')
    }


    make(notation: SanNotation|CoordinateNotation): ChessMove
    {
        const isCoordinate = notation instanceof CoordinateNotation
        const move = isCoordinate ? this.#fromCoordinateNotation(notation)
            : this.#fromSanNotation(notation)

        const promoteToType = notation.getPromoteToType()
        if(move instanceof PawnPromotionMove && promoteToType) {
            move.promoteToType = promoteToType
        }

        return move
    }

    #fromSanNotation(notation: SanNotation): ChessMove
    {
        const piece = notation.movingPiece
        const moveArbiter = this.moveArbiter

        // because we don't know the starting square, we have to inspect the game state
        // to figure out how to make the move
        let possibleMoves: Array<ChessMove> = [];
        moveArbiter.squares64
            .getPieceSquares(piece.color, piece.type)
            .forEach((square: Square) => {
                const samePieceMove = moveArbiter.getLegalMoves(square.name,
                    (move) => move.newSquare === notation.newSquare
                ).first()
                if(samePieceMove){
                    possibleMoves.push(samePieceMove)
                }
            })

        if(possibleMoves.length === 0){
            throw new Error(`Move is illegal: ` + notation.serialize())
        }

        if(possibleMoves.length === 1){
            return possibleMoves[0]
        }

        let fileMatches: ChessMove[] = []
        let rankMatches: ChessMove[] = []
        let rankAndFileMatches: ChessMove[] = []

        // apply disambiguation
        possibleMoves.forEach((move: ChessMove) => {
            const [candidateStartFile, candidateStartRank] = Square.getFileAndRank(move.oldSquare)

            const matchesFile = notation.startFile && (notation.startFile === candidateStartFile)
            const matchesRank = notation.startRank && (notation.startRank === candidateStartRank)
            if(matchesFile){
                fileMatches.push(move)
            }
            if(matchesRank){
                rankMatches.push(move)
            }
            if(matchesRank && matchesFile){
                rankAndFileMatches.push(move)
            }
        })

        // should disambiguate on file first
        if(fileMatches.length === 1){
            if(notation.startRank && notation.startRank !== Square.getFileAndRank(fileMatches[0].oldSquare)[1]){
                throw new Error(`Invalid disambiguation: "${notation.serialize()}". Unexpected rank.`)
            }
            notation.startRank = null;

            return fileMatches[0]
        }

        if(!notation.startRank && !notation.startFile){
            throw new Error('Move requires disambiguation')
        }

        if(rankMatches.length === 1){

            if(notation.startFile && notation.startFile !== Square.getFileAndRank(rankMatches[0].oldSquare)[0]){
                throw new Error(`Invalid disambiguation: "${notation.serialize()}". Unexpected file.`)
            }
            notation.startFile = null;

            return rankMatches[0]
        }

        if(rankAndFileMatches.length === 1){
            return rankAndFileMatches[0]
        }

        if(notation.startFile && !notation.startRank && fileMatches.length > 1){
            throw new Error('Move is ambiguous.')
        }

        if(notation.startRank && !notation.startFile && rankMatches.length > 1){
            throw new Error('Move is ambiguous.')
        }

        throw new Error('Move disambiguation invalid.')
    }

    #fromCoordinateNotation(notation: CoordinateNotation): ChessMove
    {
        const possibleMoves = this.moveArbiter
            .getLegalMoves(notation.oldSquare, (possibleMove: ChessMove) => possibleMove.newSquare === notation.newSquare )

        const move = possibleMoves.first()
        if(!move){
            throw new Error(`Move is illegal: ` + notation.serialize())
        }

        return move
    }
}