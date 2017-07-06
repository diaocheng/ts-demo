import * as body from 'co-body'

export default (options = {
  encoding: 'utf-8',
  formLimit: '56kb',
  json: true,
  multipart: false,
  strict: true,
  text: true,
  urlencoded: true
}) => {
  return async (ctx: any, next: any) => {
    let bodyPromise
    // so don't parse the body in strict mode
    if (!options.strict || ['GET', 'HEAD', 'DELETE'].indexOf(ctx.method.toUpperCase()) === -1) {
      try {
        if (options.json && ctx.is('json')) {
          bodyPromise = body.json(ctx, {
            encoding: options.encoding
          })
        } else if (options.urlencoded && ctx.is('urlencoded')) {
          bodyPromise = body.form(ctx, {
            encoding: options.encoding
          })
        } else if (options.text && ctx.is('text')) {
          bodyPromise = body.text(ctx, {
            encoding: options.encoding
          })
        }
      } catch (error) {
        throw error
      }
    }

    bodyPromise = bodyPromise || Promise.resolve({});
    return bodyPromise.catch((error: Error) => {
      throw error
    })
      .then((body: any) => {
        ctx.request.body = body;
        return next()
      })
  };
}
