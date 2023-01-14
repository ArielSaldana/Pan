import TickerEventList from './TickerEventList'
import Ticker from './Ticker'

export default class TickerEventListAnimator {
    tickerEventList: TickerEventList = new TickerEventList()
    ticker = Ticker.getInstance()
    constructor () {
        this.ticker.on('tick', this.animateOnTick)
    }

    animateOnTick(): void {
        const it = this.tickerEventList.getAllReadyToExecute()
        let result = it.next()
        while (result.done !== true) {
            result.value.callback()
            result = it.next()
        }
    }
}
