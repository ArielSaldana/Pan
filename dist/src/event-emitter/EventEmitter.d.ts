import { EventFunctions } from './EventFunctions';
import { AnimationQueue } from '../animation-queue/AnimationQueue';
export declare abstract class EventEmitter {
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
