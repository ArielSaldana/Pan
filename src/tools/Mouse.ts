import { EventEmitter } from '../EventEmitter'

export default class Mouse extends EventEmitter {
    settings = {
        isMouseOnMoveEnabled: false,
        isMouseClickEnabled: false
    }

    mouseMove(eventInformation): void {
        const location = {
            x: eventInformation.offsetX,
            y: eventInformation.offsetY
        }
        this.emit('move', location)
    }

    mouseClick(eventInformation): void {
        console.log(eventInformation)
    }

    on(eventKey: string, eventCallback: Object): void {
        this.internalOn(eventKey, eventCallback)
    }

    beforeOnEventListenerSetup(eventKey: string): void {
        switch (eventKey) {
            case 'move':
                if (!this.settings.isMouseOnMoveEnabled) {
                    document.addEventListener('mousemove', (ev) => {
                        this.mouseMove(ev)
                    })
                }
                break
            case 'click':
                if (!this.settings.isMouseClickEnabled) {
                    document.addEventListener('click', (ev) => {
                        this.mouseClick(ev)
                    })
                }
                break;
            default:
                console.warn('This is not a supported Event')
        }
    }

    destroy(): void {
        document.removeEventListener('mousemove', this.mouseMove)
    }
}
