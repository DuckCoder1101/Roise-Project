"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
function server() {
    const app = (0, express_1.default)();
    const server = http_1.default.createServer(app);
    app.get('/', (req, res) => {
        res.sendStatus(200);
    });
    server.listen(3000);
}
exports.default = server;
