import type {ColorType} from "@chess/Color";

export class Player {

    readonly color: ColorType

    readonly name: string

    readonly elo: null|number

    readonly title: null|string

    constructor(color: ColorType, name: string, elo: null|number = null, title: null|string = null) {
        this.color = color
        this.name = name
        this.elo = elo
        this.title = title
    }

    static defaultWhite(): Player
    {
        return new Player('white','White')
    }
    static defaultBlack(): Player
    {
        return new Player('black','Black')
    }

}