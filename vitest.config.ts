import {defineConfig} from "vitest/config";
import {resolve} from "node:path"

export default defineConfig({
    resolve: {
        alias: [
            {find: "@chess" , replacement: resolve(__dirname, "./ts/src")},
            {find: "@compiled" , replacement: resolve(__dirname, "./dist/src")}
        ]
    },
    test: {
        coverage: {
            cleanOnRerun: false,
            reporter: ['text', 'json', 'html'],
            reportsDirectory: './__tests__/__coverage__/'
        }
    }
})