import { EventEmitter } from '../../event-emitter/EventEmitter'
import addEvent from '../../decorators/AddEvents'
import ScrollEmitObject from './ScrollEmitObject'
import ScrollState from './ScrollState'
import { ScrollDirection } from './ScrollDirection'

export default class Scroll extends EventEmitter {
    private constructor () {
        super()
    }

    state: ScrollState = {
        lastXPosition: 0,
        lastYPosition: 0
    }

    public static instance: Scroll
    public static getInstance(options?: any): Scroll {
        if (Scroll.instance === undefined) {
            Scroll.instance = new Scroll()
        }
        return Scroll.instance
    }

    override events = new Map()

    getScrollDirection(): ScrollDirection {
        let direction: ScrollDirection
        if (scrollY > this.state.lastYPosition) {
            direction = ScrollDirection.down
        } else if (scrollY < this.state.lastYPosition) {
            direction = ScrollDirection.up
        } else if (scrollX > this.state.lastXPosition) {
            direction = ScrollDirection.right
        } else {
            direction = ScrollDirection.left
        }

        this.state.lastXPosition = scrollX
        this.state.lastYPosition = scrollY

        return direction
    }

    @addEvent('scroll', Scroll.getInstance())
    viewportScroll(ev): ScrollEmitObject {
        return {
            scrollX: window.scrollX,
            scrollY: window.scrollY,
            scrollDirection: this.getScrollDirection()
        }
    }
}
