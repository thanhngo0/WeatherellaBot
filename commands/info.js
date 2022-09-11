const { prefix } = require('../assets/prefix');
module.exports = {
	name: 'info',
	description: 'info command',
	async info(message) {
		const infoMsg = {
			color: '#E6D6C6',
			author: {
				name: `Weatherella`,
				iconURL: `https://media.discordapp.net/attachments/994108022706155580/1018267857370501193/weather.jpg?width=525&height=525`,
				url: 'https://github.com/thanhngo0',
			},
			description:
				'Weatherella is a bot that displays the weather of a certain location when called.',
			thumbnail: {
				url: 'https://media.discordapp.net/attachments/994108022706155580/1018267857370501193/weather.jpg?width=525&height=525',
			},
			fields: [
				{
					name: 'Creators',
					value:
						'[zef#9597](https://www.lisnkedin.com/in/thanh-ngo-846533237/)\n[naweed#0620](https://www.linkedin.com/in/naweed-yarzada/)',
					inline: true,
				},
				{
					name: 'Library',
					value: 'discord.js',
					inline: true,
				},
				{
					name: 'Website',
					value: '[weatherella.tech](https://weatherella.tech/)',
					inline: true,
				},
				{
					name: 'Invite',
					value: '[weatherella.tech/invite](https://weatherella.tech/invite)',
					inline: true,
				},
			],
			footer: {
				text: `${prefix}help for a list of commands`,
			},
		};
		await message.reply({ embeds: [infoMsg] });
	},
};
