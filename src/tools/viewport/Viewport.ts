import { EventEmitter } from '../../event-emitter/EventEmitter'
import { ViewportSettings } from './ViewportSettings'

export default class Viewport extends EventEmitter {
    state = {
        isViewportResizeEnabled: false
    }

    settings: ViewportSettings = {
        fireViewportInformationOnListen: false
    }

    private constructor (options?: ViewportSettings) {
        super()
        if (options !== undefined) {
            this.settings = {
                ...this.settings,
                ...options
            }
        }
    }

    public static instance: Viewport
    public static getInstance(options?: ViewportSettings): Viewport {
        if (window !== undefined) {
            if (Viewport.instance === undefined) {
                Viewport.instance = new Viewport(options)
            }
            return Viewport.instance
        } throw new Error('window is not defined')
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
        if (!this.state.isViewportResizeEnabled) {
            window.addEventListener('resize', () => {
                this.viewportResize()
            })
            this.state.isViewportResizeEnabled = true
        }
    }

    destroyViewportResizeListener(): void {
        window.removeEventListener('resize', this.viewportResize)
        this.state.isViewportResizeEnabled = false
    }

    override afterListenerConfigured(keyEvent: string, callback: Function): void {
        if (this.settings.fireViewportInformationOnListen) {
            const location = {
                width: window.innerWidth,
                height: window.innerHeight
            }
            callback(location)
        }
    }
}
