const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping') //name of the slash command
    .setDescription('Returns bot ping.'), //description of the slash cmd
    async execute(client, interaction) {
        interaction.reply({ content: `Pong! **${client.ws.ping} ms**`, ephemeral: true })
    }
}