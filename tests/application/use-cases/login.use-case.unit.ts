import { LoginUseCase } from '@/application/use-cases'
import { browserMock } from '@/tests/helpers/mocks'

const makeSut = () => {
  const sut = new LoginUseCase(browserMock)
  const params = { email: 'any_email@exemple.com', password: 'any_password' }
  return {
    sut,
    params
  }
}

describe('LoginUseCase', () => {
  it('should use browser with correct params', async () => {
    const { sut, params } = makeSut()
    await sut.execute(params)
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
      params.email
    )
    expect(browserMock.type).toHaveBeenNthCalledWith(
      2,
      'input[placeholder="Password"]',
      params.password
    )
    expect(browserMock.click).toHaveBeenNthCalledWith(
      2,
      'button[class="button primary -full"]'
    )
  })
})
