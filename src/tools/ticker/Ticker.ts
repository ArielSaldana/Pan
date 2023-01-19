import { EventEmitter } from '../../event-emitter/EventEmitter'
import { TickerState } from './TickerState'

export default class Ticker extends EventEmitter {
    static instance: Ticker
    state: TickerState = {
        hasTickerStarted: false,
        ticks: 0,
        previousTickTimeStamp: 0,
        tickProgress: Date.now(),
        paused: false
    }

    private constructor () {
        super()
    }

    static getInstance(): Ticker {
        if (typeof window !== 'undefined') {
            if (Ticker.instance === undefined) {
                Ticker.instance = new Ticker()
            }
            return Ticker.instance
        } else {
            throw new Error('window is not defined')
        }
    }

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

        if (delta < 100) {
            this.state.ticks += delta
            this.state.previousTickTimeStamp = currentTime
            this.emit('tick', {
                delta,
                tick: this.getTick(),
                tickRounded: Math.round(this.getTick())
            })
        } else {
            console.log('frame skipped')
        }
        requestAnimationFrame(this.tick.bind(this))
    }

    /*
     * Returns the ticks elapsed in ms
     */
    getTick(): number {
        return this.state.ticks
    }
}
