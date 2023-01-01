import { EventEmitter } from '../../event-emitter/EventEmitter'
import addEvent from '../../decorators/AddEvents'
import ScrollEmitObject from './ScrollEmitObject'

export default class Scroll extends EventEmitter {
    private constructor () {
        super()
    }

    public static instance: Scroll
    public static getInstance(options?: any): Scroll {
        if (Scroll.instance === undefined) {
            Scroll.instance = new Scroll()
        }
        return Scroll.instance
    }

    override events = new Map()

    @addEvent('scroll', Scroll.getInstance())
    viewportScroll(ev): ScrollEmitObject {
        return {
            scrollX: window.scrollX,
            scrollY: window.scrollY
        }
    }
}
