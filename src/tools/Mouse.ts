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

    beforeOnEventListenerSetup(eventKey: string): void {
        switch (eventKey) {
            case 'move':
                this.registerEventListenerFunction(eventKey, {
                    initFunction: this.registerMouseMoveEventListener.bind(this),
                    destroyFunction: this.destroyMouseMoveEventListener.bind(this)
                })
                break
            case 'click':
                this.registerEventListenerFunction(eventKey, {
                    initFunction: this.registerMouseClickEventListener.bind(this),
                    destroyFunction: this.destroyMouseClickEventListener.bind(this)
                })
                break
            default:
                console.warn('This is not a supported Event')
        }
    }

    registerMouseMoveEventListener(): void {
        if (!this.settings.isMouseOnMoveEnabled) {
            window.addEventListener('mousemove', (ev) => {
                this.mouseMove(ev)
            })
            this.settings.isMouseOnMoveEnabled = true
        }
    }

    destroyMouseMoveEventListener(): void {
        window.removeEventListener('mousemove', this.mouseMove)
        this.settings.isMouseOnMoveEnabled = false
    }

    registerMouseClickEventListener(): void {
        if (!this.settings.isMouseClickEnabled) {
            window.addEventListener('click', (ev) => {
                this.mouseClick(ev)
            })
            this.settings.isMouseClickEnabled = true
        }
    }

    destroyMouseClickEventListener(): void {
        window.removeEventListener('click', this.mouseMove)
        this.settings.isMouseClickEnabled = false
    }
}
