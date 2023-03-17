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
exports.removeCommand = exports.postCommands = exports.commands = void 0;
const discord_js_1 = require("discord.js");
const fs_1 = require("fs");
const path_1 = require("path");
const config_1 = __importDefault(require("../config"));
const CLIENT_ID = config_1.default.CLIENT_ID;
const TOKEN = config_1.default.TOKEN;
exports.commands = [];
const rest = new discord_js_1.REST({ version: '10' }).setToken(TOKEN);
const postCommands = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield rest.put(discord_js_1.Routes.applicationCommands(CLIENT_ID), { body: exports.commands });
    }
    catch (err) {
        throw err;
    }
});
exports.postCommands = postCommands;
const removeCommand = (command) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield rest.delete(discord_js_1.Routes.applicationCommand(CLIENT_ID, command.id));
    }
    catch (err) {
        throw err;
    }
});
exports.removeCommand = removeCommand;
function updateClientCommands(client) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const commandsPath = (0, path_1.join)(__dirname, '../commands');
        const commandFiles = (0, fs_1.readdirSync)(commandsPath).filter(file => file.endsWith('.js'));
        for (const commandFile of commandFiles) {
            const command = yield (_a = (0, path_1.join)(__dirname, `../commands/${commandFile}`), Promise.resolve().then(() => __importStar(require(_a))));
            exports.commands.push(command.default.data);
        }
        yield client.application.commands.cache.forEach((command) => {
            if (!exports.commands.find((i) => i.name == command.name)) {
                (0, exports.removeCommand)(command);
            }
        });
        (0, exports.postCommands)();
    });
}
exports.default = updateClientCommands;