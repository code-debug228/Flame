const FlameCommand = require('../../structures/FlameCommand');
const { getHelp, ms } = require('../../utils/Functions');
const MuteService = require('../../services/MuteService');

class MuteCommand extends FlameCommand {
    constructor() {
        super('mute', {
            description: 'Замьютить пользователя на сервере.',
            category: 'moderation',
            usage: 'mute <Пользователь> [Причина]',
            aliases: [],
            userPermissions: ['MANAGE_ROLES', 'MANAGE_MESSAGES'],
            clientPermissions: ['MANAGE_ROLES']
        })
    }
    async run(message, args) {
        const MuteManager = new MuteService(message.client);

        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        const time = args[1];

        if (!user) return getHelp(message, this.name);
        if (user.permissions.has('MANAGE_ROLES') || user.roles.highest.position > message.member.roles.highest.position) message.reply('Вы не можете замьютить данного пользователя, потому что у него имеется роль выше вашей/он имеет равные вам права :no_entry:');

        const guild = await message.client.database.collection('guilds').findOne({ guildID: message.guild.id });

        if (!guild.muteRole || !message.guild.roles.cache.has(guild?.muteRole)) return message.reply('Похоже, на этом сервере не установлена роль мьюта. Установите ее прежде чем использовать данную команду :no_entry:');
        if (await MuteManager.find({ guildID: message.guild.id, userID: user?.id }) && user.roles.cache.has(guild.muteRole)) return message.reply('Указанный вами пользователь уже замьючен на данном сервере :no_entry:');

        if (!time) return getHelp(message, this.name);
        if (!ms(time) || ms(time) > ms('14d') || ms(time) < ms('1m')) return message.reply('Укажите пожалуйста **корректное** время (от одной минуты до 14 дней) :no_entry:');

        const mute = {
            guildID: message.guild.id,
            userID: user.id,
            muteRole: guild.muteRole,
            ends: Date.now() + ms(time),
            details: {
                tag: user.user.tag,
                moderator: message.author.id,
                reason: args.slice(2).join(' ') || 'Причина не установлена.'
            }
        }
        MuteManager.create(mute);

        user.roles.add(guild.muteRole).catch(console.error);
        message.reply(`✅ Пользователь **${user.user.tag}** (${user.id}) был успешно замьючен модератором **${message.author.tag}**.`);

        return MuteManager.handle(mute);
    }
}

module.exports = MuteCommand;