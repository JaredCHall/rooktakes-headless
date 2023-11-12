import { describe, it, expect } from 'vitest'
import {Piece} from "@chess/Piece";
import {ChessMove} from "@chess/Move/MoveType/ChessMove";
import {PawnPromotionMove} from "@chess/Move/MoveType/PawnPromotionMove";
import {MoveStep} from "@chess/Move/MoveStep";

describe('PawnPromotionMove', () => {
    it('it constructs itself', () => {

        const pawn = Piece.pawnWhite()
        const move = new PawnPromotionMove(new ChessMove('e7','e8',pawn))

        expect(move).toHaveProperty('oldSquare','e7')
        expect(move).toHaveProperty('newSquare','e8')
        expect(move.movingPiece).toBe(pawn)
        expect(move.promoteToType).toEqual('queen') // always queen for the time-being

    })

    it.each([
        ['e4','white',false],
        ['e1','white',false],
        ['e8','white',true],
        ['d4','black',false],
        ['d1','black',true],
        ['d8','black',false],
    ])('it determines if %s is on the final rank for %s', (square, color, expected) => {
        const piece = new Piece('pawn', color)
        expect(PawnPromotionMove.squareIsOnFinalRank(square, piece)).toEqual(expected)
    })

    it('it clones itself', () => {

        const pawn = Piece.pawnWhite()
        const move = new PawnPromotionMove(new ChessMove('e7','e8',pawn))
        const clone = move.clone()

        expect(clone).toEqual(move)
        expect(clone).not.toBe(move)

    })

    it('it gets move steps', () => {
        const whitePawn = Piece.pawnWhite()
        const blackPawn = Piece.pawnBlack()

        let move

        move = new PawnPromotionMove(new ChessMove('f7','f8',whitePawn),'queen')
        expect(move.getMoveSteps()).toEqual([
            new MoveStep('f7', null),
            new MoveStep('f8', Piece.queenWhite()),
        ])

        move = new PawnPromotionMove(new ChessMove('f7','f8',whitePawn),'knight')
        expect(move.getMoveSteps()).toEqual([
            new MoveStep('f7', null),
            new MoveStep('f8', Piece.knightWhite()),
        ])

        move = new PawnPromotionMove(new ChessMove('c7','d8',blackPawn, whitePawn), 'rook')
        expect(move.getMoveSteps()).toEqual([
            new MoveStep('c7', null),
            new MoveStep('d8', Piece.rookBlack()),
        ])
    })

    it('it gets undo steps', () => {
        const whitePawn = Piece.pawnWhite()
        const blackPawn = Piece.pawnBlack()

        let move

        move = new PawnPromotionMove(new ChessMove('f7','f8',whitePawn),'queen')
        expect(move.getUndoSteps()).toEqual([
            new MoveStep('f8', null),
            new MoveStep('f7', Piece.pawnWhite()),
        ])

        move = new PawnPromotionMove(new ChessMove('f7','f8',whitePawn),'knight')
        expect(move.getUndoSteps()).toEqual([
            new MoveStep('f8', null),
            new MoveStep('f7', Piece.pawnWhite()),
        ])

        move = new PawnPromotionMove(new ChessMove('c7','d8',blackPawn, whitePawn), 'rook')
        expect(move.getUndoSteps()).toEqual([
            new MoveStep('d8', null),
            new MoveStep('c7', Piece.pawnBlack()),
        ])
    })

})
