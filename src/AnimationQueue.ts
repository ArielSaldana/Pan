export class AnimationQueue {
    queue: Animation[] = []
    private static instance: AnimationQueue
    state: State = new State()

    protected constructor () { }

    public static getInstance(): AnimationQueue {
        if (AnimationQueue.instance === undefined) {
            AnimationQueue.instance = new AnimationQueue()
        }

        return AnimationQueue.instance
    }

    addEvent(key: string, func: Function): void {
        let found = false
        for (const item of this.queue) {
            if (item.key === key) {
                item.callstack.push(func)
                found = true
            }
        }

        if (!found) {
            this.queue.push({
                key: key,
                callstack: [func]
            })
        }

        if (!this.state.requestAnimationFrame.active) {
            this.startRequestAnimationFrame()
        }
    }

    processEvents(): void {
        if (this.checkAnimationFrameStatus(this.queue)) {
            const lengthSnapShot = this.queue.length

            for (let i = 0; i < lengthSnapShot; i++) {
                const animation = this.queue[i]
                animation.callstack[animation.callstack.length - 1]()
            }

            if (lengthSnapShot !== 0) {
                this.queue.splice(0, lengthSnapShot)
            }

            this.queue.splice(0, lengthSnapShot)
            requestAnimationFrame(this.processEvents.bind(this))
        }
    }

    checkAnimationFrameStatus(animationQueue: Animation[]): boolean {
        if (animationQueue.length === 0) {
            this.state.requestAnimationFrame.consecutiveEmptyCalls += 1
        } else {
            this.state.requestAnimationFrame.consecutiveEmptyCalls = 0
        }

        if (this.state.requestAnimationFrame.consecutiveEmptyCalls >= 600) {
            this.endRequestAnimationFrame()
            return false
        }

        return true
    }

    startRequestAnimationFrame(): void {
        this.state.requestAnimationFrame.consecutiveEmptyCalls = 0
        this.state.requestAnimationFrame.active = true
        this.state.requestAnimationFrame.reference = requestAnimationFrame(this.processEvents.bind(this))
        console.log('starting frame callstack')
    }

    endRequestAnimationFrame(): void {
        cancelAnimationFrame(this.state.requestAnimationFrame.reference)
        this.state.requestAnimationFrame.active = false
        console.log('ending frame callstack')
    }
}

class State {
    requestAnimationFrame: RequestAnimationFrameState = new RequestAnimationFrameState()
}

class RequestAnimationFrameState {
    reference: any
    active: boolean
    consecutiveEmptyCalls: number

    constructor () {
        this.reference = null
        this.active = false
        this.consecutiveEmptyCalls = 0
    }
}

interface Animation {
    key: string
    callstack: Function[]
}
