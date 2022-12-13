import { EventEmitter } from '../event-emitter/EventEmitter'

export default class Mouse extends EventEmitter {
    settings = {
        isMouseOnMoveEnabled: false,
        isMouseClickEnabled: false
    }

    override events = new Map(
        Object.entries({
            move: {
                initFunction: () => { this.registerMouseMoveEventListener() },
                destroyFunction: () => { this.destroyMouseMoveEventListener() }
            },
            click: {
                initFunction: () => { this.registerMouseClickEventListener() },
                destroyFunction: () => { this.destroyMouseClickEventListener() }
            }
        })
    )

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
