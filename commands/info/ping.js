const { Client, Message } = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Returns bot ping.',
    run: async(client, message, args) => {
        const msg = await message.channel.send('Pinging...')
        await msg.edit(`Pong! **${client.ws.ping} ms**`)
    }
}