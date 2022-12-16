declare module "event-emitter/EventFunctions" {
    export interface EventFunctions {
        initFunction: () => void;
        destroyFunction: () => void;
    }
}
declare module "animation-queue/RequestAnimationFrameState" {
    export default class RequestAnimationFrameState {
        reference: any;
        active: boolean;
        consecutiveEmptyCalls: number;
        constructor();
    }
}
declare module "animation-queue/AnimationQueueState" {
    import RequestAnimationFrameState from "animation-queue/RequestAnimationFrameState";
    export default class State {
        requestAnimationFrame: RequestAnimationFrameState;
    }
}
declare module "animation-queue/Animation" {
    export default interface Animation {
        key: string;
        callstack: Function[];
    }
}
declare module "animation-queue/AnimationQueue" {
    import State from "animation-queue/AnimationQueueState";
    import Animation from "animation-queue/Animation";
    export class AnimationQueue {
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
}
declare module "event-emitter/EventEmitter" {
    import { EventFunctions } from "event-emitter/EventFunctions";
    import { AnimationQueue } from "animation-queue/AnimationQueue";
    export abstract class EventEmitter {
        animationQueue: AnimationQueue;
        eventMap: Map<any, any>;
        functionsMap: Map<string, EventFunctions>;
        abstract events: Map<string, EventFunctions>;
        beforeOnEventListenerSetup(eventKey: string): void;
        setupEvents(eventKey: string): void;
        internalEmit(eventKey: string, eventInformation: object): void;
        internalOn(eventKey: string, eventCallback: Object): void;
        emit(eventKey: string, eventInformation: object): void;
        on(eventKey: string, eventCallback: Object): void;
        registerEventListenerFunction(eventKey: string, eventFunction: EventFunctions): void;
        destroyEventEmitterFunction(eventKey: string): void;
    }
}
declare module "tools/Mouse" {
    import { EventEmitter } from "event-emitter/EventEmitter";
    export default class Mouse extends EventEmitter {
        settings: {
            isMouseOnMoveEnabled: boolean;
            isMouseClickEnabled: boolean;
        };
        events: Map<string, {
            initFunction: () => void;
            destroyFunction: () => void;
        } | {
            initFunction: () => void;
            destroyFunction: () => void;
        }>;
        mouseMove(eventInformation: any): void;
        mouseClick(eventInformation: any): void;
        registerMouseMoveEventListener(): void;
        destroyMouseMoveEventListener(): void;
        registerMouseClickEventListener(): void;
        destroyMouseClickEventListener(): void;
    }
}
declare module "tools/Viewport" {
    import { EventEmitter } from "event-emitter/EventEmitter";
    export default class Viewport extends EventEmitter {
        settings: {
            isViewportResizeEnabled: boolean;
        };
        events: Map<string, {
            initFunction: () => void;
            destroyFunction: () => void;
        }>;
        viewportResize(): void;
        registerViewportResizeListener(): void;
        destroyViewportResizeListener(): void;
    }
}
declare module "Pan" {
    import Mouse from "tools/Mouse";
    import { EventEmitter } from "event-emitter/EventEmitter";
    import Viewport from "tools/Viewport";
    export { EventEmitter, Mouse, Viewport };
}
