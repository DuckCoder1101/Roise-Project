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
    .setName("ship")
    .setDescription("Faz o ship entre 2 usuários(as).")
    .addUserOption(option => option.setName("user1")
    .setDescription("Usuário 1")
    .setRequired(true))
    .addUserOption(option => option.setName("user2")
    .setDescription("Usuário 2")
    .setRequired(true));
exports.default = {
    data: SlashCommand,
    execute(client, interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            let value = Math.floor(Math.random() * 100);
            let message = "";
            const user1 = interaction.options.getUser("user1");
            const user2 = interaction.options.getUser("user2");
            if ((user1.id == "708797379016523837" && user2.id == "818653932779733032") || (user2.id == "708797379016523837" && user1.id == "818653932779733032")) {
                value = 100;
            }
            if (value == 100)
                message = "💗 Amor a primeira vista!";
            else if (value > 85)
                message = "💖 Grande paixão!";
            else if (value > 60)
                message = "😊 Existem sentimentos aqui!";
            else if (value > 40)
                message = "😐 Não muito provável...";
            else
                message = "😒 Friend Zone.";
            interaction.reply(`🎯 Chances amorosas de **${user1.username}** e **${user2.username}**: ${value}%!\n💌 Resultado: ${message}`);
        });
    }
};
/*  Sabe porque só da 100%?
    Porque o meu amor por você é verdadeiro, e não só um valor qualquer gerado por um código qualquer.
*/ 
