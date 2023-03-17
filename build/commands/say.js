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
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const SlashCommand = new discord_js_1.SlashCommandBuilder()
    .setName("say")
    .setDescription("A Rosie repete o que foi dito no comando.")
    // .setDescriptionLocalizations({
    //     "pt-BR": "A Rosie repete o que foi dito no comando.",
    //     "en-US": "Rosie repeats what was said in command."
    // })
    .addStringOption(option => option.setName("frase")
    .setDescription("A frase que será repetida pelo BOT.")
    .setRequired(true)
    .setMaxLength(50));
exports.default = {
    data: SlashCommand,
    execute(client, interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            let message = interaction.options.get("frase").value.toString();
            const permissions = interaction.member.permissions;
            const canMentionate = permissions.has("MentionEveryone") || permissions.has("Administrator");
            if ((message.includes("@everyone") || message.includes("@here")) && !canMentionate) {
                message = message.replace("@everyone", "(menção inválida)");
                message = message.replace("@here", "(menção inválida)");
            }
            interaction.reply(message);
        });
    }
};
