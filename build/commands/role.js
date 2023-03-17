"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const SlashCommand = new discord_js_1.SlashCommandBuilder()
    .setName("role")
    .setDescription("Atribui ou remove um cargo de um usuário.")
    .addStringOption(option => option.setName("action")
    .setDescription("Qual a ação que será feita sobre o usuário.")
    .setRequired(true)
    .addChoices({ name: "Atribuir", value: "assign" }, { name: "Remover", value: "remove" }))
    .addUserOption(option => option.setName("target")
    .setDescription("O usuário no qual será realizada a ação.")
    .setRequired(true))
    .addRoleOption(option => option.setName("role")
    .setDescription("O cargo que será atribuido ou removido.")
    .setRequired(true));
exports.default = {
    data: SlashCommand,
    execute(client, interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const target = interaction.options.getUser("target");
            const role = interaction.options.getRole("role");
            const action = interaction.options.getString("action");
            const userHasPermissions = interaction.memberPermissions.has("Administrator") || interaction.memberPermissions.has("ManageRoles");
            const authorRole = interaction.member.roles;
            const clientMember = interaction.guild.members.resolve(client.user.id);
            const isOwner = interaction.guild.ownerId == interaction.user.id;
            if ((!userHasPermissions || authorRole.highest.position >= role.position) && !isOwner) {
                interaction.reply(`Você não tem permissões o sulficiente para alterar o cargo do(a) ${target.username}.`);
                return;
            }
            if (role.position >= clientMember.roles.highest.position) {
                interaction.reply(`Desculpe, mas eu não tenho permissões o sulficiente para alterar o cargo ${role.name}. \nPara funcionar, coloque o cargo @${clientMember.roles.highest.id} acima de todos os outros cargos do servidor.`);
                return;
            }
            try {
                const member = interaction.guild.members.resolve(client.user.id);
                if (action == "assign") {
                    yield member.roles.add(role.id);
                    interaction.reply("Cargo atribuido com sucesso!");
                }
                else if (member.roles.cache.find(r => r.id == role.id)) {
                    yield member.roles.remove(role.id);
                    interaction.reply("Cargo removido com sucesso!");
                }
            }
            catch (err) {
                interaction.reply("Não foi possível atribuir/remover o cargo ao usuário, verifique se eu possuo permissões o sulficiente para isso e e tente novamente.");
            }
        });
    }
};
