import TickerNode from './TickerNode'
import Ticker from './Ticker'

export default class TickerEventList {
    ticker: Ticker = Ticker.getInstance()
    root: TickerNode | undefined = undefined
    length = 0

    constructor() {
        this.ticker.on('tick', this.handleTick)
    }

    handleTick(): void {
        const it = this.getAllReadyToExecute()
        let result = it.next()
        while (result.done !== true) {
            result.value.callback()
            result = it.next()
        }
    }

    addNode(node: TickerNode): void {
        if (this.root === undefined) {
            this.root = node
            return
        }

        let lastNode: TickerNode | undefined
        let currNode: TickerNode | undefined = this.root
        while (currNode !== undefined) {
            if (node.executeBy < currNode.executeBy) {
                if (lastNode !== undefined) {
                    lastNode.next = node
                } else {
                    this.root = node
                }
                node.next = currNode
            } else if (currNode.next === undefined) {
                currNode.next = node
                return
            }
            lastNode = currNode
            currNode = currNode.next
        }
    }

    * getAllReadyToExecute(): Generator<TickerNode> {
        if (this.root === undefined) {
            return undefined
        } else {
            const currentTime = Date.now()
            let currNode: TickerNode | undefined = this.root
            while (currNode !== undefined) {
                if (currentTime >= currNode.executeBy) {
                    this.root = currNode.next
                    yield currNode
                }
                currNode = currNode.next
            }
        }
    }

    clean(): void {
        this.root = undefined
    }
}
