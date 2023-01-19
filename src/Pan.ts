import Mouse from './tools/mouse/Mouse'
import Keyboard from './tools/keyboard/Keyboard'
import { EventEmitter } from './event-emitter/EventEmitter'
import Viewport from './tools/viewport/Viewport'
import Ticker from './tools/ticker/Ticker'
import Theme from './tools/theme/Theme'
import LocalStorage from './tools/local-storage/LocalStorage'
import Scroll from './tools/scroll/Scroll'
import CustomScroll from './tools/scroll/CustomScroll'

const viewport = Viewport.getInstance
const mouse = Mouse.getInstance
const ticker = Ticker.getInstance

export {
    EventEmitter,
    Mouse,
    Viewport,
    Ticker,
    Keyboard,
    Theme,
    LocalStorage,
    Scroll,
    CustomScroll,
    viewport,
    mouse,
    ticker
}
