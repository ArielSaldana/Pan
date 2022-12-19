export interface TickerState {
    hasTickerStarted: boolean
    startTime?: Date
    previousTick?: Date
    ticks: number
    previousTimeStamp?: any
}
