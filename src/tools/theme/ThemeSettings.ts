import { Modes } from './Modes'

export default interface ThemeSettings {
    useLocalStorage?: boolean
    useSystemSettings?: boolean
    emitDefaultState?: boolean
    defaultTheme?: Modes
}
