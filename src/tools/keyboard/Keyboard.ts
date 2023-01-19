import { EventEmitter } from '../../event-emitter/EventEmitter'
import KeyboardSettings from './KeyboardSettings'
import KeyboardUtils from './KeyboardUtils'
import KeyInformation from './KeyInformation'
import { Keys } from './Keys'
import KeyboardEmitObject from './KeyboardEmitObject'

export {
    Keys
}
export default class Keyboard extends EventEmitter {
    settings: KeyboardSettings = {
        allowLetters: true,
        allowNumbers: true,
        allowSpecialCharacters: true
    }

    keysmap: Map<string, KeyInformation>

    constructor (keyboardSettings: Object) {
        super()
        this.configureSettings(keyboardSettings)
        const keyboardUtils = new KeyboardUtils()
        this.keysmap = keyboardUtils.getKeysMap()
    }

    configureSettings(keyboardSettings): void {
        if (keyboardSettings !== undefined) {
            this.settings = {
                allowLetters: keyboardSettings.allowLetters !== undefined ? keyboardSettings.allowLetters : true,
                allowNumbers: keyboardSettings.allowNumbers !== undefined ? keyboardSettings.allowNumbers : true,
                allowSpecialCharacters: keyboardSettings.allowSpecialCharacters !== undefined ? keyboardSettings.allowSpecialCharacters : true
            }
        }
    }

    public static instance: Keyboard

    public static getInstance (keyboardSettings: Object): Keyboard | undefined {
        if (typeof window !== 'undefined') {
            if (Keyboard.instance === undefined) {
                Keyboard.instance = new Keyboard(keyboardSettings)
            }
            return Keyboard.instance
        }
    }

    override events = new Map(
        Object.entries({
            all: {
                initFunction: () => {
                    this.registerKeyDownEventListener()
                    this.registerKeyUpEventListener()
                },
                destroyFunction: () => {
                    this.destroyKeyDownEventListener()
                    this.destroyKeyUpEventListener()
                },
                callbacks: []
            },
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

    keyHit (eventInformation: KeyboardEvent): void {
        let emit = true
        const keyInformation = this.keysmap.get(eventInformation.key)

        if (keyInformation !== undefined) {
            emit = (keyInformation.isAlphabetic && this.settings.allowLetters) ||
                    (keyInformation.isNumeric && this.settings.allowNumbers)
            if (!emit && this.settings.allowSpecialCharacters) {
                emit = !emit
            }
        }
        if (emit) {
            const keyEmitObject: KeyboardEmitObject = {
                key: eventInformation.key,
                code: eventInformation.code,
                type: eventInformation.type,
                altKeyDown: eventInformation.altKey,
                ctrlKeyDown: eventInformation.ctrlKey,
                shiftKeyDown: eventInformation.shiftKey,
                keyInformation: keyInformation
            }
            this.emit(eventInformation.type, eventInformation.key, eventInformation)
            this.emit('all', keyEmitObject, eventInformation)
        }
    }

    registerKeyDownEventListener (): void {
        document.addEventListener('keydown', (ev) => {
            this.keyHit(ev)
        })
    }

    destroyKeyDownEventListener (): void {
        document.removeEventListener('keydown', this.keyHit)
    }

    registerKeyUpEventListener (): void {
        document.addEventListener('keyup', (ev) => {
            this.keyHit(ev)
        })
    }

    destroyKeyUpEventListener (): void {
        document.removeEventListener('keyup', this.keyHit)
    }
}
