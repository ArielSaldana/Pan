// TODO: Default theme setting with toggle and state persist

import { EventEmitter } from '../../Pan'
import LocalStorageFactory from '../local-storage/LocalStorageFactory'
import ThemeSettings from './ThemeSettings'
import { Modes } from './Modes'

export default class Theme extends EventEmitter {
    localStorage = LocalStorageFactory('Theme')
    override events = new Map(
        Object.entries({
            change: {
                initFunction: () => {
                    this.registerWindowChangeEventListener()
                },
                destroyFunction: () => {
                    this.destroyWindowChangeEventListener()
                },
                callbacks: []
            }
        })
    )

    state = {
        isDarkThemeEnabled: false,
        isLightThemeEnabled: false
    }

    settings: ThemeSettings = { }

    public static instance: Theme
    public static getInstance (themeSettings: ThemeSettings): Theme {
        if (Theme.instance === undefined) {
            Theme.instance = new Theme(themeSettings)
        }
        return Theme.instance
    }

    static lightModeClassName = 'pan-system-light-mode'
    static darkModeClassname = 'pan-system-dark-mode'

    private constructor (themeSettings: ThemeSettings) {
        super()
        this.initSettings(themeSettings)
        this.initialize()
    }

    initialize(): void {
        let stateInitialized = false

        if (this.settings.defaultTheme !== undefined) {
            stateInitialized = this.initStateFromUserSettingsDefault()
        }

        if (this.settings.useLocalStorage === true || !stateInitialized) {
            stateInitialized = this.initStateFromLocalStorage()
        }

        if (this.settings.useSystemSettings === true || !stateInitialized) {
            stateInitialized = this.initStateFromSystemSettings()
        }

        if (!stateInitialized) {
            throw Error('Failed to initialize theme')
        }
    }

    initSettings(themeSettings: ThemeSettings): void {
        if (themeSettings.useSystemSettings !== true) {
            const theme = themeSettings.defaultTheme
            if (theme === undefined) {
                throw Error('Default theme not set')
            }

            if (theme !== Modes.DARK && theme !== Modes.LIGHT) {
                throw Error('Invalid theme set')
            }
        } else {
            if (themeSettings.useLocalStorage === true) {
                throw Error('Disable local storage when using system settings')
            }
        }
        this.settings = themeSettings
    }

    initStateFromUserSettingsDefault(): boolean {
        if (this.settings.defaultTheme === Modes.DARK) {
            this.state.isDarkThemeEnabled = true
            this.state.isLightThemeEnabled = false
        } else if (this.settings.defaultTheme === Modes.LIGHT) {
            this.state.isLightThemeEnabled = true
            this.state.isDarkThemeEnabled = false
        } else {
            throw Error('Failed to init state from implied default theme')
        }
        return true
    }

    initStateFromLocalStorage(): boolean {
        if (this.localStorage.get('state') !== undefined) {
            this.state = this.localStorage.get('state')
            return true
        }
        return false
    }

    initStateFromSystemSettings(): boolean {
        if (document.documentElement.classList.contains(Theme.darkModeClassname)) {
            this.state.isDarkThemeEnabled = true
        } else if (document.documentElement.classList.contains(Theme.lightModeClassName)) {
            this.state.isLightThemeEnabled = true
        } else {
            throw Error('Failed to init from system settings')
        }
        return true
    }

    toggleTheme(): void {
        if (this.settings.useSystemSettings === true) {
            throw Error('Not allowed to toggle with useSystemSettings')
        }

        if (this.state.isDarkThemeEnabled) {
            this.toggleLightTheme()
        } else {
            this.toggleDarkTheme()
        }
    }

    toggleDarkTheme(): void {
        if (!this.state.isDarkThemeEnabled) {
            document.documentElement.classList.add(Theme.darkModeClassname)
            document.documentElement.classList.remove(Theme.lightModeClassName)
            this.state.isDarkThemeEnabled = true
            this.state.isLightThemeEnabled = false
        }
        this.saveUsingLocalStorage()
        this.themeChange(undefined)
    }

    toggleLightTheme(): void {
        if (!this.state.isLightThemeEnabled) {
            document.documentElement.classList.add(Theme.lightModeClassName)
            document.documentElement.classList.remove(Theme.darkModeClassname)
            this.state.isDarkThemeEnabled = false
            this.state.isLightThemeEnabled = true
        }
        this.saveUsingLocalStorage()
        this.themeChange(undefined)
    }

    saveUsingLocalStorage(): void {
        if (this.settings.useLocalStorage === true) {
            this.localStorage.add('state', this.state)
        }
    }

    static isDarkModeEnabled(): boolean {
        return window.matchMedia('(prefers-color-scheme: dark)').matches
    }

    static setDocumentTheme(): void {
        if (this.isDarkModeEnabled()) {
            document.documentElement.classList.add(this.darkModeClassname)
        } else {
            document.documentElement.classList.add(this.lightModeClassName)
        }
    }

    themeChange(windowChangeEvent): void {
        const themeString = this.state.isDarkThemeEnabled ? 'dark' : 'light'
        const emitState = {
            theme: themeString
        }
        this.emit('change', emitState, windowChangeEvent)
    }

    registerWindowChangeEventListener(): void {
        window.window.matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', (windowChangeEvent) => {
                this.themeChange(windowChangeEvent)
            })
    }

    destroyWindowChangeEventListener(): void {
        window.removeEventListener('change', this.themeChange)
    }

    override afterListenerConfigured(eventKey: string, callback: Function): void {
        if (eventKey === 'change' && this.settings.emitDefaultState === true) {
            const themeString = this.state.isDarkThemeEnabled ? 'dark' : 'light'
            const emitState = {
                theme: themeString
            }
            callback(emitState, undefined)
        }
    }
}

// add theme class to <html> tag, normal people usually use dark
Theme.setDocumentTheme()
