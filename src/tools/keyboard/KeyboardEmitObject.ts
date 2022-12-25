import KeyInformation from './KeyInformation'

export default interface KeyboardEmitObject {
    key: string
    code: string
    type: string
    altKeyDown: boolean
    ctrlKeyDown: boolean
    shiftKeyDown: boolean
    keyInformation?: KeyInformation
}
