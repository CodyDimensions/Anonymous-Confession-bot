const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

const config = require('../../config.json'); //find the config.json file
const prefix = config.prefix; //get the prefix from config.json

module.exports = {
    data: new SlashCommandBuilder() //create a new slash cmd
    .setName('confess') //Sets the name of the slash cmd
    .setDescription('Send a Anonymous Confession'), //Sets the description of the slash cmd
    async execute(client, interaction) {
        if(interaction.guild) {
            let channelData = db.get(`confessionChannels_${interaction.guild.id}`) //get the db of the confession channel in current guild

        let inGuild = new MessageEmbed() //create a new embed message
        .setAuthor('Confession Settings >> Waiting...', interaction.guild.iconURL()) //text & guild icon for the author in embed
        .setDescription(`Hey ${interaction.user}, I sent you a direct message! Reply back to my DM with your confession and I'll anonymously post it to ${interaction.guild}.`)
        interaction.reply({ embeds: [inGuild], ephemeral: true }) //send the embed & only user can see it in server (not DM)

        let sendDM = new MessageEmbed()
        .setAuthor(`${interaction.guild} >> Waiting for your confession...`, interaction.guild.iconURL()) //text & guild icon for the author in embed
        .setDescription(`${interaction.user}, please type your confession below and sent it to me as a message`)
        .addField(`Confession Channel`, `<#${channelData}>`) //display the confession channel get from db
        interaction.user.send({ embeds: [sendDM] }).then(msg => { //send the embed to interaction user's DM, then...
            const filter = i => i.author.id == interaction.user.id //create a filter for the awaitMessage function
            msg.channel.awaitMessages({
                filter, //apply the filter, so it await message of user's DM
                max: 1,
                time: 5 * 60000,
                errors: ['time']
            }).then(messages => {
                let msg1 = messages.first().content //the content that awaitMessage function received

                if(msg1.toLowerCase() == (prefix + 'cancel')) { //if the message received is prefix + cancel, for example: c!cancel
                    let cancelEmbed = new MessageEmbed()
                    .setTitle('Confession >> Cancelled')
                    .setDescription(`${interaction.user}, cancelled confession process successfully!`) //show the cancelled messages
                    interaction.user.send({ embeds: [cancelEmbed] }) //then send this embed to user's DM
                } else {
                    let waitingMessage = new MessageEmbed()
                    .setAuthor(`${interaction.guild} >> Confession Sent!`, interaction.guild.iconURL()) //now this title is much better :)
                    .setDescription(`${interaction.user}, your confession has sent to <#${channelData}> successfully!`)
                    interaction.user.send({ embeds: [waitingMessage] })

                    let postMessage = new MessageEmbed() //the embed we send to channel
                    .setAuthor(`Anonymous Confession`, interaction.guild.iconURL())
                    .setDescription(msg1)
                    .setFooter(`Type "/confess" to send a confession`)
                    .setTimestamp()
                    client.channels.cache.get(channelData).send({ embeds: [postMessage] });
                    }
                }); // we need to make this command only used in server, so let's make it
            })

        } else {
            interaction.user.send({ content: `The **/confess** command can only be used in a server! Please try again there.` });
        }
    }
}