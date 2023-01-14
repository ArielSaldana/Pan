export interface TickerState {
    hasTickerStarted: boolean
    startTime?: number
    ticks: number
    previousTickTimeStamp: number
    tickProgress: number
}
