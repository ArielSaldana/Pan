import Scroll from './Scroll'

export default class CustomScroll {
    scroll = Scroll.getInstance()
    scrollElem: HTMLElement

    state = {
        scrollX: 0,
        scrollY: 0
    }

    constructor () {
        this.initScrollEventsListener()
        this.hideDocumentBody()
        this.scrollElem = this.getScrollElem()
        this.scrollElem.style.overflow = 'auto'
    }

    hideDocumentBody(): void {
        document.body.style.overflow = 'hidden'
    }

    getScrollElem(): HTMLElement {
        const elem = document.querySelector('[data-pan-scroll]') as HTMLElement
        if (elem !== undefined && elem !== null) {
            return elem
        }
        throw Error('no element with data-pan-scroll found')
    }

    initScrollEventsListener(): void {
        if (this.scroll !== undefined) {
            this.scroll.on('wheel', (wheelEvent) => {
                this.scrollElem.style.transform = `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, ${wheelEvent.scrollY * -1}, 0, 1)`
            })
        }
    }
}
