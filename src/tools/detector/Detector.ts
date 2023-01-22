interface RenderingEngine {
    name: string,
    version: number
}
interface DetectorState {
    isMobile: boolean,
    isTouchScreen: boolean,
    isIphone: boolean,
    isAndroid: boolean
    operatingSystem: string[]
    renderingEngines: RenderingEngine[]
}

export default class Detector {
    geckoRegex = /(Gecko)\/(\d+)/
    webKitRegex = /(AppleWebKit)\/(\d+)/
    prestoRegex = /(Opera)\/(\d+)/
    tridentRegex = /(Trident)\/(\d+)/
    edgeRegex = /(Edge)\/(\d+)/
    // blinkRegex = /Chrome\/(\s+)/ //Chrome\/(\d+)
    blinkRegex = /(Chrome)\/(\d+)/

    state: DetectorState = {
        isMobile: false,
        isTouchScreen: false,
        isIphone: false,
        isAndroid: false,
        operatingSystem: [],
        renderingEngines: []
    }

    isTouchScreen(): boolean {
        let hasTouchScreen = false;
        if ("maxTouchPoints" in navigator) {
            hasTouchScreen = navigator.maxTouchPoints > 0;
        } else if ("msMaxTouchPoints" in navigator) {
            // @ts-ignore
            hasTouchScreen = navigator.msMaxTouchPoints > 0;
        } else {
            const mQ = matchMedia?.("(pointer:coarse)");
            if (mQ?.media === "(pointer:coarse)") {
                hasTouchScreen = !!mQ.matches;
            } else if ("orientation" in window) {
                hasTouchScreen = true; // deprecated, but good fallback
            } else {
                // Only as a last resort, fall back to user agent sniffing
                const UA = navigator.userAgent;
                hasTouchScreen =
                    /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
                    /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
            }
        }
        return hasTouchScreen
    }

    isMobile(): boolean {
        return navigator.userAgent.indexOf("Mobi") !== -1
    }

    isRenderingEngineGecko(): boolean {
        return navigator.userAgent.indexOf("Gecko/") !== -1
    }
    isRenderingEngineWebKit(): boolean {
        return navigator.userAgent.indexOf("WebKit/") !== -1
    }
    isRenderingEnginePresto(): boolean {
        return navigator.userAgent.indexOf("Opera/") !== -1
    }
    isRenderingEngineTrident(): boolean {
        return navigator.userAgent.indexOf("Trident/") !== -1
    }
    isRenderingEngineEdge(): boolean {
        return navigator.userAgent.indexOf("Edge/") !== -1
    }
    isRenderingEngineBlink(): boolean {
        return navigator.userAgent.indexOf("Chrome/") !== -1
    }

    setIfRenderingEngineExist(renderingEngineCheck: Function, renderingEngineRegex: RegExp) {
        if (renderingEngineCheck()) {
            const userAgentMatch = navigator.userAgent.match(renderingEngineRegex)
            if (userAgentMatch !== null && userAgentMatch.length >= 3) {
                const browserRenderingEngine: RenderingEngine = {
                    name: userAgentMatch[1],
                    version: parseInt(userAgentMatch[2])
                }
                this.state.renderingEngines.push(browserRenderingEngine)
            }
        }
    }

    setOperatingSystem() {
        if (navigator.userAgent.indexOf('iPhone') !== -1) {
            this.state.isIphone = true
            this.state.operatingSystem.push('iPhone')
        } else if (navigator.userAgent.indexOf('Android') !== -1) {
            this.state.isAndroid = true
            this.state.operatingSystem.push('Android')
        } else if (navigator.userAgent.indexOf('Mac') !== -1) {
            this.state.operatingSystem.push('MacOS')
        } else if (navigator.userAgent.indexOf('Window') !== -1) {
            this.state.operatingSystem.push('Windows')
        } else if (navigator.userAgent.indexOf('Linux') !== -1) {
            this.state.operatingSystem.push('Linux')
        }
    }

    private constructor () {
        this.init()
    }

    init(): void {
        this.state.isMobile = this.isMobile()
        this.state.isTouchScreen = this.isTouchScreen()
        this.setIfRenderingEngineExist(this.isRenderingEngineBlink, this.blinkRegex)
        this.setIfRenderingEngineExist(this.isRenderingEngineEdge, this.edgeRegex)
        this.setIfRenderingEngineExist(this.isRenderingEngineGecko, this.geckoRegex)
        this.setIfRenderingEngineExist(this.isRenderingEnginePresto, this.prestoRegex)
        this.setIfRenderingEngineExist(this.isRenderingEngineTrident, this.tridentRegex)
        this.setIfRenderingEngineExist(this.isRenderingEngineWebKit, this.webKitRegex)
        this.setOperatingSystem()
    }
    static instance: Detector

    static getInstance(): Detector | undefined {
        if (typeof window !== 'undefined') {
            if (Detector.instance === undefined) {
                Detector.instance = new Detector()
            }
            return Detector.instance
        }
    }
}
