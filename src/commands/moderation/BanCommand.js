const FlameCommand = require('../../structures/FlameCommand');
const { getHelp } = require('../../utils/Functions');

class BanCommand extends FlameCommand {
    constructor() {
        super('ban', {
            description: 'Забанить пользователя на сервере.',
            category: 'moderation',
            usage: 'ban <Пользователь> [Причина]',
            aliases: [],
            clientPermissions: ['BAN_MEMBERS'],
            userPermissions: ['BAN_MEMBERS']
        })
    }
    async run(message, args) {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        
        if (!user) return getHelp(message, this.name);
        if (user.permissions.has('BAN_MEMBERS') || user.roles.highest.position >= message.member.roles.highest.position) return message.reply('Вы не можете забанить данного пользователя, потому что у него имеется роль выше вашей/он имеет равные вам права :no_entry:');
        if (!user.bannable) return message.reply('К сожалению, я не могу забанить данного пользователя :no_entry:');

        try {
            message.guild.members.ban(user.id, { reason: `${message.author.tag}: ${args.slice(1).join(' ') || 'Причина не указана.'}`, days: 1 });
            return message.reply(`✅ Пользователь **${user.user.tag}** (${user.id}) был успешно забанен модератором **${message.author.tag}**.`);
        } catch {
            return message.reply('Мне не удалось забанить указанного вами пользователя :no_entry:');
        } 
    }
}

module.exports = BanCommand;