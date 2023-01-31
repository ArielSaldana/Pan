(() => {
    window.addEventListener('load', () => {
        const scroller = new Pan.Scroller();
        scroller.whenElementInViewport(document.getElementById('theme-widget'), (inViewPort) => {
            console.log('in viewport')
        })

        const theme = Pan.Theme.getInstance({
            useLocalStorage: true,
            useSystemSettings: false,
            emitDefaultState: true,
            defaultTheme: 'dark'
        })

        // add theme to the window object so we can access it from html `onClick="theme.toggle()"`
        window.theme = theme
        const themeElem = document.getElementById('theme')
        theme.on('change', (themeEvent, rawEvent) => {
            themeElem.innerText = themeEvent.theme
        })

        // mouse tool
        const mouse = new Pan.Mouse()
        const mouseX = document.getElementById('mouse-x')
        const mouseY = document.getElementById('mouse-y')

        mouse.on('move', (ev) => {
            mouse.animationQueue.addEvent('background-color', () => {
                mouseX.innerText = (ev.x)
                mouseY.innerText = (ev.y)
            })
        })

        // keyboard tool
        const keyboard = Pan.Keyboard.getInstance({
            allowNumbers: true,
            allowSpecialCharacters: false
        })

        const keyboardKey = document.getElementById('keyboard-key')

        keyboard.on('all', (keyboardEvent, rawEvent) => {
            if (keyboardEvent.type === 'keydown') {
                keyboardKey.innerText = keyboardEvent.key
            }
        })

        // viewport tool
        const viewport = Pan.Viewport.getInstance({
            fireViewportInformationOnListen: true
        })

        const viewportWidthElem = document.getElementById('viewport-width')
        const viewportHeightElem = document.getElementById('viewport-height')
        let viewportWidth = 0
        let viewportHeight = 0

        viewport.on('resize', (event) => {
            viewportWidth = event.width
            viewportHeight = event.height
            viewportWidthElem.innerText = event.width + 'px'
            viewportHeightElem.innerText = event.height + 'px'
        })
        const header = document.getElementById('top-bar')

        const detector = Pan.Detector.getInstance()
        const detectorElement = document.getElementById('detector')
        detectorElement.innerText = JSON.stringify(detector.state)
        // detectorElement.innerText = navigator.userAgent



        //        const scroll = Pan.Scroll.getInstance()
        //        scroll.on('scroll', (scrollEvent) => {
        //            if (scrollEvent.scrollDirection === 'down') {
        //                header.classList.add('hide')
        //            } else if (scrollEvent.scrollDirection === 'up') {
        //                header.classList.remove('hide')
        //            }
        //        })
        //        scroll.initCustomScroll()

        // Animation related work
//        const ticker = Pan.Ticker.getInstance()
//        let animationDuration = 1000
//
//        const ease = (timeElapsed) => {
//            if (timeElapsed >= animationDuration) {
//                animationState.done = true
//                return 100
//            }
//            if (!animationState.reverse) {
//                return Pan.easeOut(timeElapsed, 0, 100, animationDuration)
//            } else {
//                return Pan.reverseEaseOut(timeElapsed, 0, 100, animationDuration)
//            }
//
////            return Pan.easeOut(timeElapsed, 0, 100, animationDuration)
//
//        }
//
//        const calculatePositionBasedOnProgress = (progress, viewportWidth, diff) => {
//            if (!animationState.reverse) {
//                return (progress) / 100
//            } else {
//                return (100 - progress ) / 100
//            }
//        }
//
//        const calculate = () => {
//            console.log('starTime: ', animationState.startTime)
//            console.log('progress:', animationState.progress)
//        }
//
//        const readjustAnimation = () => {
//            calculate()
//        }
//
//        const animationBox1 = document.getElementById('animation-box-1');
//
//        const animationState = {
//            startTime: 0,
//            progress: 0,
//            pos: 0,
//            paused: false,
//            done: false,
//            started: false,
//            reverse: false,
//            printChange: true
//        }
//
//        ticker.on('tick', (tickerEvent) => {
//            if (animationState.paused || !animationState.started || animationState.done) {
//                return
//            }
//            const elapsedTime = tickerEvent.tickRounded - animationState.startTime
//            updateState(elapsedTime)
//            render()
//        })
//
//        const updateState = (elapsedTime) => {
//            animationState.progress = ease(elapsedTime)
//            if (animationState.printChange) {
//                animationState.printChange = false
//                readjustAnimation()
//            }
//        }
//
//        const render = () => {
//            const diff = 130
//            animationState.pos = Math.round(calculatePositionBasedOnProgress(animationState.progress) * (viewportWidth - diff))
//            animationBox1.style.transform = `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, ${animationState.pos}, 0, 0, 1)`
//        }
//
//        window.animationButtonToggle = () => {
//            if (animationState.done) {
//                animationState.done = false
//            }
//            animationState.paused = true
//            console.log('toggling')
//            if (!animationState.started) {
//                animationState.started = true
//            } else if (animationState.started) {
//                animationState.reverse = !animationState.reverse
//            }
//
//            animationState.startTime = Math.round(ticker.getTick())
//            animationState.printChange = true
//            animationState.paused = false
//        }
//
//
//        // calculate things
//        const testAnimationState = {
//            startTime: 0,
//            progress: 0,
//            pos: 0,
//            paused: false,
//            done: false,
//            started: false,
//            reverse: false,
//            printChange: true
//        }

//        console.log(ease(timeElapsed)); //150 ms out of 1000 has passed -> 27.75% pos is
//        console.log(calculatePositionBasedOnProgress(27.75) * (viewportWidth - 130)); // -> 197.3025px
//
//        // when animation state is reversed, the new % is 100 - old % so 72.25
////        animationState.reverse = true
//        const animationProg = calculatePositionBasedOnProgress(72.25) * (viewportWidth - 130)
//        console.log(animationProg); // -> 197.3025px
//
//        console.log(Pan.easeOut(timeElapsed, 0, 100, animationDuration));
//        console.log('time elapsed from function: ', Pan.easeOutElapsedTime(10, 0, 100, 1000))

//        const timeElapsed = 150
//        const easeOutValue = Pan.easeOut(timeElapsed, 0, 100, animationDuration)
//
//
//        const reverseEaseOutValue = Pan.reverseEaseOut(easeOutValue, 0, 100, animationDuration)
//
//        console.log('timeElapsed:', timeElapsed)
//        console.log('easeOutValue:', easeOutValue)
//        console.log('reverseEaseOutValue:', reverseEaseOutValue)

        // in order to achieve this we should adjust the start time to make the easing function start at that point


        // now we want it to go from 197.3025 to 0 px, or rather 27.75% to 0.
        // both the % and px should stay the same, but the endtime should adjust accordingly


        // 0% to 100%
        // if the animation is at 25%, and then button is clicked again - it should be as if 75% of the animation already happened
        // so we change the tick start time

//        new Pan.CustomScroll()
    })
})()