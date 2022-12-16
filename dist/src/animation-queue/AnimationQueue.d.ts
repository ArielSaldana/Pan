import State from './AnimationQueueState';
import Animation from './Animation';
export declare class AnimationQueue {
    queue: Animation[];
    private static instance;
    state: State;
    protected constructor();
    static getInstance(): AnimationQueue;
    addEvent(key: string, func: Function): void;
    processEvents(): void;
    checkAnimationFrameStatus(animationQueue: Animation[]): boolean;
    startRequestAnimationFrame(): void;
    endRequestAnimationFrame(): void;
}
