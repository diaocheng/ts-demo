import * as fs from 'fs'
import * as koa from 'koa'
import * as body from 'koa-body'
import * as json from 'koa-json'
import * as logger from 'koa-logger'
import * as route from 'koa-route'
import * as path from 'path'
import * as url from 'url'

const port = 3000
const app = new koa()

app.use(logger())
app.use(json())
app.use(body({ multipart: true }))

app.use(route.post('/upload', async (ctx: any, next) => {
  const files = ctx.request.body.files
  console.log(ctx.request.rawBody)
  const body: any = {}
  Object.keys(files).forEach(async (name: string) => {
    if (Array.isArray(files[name])) {
      files[name].forEach(async (item: upload.file, i: number) => {
        item.name = i + item.name
        const fileUrl = await saveFile(item)
        if (!body[name]) {
          body[name] = []
        }
        body[name].push(fileUrl)
      })
    } else {
      const fileUrl = await saveFile(files[name])
      body[name] = fileUrl
    }
  })
  ctx.body = body
  await next()
}))

const saveFile = async (file: upload.file): Promise<upload.url> => {
  const reader = fs.createReadStream(file.path)
  const dirname = path.join(__dirname, '../upload')
  const stream = fs.createWriteStream(path.join(dirname, file.name))
  await reader.pipe(stream)
  return {
    url: url.resolve('upload', file.name),
  }
}

app.listen(port)
console.log(`listening on port ${port}`)
