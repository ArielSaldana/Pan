import { EventEmitter } from '../event-emitter/EventEmitter'

export default class Viewport extends EventEmitter {
    settings = {
        isViewportResizeEnabled: false
    }

    override events = new Map(
        Object.entries({
            resize: {
                initFunction: () => { this.registerViewportResizeListener() },
                destroyFunction: () => { this.destroyViewportResizeListener() }
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
