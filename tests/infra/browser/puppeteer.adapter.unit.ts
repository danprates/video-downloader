import { PuppeteerAdapter } from '@/infra/browser'

const pageSpy = {
  setDefaultNavigationTimeout: jest.fn(),
  setViewport: jest.fn(),
  goto: jest.fn(),
  waitForSelector: jest.fn(),
  click: jest.fn(),
  focus: jest.fn(),
  keyboard: { type: jest.fn() },
  evaluate: jest.fn().mockResolvedValue('some_text')
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
})
