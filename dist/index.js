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
const fs = require("fs");
const koa = require("koa");
const body = require("koa-body");
const json = require("koa-json");
const logger = require("koa-logger");
const route = require("koa-route");
const path = require("path");
const url = require("url");
const port = 3000;
const app = new koa();
app.use(logger());
app.use(json());
app.use(body({ multipart: true }));
app.use(route.post('/upload', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
    const files = ctx.request.body.files;
    console.log(ctx.request.rawBody);
    const body = {};
    Object.keys(files).forEach((name) => __awaiter(this, void 0, void 0, function* () {
        if (Array.isArray(files[name])) {
            files[name].forEach((item, i) => __awaiter(this, void 0, void 0, function* () {
                item.name = i + item.name;
                const fileUrl = yield saveFile(item);
                if (!body[name]) {
                    body[name] = [];
                }
                body[name].push(fileUrl);
            }));
        }
        else {
            const fileUrl = yield saveFile(files[name]);
            body[name] = fileUrl;
        }
    }));
    ctx.body = body;
    yield next();
})));
const saveFile = (file) => __awaiter(this, void 0, void 0, function* () {
    const reader = fs.createReadStream(file.path);
    const dirname = path.join(__dirname, '../upload');
    const stream = fs.createWriteStream(path.join(dirname, file.name));
    yield reader.pipe(stream);
    return {
        url: url.resolve('upload', file.name),
    };
});
app.listen(port);
console.log(`listening on port ${port}`);
//# sourceMappingURL=index.js.map