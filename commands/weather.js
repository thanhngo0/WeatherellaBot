const { prefix } = require('../assets/prefix');
const { weatherType } = require('../assets/forecast.json');
const { MessageAttachment } = require('discord.js');
const { svg2png } = require('svg-png-converter');

module.exports = {
	name: 'weather',
	description: 'weather command',
	async weather(message, locationData) {
		console.log(locationData);
		let weather = locationData.weather[0];
		let main = locationData.main;
		let wind = locationData.wind;
		const weatherMsg = {
			color: '#E6D6C6',
			author: {
				name: `${locationData.name}`,
				iconURL: message.author.avatarURL(),
			},
			thumbnail: {
				url: `http://openweathermap.org/img/wn/${weather.icon}@2x.png`,
			},
			description: `${weather.description.replace(
				/(^\w{1})|(\s+\w{1})/g,
				(letter) => letter.toUpperCase()
			)}`,
			fields: [
				{
					name: 'Temperature 🌡️',
					value: `Current: **${Math.round(
						main.temp
					)}**°C \nFeels Like: **${Math.round(
						main.feels_like
					)}**°C \nMin: **${Math.round(
						main.temp_min
					)}**°C \nMax: **${Math.round(main.temp_max)}**°C `,
					inline: true,
				},
				{
					name: 'Wind :wind_blowing_face:',
					value: `**${(locationData.wind.speed * 3.6).toFixed(2)}** KMPH`,
					inline: true,
				},
				{
					name: 'Humidity :sweat_drops:',
					value: `**${main.humidity}**%`,
					inline: true,
				},
				{
					name: 'Cloud Cover :cloud:',
					value: `**${locationData.clouds.all}**%`,
					inline: true,
				},
			],
			// footer: {
			// 	text: 'Developed by zef#9597 and naweed#0620',
			// 	iconURL:
			// 		'https://cdn.discordapp.com/attachments/757537399629676605/1000703122114629642/0097e4935d657eb4d359516b9bd7d31e.png',
			// },
		};
		await message.reply({ embeds: [weatherMsg] });
	},
};
