import { EventEmitter } from '../event-emitter/EventEmitter'

export default class Viewport extends EventEmitter {
    settings = {
        isViewportResizeEnabled: false
    }

    public static instance: Viewport
    public static getInstance(): Viewport {
        if (Viewport.instance === undefined) {
            Viewport.instance = new Viewport()
        }
        return Viewport.instance
    }

    override events = new Map(
        Object.entries({
            resize: {
                initFunction: () => { this.registerViewportResizeListener() },
                destroyFunction: () => { this.destroyViewportResizeListener() },
                callbacks: []
            }
        })
    )

    viewportResize(): void {
        const location = {
            width: window.innerWidth,
            height: window.innerHeight
        }
        this.emit('resize', location)
    }

    registerViewportResizeListener(): void {
        if (!this.settings.isViewportResizeEnabled) {
            window.addEventListener('resize', () => {
                this.viewportResize()
            })
            this.settings.isViewportResizeEnabled = true
        }
    }

    destroyViewportResizeListener(): void {
        window.removeEventListener('resize', this.viewportResize)
        this.settings.isViewportResizeEnabled = false
    }
}
