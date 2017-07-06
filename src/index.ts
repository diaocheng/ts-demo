import * as fs from 'fs'
import * as koa from 'koa'
import * as json from 'koa-json'
import * as logger from 'koa-logger'
import * as route from 'koa-route'
import koaParser from './body'

const port = 3000
const app = new koa()

app.use(logger())
app.use(json())
app.use(koaParser())

app.use(route.post('/upload', async (ctx: koa.Context, next) => {
  console.log(ctx.request)
  ctx.body = ctx.request.req
  await next()
}))

app.listen(port)
console.log(`listening on port ${port}`)
