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

import {EventEmitter} from "../../event-emitter/EventEmitter";
import {TickerState} from "./TickerState";

export default class Ticker extends EventEmitter {

    state: TickerState = {
        hasTickerStarted: false,
    }
    override events = new Map(
        Object.entries({
            tick: {
                initFunction: () => { this.tick() },
                destroyFunction: undefined,
                callbacks: []
            }
        })
    )

    constructor() {
        super();
    }

    tick() {
        if (!this.state.hasTickerStarted) {
            this.state.previousTick = new Date()
            this.state.startTime = this.state.previousTick
            this.state.hasTickerStarted = true
        }

        if (this.state.previousTick) {
            const currentDate = new Date()
            const delta = currentDate.getTime() - this.state.previousTick.getTime()
            this.emit('tick', {
                delta: delta
            })
            this.state.previousTick = currentDate
        }
        requestAnimationFrame(this.tick.bind(this))
    }

    after(elapsedTime: number, callback) {

    }
}
