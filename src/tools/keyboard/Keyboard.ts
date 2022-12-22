import { EventEmitter } from '../../event-emitter/EventEmitter'

export default class Keyboard extends EventEmitter {
    settings = {
        isMouseOnMoveEnabled: false,
        isMouseClickEnabled: false
    }

    public static instance: Keyboard

    public static getInstance (): Keyboard {
        if (Keyboard.instance === undefined) {
            Keyboard.instance = new Keyboard()
        }
        return Keyboard.instance
    }

    override events = new Map(
        Object.entries({
            keydown: {
                initFunction: () => {
                    this.registerKeyDownEventListener()
                },
                destroyFunction: () => {
                    this.destroyKeyDownEventListener()
                },
                callbacks: []
            },
            keyup: {
                initFunction: () => {
                    this.registerKeyUpEventListener()
                },
                destroyFunction: () => {
                    this.destroyKeyUpEventListener()
                },
                callbacks: []
            }
        })
    )

    keyHit (eventInformation): void {
        console.log(eventInformation)
        this.emit('keyboard', eventInformation)
    }

    registerKeyDownEventListener (): void {
        if (!this.settings.isMouseOnMoveEnabled) {
            window.addEventListener('keydown', (ev) => {
                this.keyHit(ev)
            })
            this.settings.isMouseOnMoveEnabled = true
        }
    }

    destroyKeyDownEventListener (): void {
        window.removeEventListener('keydown', this.keyHit)
        this.settings.isMouseOnMoveEnabled = false
    }

    registerKeyUpEventListener (): void {
        if (!this.settings.isMouseOnMoveEnabled) {
            window.addEventListener('keyup', (ev) => {
                this.keyHit(ev)
            })
            this.settings.isMouseOnMoveEnabled = true
        }
    }

    destroyKeyUpEventListener (): void {
        window.removeEventListener('keyup', this.keyHit)
        this.settings.isMouseOnMoveEnabled = false
    }
}
