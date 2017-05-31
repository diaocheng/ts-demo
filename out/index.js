"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa = require("koa");
const serve = require("koa-static");
const path = require("path");
const app = new koa();
app.use((ctx, next) => __awaiter(this, void 0, void 0, function* () {
    const t1 = Date.now();
    yield next();
    const t2 = Date.now();
    const time = t2 - t1;
    console.log('%s  %s  status: %s  Time: %dms', ctx.method, ctx.path, ctx.status, time);
}));
app.use(serve(path.join(__dirname, '../static')));
// app.use(async (ctx, next) => {
//   ctx.body = '<h1>hello world</h1>'
//   ctx.type = 'html'
//   await next()
// })
app.listen(3000);
//# sourceMappingURL=index.js.map