import type {GamePosition} from "@chess/Position/GamePosition";
import type {MadeMove} from "@chess/Move/MadeMove";
import {MoveComment} from "@chess/PgnFile/MoveComment";

export class MoveHistory
{
    moves: Record<number, MadeMove> = {} // indexed by half step

    readonly startPosition: GamePosition // Game starting position

    readonly startHalfStep: number // half steps start at 1, for the first move of the game

    protected lastHalfStep: number

    variations: Record<number, MoveHistory[]> = {} // indexed by half step

    moveComments: Record<number, MoveComment[]> = {} // indexed by half step

    repetitionTracker: {[fenPartial: string]: number} = {} // for enforcing the 3-fold repetition rule

    get length(): number {
        if(this.lastHalfStep === 0){
            return 0
        }
        return this.lastHalfStep - this.startHalfStep + 1
    }

    constructor(startPosition: GamePosition) {
        this.startPosition = startPosition
        this.startHalfStep = startPosition.extendedFEN.lastHalfStep + 1
        this.lastHalfStep = 0
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
        const expectedHalfStep = this.lastHalfStep === 0 ? this.startHalfStep : this.lastHalfStep + 1
        if(move.halfStepIndex != expectedHalfStep){
            throw new Error(`Expected MadeMove to have half step of ${expectedHalfStep} but received ${move.halfStepIndex}`)
        }

        this.moves[move.halfStepIndex] = move;
        this.lastHalfStep = move.halfStepIndex
        this.#incrementPositionRepetition(move)
    }

    get(halfStepIndex: number): MadeMove {
        if(this.length === 0){
            throw new Error(`Cannot get move at half step ${halfStepIndex} No moves in list`)
        }

        if(!this.moves.hasOwnProperty(halfStepIndex)){
            throw new Error(`Move at half step ${halfStepIndex} does not exist`)
        }

        const move = this.moves[halfStepIndex] ?? null
        if(!move){
            throw new Error('Move at half step '+halfStepIndex+' does not exist')
        }

        return move
    }

    each(callback: (move: MadeMove) => boolean|void)
    {
        if(this.lastHalfStep === 0){
            return
        }

        for(let i = this.startHalfStep; i <= this.lastHalfStep; i++)
        {
            const madeMove = this.get(i)
            if(callback(madeMove) === false){
                break
            }
        }
    }

    last(): MadeMove {
        return this.get(this.lastHalfStep)
    }

    pop(): MadeMove {
        const move = this.last()
        delete this.moves[this.lastHalfStep]
        this.lastHalfStep--
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