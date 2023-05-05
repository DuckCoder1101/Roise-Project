import { ChatInputCommandInteraction, Client, SlashCommandBuilder } from 'discord.js';

const SlashCommand = new SlashCommandBuilder() 
    .setName("ship")
    .setDescription("Faz o ship entre 2 usuários(as).")

    .addUserOption(option =>
        option.setName("user1")
        .setDescription("Usuário 1")
        .setRequired(true)
    )

    .addUserOption(option =>
        option.setName("user2")
        .setDescription("Usuário 2")
        .setRequired(true)
    )

export default {
    data: SlashCommand,
    async execute(client: Client, interaction: ChatInputCommandInteraction) {
        const value = Math.floor(Math.random() * 100);
        let message = "";

        const user1 = interaction.options.getUser("user1");
        const user2 = interaction.options.getUser("user2");

        if (value == 100) message = "💗 Amor a primeira vista!";
        else if (value > 85) message = "💖 Grande paixão!";
        else if (value > 60) message = "😊 Existem sentimentos aqui!";
        else if (value > 40) message = "😐 Não muito provável...";
        else message = "😒 Friend Zone.";

        interaction.reply(
            `🎯 Chances amorosas de **${user1.username}** e **${user2.username}**: ${value}%!\n💌 Resultado: ${message}`
        );
    }
}