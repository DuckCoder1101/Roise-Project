"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const commandsManager_1 = __importDefault(require("./systen/commandsManager"));
const events_1 = __importDefault(require("./systen/events"));
const server_1 = __importDefault(require("./systen/server"));
const login_1 = __importDefault(require("./systen/login"));
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds
    ]
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        client.on('ready', () => {
            (0, commandsManager_1.default)(client);
            (0, events_1.default)(client);
            console.log("BOT online.");
        });
        yield (0, server_1.default)();
        (0, login_1.default)(client);
    });
}
main();
