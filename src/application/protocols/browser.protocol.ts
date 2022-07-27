export interface OpenBrowser {
  open(): Promise<Browser>
}

export interface CloseBrowser {
  close(): Promise<void>
}

export interface VisitUrl {
  visit(url: string): Promise<void>
}

export interface WaitFor {
  waitFor(selector: string): Promise<void>
}

export interface Click {
  click(selector: string): Promise<void>
}

export interface Type {
  type(selector: string, value: string): Promise<void>
}

export interface GetTextContent {
  getTextContent(selector: string): Promise<string | null>
}

export interface Browser
  extends CloseBrowser,
    VisitUrl,
    WaitFor,
    Click,
    Type,
    GetTextContent {}
