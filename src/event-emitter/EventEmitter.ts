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
            console.warn('This is not a supported event')
        }

        const event = this.getEvent(eventKey)
        if (!this.isEventInitialized(eventKey)) {
            event.initFunction()
        }
        event.callbacks.push(eventCallback)
    }

    emit(eventKey: string, eventInformation: object): void {
        if (this.isEventKeyIsValid(eventKey)) {
            this.getEvent(eventKey).callbacks.forEach((callback) => {
                callback(eventInformation)
            })
        }
    }

//    destroyEventEmitterFunction(eventKey: string): void {
//        if (this.functionsMap.has(eventKey)) {
//            const registeredFunctions = this.functionsMap.get(eventKey)
//
//            if (registeredFunctions !== null && registeredFunctions !== undefined) {
//                registeredFunctions.destroyFunction()
//            }
//
//            this.functionsMap.delete(eventKey)
//        } else {
//            console.warn('Function key does not exist, calling destroy failed')
//        }
//    }
}
