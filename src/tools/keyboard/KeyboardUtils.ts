import KeyInformation from './KeyInformation'
import { Keys } from './Keys'

export default class KeyboardUtils {
    modifierKeys = [
        Keys.Alt,
        Keys.CapsLock,
        Keys.Ctrl,
        Keys.Meta,
        Keys.NumLock,
        Keys.ScrollLock,
        Keys.Shift
    ]

    whitespaceKeys = [
        Keys.Enter,
        Keys.Tab,
        Keys.Space
    ]

    navigationKeys = [
        Keys.UpArrow,
        Keys.RightArrow,
        Keys.DownArrow,
        Keys.LeftArrow,
        Keys.Home,
        Keys.End,
        Keys.PageUp,
        Keys.PageDown
    ]

    editingKeys = [
        Keys.Backspace,
        Keys.Clear,
        Keys.Delete,
        Keys.Insert
    ]

    uiKeys = [
        Keys.Cancel,
        Keys.ContextMenu,
        Keys.Escape,
        Keys.Execute,
        Keys.Select,
        Keys.Pause
    ]

    functionKeys = [
        Keys.F1,
        Keys.F2,
        Keys.F3,
        Keys.F4,
        Keys.F5,
        Keys.F6,
        Keys.F7,
        Keys.F8,
        Keys.F9,
        Keys.F10,
        Keys.F11,
        Keys.F12,
        Keys.F13
    ]

    alphabeticalKeys = [
        Keys.LowercaseA,
        Keys.LowercaseB,
        Keys.LowercaseC,
        Keys.LowercaseD,
        Keys.LowercaseE,
        Keys.LowercaseF,
        Keys.LowercaseG,
        Keys.LowercaseH,
        Keys.LowercaseI,
        Keys.LowercaseJ,
        Keys.LowercaseK,
        Keys.LowercaseL,
        Keys.LowercaseM,
        Keys.LowercaseN,
        Keys.LowercaseO,
        Keys.LowercaseP,
        Keys.LowercaseQ,
        Keys.LowercaseR,
        Keys.LowercaseS,
        Keys.LowercaseT,
        Keys.LowercaseU,
        Keys.LowercaseV,
        Keys.LowercaseW,
        Keys.LowercaseX,
        Keys.LowercaseY,
        Keys.LowercaseZ,
        Keys.UppercaseA,
        Keys.UppercaseB,
        Keys.UppercaseC,
        Keys.UppercaseD,
        Keys.UppercaseE,
        Keys.UppercaseF,
        Keys.UppercaseG,
        Keys.UppercaseH,
        Keys.UppercaseI,
        Keys.UppercaseJ,
        Keys.UppercaseK,
        Keys.UppercaseL,
        Keys.UppercaseM,
        Keys.UppercaseN,
        Keys.UppercaseO,
        Keys.UppercaseP,
        Keys.UppercaseQ,
        Keys.UppercaseR,
        Keys.UppercaseS,
        Keys.UppercaseT,
        Keys.UppercaseU,
        Keys.UppercaseV,
        Keys.UppercaseW,
        Keys.UppercaseX,
        Keys.UppercaseY,
        Keys.UppercaseZ
    ]

    numpadNumericKeys = [
        Keys.Numpad0,
        Keys.Numpad1,
        Keys.Numpad2,
        Keys.Numpad3,
        Keys.Numpad4,
        Keys.Numpad5,
        Keys.Numpad6,
        Keys.Numpad7,
        Keys.Numpad8,
        Keys.Numpad9
    ]

    numericKeys = [
        Keys.Digit0,
        Keys.Digit1,
        Keys.Digit2,
        Keys.Digit3,
        Keys.Digit4,
        Keys.Digit5,
        Keys.Digit6,
        Keys.Digit7,
        Keys.Digit8,
        Keys.Digit9,
        ...this.numpadNumericKeys
    ]

    numericKeyPad = [
        Keys.Decimal,
        Keys.Multiply,
        Keys.Add,
        Keys.Subtract,
        Keys.Divide,
        ...this.numpadNumericKeys
    ]

    punctuationMarkKeys = [
        Keys.Semicolon,
        Keys.Equal,
        Keys.Comma,
        Keys.Dash,
        Keys.Period,
        Keys.ForwardSlash,
        Keys.GraveAccent,
        Keys.OpenBracket,
        Keys.BackSlash,
        Keys.CloseBracket,
        Keys.SingleQuote
    ]

    getKeysMap(): Map<string, KeyInformation> {
        const keymap: Map<string, KeyInformation> = new Map(
            [
                ...this.alphabeticalKeys,
                ...this.numericKeys,
                ...this.modifierKeys,
                ...this.whitespaceKeys,
                ...this.navigationKeys,
                ...this.editingKeys,
                ...this.uiKeys,
                ...this.functionKeys,
                ...this.numericKeyPad,
                ...this.punctuationMarkKeys
            ].map(item => {
                const defaultKeyInformation: KeyInformation = {
                    isAlphabetic: false,
                    isNumeric: false,
                    isNumpad: false,
                    isAlphanumeric: false,
                    isFunctionKey: false,
                    isNavigationKey: false,
                    isWhitespaceKey: false,
                    isModifierKey: false,
                    isPunctuationKey: false,
                    value: item
                }

                if (this.alphabeticalKeys.includes(item)) {
                    defaultKeyInformation.isAlphabetic = true
                    defaultKeyInformation.isAlphanumeric = true
                }

                if (this.numericKeys.includes(item)) {
                    defaultKeyInformation.isNumeric = true
                    defaultKeyInformation.isAlphanumeric = true
                }

                if (this.numpadNumericKeys.includes(item)) {
                    defaultKeyInformation.isNumpad = true
                }

                if (this.functionKeys.includes(item)) {
                    defaultKeyInformation.isFunctionKey = true
                }

                if (this.navigationKeys.includes(item)) {
                    defaultKeyInformation.isNavigationKey = true
                }

                if (this.whitespaceKeys.includes(item)) {
                    defaultKeyInformation.isWhitespaceKey = true
                }

                if (this.modifierKeys.includes(item)) {
                    defaultKeyInformation.isModifierKey = true
                }

                if (this.punctuationMarkKeys.includes(item)) {
                    defaultKeyInformation.isPunctuationKey = true
                }

                return [item, defaultKeyInformation]
            })
        )
        return keymap
    }
}
