const { Client, Message, MessageEmbed, Collection } = require('discord.js')
const fs = require('fs')
const client = new Client({
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
    intents: 32767,
});

module.exports = client;

const dotenv = require('dotenv')
const envFile = dotenv.config()
const config = require('./config.json')
const prefix = config.prefix
const token = process.env['token']


client.on("ready", () => {
    console.log(`${client.user.tag} is ready!`)
    
    const actvs = [
        `${prefix}help | Under Development`,
        `${prefix}help | ${client.channels.cache.size} channels`,
        `${prefix}help | ${client.users.cache.size} users`,
        `${prefix}help | ${client.guilds.cache.size} servers`,
    ]

    client.user.setActivity(actvs[Math.floor(Math.random() * (actvs.length - 1) + 1)], { type: 'COMPETING' });
        setInterval(() => {
            client.user.setActivity(actvs[Math.floor(Math.random() * (actvs.length - 1) + 1)], { type: 'COMPETING' });
    }, 5000);

    client.user.setStatus('idle')

    
});



//new collections
client.commands = new Collection();
client.aliases = new Collection();
client.events = new Collection();

client.categories = fs.readdirSync('./commands');

//load the files
['command'].forEach((handler) => {
    require(`./handler/${handler}`)(client)
});

//slash commands
client.slashCommands = new Collection();

['slashCommand'].forEach((handler) => {
    require(`./handler/${handler}`)(client)
});


//snipe map
client.snipes = new Map() //create a new map
client.on('messageDelete', function(message, channel) {
    client.snipes.set(message.channel.id, { //get the channel of message
        content: message.content, //snipe the message that was deleted
        author: message.author.id, //get the message author the the deleted message
        image: message.attachments.first() ? message.attachments.first().proxyURL : null //get the deleted image if there is one
    })
})

//We will move our token from config.json to .env
client.login(token)