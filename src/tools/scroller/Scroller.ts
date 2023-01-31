import ScrollerElement from './ScrollerElement'
import Scroll from '../scroll/Scroll'
import Viewport from '../viewport/Viewport'
import ScrollerElementConfig from './ScrollerElementConfig'

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

    private isElementInsideViewport(element: ScrollerElement): boolean {
        if (Math.round(document.body.offsetHeight) === Math.round(this.scrollerState.y + this.scrollerState.viewportHeight)) {
            return true
        }
        const elementPositionFromTop = this.find(element.element)
        const elementEnteredViewport = element.element.offsetHeight + elementPositionFromTop
        return this.scrollerState.y + this.scrollerState.viewportHeight - element.offset >= elementEnteredViewport
    }

    private calculatePositions(): void {
        for (const element of this.elements) {
            if (this.isElementInsideViewport(element)) {
                element.callback()
            }
        }
        requestAnimationFrame(this.calculatePositions.bind(this))
    }

    whenElementInViewport(element: HTMLElement, callback: Function, config?: ScrollerElementConfig): void {
        this.elements.push({
            element,
            callback,
            offset: (config?.offset !== undefined) ? config.offset : 0
        })
    }
}