import * as Koa from 'koa'
declare namespace koaParser {
  interface Options {
    patchNode: boolean,
    patchKoa: boolean,
    multipart: boolean,
    urlencoded: boolean,
    json: boolean,
    text: boolean,
    encoding: boolean,
    jsonLimit: string,
    formLimit: string
    formidable: object,
    textLimit: string,
    strict: boolean
  }
  interface Middleware {
    (ctx: Koa.Context, next: Koa.Middleware): Koa.Middleware
  }
}

export default (options?: koaParser.Options) => Promise
