import { EventEmitter } from '../Pan'

export default class Screen extends EventEmitter {
    beforeOnEventListenerSetup (eventKey: string): void {}
}