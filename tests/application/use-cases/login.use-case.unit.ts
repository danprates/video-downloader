import { LoginUseCase } from '@/application/use-cases'
import { browserMock } from '@/tests/helpers/mocks'

describe('LoginUseCase', () => {
  it('should use browser with correct params', async () => {
    const sut = new LoginUseCase(browserMock)
    await sut.execute({
      email: 'any_email@exemple.com',
      password: 'any_password'
    })
    expect(browserMock.visit).toHaveBeenNthCalledWith(
      1,
      'https://www.vuemastery.com/'
    )
    expect(browserMock.waitFor).toHaveBeenNthCalledWith(
      1,
      'button[data-test="loginBtn"]'
    )
    expect(browserMock.click).toHaveBeenNthCalledWith(
      1,
      'button[data-test="loginBtn"]'
    )
    expect(browserMock.type).toHaveBeenNthCalledWith(
      1,
      'input[placeholder="Account Email"]',
      'any_email@exemple.com'
    )
    expect(browserMock.type).toHaveBeenNthCalledWith(
      2,
      'input[placeholder="Password"]',
      'any_password'
    )
    expect(browserMock.click).toHaveBeenNthCalledWith(
      2,
      'button[class="button primary -full"]'
    )
  })
})
