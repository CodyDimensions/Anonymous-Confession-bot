const client = require('..');

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return; //if it is not interaction command then return
    const slashCommand = client.slashCommands.get(interaction.commandName); //get the command name from collection
    if(!slashCommand) return //if no slash cmd name then return
    try{
        await slashCommand.execute(client, interaction) //execute the command 
    } catch (err) {
        if (err) console.error(err);
        await interaction.reply({ content: 'There was an error!', ephemeral: true })
    }
});