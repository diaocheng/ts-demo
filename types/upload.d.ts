declare namespace upload {
  interface file {
    path: ByteString,
    name: string
  }
  interface url {
    url: string
  }
}

declare module 'koa-body' {
  export = (o: any): void
}
