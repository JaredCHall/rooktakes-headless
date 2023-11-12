import { describe, it, expect } from 'vitest'
import {GameOptions} from "Game/GameOptions";

describe('GameOptions', () => {
    it('constructs itself', () => {
        const options = new GameOptions()
        expect(options).toBeInstanceOf(GameOptions)
    })
})