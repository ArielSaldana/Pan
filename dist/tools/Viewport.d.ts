import { EventEmitter } from '../event-emitter/EventEmitter';
import { ViewportSettings } from './ViewportSettings';
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
        callbacks: never[];
    }>;
    viewportResize(): void;
    registerViewportResizeListener(): void;
    destroyViewportResizeListener(): void;
    afterListenerConfigured(callback: Function): void;
}
