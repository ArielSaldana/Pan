import { EventEmitter } from '../Pan'

export default class Screen extends EventEmitter {
    settings = {
        isScreenResizeEnabled: false
    }

    events = {
        resize: {
            create: () => { this.registerScreenResizeListener() },
            destroy: () => { this.destroyScreenResizeListener() }
        }
    }

    screenResize(eventInformation): void {
        const location = {
            width: window.innerWidth,
            height: window.innerHeight
        }
        this.emit('resize', location)
    }

    beforeOnEventListenerSetup (eventKey: string): void {
        if (this.events[eventKey] !== undefined) {
            this.registerEventListenerFunction(eventKey, {
                initFunction: this.events[eventKey].create.bind(this),
                destroyFunction: this.events[eventKey].destroy.bind(this)
            })
        } else {
            console.warn('This is not a supported Event')
        }
    }

    registerScreenResizeListener(): void {
        if (!this.settings.isScreenResizeEnabled) {
            window.addEventListener('resize', (ev) => {
                this.screenResize(ev)
            })
            this.settings.isScreenResizeEnabled = true
        }
    }

    destroyScreenResizeListener(): void {
        window.removeEventListener('resize', this.screenResize)
        this.settings.isScreenResizeEnabled = false
    }
}
