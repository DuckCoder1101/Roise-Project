import { ChatInputCommandInteraction, Client } from "discord.js";
import { readdirSync } from "fs";
import { join } from 'path';

import POSTCommands from "./POSTCommands";
import DELETECommands from "./DELETECommands";
import config from "../config";

export const commands = [];
export const deletedCommands = [];

var usersInCooldown = [];
setInterval(() => usersInCooldown = [], 3000);

export async function execute(client: Client, interaction: ChatInputCommandInteraction) {
    if (!commands.find((i) => i.name == interaction.commandName)) {
        interaction.reply("Este comando não existe mais ou está inativo. Desculpe a inconveniência.");
        return;
    }

    if (usersInCooldown.includes(interaction.user.id)) {
        interaction.reply("Espere alguns segundos antes de executar outro comando.");
        return;
    }

    const command = await import(join(__dirname, `../commands/${interaction.commandName}.js`));
    command.default.execute(client, interaction);

    if (interaction.user.id != config.owenerId && !config.administrators.includes(interaction.user.id)) {
        usersInCooldown.push(interaction.user.id);
    }
}

export async function updateCommands(client: Client, token: string) {
    const path = join(__dirname, '../commands');
    const files = readdirSync(path).filter((file) => file.endsWith('.js'));

    for (const file of files) {
        const command = await import(join(__dirname, `../commands/${file}`));
        await commands.push(command.default.data);
    }

    await client.application.commands.cache.forEach((command) => {
        if (!commands.find((i) => i.name == command.name)) {
            deletedCommands.push(command.id);
        }
    });
    
    DELETECommands(client, token, deletedCommands);
    POSTCommands(client, token, commands);
}