import tslib from 'tslib';
import http from 'http';
import koa from 'koa';
import socket from 'socket.io';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

function getCjsExportFromNamespace (n) {
	return n && n['default'] || n;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var main = createCommonjsModule(function (module, exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });




exports.app = new koa();
exports.app.use((ctx) => tslib.__awaiter(void 0, void 0, void 0, function* () {
    ctx.body = 'Hello World';
}));
const http$1 = http.createServer(exports.app.callback());
const io = socket(http$1);
http$1.listen(3000, '0.0.0.0', () => {
    console.log('Server start on http://localhost:3000');
});
io.on("connection", (socket) => {
    console.log(`${socket.id} - ${socket.client.id} - ${socket.conn.id} connected`);
    socket.on('chat', (msg) => {
        console.log('msg', msg);
    });
});

});

var main$1 = unwrapExports(main);
var main_1 = main.app;

var serversMainServer = createCommonjsModule(function (module, exports) {
"use strict";
/**
 * Generated bundle index. Do not edit.
 */
Object.defineProperty(exports, "__esModule", { value: true });

tslib.__exportStar(main, exports);

});

var serversMainServer$1 = unwrapExports(serversMainServer);

export default serversMainServer$1;
//# sourceMappingURL=servers-main-server.js.map
