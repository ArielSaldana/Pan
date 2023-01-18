import { EaseInOutCirc } from './EaseInOutCirc'
import { EaseInOutCubic } from './EaseInOutCubic'
import { EaseInOutQuad } from './EaseInOutQuad'
import { EaseInOutQuint } from './EaseInOutQuint'
import { EaseInOutQuart } from './EaseInOutQuart'

const EasingUtils = {
    elapsedTimeToInput(elapsedTime: number, duration: number): number {
        return elapsedTime / duration
    },
    progressToOutput(progress: number, start: number, end: number): number {
        return start + ((end - start) * progress)
    },
    getEasingFunction(easingName: string): Function {
        switch (easingName) {
            case 'easeInOutCirc':
                return EaseInOutCirc
            case 'easeInOutCubic':
                return EaseInOutCubic
            case 'easeInOutQuad':
                return EaseInOutQuad
            case 'easeInOutQuart':
                return EaseInOutQuart
            case 'easeInOutQuint':
                return EaseInOutQuint
            default:
                throw Error('Not an easing function')
        }
    },
    ease(easingFunction: string, timeElapsed: number, duration: number) {
        return this.getEasingFunction(easingFunction)(timeElapsed / duration)
    },
    easeValue(easingFunction: string, timeElapsed: number, duration: number, start: number, end: number) {
        return this.progressToOutput(this.getEasingFunction(easingFunction)(timeElapsed / duration), start, end)
    }
}

export default EasingUtils
