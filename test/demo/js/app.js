(() => {
    window.addEventListener('load', () => {
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

        const viewportWidth = document.getElementById('viewport-width')
        const viewportHeight = document.getElementById('viewport-height')

        viewport.on('resize', (event) => {
            viewportWidth.innerText = event.width + 'px'
            viewportHeight.innerText = event.height + 'px'
        })
        const header = document.getElementById('top-bar')

        const scroll = Pan.Scroll.getInstance()
        scroll.on('scroll', (scrollEvent) => {
            if (scrollEvent.scrollDirection === 'down') {
                header.classList.add('hide')
            } else if (scrollEvent.scrollDirection === 'up') {
                header.classList.remove('hide')
            }
        })
    })
})()