import { EventEmitter } from '../../Pan'

export default class Theme extends EventEmitter {
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
        isThemeEnabled: false,
        isDarkThemeEnabled: false,
        isLightThemeEnabled: false
    }

    public static instance: Theme
    public static getInstance (themeSettings: Object): Theme {
        if (Theme.instance === undefined) {
            Theme.instance = new Theme()
        }
        return Theme.instance
    }

    static lightModeClassName = 'pan-light-mode'
    static darkModeClassname = 'pan-dark-mode'

    private constructor () {
        super()
        this.initState()
    }

    initState(): void {
        if (document.documentElement.classList.contains(Theme.darkModeClassname)) {
            this.state.isDarkThemeEnabled = true
        } else if (document.documentElement.classList.contains(Theme.lightModeClassName)) {
            this.state.isLightThemeEnabled = true
        } else {
            throw Error('Theme not initialized')
        }
        this.state.isThemeEnabled = true
    }

    toggleTheme(): void {
        this.state.isDarkThemeEnabled = !this.state.isDarkThemeEnabled
        this.state.isLightThemeEnabled = !this.state.isLightThemeEnabled

        if (this.state.isDarkThemeEnabled) {
            document.documentElement.classList.remove(Theme.lightModeClassName)
            document.documentElement.classList.add(Theme.darkModeClassname)
        } else {
            document.documentElement.classList.remove(Theme.darkModeClassname)
            document.documentElement.classList.add(Theme.lightModeClassName)
        }
    }

    static isDarkModeEnabled(): boolean {
        return window.matchMedia('(prefers-color-scheme: dark)').matches
    }

    static setDocumentTheme(): void {
        console.log(this.isDarkModeEnabled())
        if (this.isDarkModeEnabled()) {
            document.documentElement.classList.add(this.darkModeClassname)
        } else {
            document.documentElement.classList.add(this.lightModeClassName)
        }
    }

    windowChange(windowChangeEvent): void {
        this.toggleTheme()
        this.emit('', windowChangeEvent)
    }

    registerWindowChangeEventListener(): void {
        window.window.matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', (windowChangeEvent) => {
                this.windowChange(windowChangeEvent)
            })
    }

    destroyWindowChangeEventListener(): void {
        window.removeEventListener('change', this.windowChange)
    }
}

// add theme class to <html> tag, normal people usually use dark
Theme.setDocumentTheme()
