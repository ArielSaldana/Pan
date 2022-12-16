import path from 'path'
import * as puppeteer from 'puppeteer'
import { beforeAll, afterAll, describe, expect, test } from '@jest/globals'

describe('Test Viewport.ts', () => {
    let page
    let browser
    beforeAll(async () => {
        browser = await puppeteer.launch()
        page = await browser.newPage()

        const url = 'file:///' + path.join(__dirname, '../demo/viewport.html')
        await page.goto(url)

        await page.setViewport({
            width: 1600,
            height: 951
        })
    })
    test('Viewport callback should change div width to match viewport width', async () => {
        const rectDiv = await page.$('#rect')
        const rectDivWidth = (await rectDiv.boundingBox()).width
        expect(rectDivWidth).toBe(1600)
    })
    test('Viewport callback should change div height to match viewport height', async () => {
        await page.waitForTimeout(100)
        const rectDiv = await page.$('#rect')
        const rectDivHeight = (await rectDiv.boundingBox()).height
        expect(rectDivHeight).toBe(951)
    })
    afterAll(done => {
        browser.close()
        done()
    })
})
