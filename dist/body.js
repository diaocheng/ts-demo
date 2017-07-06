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
const body = require("co-body");
exports.default = (options = {
        encoding: 'utf-8',
        formLimit: '56kb',
        json: true,
        multipart: false,
        strict: true,
        text: true,
        urlencoded: true
    }) => {
    return (ctx, next) => __awaiter(this, void 0, void 0, function* () {
        let bodyPromise;
        // so don't parse the body in strict mode
        if (!options.strict || ['GET', 'HEAD', 'DELETE'].indexOf(ctx.method.toUpperCase()) === -1) {
            try {
                if (options.json && ctx.is('json')) {
                    bodyPromise = body.json(ctx, {
                        encoding: options.encoding
                    });
                }
                else if (options.urlencoded && ctx.is('urlencoded')) {
                    bodyPromise = body.form(ctx, {
                        encoding: options.encoding
                    });
                }
                else if (options.text && ctx.is('text')) {
                    bodyPromise = body.text(ctx, {
                        encoding: options.encoding
                    });
                }
            }
            catch (error) {
                throw error;
            }
        }
        bodyPromise = bodyPromise || Promise.resolve({});
        return bodyPromise.catch((error) => {
            throw error;
        })
            .then((body) => {
            ctx.request.body = body;
            return next();
        });
    });
};
//# sourceMappingURL=body.js.map