import { EventEmitter } from '../event-emitter/EventEmitter'

export default class Screen extends EventEmitter {
    settings = {
        isScreenResizeEnabled: false
    }

    override events = new Map(
        Object.entries({
            resize: {
                initFunction: () => { this.registerScreenResizeListener() },
                destroyFunction: () => { this.destroyScreenResizeListener() }
            }
        })
    )

    screenResize(): void {
        const location = {
            width: window.innerWidth,
            height: window.innerHeight
        }
        this.emit('resize', location)
    }

    registerScreenResizeListener(): void {
        if (!this.settings.isScreenResizeEnabled) {
            window.addEventListener('resize', () => {
                this.screenResize()
            })
            this.settings.isScreenResizeEnabled = true
        }
    }

    destroyScreenResizeListener(): void {
        window.removeEventListener('resize', this.screenResize)
        this.settings.isScreenResizeEnabled = false
    }
}
