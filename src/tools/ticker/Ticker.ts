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
        ticks: 0,
        previousTickTimeStamp: 0
    }

    tickerEventList: TickerEventList = new TickerEventList()

    override events = new Map(
        Object.entries({
            tick: {
                initFunction: () => {
                    const currentDate = new Date()
                    this.state.startTime = currentDate.getTime()
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

    after(elapsedTime: number, callback): void {
        const executeBy = new Date()
        executeBy.setMilliseconds(executeBy.getMilliseconds() + elapsedTime)
        this.tickerEventList.addNode({
            executeBy,
            callback
        })
    }
}
