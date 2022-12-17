import { EventEmitter } from '../event-emitter/EventEmitter';
export default class Viewport extends EventEmitter {
    state: {
        isViewportResizeEnabled: boolean;
    };
    settings: {
        fireViewportInformationOnListen: boolean;
    };
    private constructor();
    static instance: Viewport;
    static getInstance(options?: any): Viewport;
    events: Map<string, {
        initFunction: () => void;
        destroyFunction: () => void;
        callbacks: never[];
    }>;
    viewportResize(): void;
    registerViewportResizeListener(): void;
    destroyViewportResizeListener(): void;
    afterListenerConfigured(callback: Function): void;
}
