import { EventFunctions } from './EventFunctions'
import { AnimationQueue } from '../animation-queue/AnimationQueue'

export abstract class EventEmitter {
    animationQueue = AnimationQueue.getInstance()
    eventMap = new Map()
    functionsMap = new Map<string, EventFunctions>()

    abstract events: Map<string, EventFunctions>

    beforeOnEventListenerSetup(eventKey: string): void { }

    setupEvents(eventKey: string): void {
        if (this.events.has(eventKey)) {
            this.registerEventListenerFunction(eventKey, {
                initFunction: this.events.get(eventKey)?.initFunction.bind(this),
                destroyFunction: this.events.get(eventKey)?.destroyFunction.bind(this)
            })
        } else {
            console.warn('This is not a supported Event')
        }
    }

    internalEmit(eventKey: string, eventInformation: object): void {
        if (this.eventMap.has(eventKey)) {
            this.eventMap.get(eventKey).forEach((value) => {
                value(eventInformation)
            })
        }
    }

    internalOn(eventKey: string, eventCallback: Object): void {
        this.beforeOnEventListenerSetup(eventKey)
        this.setupEvents(eventKey)
        let arr
        if (this.eventMap.get(eventKey) !== undefined) {
            arr = this.eventMap.get(eventKey)
        } else {
            arr = []
            this.eventMap.set(eventKey, arr)
        }
        arr.push(eventCallback)
    }

    emit(eventKey: string, eventInformation: object): void {
        this.internalEmit(eventKey, eventInformation)
    }

    on(eventKey: string, eventCallback: Object): void {
        this.internalOn(eventKey, eventCallback)
    }

    registerEventListenerFunction(eventKey: string, eventFunction: EventFunctions): void {
        if (!this.functionsMap.has(eventKey)) {
            eventFunction.initFunction()
            this.functionsMap.set(eventKey, eventFunction)
        } else {
            console.warn('Function key already exists, calling register failed')
        }
    }

    destroyEventEmitterFunction(eventKey: string): void {
        if (this.functionsMap.has(eventKey)) {
            const registeredFunctions = this.functionsMap.get(eventKey)

            if (registeredFunctions !== null && registeredFunctions !== undefined) {
                registeredFunctions.destroyFunction()
            }

            this.functionsMap.delete(eventKey)
        } else {
            console.warn('Function key does not exist, calling destroy failed')
        }
    }
}
