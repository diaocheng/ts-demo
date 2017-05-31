import * as koa from 'koa'
import * as serve from 'koa-static'
import * as path from 'path'

const app = new koa()

app.use(async (ctx, next) => {
  const t1: number = Date.now()
  await next()
  const t2: number = Date.now()
  const time: number = t2 - t1
  console.log('%s  %s  status: %s  Time: %dms', ctx.method, ctx.path, ctx.status, time)
})

app.use(serve(path.join(__dirname, '../static')))

// app.use(async (ctx, next) => {
//   ctx.body = '<h1>hello world</h1>'
//   ctx.type = 'html'
//   await next()
// })

app.listen(3000)
