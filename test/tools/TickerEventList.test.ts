import {beforeAll, afterAll, describe, expect, test} from '@jest/globals'
import TickerEventList from "../../src/tools/ticker/TickerEventList";

// at top
declare const global: any

// before test

describe('Test TickerEventList.ts', () => {
    let tickerEventStream: TickerEventList
    let firstDate, secondDate, thirdDate, fourthDate
    let firstNode, secondNode, thirdNode, fourthNode

    beforeAll(async () => {
        tickerEventStream = new TickerEventList()

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
        tickerEventStream.addNode(secondNode)
        expect(tickerEventStream.root).toBe(secondNode)
    })

    test('Test placing a new item that should replace the root item', async () => {
        tickerEventStream.addNode(firstNode)
        expect(tickerEventStream.root).toBe(firstNode)
    })

    test('Test adding a third node, that should be placed at the end of the list', async () => {
        tickerEventStream.addNode(fourthNode)
        expect(tickerEventStream.root).toBe(firstNode)
        expect(tickerEventStream.root!.next).toBe(secondNode)
        expect(tickerEventStream.root!.next!.next).toBe(fourthNode)
    })

    test('Test adding a fourth node, that should be placed at the middle of the list', async () => {
        tickerEventStream.addNode(thirdNode)
        expect(tickerEventStream.root).toBe(firstNode)
        expect(tickerEventStream.root!.next).toBe(secondNode)
        expect(tickerEventStream.root!.next!.next).toBe(thirdNode)
        expect(tickerEventStream.root!.next!.next!.next).toBe(fourthNode)
    })

    afterAll(done => {
        tickerEventStream.clean()
        done()
    })
})
