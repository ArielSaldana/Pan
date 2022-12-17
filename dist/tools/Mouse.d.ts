import { EventEmitter } from '../event-emitter/EventEmitter';
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
        callbacks: never[];
    } | {
        initFunction: () => void;
        destroyFunction: () => void;
        callbacks: never[];
    }>;
    mouseMove(eventInformation: any): void;
    mouseClick(eventInformation: any): void;
    registerMouseMoveEventListener(): void;
    destroyMouseMoveEventListener(): void;
    registerMouseClickEventListener(): void;
    destroyMouseClickEventListener(): void;
}
