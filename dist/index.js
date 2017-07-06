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
const json = require("koa-json");
const logger = require("koa-logger");
const route = require("koa-route");
const body_1 = require("./body");
const port = 3000;
const app = new koa();
app.use(logger());
app.use(json());
app.use(body_1.default());
app.use(route.post('/upload', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    console.log(ctx.request);
    ctx.body = ctx.request.req;
    yield next();
})));
app.listen(port);
console.log(`listening on port ${port}`);
//# sourceMappingURL=index.js.map