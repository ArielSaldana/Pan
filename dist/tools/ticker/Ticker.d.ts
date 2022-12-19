import { EventEmitter } from '../../event-emitter/EventEmitter';
import { TickerState } from './TickerState';
import TickerEventList from './TickerEventList';
export default class Ticker extends EventEmitter {
    state: TickerState;
    tickerEventList: TickerEventList;
    events: Map<string, {
        initFunction: () => void;
        destroyFunction: undefined;
        callbacks: never[];
    }>;
    tick(currentTime: any): void;
    after(elapsedTime: number, callback: any): void;
}
