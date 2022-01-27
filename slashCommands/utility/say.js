const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('Say a message with the bot')
    .addStringOption((option) =>
    option.setName('message').setDescription('The message to say').setRequired(true)
    ),
    async execute(client, interaction) {
        interaction.reply({ content: interaction.options.getString('message'), ephemeral: true })
    }
}