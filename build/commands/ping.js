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
const dns_1 = __importDefault(require("dns"));
const SlashCommand = new discord_js_1.SlashCommandBuilder()
    .setName("ping")
    .setDescription("Mostra a latência do BOT, do servidor da Rosie e do WebSocket!");
// .setDescriptionLocalizations({
//     "pt-BR": "Mostra a latência do BOT, do servidor da Rosie e do WebSocket!",
//     "en-US": "Shows the latency of the BOT, Rosie's server and WebSocket!"
// });
exports.default = {
    data: SlashCommand,
    execute(client, interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const now = yield Date.now();
            const message = yield interaction.reply({ content: "📡 Conectando...", fetchReply: true });
            const replyPing = yield Math.abs(message.createdTimestamp - interaction.createdTimestamp);
            // Latência do servidor (FUTURO URL)
            const rosiePing = yield new Promise((resolve) => {
                dns_1.default.resolve('www.google.com', (err) => {
                    resolve(Math.abs(Date.now() - now));
                });
            });
            interaction.editReply(`📡 Latência do BOT: ${replyPing}ms\n🔨 Latência do servidor: ${rosiePing}ms\n🤖 Latência do WebSocket: ${client.ws.ping}ms`);
        });
    }
};
