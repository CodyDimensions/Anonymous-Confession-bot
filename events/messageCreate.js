const { MessageEmbed, Collection } = require('discord.js');
const client = require('..');
const config = require('../config.json');
const prefix = config.prefix;

//messagCreate events
client.on("messageCreate", async (message) => {
    if(message.author.bot) return; //return when message author is a bot
    if(!message.content.startsWith(prefix)) return; //only response when command is start with prefix
    if(!message.guild) return; //return if the command is not using in guild. For example: DM will return the cmd
    if(!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(prefix.length).trim().split(/ +/g); // arg[0] is the first word after the cmd (not include prefix)
    //for example: !ban @user, so @user is args[0] If you still don't understand, feel free to ask me in Discord.
    const cmd = args.shift().toLowerCase();
    if(cmd.length == 0 ) return;
    let command = client.commands.get(cmd)
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if(command) command.run(client, message, args)

});