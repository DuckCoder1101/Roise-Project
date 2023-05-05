import { ChatInputCommandInteraction, Client, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import config from '../config';

const SlashCommand = new SlashCommandBuilder() 
    .setName("invite")
    .setDescription("Envia o link para adicionar a Rosie em um servidor no qual você possua permissões.");

export default {
    data: SlashCommand,
    async execute(client: Client, interaction: ChatInputCommandInteraction) {
        const url = config.inviteURL;
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel("✅ Melhorar servidor!")
                    .setStyle(ButtonStyle.Link)
                    .setURL(url)
            );

        interaction.reply({
            content: "😄 Obrigado por me adicionar!",
            components: [row as any]
        });
    }
}