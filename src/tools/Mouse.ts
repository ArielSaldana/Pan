import { EventEmitter } from '../EventEmitter'

export default class Mouse extends EventEmitter {

    settings = {
        isMouseOnMoveEnabled: false
    }

    mouseMove(eventInformation) {
        const location = {
            x: eventInformation.offsetX,
            y: eventInformation.offsetY
        }
        this.emit("move", location)
    }

    on(eventKey: string, eventCallback: Object) {
        switch (eventKey) {
            case "move":
                if (!this.settings.isMouseOnMoveEnabled)
                    document.addEventListener("mousemove", (ev)=> {this.mouseMove(ev)});
                this.internalOn(eventKey, eventCallback);
                break;
            default:
                console.warn("This is not a supported Event");
        }
    }

    destroy() {
        document.removeEventListener("mousemove", this.mouseMove)
    }
}
