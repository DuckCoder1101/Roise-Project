import { Client, REST, Routes, type SlashCommandBuilder } from 'discord.js';

async function POSTCommands(client: Client, token: string, commands: SlashCommandBuilder[]) {
    try {
        const rest = new REST({ version: '10' }).setToken(token);

        await rest.put(
            Routes.applicationCommands(client.user.id),
            { 
                body: commands 
            }
        );
    } catch (error) {
        throw error.message;
    }
}

export default POSTCommands