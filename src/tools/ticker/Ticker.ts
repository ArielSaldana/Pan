/*
 *
 * Ticker
 *
 * ticker.every(500, () => { }); // runs every 500 ms
 * ticker.onNextTick( () => { }); // runs once
 * ticker.on('tick', () => {}); // runs on every tick
 * ticker.after(5000, () => {}); // runs once after 5 secs
 *
 * Single link list?
 * after -> (500) -> (600) -> (700)
 * run all nodes who are below current number...
 *
 * ex: elapsedTime = 808
 * after -> (801) -> (802) -> (810) would run 801 and 802
 * use date instead of numbers like above example
 *
 */

import { EventEmitter } from '../../event-emitter/EventEmitter'
import { TickerState } from './TickerState'
import TickerEventList from './TickerEventList'

export default class Ticker extends EventEmitter {
    state: TickerState = {
        hasTickerStarted: false,
        ticks: 0
    }

    tickerEventList: TickerEventList = new TickerEventList()

    override events = new Map(
        Object.entries({
            tick: {
                initFunction: () => { requestAnimationFrame(this.tick.bind(this)) },
                destroyFunction: undefined,
                callbacks: []
            }
        })
    )

    tick(currentTime): void {
        if (!this.state.hasTickerStarted) {
            this.state.previousTick = new Date()
            this.state.startTime = this.state.previousTick
            this.state.hasTickerStarted = true
            this.state.previousTimeStamp = currentTime
        }

        if (this.state.previousTick != null) {
            const currentDate = new Date()
            const delta = currentDate.getTime() - this.state.previousTick.getTime()
            const delta2 = currentTime - this.state.previousTimeStamp
            this.emit('tick', {
                delta,
                delta2
            })
            this.state.previousTick = currentDate
        }

        const it = this.tickerEventList.getAllReadyToExecute()
        let result = it.next()
        while (result.done !== true) {
            result.value.callback()
            result = it.next()
        }

        this.state.previousTimeStamp = currentTime
        requestAnimationFrame(this.tick.bind(this))
    }

    after(elapsedTime: number, callback): void {
        const executeBy = new Date()
        executeBy.setMilliseconds(executeBy.getMilliseconds() + elapsedTime)
        this.tickerEventList.addNode({
            executeBy,
            callback
        })
    }
}
