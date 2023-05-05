import { Client, GatewayIntentBits } from "discord.js";

import { execute, updateCommands } from "./util/commands";
import server from "./dashboard/server";
import config from "./config";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});

async function main() {
    const TOKEN = config.TOKEN || process.env.TOKEN;
    if (!config.TOKEN) {
        process.env.NODE_ENV = "production";
    }

    client.once('ready', () => {
        updateCommands(client, TOKEN);
        console.log("BOT online.");
    });

    client.on("interactionCreate", (interaction) => {
        if (interaction.isChatInputCommand()) {
            execute(client, interaction);
        }
    })

    client.login(TOKEN);
    await server(); 
}

main();