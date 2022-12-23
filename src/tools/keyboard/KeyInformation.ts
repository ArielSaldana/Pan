export default interface KeyboardType {
    isAlphabetic: boolean
    isNumeric: boolean
    isNumpad: boolean
    isAlphanumeric: boolean
    isFunctionKey: boolean
    isNavigationKey: boolean
    isWhitespaceKey: boolean
    isModifierKey: boolean
    isPunctuationKey: boolean
    value: string
}
