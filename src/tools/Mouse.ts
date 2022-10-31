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
        let val = 0
        if (eventInformation.which === 1 || eventInformation.button === 0) {
            val = 0 // left click
        } else if (eventInformation.which === 3 || eventInformation.button === 2) {
            val = 1 // right click
        }

        const location = {
            x: eventInformation.offsetX,
            y: eventInformation.offsetY,
            button: val
        }
        this.emit('click', location)
    }

    on(eventKey: string, eventCallback: Object): void {
        this.internalOn(eventKey, eventCallback)
    }

    beforeOnEventListenerSetup(eventKey: string): void {
        switch (eventKey) {
            case 'move':
                if (!this.settings.isMouseOnMoveEnabled) {
                    window.addEventListener('mousemove', (ev) => {
                        this.mouseMove(ev)
                    })
                }
                break
            case 'click':
                if (!this.settings.isMouseClickEnabled) {
                    window.addEventListener('click', (ev) => {
                        this.mouseClick(ev)
                    })
                }
                break
            default:
                console.warn('This is not a supported Event')
        }
    }

    destroy(): void {
        document.removeEventListener('mousemove', this.mouseMove)
    }
}
