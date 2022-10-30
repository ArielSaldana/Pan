import { EventEmitter } from '../EventEmitter'

export default class Mouse extends EventEmitter {
    settings = {
        isMouseOnMoveEnabled: false
    }

    mouseMove(eventInformation): void {
        const location = {
            x: eventInformation.offsetX,
            y: eventInformation.offsetY
        }
        this.emit('move', location)
    }

    on(eventKey: string, eventCallback: Object): void {
        this.internalOn(eventKey, eventCallback)
    }

    beforeOnEventListenerSetup(eventKey: string): void {
        switch (eventKey) {
            case 'move':
                if (!this.settings.isMouseOnMoveEnabled) { document.addEventListener('mousemove', (ev) => { this.mouseMove(ev) }) }
                break
            default:
                console.warn('This is not a supported Event')
        }
    }

    destroy(): void {
        document.removeEventListener('mousemove', this.mouseMove)
    }
}
