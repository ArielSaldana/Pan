import {beforeAll, afterAll, describe, expect, test} from '@jest/globals'
import TickerEventList from "../../src/tools/ticker/TickerEventList";

describe('Test TickerEventList.ts', () => {
    let ticketEventStream
    let firstDate, secondDate, thirdDate, fourthDate
    let firstNode, secondNode, thirdNode, fourthNode
    beforeAll(async () => {
        ticketEventStream = new TickerEventList()

        firstDate = new Date()
        firstDate.setSeconds(firstDate.getSeconds() + 10 )

        secondDate = new Date()
        secondDate.setSeconds(secondDate.getSeconds() + 20 )

        thirdDate = new Date()
        thirdDate.setSeconds(thirdDate.getSeconds() + 500 )

        fourthDate = new Date()
        fourthDate.setSeconds(fourthDate.getSeconds() + 1000 )

        firstNode = {
            callback: () => {},
            executeBy: firstDate,
        }

        secondNode = {
            callback: () => {},
            executeBy: secondDate,
        }

        thirdNode = {
            callback: () => {},
            executeBy: thirdDate,
        }

        fourthNode = {
            callback: () => {},
            executeBy: fourthDate,
        }
    })
    test('Test placing a new item at the root of the list', async () => {
        ticketEventStream.addNode(secondNode)
        expect(ticketEventStream.root).toBe(secondNode)
    })

    test('Test placing a new item that should replace the root item', async () => {
        ticketEventStream.addNode(firstNode)
        expect(ticketEventStream.root).toBe(firstNode)
    })

    test('Test adding a third node, that should be placed at the end of the list', async () => {
        ticketEventStream.addNode(fourthNode)
        expect(ticketEventStream.root).toBe(firstNode)
        expect(ticketEventStream.root.next).toBe(secondNode)
        expect(ticketEventStream.root.next.next).toBe(fourthNode)
    })

    test('Test adding a fourth node, that should be placed at the middle of the list', async () => {
        ticketEventStream.addNode(thirdNode)
        expect(ticketEventStream.root).toBe(firstNode)
        expect(ticketEventStream.root.next).toBe(secondNode)
        expect(ticketEventStream.root.next.next).toBe(thirdNode)
        expect(ticketEventStream.root.next.next.next).toBe(fourthNode)
    })

    afterAll(done => {
        ticketEventStream.clean()
        done()
    })
})
