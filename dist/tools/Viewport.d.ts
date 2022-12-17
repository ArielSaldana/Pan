import { EventEmitter } from '../event-emitter/EventEmitter';
export default class Viewport extends EventEmitter {
    settings: {
        isViewportResizeEnabled: boolean;
    };
    static instance: Viewport;
    static getInstance(): Viewport;
    events: Map<string, {
        initFunction: () => void;
        destroyFunction: () => void;
        callbacks: never[];
    }>;
    viewportResize(): void;
    registerViewportResizeListener(): void;
    destroyViewportResizeListener(): void;
}
