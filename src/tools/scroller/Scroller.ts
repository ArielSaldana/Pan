import ScrollerElement from './ScrollerElement'
import Scroll from '../scroll/Scroll'
import Viewport from '../viewport/Viewport'

export default class Scroller {
    scroller = Scroll.getInstance()
    viewport = Viewport.getInstance({
        fireViewportInformationOnListen: true
    })

    scrollerState = {
        x: 0,
        y: 0,
        viewportHeight: 0,
        viewportWidth: 0
    }

    elements: ScrollerElement[] = []
    constructor () {
        this.scrollerState.x = this.scroller?.getScrollState().lastXPosition as number
        this.scrollerState.y = this.scroller?.getScrollState().lastYPosition as number
        this.initScrollListener()
        this.initViewportListener()
        requestAnimationFrame(this.calculatePositions.bind(this))
    }

    initScrollListener(): void {
        if (this.scroller !== undefined) {
            console.log('initializing')
            this.scroller.on('scroll', (scrollEvent: any) => {
                this.scrollerState.x = scrollEvent.scrollX
                this.scrollerState.y = scrollEvent.scrollY
            })
        }
    }

    initViewportListener(): void {
        if (this.viewport !== undefined) {
            this.viewport.on('resize', (event: any) => {
                this.scrollerState.viewportHeight = event.height
                this.scrollerState.viewportWidth = event.width
                console.log(this.scrollerState)
            })
        }
    }

    find(element: any): number {
        let distanceFromTop = 0
        let currentElement = element

        while (currentElement !== null) {
            distanceFromTop += currentElement.offsetTop as number
            currentElement = currentElement.offsetParent
        }

        return distanceFromTop
    }

    find2(element: any): number {
        const style = window.getComputedStyle(element)
        const topPadding = parseFloat(style.paddingTop)
        const rect = element.getBoundingClientRect()
        return rect.top as number + window.pageYOffset + topPadding
    }

    whenElementInViewport(element: HTMLElement, callback: Function): void {
        this.elements.push({
            element,
            callback
        })
    }

    elementInsideViewport(element: any): boolean {
        const elementPositionFromTop = this.find(element)
        const elementEnteredViewport = element.offsetHeight as number + elementPositionFromTop
        return this.scrollerState.y + this.scrollerState.viewportHeight >= elementEnteredViewport
    }

    calculatePositions(): void {
        for (const element of this.elements) {
            if (this.elementInsideViewport(element.element)) {
                element.callback()
            }
        }
        requestAnimationFrame(this.calculatePositions.bind(this))
    }
}
