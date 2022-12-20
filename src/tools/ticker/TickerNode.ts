export default interface TickerNode {
    next?: TickerNode
    executeBy: Number
    callback: Function
}
