import { EventEmitter } from '../../event-emitter/EventEmitter'
import KeyboardSettings from './KeyboardSettings'
import KeyboardUtils from './KeyboardUtils'
import KeyInformation from './KeyInformation'

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
                allowLetters: keyboardSettings.get('allowLetters') !== undefined ? keyboardSettings.get('allowLetters') : true,
                allowNumbers: keyboardSettings.get('allowNumbers') !== undefined ? keyboardSettings.get('allowNumbers') : true,
                allowSpecialCharacters: keyboardSettings.get('allowSpecialCharacters') !== undefined ? keyboardSettings.get('allowSpecialCharacters') : true
            }
        }
    }

    public static instance: Keyboard

    public static getInstance (keyboardSettings: Object): Keyboard {
        if (Keyboard.instance === undefined) {
            Keyboard.instance = new Keyboard(keyboardSettings)
        }
        return Keyboard.instance
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

    keyHit (eventInformation): void {
        this.emit(eventInformation.type, eventInformation.key, eventInformation)
        this.emit('all', this.keysmap.get(eventInformation.key), eventInformation.type, eventInformation)
    }

    registerKeyDownEventListener (): void {
        window.addEventListener('keydown', (ev) => {
            this.keyHit(ev)
        })
    }

    destroyKeyDownEventListener (): void {
        window.removeEventListener('keydown', this.keyHit)
    }

    registerKeyUpEventListener (): void {
        window.addEventListener('keyup', (ev) => {
            this.keyHit(ev)
        })
    }

    destroyKeyUpEventListener (): void {
        window.removeEventListener('keyup', this.keyHit)
    }
}
