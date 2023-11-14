export class RunTimeProfiler {


    readonly name: string

    readonly executionCount: number = 0

    startTime: number|undefined

    stopTime: number|undefined

    elapsedTime: number|undefined

    averageExecutionTime: number|undefined

    runsPerSecond: number|undefined

    constructor(name: string, executionCount: number) {
        this.name = name
        this.executionCount = executionCount
    }

    start() {
        this.startTime = (new Date()).getTime()
    }

    stop() {

        if(!this.startTime){
            throw new Error('called stop() before start()')
        }
        this.stopTime = (new Date()).getTime()
        this.elapsedTime = this.stopTime - this.startTime
        this.averageExecutionTime = this.elapsedTime / 100
        this.runsPerSecond = Math.floor(1000 / this.averageExecutionTime);
    }

    print() {

        const profile = this

        console.log(`Benchmark for ${profile.name}
---------------------------------------------------
total runs:         ${profile.executionCount}
run time:           ${profile.elapsedTime}ms
average run time:   ${profile.averageExecutionTime}ms
runs per second:    ${profile.runsPerSecond}
---------------------------------------------------
`)

    }

}