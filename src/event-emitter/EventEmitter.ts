import { Event } from './Event'
import { AnimationQueue } from '../animation-queue/AnimationQueue'

export abstract class EventEmitter {
    animationQueue = AnimationQueue.getInstance()
    abstract events: Map<string, Event>
    isEventKeyIsValid(eventKey: string): boolean {

        return this.events.has(eventKey)
    }

    isEventInitialized(eventKey: string): boolean {
        const event = this.events.get(eventKey)
        if (event !== undefined) {
            return event.callbacks.length > 0
        }
        return false
    }

    getEvent(eventKey: string): Event {
        const event = this.events.get(eventKey)
        if (event !== undefined) {
            return event
        }
        throw Error('Event was not found')
    }

    on(eventKey: string, eventCallback: Function): void {
        if (!this.isEventKeyIsValid(eventKey)) {
            throw new Error('this is not a supported event')
        }

        const event = this.getEvent(eventKey)
        if (!this.isEventInitialized(eventKey)) {
            if (event.initFunction != null) {
                event.initFunction()
            }
        }
        event.callbacks.push(eventCallback)
        this.afterListenerConfigured(eventCallback)
    }

    off(eventKey): void {
        if (!this.isEventKeyIsValid(eventKey)) {
            throw new Error('this is not a supported event')
        }

        const event = this.getEvent(eventKey)
        if (this.isEventInitialized(eventKey)) {
            while (event.callbacks.length > 0) {
                // TODO: perf this to check performance vs event.callbacks.length = 0 | events.callbacks = []
                event.callbacks.pop()
            }
            if (event.destroyFunction != null) {
                event.destroyFunction()
            }
        }
    }

    emit(eventKey: string, ...eventInformation): void {
        if (this.isEventKeyIsValid(eventKey)) {
            this.getEvent(eventKey).callbacks.forEach((callback) => {
                callback(eventInformation[0], eventInformation[1], eventInformation[2])
            })
        }
    }

    // lifecycle methods
    afterListenerConfigured(callback: Function): void { }
}
