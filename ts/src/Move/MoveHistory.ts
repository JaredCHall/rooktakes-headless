import type {GamePosition} from "@chess/Position/GamePosition";
import type {MadeMove} from "@chess/Move/MadeMove";
import {MoveComment} from "@chess/PgnFile/MoveComment";

export class MoveHistory
{
    moves: MadeMove[] = []

    startPosition: GamePosition // Game starting position

    variations: Record<number, MoveHistory[]> = []

    moveComments: Record<number, MoveComment[]> = []

    repetitionTracker: {[fenPartial: string]: number} = {} // for enforcing the 3-fold repetition rule

    get length(): number {
        return this.moves.length
    }

    constructor(startPosition: GamePosition) {
        this.startPosition = startPosition
        const fenPartial = startPosition.extendedFEN?.toString(false,false)
        this.repetitionTracker[fenPartial] = 1
    }

    addVariation(moveIndex: number, moveHistory: MoveHistory): void {
        const fenAtIndex = this.getPositionBefore(moveIndex + 1).extendedFEN;
        if(moveHistory.startPosition.extendedFEN.toString() != fenAtIndex.toString()){
            throw new Error(`Cannot add variation. Fen mismatch for given arguments.
moveIndex:           ${moveIndex}
moveHistoryStartFen: ${moveHistory.startPosition.extendedFEN.toString(true)}
fenAtIndex:          ${fenAtIndex.toString(true)}
            `)
        }

        if(!this.variations.hasOwnProperty(moveIndex)){
            this.variations[moveIndex] = []
        }

        this.variations[moveIndex].push(moveHistory)
    }

    addMoveComment(moveIndex: number, comment: string){
        if(!this.moveComments.hasOwnProperty(moveIndex)){
            this.moveComments[moveIndex] = []
        }

        this.moveComments[moveIndex].push(new MoveComment(comment))
    }

    add(move: MadeMove): void {
        this.moves.push(move)
        this.#incrementPositionRepetition(move)
    }

    get(moveIndex: number): MadeMove {
        const indexActual = moveIndex - 1
        const move = this.moves[indexActual] ?? null
        if(!move){
            throw new Error('Move at half step '+moveIndex+' does not exist')
        }

        return move
    }

    pop(): MadeMove {
        const move = this.moves.pop()
        if(move === undefined){
            throw new Error('nothing to pop')
        }
        this.#decrementPositionRepetition(move)
        return move
    }



    getPositionBefore(moveIndex: number)
    {
        const indexActual = moveIndex - 1
        if(indexActual <= 0 || this.length === 0) {
            return this.startPosition
        }
        return this.get(indexActual).positionAfter
    }

    getPositionRepetitions(move: MadeMove): number
    {
        const fenPartial = move.fenAfter.toString(false, false)
        return this.repetitionTracker[fenPartial]
    }

    #incrementPositionRepetition(move: MadeMove){
        const fenPartial = move.fenAfter.toString(false, false)
        if(!this.repetitionTracker.hasOwnProperty(fenPartial)){
            this.repetitionTracker[fenPartial] = 1
        }else{
            this.repetitionTracker[fenPartial]++
        }
    }
    #decrementPositionRepetition(move: MadeMove) {
        const fenPartial = move.fenAfter.toString(false, false)
        this.repetitionTracker[fenPartial]--;
    }
}