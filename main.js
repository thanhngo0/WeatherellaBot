const Discord = require('discord.js');
const axios = require('axios');
const { MessageEmbed } = require('discord.js');
const { TOKEN, API_KEY } = require('./assets/config.json');
const { prefix } = require('./assets/prefix.json');
const fs = require('fs');
const { type } = require('os');
const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] });
const commandFiles = fs
	.readdirSync('./commands/')
	.filter((file) => file.endsWith('.js'));
client.commands = new Discord.Collection();
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}
let locationDataStandard,
	locationDataMetric,
	locationDataImperial = [];
client.login(TOKEN);
client.once('ready', async () => {
	console.log('Weatherella is ready');
	client.user.setActivity(`Weather | ${prefix}help`);
	client.user.setStatus('idle');
});

client.on('messageCreate', async (message) => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).trim().split(/ +/g).shift(); //user input
	const command = args.toLowerCase(); //user input but lowercase (avoids case sensitive)
	const parameters = message.content.slice(message.content.indexOf(' ') + 1);
	switch (command) {
		case 'help': {
			client.commands.get('help').help(message);
			break;
		}
		case 'info': {
			client.commands.get('info').info(message);
			break;
		}
		case 'weather': {
			if (await searchForLocation(parameters)) {
				client.commands.get('weather').weather(message, locationDataMetric);
			} else {
				console.log("Location doesn't exist");
				const emb = new MessageEmbed()
					.setColor('#E6D6C6')
					.setAuthor({
						name: message.author.username,
						iconURL: message.author.avatarURL(),
					})
					.setDescription(
						`Weatherella could not find the location, **${parameters}**`
					);
				await message.reply({ embeds: [emb] });
			}
			break;
		}
		default: {
			const emb = new MessageEmbed()
				.setColor('#E6D6C6')
				.setAuthor({
					name: message.author.username,
					iconURL: message.author.avatarURL(),
				})
				.setDescription(`**${args}** is not a command`)
				.setFooter({
					text: `${prefix}help for a list of commands`,
					iconURL:
						'https://media.discordapp.net/attachments/994108022706155580/1018267857370501193/weather.jpg?width=525&height=525',
				});
			await message.reply({ embeds: [emb] });
		}
	}
});

async function searchForLocation(location) {
	try {
		var locationDataAPIS =
			'http://api.openweathermap.org/data/2.5/weather?q=' +
			encodeURIComponent(location) +
			'&APPID=' +
			API_KEY;
		const responseS = await axios.get(locationDataAPIS);
		locationDataStandard = responseS.data;

		var locationDataAPIM =
			'http://api.openweathermap.org/data/2.5/weather?q=' +
			encodeURIComponent(location) +
			'&APPID=' +
			API_KEY +
			'&units=metric';
		const responseM = await axios.get(locationDataAPIM);
		locationDataMetric = responseM.data;

		var locationDataAPII =
			'http://api.openweathermap.org/data/2.5/weather?q=' +
			encodeURIComponent(location) +
			'&APPID=' +
			API_KEY +
			'&units=imperial';
		const responseI = await axios.get(locationDataAPII);
		locationDataImperial = responseI.data;
		return true;
	} catch (e) {
		//console.log(e);
		return false;
	}
}
