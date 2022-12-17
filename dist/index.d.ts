declare module "event-emitter/Event" {
    export interface Event {
        initFunction: () => void;
        destroyFunction: () => void;
        callbacks: Function[];
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
    import { Event } from "event-emitter/Event";
    import { AnimationQueue } from "animation-queue/AnimationQueue";
    export abstract class EventEmitter {
        animationQueue: AnimationQueue;
        abstract events: Map<string, Event>;
        isEventKeyIsValid(eventKey: string): boolean;
        isEventInitialized(eventKey: string): boolean;
        getEvent(eventKey: string): Event;
        on(eventKey: string, eventCallback: Function): void;
        off(eventKey: any): void;
        emit(eventKey: string, eventInformation: object): void;
        afterListenerConfigured(callback: Function): void;
    }
}
declare module "tools/Mouse" {
    import { EventEmitter } from "event-emitter/EventEmitter";
    export default class Mouse extends EventEmitter {
        settings: {
            isMouseOnMoveEnabled: boolean;
            isMouseClickEnabled: boolean;
        };
        static instance: Mouse;
        static getInstance(): Mouse;
        events: Map<string, {
            initFunction: () => void;
            destroyFunction: () => void;
            callbacks: any[];
        } | {
            initFunction: () => void;
            destroyFunction: () => void;
            callbacks: any[];
        }>;
        mouseMove(eventInformation: any): void;
        mouseClick(eventInformation: any): void;
        registerMouseMoveEventListener(): void;
        destroyMouseMoveEventListener(): void;
        registerMouseClickEventListener(): void;
        destroyMouseClickEventListener(): void;
    }
}
declare module "tools/ViewportSettings" {
    export interface ViewportSettings {
        fireViewportInformationOnListen: boolean;
    }
}
declare module "tools/Viewport" {
    import { EventEmitter } from "event-emitter/EventEmitter";
    import { ViewportSettings } from "tools/ViewportSettings";
    export default class Viewport extends EventEmitter {
        state: {
            isViewportResizeEnabled: boolean;
        };
        settings: ViewportSettings;
        private constructor();
        static instance: Viewport;
        static getInstance(options?: ViewportSettings): Viewport;
        events: Map<string, {
            initFunction: () => void;
            destroyFunction: () => void;
            callbacks: any[];
        }>;
        viewportResize(): void;
        registerViewportResizeListener(): void;
        destroyViewportResizeListener(): void;
        afterListenerConfigured(callback: Function): void;
    }
}
declare module "Pan" {
    import Mouse from "tools/Mouse";
    import { EventEmitter } from "event-emitter/EventEmitter";
    import Viewport from "tools/Viewport";
    export { EventEmitter, Mouse, Viewport };
}
