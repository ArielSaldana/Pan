export abstract class EventEmitter {
    eventMap = new Map();

    internalEmit(eventKey: string, eventInformation: object): void {
        if (this.eventMap.has(eventKey)) {
            this.eventMap.get(eventKey).forEach((value) => {
                value(eventInformation);
            });
        }
    }

    internalOn(eventKey: Object, eventCallback: Object): void {
        let arr;
        if (this.eventMap.get(eventKey)) {
            arr = this.eventMap.get(eventKey)
        } else {
            arr = Array()
            this.eventMap.set(eventKey, arr)
        }
        arr.push(eventCallback);
    }

    emit(eventKey: string, eventInformation: object) {
        this.internalEmit(eventKey, eventInformation);
    }

    on(eventKey: Object, eventCallback: Object) {
        this.internalOn(eventKey, eventCallback);
    }
}
