import { EventEmitter } from '../../event-emitter/EventEmitter'

export default class Mouse extends EventEmitter {
    settings = {
        isMouseOnMoveEnabled: false,
        isMouseClickEnabled: false,
        element: window
    }

    public static instance: Mouse
    public static getInstance(settings: any | undefined): Mouse | undefined {
        if (typeof window !== 'undefined') {
            if (Mouse.instance === undefined) {
                Mouse.instance = new Mouse(settings)
            }
            return Mouse.instance
        }
    }

    constructor (settings: any) {
        super()
        if (settings?.element !== undefined) {
            this.settings.element = settings.element
        }
    }

    override events = new Map(
        Object.entries({
            move: {
                initFunction: () => { this.registerMouseMoveEventListener() },
                destroyFunction: () => { this.destroyMouseMoveEventListener() },
                callbacks: []
            },
            click: {
                initFunction: () => { this.registerMouseClickEventListener() },
                destroyFunction: () => { this.destroyMouseClickEventListener() },
                callbacks: []
            }
        })
    )

    mouseMove(eventInformation): void {
        const location = {
            x: eventInformation.clientX,
            y: eventInformation.clientY
        }
        this.emit('move', location, eventInformation)
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
            this.settings.element.addEventListener('mousemove', (ev) => {
                this.mouseMove(ev)
            })
            this.settings.isMouseOnMoveEnabled = true
        }
    }

    destroyMouseMoveEventListener(): void {
        this.settings.element.removeEventListener('mousemove', this.mouseMove)
        this.settings.isMouseOnMoveEnabled = false
    }

    registerMouseClickEventListener(): void {
        if (!this.settings.isMouseClickEnabled) {
            this.settings.element.addEventListener('click', (ev) => {
                this.mouseClick(ev)
            })
            this.settings.isMouseClickEnabled = true
        }
    }

    destroyMouseClickEventListener(): void {
        this.settings.element.removeEventListener('click', this.mouseMove)
        this.settings.isMouseClickEnabled = false
    }
}
