import { EventFunctions } from './EventFunctions'

export abstract class EventEmitter {
    eventMap = new Map()
    functionsMap = new Map<string, EventFunctions>()

    //     protected beforeOnEventListenerSetup(eventKey: string): void { console.warn("Being called from protected")  }
    abstract beforeOnEventListenerSetup(eventKey: string): void

    internalEmit(eventKey: string, eventInformation: object): void {
        if (this.eventMap.has(eventKey)) {
            this.eventMap.get(eventKey).forEach((value) => {
                value(eventInformation)
            })
        }
    }

    internalOn(eventKey: string, eventCallback: Object): void {
        this.beforeOnEventListenerSetup(eventKey)
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
