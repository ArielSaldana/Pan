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
        viewportWidth: 0,
        viewportCoordinatesTopLeft: {
            x: 0,
            y: 0
        },
        viewportCoordinatesBottomRight: {
            x: 0,
            y: 0
        }
    }

    elements: ScrollerElement[] = []

    updateScrollerStateScrollX(scrollX: number): void {
        this.scrollerState.x = scrollX
        this.updateScrollerState()
    }

    updateScrollerStateScrollY(scrollY: number): void {
        this.scrollerState.y = scrollY
        this.updateScrollerState()
    }

    updateScrollerStateViewportWidth(viewportWidth: number): void {
        this.scrollerState.viewportWidth = viewportWidth
        this.updateScrollerState()
    }

    updateScrollerStateViewportHeight(viewportHeight: number): void {
        this.scrollerState.viewportHeight = viewportHeight
        this.updateScrollerState()
    }

    updateScrollerState(): void {
        this.scrollerState.viewportCoordinatesTopLeft.x = this.scrollerState.x
        this.scrollerState.viewportCoordinatesTopLeft.y = this.scrollerState.y
        this.scrollerState.viewportCoordinatesBottomRight.x = this.scrollerState.x + this.scrollerState.viewportWidth
        this.scrollerState.viewportCoordinatesBottomRight.y = this.scrollerState.y + this.scrollerState.viewportHeight
    }

    constructor () {
        this.updateScrollerStateScrollX(this.scroller?.getScrollState().lastXPosition as number)
        this.updateScrollerStateScrollY(this.scroller?.getScrollState().lastYPosition as number)
        this.initScrollListener()
        this.initViewportListener()
        requestAnimationFrame(this.calculatePositions.bind(this))
    }

    initScrollListener(): void {
        if (this.scroller !== undefined) {
            console.log('initializing')
            this.scroller.on('scroll', (scrollEvent: any) => {
                this.updateScrollerStateScrollX(scrollEvent.scrollX)
                this.updateScrollerStateScrollY(scrollEvent.scrollY)
            })
        }
    }

    initViewportListener(): void {
        if (this.viewport !== undefined) {
            this.viewport.on('resize', (event: any) => {
                this.updateScrollerStateViewportWidth(event.width)
                this.updateScrollerStateViewportHeight(event.height)
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
