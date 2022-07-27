import { PuppeteerAdapter } from '@/infra/browser'

const pageSpy = {
  setDefaultNavigationTimeout: jest.fn(),
  setViewport: jest.fn(),
  goto: jest.fn(),
  waitForSelector: jest.fn(),
  click: jest.fn(),
  focus: jest.fn(),
  keyboard: { type: jest.fn() },
  evaluate: jest.fn().mockResolvedValue('any_text')
}

const puppeteerSpy = {
  newPage: jest.fn().mockResolvedValue(pageSpy),
  close: jest.fn()
}

jest.mock('puppeteer', () => ({
  launch: () => Promise.resolve(puppeteerSpy)
}))

describe('PuppeteerAdapter', () => {
  it('should pass correct params to dependency when open is called', async () => {
    await PuppeteerAdapter.open()
    expect(puppeteerSpy.newPage).toHaveBeenNthCalledWith(1)
    expect(pageSpy.setDefaultNavigationTimeout).toHaveBeenNthCalledWith(
      1,
      50000
    )
    expect(pageSpy.setViewport).toHaveBeenNthCalledWith(1, {
      height: 1080,
      width: 1920
    })
  })

  it('should pass correct params to dependency when close is called', async () => {
    const browser = await PuppeteerAdapter.open()
    await browser.close()
    expect(puppeteerSpy.close).toHaveBeenNthCalledWith(1)
  })

  it('should pass correct params to dependency when visit is called', async () => {
    const browser = await PuppeteerAdapter.open()
    await browser.visit('any_url')
    expect(pageSpy.goto).toHaveBeenNthCalledWith(1, 'any_url', {
      waitUntil: 'networkidle2'
    })
  })

  it('should pass correct params to dependency when waitFor is called', async () => {
    const browser = await PuppeteerAdapter.open()
    await browser.waitFor('any_selector')
    expect(pageSpy.waitForSelector).toHaveBeenNthCalledWith(1, 'any_selector')
  })

  it('should pass correct params to dependency when click is called', async () => {
    const browser = await PuppeteerAdapter.open()
    await browser.click('any_selector')
    expect(pageSpy.click).toHaveBeenNthCalledWith(1, 'any_selector')
  })
})
