import type {ExtendedFen} from "@chess/Position/ExtendedFEN";
import type {GameClock} from "@chess/GameClock/GameClock";
import {MaterialScores} from "@chess/Position/MaterialScores";

export class GamePosition
{
    readonly extendedFEN: ExtendedFen

    readonly materialWhite: number|null = null
    readonly materialBlack: number|null = null

    readonly clockWhite: number|null = null
    readonly clockBlack: number|null = null

    constructor(
        extendedFEN: ExtendedFen,
        materialScores: MaterialScores|null = null,
        gameClock: GameClock|null = null
    ) {

        this.extendedFEN = extendedFEN.clone()

        if(materialScores){
            this.materialWhite = materialScores.white
            this.materialBlack = materialScores.black
        }

        if(gameClock){
            this.clockWhite = gameClock.timerWhite.timeRemaining
            this.clockBlack = gameClock.timerBlack.timeRemaining
        }
    }

    clone(): GamePosition {

        let materialScores = null
        if(this.materialWhite !== null && this.materialBlack !== null){
            materialScores = new MaterialScores(this.materialWhite, this.materialBlack)
        }

        return new GamePosition(
            this.extendedFEN,
            materialScores,
            null,
        )
    }
}