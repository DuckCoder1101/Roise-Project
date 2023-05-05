import { Client, REST, Routes } from 'discord.js';

async function DELETECommands(client: Client, token: string, commandsIDs: string[]) {
    try {
        const rest = new REST({ version: '10' }).setToken(token);

        for (const ID in commandsIDs) {
            await rest.delete(
                Routes.applicationCommand(client.user.id, ID)
            );
        }
    } catch (err) {
        throw err;
    }
}

export default DELETECommands