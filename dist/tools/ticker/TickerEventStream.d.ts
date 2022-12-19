import TickerNode from "./TickerNode";
export default class TickerEventStream {
    root: TickerNode | undefined;
    length: number;
    addNode(node: TickerNode): void;
}
