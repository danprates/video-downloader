import { Browser } from '@/application/protocols'

export const browserMock: Browser = {
  close: jest.fn(),
  visit: jest.fn(),
  waitFor: jest.fn(),
  click: jest.fn(),
  type: jest.fn(),
  getTextContent: jest.fn().mockResolvedValue('any_content')
}
