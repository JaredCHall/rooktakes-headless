import {Game} from "@chess/Game/Game";

export class PgnParser {

    readonly fileContent: string

    constructor(fileContent: string) {
        this.fileContent = fileContent
    }

    parse(): Game
    {
        const game = Game.makeNewGame()
        const [headerLines, moveLines] = this.parseFileParts(this.fileContent)

        this.#setHeaderLines(game, headerLines)
        this.#setMoveLines(game, moveLines)

        return game
    }

    parseFileParts(content: string): [headerLines: string[], moveLines: string[]]
    {
        content = content.replace('\r\n','\n')
        const lines = content.split('\n')

        let headerLines: string[] = []
        let moveLines: string[] = []
        let foundLastHeader = false
        lines.forEach((line: string) => {
            if(line.charAt(0) === '['){
                headerLines.push(line)
            }
            if(!foundLastHeader && line === ''){
                foundLastHeader = true
            }
            if(foundLastHeader && line !== ''){
                moveLines.push(line)
            }
        })

        return [headerLines, moveLines]
    }

    #setMoveLines(game: Game, moveLines: string[]): void {
        let movesBody = moveLines.join(' ')
        if(movesBody.match(/[{}]/)){
            throw new Error('variation parsing not currently supported')
        }

        movesBody = movesBody.replace(/\d\.\s/g, '')
        let moves = movesBody.split(' ')

        moves.forEach((move: string) => {
            game.makeMove(move)
        })
    }

    #setHeaderLines(game: Game, headerLines: string[]): void
    {

        const getKeyValue = (line: string) => {
            const parts = line.match(/^\[([a-zA-Z0-9]+)\s["']([^"']+)["']]$/)
            if(parts === null){
                throw new Error("Could not parse header line: "+line)
            }
            const key = parts[1] ?? null
            const value = parts[2] ?? null

            return [key, value]
        }

        let player1Name: string = 'White';
        let player1Elo: null|number = null;
        let player2Name: string = 'Black';
        let player2Elo: null|number = null;

        headerLines.forEach((line: string) => {
            const [key, value] = getKeyValue(line)

            switch(key){
                case 'White':
                    player1Name = value
                    break
                case 'Black':
                    player2Name = value
                    break;
                case 'WhiteElo':
                    player1Elo = parseInt(value);
                    break;
                case 'BlackElo':
                    player2Elo = parseInt(value);
                    break;
                case 'Date':
                    game.setEventDate(new Date(value.replace(/\./g,'-')))
                    break;
                case 'Event':
                    game.setEventName(value)
                    break
                case 'Site':
                    game.setSiteName(value)
                    break;
                case 'Round':
                    game.setEventRound(parseInt(value))
                    break;
            }
        })

        game.setPlayer('white', player1Name, player1Elo)
        game.setPlayer('black', player2Name, player2Elo)
    }

}