import {defineConfig} from "vitest/config";
import { resolve } from "node:path"

export default defineConfig({
    resolve: {
        alias: [
            {find: "@chess" , replacement: resolve(__dirname, "./ts/src")}
        ]
    }
})