"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const config_1 = __importDefault(require("../config"));
const commandsManager_1 = require("./commandsManager");
var usersInCooldown = [];
setInterval(() => usersInCooldown = [], 3000);
function execute(client, interaction) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        if (!commandsManager_1.commands.find((i) => i.name == interaction.commandName)) {
            interaction.reply("Este comando não existe mais ou está inativo. Desculpe a inconveniência.");
            return;
        }
        if (usersInCooldown.includes(interaction.user.id)) {
            interaction.reply("Espere alguns segundos antes de executar outro comando.");
            return;
        }
        const command = yield (_a = (0, path_1.join)(__dirname, `../commands/${interaction.commandName}.js`), Promise.resolve().then(() => __importStar(require(_a))));
        command.default.execute(client, interaction);
        if (interaction.user.id != config_1.default.owenerId && !config_1.default.administrators.includes(interaction.user.id)) {
            usersInCooldown.push(interaction.user.id);
        }
    });
}
exports.default = execute;
