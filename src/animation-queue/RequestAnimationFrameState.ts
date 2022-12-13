export default class RequestAnimationFrameState {
    reference: any
    active: boolean
    consecutiveEmptyCalls: number

    constructor () {
        this.reference = null
        this.active = false
        this.consecutiveEmptyCalls = 0
    }
}
