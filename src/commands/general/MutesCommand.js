const FlameCommand = require('../../structures/FlameCommand');
const { MessageEmbed } = require('discord.js');

class MutesCommand extends FlameCommand {
    constructor() {
        super('mutes', {
            description: 'Выводит список мьютов сервера.',
            category: 'general',
            usage: 'mutes',
            aliases: [],
            cooldown: 3
        })
    }
    async run(message, args) {
        const data = await message.client.database.collection('mutes').find({ guildID: message.guild.id }).toArray();

        const embed = new MessageEmbed()
            .setTitle('Список мьютов данного сервера')
            .setColor('ffa500')
            .setFooter(message.guild.name, message.guild.iconURL())
            .setTimestamp()
        
        if (data.length == 0) embed.setDescription('Список замьюченных пользователей пуст.');
        else {
            let i = 0;
            for (let mute of data.slice(0, 10)) {
                embed.addField(
                    `${++i}. ${mute.details.tag} (${mute.userID}):`,
                    `Дата окончания: **${new Date(mute.ends).toISOString().replace('T', ' ').substr(0, 19)}**\nПричина: \`${mute.details.reason}\``
                )
            }
            embed.setThumbnail(message.guild.iconURL({ size: 2048 }))
        }
        return message.reply(embed);
    }
}

module.exports = MutesCommand