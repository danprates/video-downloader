import { Browser, UseCase } from '../protocols'

type Params = {
  email: string
  password: string
}

export class LoginUseCase implements UseCase<Params, void> {
  constructor(private readonly browser: Browser) {}
  async execute({ email, password }: Params): Promise<void> {
    await this.browser.visit('https://www.vuemastery.com/')
    await this.browser.waitFor('button[data-test="loginBtn"]')
    await this.browser.click('button[data-test="loginBtn"]')
    await this.browser.type('input[placeholder="Account Email"]', email)
    await this.browser.type('input[placeholder="Password"]', password)
    await this.browser.click('button[class="button primary -full"]')
  }
}
