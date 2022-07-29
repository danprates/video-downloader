import puppeteer from 'puppeteer'

import { Browser } from 'application/protocols'

export class PuppeteerAdapter implements Browser {
  private constructor(
    private readonly browser: puppeteer.Browser,
    private readonly page: puppeteer.Page
  ) {}
  static async open(headless = true): Promise<Browser> {
    const browser = await puppeteer.launch({ headless })
    const page = await browser.newPage()
    page.setDefaultNavigationTimeout(50000)
    await page.setViewport({
      width: 1920,
      height: 1080
    })
    return new PuppeteerAdapter(browser, page)
  }
  async close(): Promise<void> {
    await this.browser.close()
  }
  async visit(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: 'networkidle2' })
  }
  async waitFor(selector: string): Promise<void> {
    await this.page.waitForSelector(selector)
  }
  async click(selector: string): Promise<void> {
    await this.page.click(selector)
  }
  async type(selector: string, value: string): Promise<void> {
    await this.page.focus(selector)
    await this.page.keyboard.type(value)
  }
  async getTextContent(selector: string): Promise<string | null> {
    const content = this.page.evaluate(
      () => document.querySelector(selector)?.textContent
    )
    return String(content) || null
  }
}
