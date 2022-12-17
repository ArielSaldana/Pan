import { Event } from './Event';
import { AnimationQueue } from '../animation-queue/AnimationQueue';
export declare abstract class EventEmitter {
    animationQueue: AnimationQueue;
    abstract events: Map<string, Event>;
    isEventKeyIsValid(eventKey: string): boolean;
    isEventInitialized(eventKey: string): boolean;
    getEvent(eventKey: string): Event;
    on(eventKey: string, eventCallback: Function): void;
    off(eventKey: any): void;
    emit(eventKey: string, eventInformation: object): void;
}
