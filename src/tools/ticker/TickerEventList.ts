import TickerNode from './TickerNode'

export default class TickerEventList {
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
            if (node.executeBy.getTime() < currNode.executeBy.getTime()) {
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
            const currentTime = new Date()
            let currNode: TickerNode | undefined = this.root
            while (currNode !== undefined) {
                if (currentTime.getTime() >= currNode.executeBy.getTime()) {
                    console.log(currentTime.getTime(), currNode.executeBy.getTime())
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
