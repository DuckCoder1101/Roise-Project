import { Client, CommandInteraction, SlashCommandBuilder } from"discord.js";
import dns from "dns";

import config from '../config';

const SlashCommand = new SlashCommandBuilder() 
    .setName("ping")
    .setDescription("Mostra a latência do BOT, do servidor da Rosie e do WebSocket!")


export default {
    data: SlashCommand,
    async execute(client: Client, interaction: CommandInteraction) {
        const now = Date.now();
        const message = await interaction.reply({ 
            content: "📡 Conectando...", 
            fetchReply: true 
        });

        const replyPing = Math.abs(message.createdTimestamp - interaction.createdTimestamp);

        const serverPing = await new Promise((resolve) => {
            dns.resolve(config.serverURL, (err) => {
                resolve(err && err.code === 'ENOTFOUND' ? "-" : Math.abs(Date.now() - now));
            });
        });

        interaction.editReply(
            `📡 Latência do BOT: ${replyPing}ms\n🔨 Latência do servidor: ${serverPing}ms\n🤖 Latência do WebSocket: ${client.ws.ping}ms`
        );
    }
}