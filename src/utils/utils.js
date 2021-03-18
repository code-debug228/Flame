const getHelp = (message, command) => {
    return message.client.commands.get('help').run(message, [command]);
}
const permissions = {
    ADMINISTRATOR: 'Администратор',
    VIEW_AUDIT_LOG: 'Просматривать журнал аудита',
    CREATE_INSTANT_INVITE: 'Создавать приглашения',
    KICK_MEMBERS: 'Выгонять участников',
    BAN_MEMBERS: 'Банить участников',
    MANAGE_CHANNELS: 'Управлять каналами',
    MANAGE_GUILD: 'Управлять сервером',
    ADD_REACTIONS: 'Добавлять реакции',
    PRIORITY_SPEAKER: 'Приоритетный режим',
    STREAM: 'Вести трансляции',
    VIEW_CHANNEL: 'Просматривать канал',
    SEND_MESSAGES: 'Отправлять сообщения',
    SEND_TTS_MESSAGES: 'Отправлять TTS-сообщения',
    MANAGE_MESSAGES: 'Управлять сообщениями',
    EMBED_LINKS: 'Встраивать ссылки',
    ATTACH_FILES: 'Прикреплять файлы',
    READ_MESSAGE_HISTORY: 'Просматривать историю сообщений',
    MENTION_EVERYONE: 'Упопоминать всех',
    USE_EXTERNAL_EMOJIS: 'Использовать сторонние эмодзи',
    VIEW_GUILD_INSIGHTS: 'Просматривать аналитику сервера',
    CONNECT: 'Подключатся',
    SPEAK: 'Говорить',
    MUTE_MEMBERS: 'Заглушать участников',
    DEAFEN_MEMBERS: 'Отключать участникам звук',
    MOVE_MEMBERS: 'Перемещать участников',
    CHANGE_NICKNAME: 'Изменять никнейм',
    MANAGE_NICKNAMES: 'Управлять никнеймами',
    MANAGE_ROLES: 'Управлять ролями',
    MANAGE_WEBHOOKS: 'Управлять вебхуками',
    MANAGE_EMOJIS: 'Управлять эмодзи'
}

module.exports = {
    getHelp,
    permissions
}