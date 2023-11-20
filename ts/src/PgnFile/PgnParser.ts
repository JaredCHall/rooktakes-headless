import {Game} from "@chess/Game/Game";

/**
 * Parsing the move steps is the most difficult part. Here are some examples we need to handle:
 *
 * 1. e4 e5 {This is a standard opening move.} 2. Nf3 Nc6 (2... d6 {The Philidor Defense}) 3. Bb5 {The Ruy Lopez opening.}
 *
 * 1. d4 d5 2. c4 e6 {The Queen's Gambit Declined.} 3. Nc3 (3. Nf3 Nf6 4. Nc3 (4. Bg5 Be7 5. e3 O-O 6. Bd3 {A standard line.}) 4... Be7) 3... Nf6
 *
 * 1. e4 {King's Pawn Opening} e5 2. Nf3 {Knight's move, targeting e5} Nc6 3. Bb5 a6 (3... g6 {Fianchetto variation}) 4. Ba4 (4. Bxc6 {Exchange Variation} dxc6 5. Nxe5 Qd4 {Attacking the knight and threatening mate on f2.}) 4... Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 d6 {Closed structure on the center.}
 *
 * 1. e4 c5 {Sicilian Defense} 2. Nf3 (2. c3 {The Alapin Variation} d5 3. exd5 Qxd5 (3... Nf6 4. d4 cxd4 5. cxd4 {White maintains a pawn center.}) 4. d4 Nf6) 2... d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 g6 {Dragon Variation.} (5... a6 {Najdorf Variation.})
 *
 * // this one should error as moves out of sequence
 * 1. e4 e5 2. Nf3 Nc6 (1... d5 {White could have played Scandinavian}) 3. Bb5
 *
 */


export class PgnParser {

    parse(content: string): Game
    {
        const game = Game.makeNewGame()
        const [headerLines, moveBody] = this.parseFileParts(content)

        this.#setHeaderLines(game, headerLines)
        this.#parseVariation(game, moveBody, 0)

        return game
    }

    parseFileParts(content: string): [headerLines: string[], movesBody: string]
    {
        content = content.replace('\r\n','\n')
        const lines = content.split('\n')

        let headerLines: string[] = []
        let movesBody: string = ''
        let foundLastHeader = false
        lines.forEach((line: string) => {
            if(line.charAt(0) === '['){
                headerLines.push(line)
            }
            if(!foundLastHeader && line === ''){
                foundLastHeader = true
            }
            if(foundLastHeader && line !== ''){
                movesBody += line + " "
            }
        })

        return [headerLines, movesBody.trimEnd()]
    }

    #parseVariation(game: Game, content: string, rDepth: number): Game {

        let moveIndex: number = game.moveIndex
        let contentRemaining = content
        let position: number = 0
        let char = ''

        const error = (msg: string): void => {
            throw new Error(msg + ` (r: ${rDepth}) at position ${position}: ${char}${contentRemaining}`)
        }

        const seek = (len: number): string => {
            if(contentRemaining.length < len){
                error('reached EOF. Cannot seek.')
            }

            content = contentRemaining.substring(0, len)
            contentRemaining = contentRemaining.substring(len)
            position += len
            return content
        }

        const seekToCommentEnd = (): string => {
            const commentEndIndex = contentRemaining.indexOf('}')
            if(commentEndIndex === -1){
                error(`Expected ending comment token '}'`)
            }
            if(commentEndIndex === 0){
                return ''
            }
            return seek(commentEndIndex + 1).substring(0,-1)
        }

        const seekToVariationEnd = (): string => {
            let variationContent = ''
            let variationOpenTokenCount = 1
            const variationStartPosition = position

            do {
                char = seek(1)
                if(char === ')'){
                    variationOpenTokenCount--
                } else if(char === '('){
                    variationOpenTokenCount++
                }
                if(variationOpenTokenCount !== 0){
                    variationContent += char
                }
            }while(variationOpenTokenCount > 0 && contentRemaining.length > 0)

            if(variationOpenTokenCount > 0){
                error(`Expected variation end token ')' but none found for variation starting at ${variationStartPosition}`)
            }

            return variationContent
        }

        let lastHalfStep = game.moveHistory.startHalfStep

        //console.log(lastHalfStep)
        let moveText = ''
        do {
            //console.log(`r: ${rDepth}, position: ${position}, remaining: ${contentRemaining}`)

            char = seek(1)
            if(char === '{'){
                const commentText = seekToCommentEnd()
                game.moveHistory.addMoveComment(moveIndex, commentText)
                continue
            }
            if(char === '('){
                const variationContent = seekToVariationEnd()
                this.#parseVariation(game.makeVariation(game.moveIndex - 1), variationContent, rDepth + 1)
                continue
            }

            if(char === ' ' || contentRemaining.length === 0){

                if(moveText === ''){
                    continue
                }

                if(contentRemaining.length === 0){
                    moveText += char
                }

                // filter out move counters, ex: '1.' '12.'
                if(!moveText.match(/[0-9]+\./)){
                    try{
                        game.makeMove(moveText)
                    }catch (e){
                        let msg = 'Unknown Error'
                        if(e instanceof Error){
                            msg = e.message
                        }
                        error(msg)
                    }
                }

                moveText = ''
                continue
            }
            moveText += char

        }while(contentRemaining.length > 0)


        return game
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