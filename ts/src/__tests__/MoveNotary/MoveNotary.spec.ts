import { describe, it, expect, vi } from 'vitest'
import {ChessMove} from "@chess/Move/MoveType/ChessMove";
import {MoveNotary} from "@chess/MoveNotary/MoveNotary";
import {Piece} from "@chess/Piece";
import {PawnPromotionMove} from "@chess/Move/MoveType/PawnPromotionMove";
import {CastlingMove} from "@chess/Move/MoveType/CastlingMove";
import {MoveArbiter} from "@chess/MoveArbiter/MoveArbiter";

describe('MoveNotary' , () => {

    it('it errors on notating move out of order' , () => {
        const move = new ChessMove('e6','e5', Piece.pawnBlack())
        const notary = new MoveNotary(MoveArbiter.fromFen('rnbq1rk1/1p3pbp/p2p1np1/2p1p3/2B1PP1N/2NP4/PPP3PP/R1B1QRK1 w - - 0 10 0 0'))

        expect(() => {
            notary.getSanNotation(move).serialize()
        }).toThrowError(`method must be called before move is made`)
    })

    it('it notates simple pawn moves' , () => {
        const move = new ChessMove('d6','d5', Piece.pawnBlack())
        const notary = new MoveNotary(MoveArbiter.fromFen('rnbq1rk1/1p3pbp/p2ppnp1/2p5/2B1PP1N/2NP4/PPP3PP/R1B1QRK1 b - - 0 10'))
        const notation = notary.getSanNotation(move)
        expect(notation.serialize()).toEqual('d5')
        expect(notation.startFile).toBeNull()
        expect(notation.startRank).toBeNull()
    })

    it('it notates with pawn capture disambiguation' , () => {
        const move = new ChessMove('f4','e5', Piece.pawnWhite(), Piece.pawnBlack())
        const notary = new MoveNotary(MoveArbiter.fromFen('rnbq1rk1/1p3pbp/p2p1np1/2p1p3/2B1PP1N/2NP4/PPP3PP/R1B1QRK1 w - - 0 10'))
        const notation = notary.getSanNotation(move)
        expect(notation.serialize()).toEqual('fxe5')
        expect(notation.startFile).toEqual('f')
        expect(notation.startRank).toBeNull()
    })

    it('it notates with file disambiguation' , () => {
        const move = new ChessMove('e6','d8', Piece.knightWhite(), Piece.queenBlack())
        const notary = new MoveNotary(MoveArbiter.fromFen('rnbq1rk1/1p3pbp/p1NpNn2/2p1pP2/2B1P3/3P4/PPP3PP/R1B1QRK1 w - - 0 10'))
        const notation = notary.getSanNotation(move)
        expect(notation.serialize()).toEqual('Nexd8')
        expect(notation.startFile).toEqual('e')
        expect(notation.startRank).toBeNull()
    })

    it('it notates with rank disambiguation' , () => {
        const move = new ChessMove('e8','g7', Piece.knightWhite(), Piece.bishopBlack())
        const notary = new MoveNotary(MoveArbiter.fromFen('rnbqNrk1/1p3pbp/p2pNn2/2p1pP2/2B1P3/3P4/PPP3PP/R1B1QRK1 w - - 0 10'))
        const notation = notary.getSanNotation(move)
        expect(notation.serialize()).toEqual('N8xg7')
        expect(notation.startFile).toBeNull()
        expect(notation.startRank).toEqual(8)
    })

    it('it notates with file and rank disambiguation' , () => {
        const move = new ChessMove('b6','d7', Piece.knightWhite())
        const notary = new MoveNotary(MoveArbiter.fromFen('rNbq1rk1/1p3pbp/pN1p1N2/2p1pP2/2B1P3/3P4/PPP3PP/R1B1QRK1 w - - 0 10'))
        const notation = notary.getSanNotation(move)
        expect(notation.serialize()).toEqual('Nb6d7')
        expect(notation.startFile).toEqual('b')
        expect(notation.startRank).toEqual(6)
    })

    it('it notates piece captures' , () => {
        const move = new ChessMove('b6','b2', Piece.queenBlack(), Piece.pawnWhite())
        const notary = new MoveNotary(MoveArbiter.fromFen('r4rk1/1p1n2b1/pq2pnp1/2p1p3/4P2Q/2NPBR2/PPP3PP/4R1K1 b - - 5 16'))
        expect(notary.getSanNotation(move).serialize()).toEqual('Qxb2')
    })

    it('it notates pawn promotions' , () => {
        const baseMove = new ChessMove('d7','d8', Piece.pawnWhite())
        const move = new PawnPromotionMove(baseMove, 'knight')
        const notary = new MoveNotary(MoveArbiter.fromFen('7R/3P1k1p/5ppK/8/8/8/4R3/8 w - - 0 1'))
        expect(notary.getSanNotation(move).serialize()).toEqual('d8=N')
    })

    it('it notates castling moves' , () => {
        let move = CastlingMove.create('Q')
        let notary = new MoveNotary(MoveArbiter.fromFen('2rknb1r/ppp1nppp/5q2/1B5b/4PB2/4QP2/PPP3PP/R2K3R w - - 3 12'))
        expect(notary.getSanNotation(move).serialize()).toEqual('O-O-O')

        move = CastlingMove.create('K')
        notary = new MoveNotary(MoveArbiter.fromFen('2rknb1r/ppp1nppp/5q2/1B5b/4PB2/4QP2/PPP3PP/R2K3R w - - 3 12'))
        expect(notary.getSanNotation(move).serialize()).toEqual('O-O')

        move = CastlingMove.create('q')
        notary = new MoveNotary(MoveArbiter.fromFen('r3k2r/pbppqppp/1pn1pn2/8/1PBPP3/1P3N2/P4PPP/RNBQ1RK1 b - - 5 9'))
        expect(notary.getSanNotation(move).serialize()).toEqual('O-O-O')

        move = CastlingMove.create('k')
        notary = new MoveNotary(MoveArbiter.fromFen('r3k2r/pbppqppp/1pn1pn2/8/1PBPP3/1P3N2/P4PPP/RNBQ1RK1 b - - 5 9'))
        expect(notary.getSanNotation(move).serialize()).toEqual('O-O')
    })
})