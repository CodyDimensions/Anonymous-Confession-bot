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


client.login(token)
