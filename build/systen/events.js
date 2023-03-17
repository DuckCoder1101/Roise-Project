"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commandExecuter_1 = __importDefault(require("./commandExecuter"));
function setClientEvents(client) {
    client.on("interactionCreate", (interaction) => {
        if (interaction.isChatInputCommand()) {
            (0, commandExecuter_1.default)(client, interaction);
        }
    });
}
exports.default = setClientEvents;
