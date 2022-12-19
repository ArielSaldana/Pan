import TickerNode from './TickerNode';
export default class TickerEventList {
    root: TickerNode | undefined;
    length: number;
    addNode(node: TickerNode): void;
    getAllReadyToExecute(): Generator<TickerNode>;
    clean(): void;
}
