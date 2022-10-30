export abstract class EventEmitter {
    eventMap = new Map()

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
}
