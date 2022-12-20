import { EventEmitter } from '../../event-emitter/EventEmitter'
import { TickerState } from './TickerState'
import TickerEventList from './TickerEventList'

export default class Ticker extends EventEmitter {
    state: TickerState = {
        hasTickerStarted: false,
        ticks: 0,
        previousTickTimeStamp: 0
    }

    tickerEventList: TickerEventList = new TickerEventList()

    override events = new Map(
        Object.entries({
            tick: {
                initFunction: () => {
                    this.state.startTime = Date.now()
                    this.state.hasTickerStarted = true
                    requestAnimationFrame(this.tick.bind(this))
                },
                destroyFunction: undefined,
                callbacks: []
            }
        })
    )

    tick(currentTime): void {
        const delta = currentTime - this.state.previousTickTimeStamp
        this.state.previousTickTimeStamp = currentTime
        this.emit('tick', {
            delta
        })

        const it = this.tickerEventList.getAllReadyToExecute()
        let result = it.next()
        while (result.done !== true) {
            result.value.callback()
            result = it.next()
        }
        requestAnimationFrame(this.tick.bind(this))
    }

    /*
     * Takes in an argument in Seconds that defines how far in the future from now should the callback be called
     */
    afterSeconds(elapsedTimeInSeconds: number, callback): void {
        const executeBy = Date.now() + (elapsedTimeInSeconds * 1000)
        this.at(executeBy, callback)
    }

    /*
     * Takes in an argument in Milliseconds that defines how far in the future from now should the callback be called
     */
    after(elapsedTimeInMS: number, callback): void {
        const executeBy = Date.now() + elapsedTimeInMS
        this.at(executeBy, callback)
    }

    /*
     * Gives a specific time to add to the TimeEventList, Denoted by UNIX EPOCH
     */
    at(executeBy: Number, callback): void {
        this.tickerEventList.addNode({
            executeBy,
            callback
        })
    }
}
