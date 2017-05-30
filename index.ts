import * as koa from 'koa'
import * as serve from 'koa-static'

const app = new koa()

app.use(async (ctx, next) => {
  await next()
  console.log(ctx.body, ctx.path)
})

app.use(serve('.'))

// app.use(async (ctx, next) => {
//   ctx.body = '<h1>hello world</h1>'
//   ctx.type = 'html'
//   await next()
// })

app.listen(3000)
