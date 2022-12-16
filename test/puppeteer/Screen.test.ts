import path from 'path'
import * as puppeteer from 'puppeteer'
import { beforeAll, describe, expect, test } from '@jest/globals'

describe('Test Screen.ts', () => {
    let page
    beforeAll(async () => {
        const browser = await puppeteer.launch()
        page = await browser.newPage()

        const url = 'file:///' + path.join(__dirname, '../demo/Screen.html')
        await page.goto(url)
    })
    test('screen callback changes div width to match viewport width', async () => {
        await page.setViewport({
            width: 1600,
            height: 1000
        })

        const rectDiv = await page.$('#rect')
        const rectDivWidth = (await rectDiv.boundingBox()).width

        expect(rectDivWidth).toBe(1600)
    })
})
