import { EventEmitter } from '../event-emitter/EventEmitter';
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
