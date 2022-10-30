export class EventEmitter {
    eventMap = new Map();

    emit(eventKey: string, ...args): void {
        if (this.eventMap.has(eventKey)) {
            this.eventMap.get(eventKey).forEach((value) => {
                value(args);
            });
        }
    }

    on(eventKey: Object, eventCallback: Object): void {
        let arr;
        if (this.eventMap.get(eventKey)) {
            arr = this.eventMap.get(eventKey)
        } else {
            arr = Array()
            this.eventMap.set(eventKey, arr)
        }
        arr.push(eventCallback);
    }
}
