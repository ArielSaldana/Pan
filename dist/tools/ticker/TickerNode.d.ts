export default interface TickerNode {
    next?: TickerNode;
    executeBy: Date;
    callback: Function;
}
