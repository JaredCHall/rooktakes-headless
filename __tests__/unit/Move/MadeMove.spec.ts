import { describe, it, expect } from 'vitest'

import {ExtendedFen} from "@chess/Position/ExtendedFEN";
import {MadeMove} from "@chess/Move/MadeMove";
import {Piece} from "@chess/Piece";
import {ChessMove} from "@chess/Move/MoveType/ChessMove";
import {GamePosition} from "@chess/Position/GamePosition";

describe('MadeMove', () => {
    it('it constructs itself', () => {

        const fenAfter = new ExtendedFen('r1b2rk1/pp3ppp/2n1p3/3pPn2/2Pp3N/3Q4/PqB2PPP/RN3RK1 b - - 1 13')
        const position = new GamePosition(fenAfter)
        const chessMove = new ChessMove('b6','b2',Piece.queenBlack(), Piece.pawnWhite())

        const madeMove = new MadeMove(chessMove, position)
        expect(madeMove.move).toBe(chessMove)
        expect(madeMove.fenAfter).toEqual(fenAfter)
        expect(madeMove.halfStepIndex).toEqual(25)
        expect(madeMove.movingColor).toEqual('black')
    })
})
