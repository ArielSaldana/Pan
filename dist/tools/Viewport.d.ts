import { EventEmitter } from '../event-emitter/EventEmitter';
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
