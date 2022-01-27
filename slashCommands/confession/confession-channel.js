const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = {
    data: new SlashCommandBuilder() //create new slash cmd
    .setName('confession-channel') //slash cmd name
    .setDescription('Set the Confession channel') //description of the slash cmd
    .addChannelOption(channel =>  //make a option for user to select channel
        channel
        .setName('channel') //the option name
        .setDescription('Confession channel') //option description
    ),
    async execute(client, interaction) {
        let confessionChannel = interaction.options.getChannel('channel') //get the channel that user selected in option

        let channelEmbed = new MessageEmbed()
        .setAuthor('Confession Settings >> Channels', interaction.guild.iconURL()) //the author in the embed, show the text and guild icon
        .setDescription(`${interaction.user}, you have successfully set the anonymous confessions channel to ${confessionChannel}`) //description show the success message for setting the confession channel
        db.set(`confessionChannels_${interaction.guild.id}`, confessionChannel.id) //set the confession channel of guild to the channel that user selected and set the db to channel ID
        interaction.reply({ embeds: [channelEmbed], ephemeral: true })


    }
}