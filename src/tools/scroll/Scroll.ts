import { EventEmitter } from '../../event-emitter/EventEmitter'
import addEvent from '../../decorators/AddEvents'
import ScrollEmitObject from './ScrollEmitObject'
import ScrollState from './ScrollState'
import { ScrollDirection } from './ScrollDirection'
import { ScrollType } from './ScrollType'

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
        if (window !== undefined) {
            if (Scroll.instance === undefined) {
                Scroll.instance = new Scroll()
            }
            return Scroll.instance
        } else {
            throw new Error('window is not defined')
        }
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
        return direction
    }

    getWheelScrollDirection(wheelEvent: WheelEvent): ScrollDirection {
        let direction: ScrollDirection
        if (wheelEvent.deltaY > 0) {
            direction = ScrollDirection.down
        } else if (wheelEvent.deltaY < 0) {
            direction = ScrollDirection.up
        } else if (wheelEvent.deltaX > 0) {
            direction = ScrollDirection.right
        } else {
            direction = ScrollDirection.left
        }
        return direction
    }

    getWheelEventHardwareSource(wheelEvent: WheelEvent): ScrollType {
        if (wheelEvent.deltaY % 1 !== 0 && Math.abs(wheelEvent.deltaX) === 0) {
            return ScrollType.MOUSE_WHEEL
        } else {
            return ScrollType.TRACKPAD
        }
    }

    @addEvent('scroll', Scroll.getInstance())
    viewportScroll(ev): ScrollEmitObject {
        this.state.lastXPosition = scrollX
        this.state.lastYPosition = scrollY
        return {
            scrollX: window.scrollX,
            scrollY: window.scrollY,
            scrollDirection: this.getScrollDirection()
        }
    }

    @addEvent('wheel', Scroll.getInstance())
    wheelScroll(wheelEvent: WheelEvent): any {
        this.state.lastXPosition += wheelEvent.deltaX
        this.state.lastYPosition += wheelEvent.deltaY
        return {
            rawEvent: wheelEvent,
            scrollSource: this.getWheelEventHardwareSource(wheelEvent),
            scrollDirection: this.getWheelScrollDirection(wheelEvent),
            scrollX: this.state.lastXPosition,
            scrollY: this.state.lastYPosition,
            deltaX: wheelEvent.deltaX,
            deltaY: wheelEvent.deltaY
        }
    }
}
