import { ChatInputCommandInteraction, Client, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import config from '../config';

const SlashCommand = new SlashCommandBuilder() 
    .setName("project")
    .setDescription("Envia o link do projeto da Rosie.");

export default {
    data: SlashCommand,
    async execute(client: Client, interaction: ChatInputCommandInteraction) {
        const url = config.projectUrl;
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel("📤 Ir para o projeto!")
                    .setStyle(ButtonStyle.Link)
                    .setURL(url)
            );
        
        interaction.reply({
            content: "💯 Link para o incrível projeto da Rosie!",
            components: [row as any]
        });
    }
}