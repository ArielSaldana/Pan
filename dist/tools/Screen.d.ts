import { EventEmitter } from '../event-emitter/EventEmitter';
export default class Screen extends EventEmitter {
    settings: {
        isScreenResizeEnabled: boolean;
    };
    events: Map<string, {
        initFunction: () => void;
        destroyFunction: () => void;
    }>;
    screenResize(): void;
    registerScreenResizeListener(): void;
    destroyScreenResizeListener(): void;
}
