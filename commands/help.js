const { prefix } = require('../assets/prefix');
module.exports = {
	name: 'help',
	description: 'help command',
	async help(message) {
		const helpMsg = {
			color: '#E6D6C6',
			author: {
				name: 'Help Page',
				iconURL: message.author.avatarURL(),
			},
			thumbnail: {
				url: 'https://media.discordapp.net/attachments/994108022706155580/1018267857370501193/weather.jpg?width=525&height=525',
			},
			fields: [
				{
					name: 'Prefix',
					value: `${prefix}`,
					inline: true,
				},
				{
					name: 'Commands',
					value:
						'**help** to show this panel\n**info** to show bot information\n**weather [location?]** to show weather at location',
					inline: true,
				},
			],
			// footer: {
			// 	text: 'Developed by zef#9597 and naweed#0620',
			// 	iconURL:
			// 		'https://cdn.discordapp.com/attachments/757537399629676605/1000703122114629642/0097e4935d657eb4d359516b9bd7d31e.png',
			// },
		};
		await message.reply({ embeds: [helpMsg] });
	},
};
