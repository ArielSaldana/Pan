import path from 'path'
import * as puppeteer from 'puppeteer'
import { beforeAll, afterAll, describe, expect, test } from '@jest/globals'

describe('Test Viewport.ts', () => {
    let page
    let browser
    beforeAll(async () => {
        browser = await puppeteer.launch()
        page = await browser.newPage()

        const url = 'file:///' + path.join(__dirname, '../demo/testpage.html')
        await page.goto(url)

        await page.setViewport({
            width: 1600,
            height: 951
        })
    })
    test('Mouse click changes the DOM', async () => {
        const rectDiv = await page.$('#rect')
        await page.addScriptTag({ url: '../../dist/pan.js' })
        await page.evaluate(async () => {
            await (function () {
                // ignore the next line - we're running it from the context of the browser.
                // @ts-expect-error
                const mouse = new Pan.Mouse()
                mouse.on('click', async () => {
                    const elem = document.getElementById('rect')
                    if (elem !== undefined && elem !== null) {
                        elem.innerText = 'CLICKED'
                    }
                    console.log('clicked')
                })
            })()
        })

        await page.mouse.click(132, 103, { button: 'left' })
        await page.waitForTimeout(100)
        const rectDivText = await rectDiv.evaluate(el => el.innerText, rectDiv)
        expect(rectDivText).toBe('CLICKED')
    })
    afterAll(done => {
        browser.close()
        done()
    })
})
