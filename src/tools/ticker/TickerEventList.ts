import TickerNode from './TickerNode'
import Ticker from './Ticker'

export default class TickerEventList {
    ticker = Ticker.getInstance()
    root: TickerNode | undefined = undefined
    length = 0
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

    /*
     * Takes in an argument in Seconds that defines how far in the future from now should the callback be called
     */
    afterSeconds(elapsedTimeInSeconds: number, callback): void {
        const executeBy = Date.now() + (elapsedTimeInSeconds * 1000)
        this.at(executeBy, callback)
    }

    /*
         * Takes in an argument in Milliseconds that defines how far in the future from now should the callback be called
         */
    after(elapsedTimeInMS: number, callback): void {
        const executeBy = Date.now() + elapsedTimeInMS
        this.at(executeBy, callback)
    }

    /*
         * Gives a specific time to add to the TimeEventList, Denoted by UNIX EPOCH
         */
    at(executeBy: Number, callback): void {
        this.addNode({
            executeBy,
            callback
        })
    }
}
