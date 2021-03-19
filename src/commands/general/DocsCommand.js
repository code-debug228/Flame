const FlameCommand = require('../../structures/FlameCommand');
const querystring = require('querystring');
const fetch = require('node-fetch');
const { getHelp } = require('../../utils/Functions');

class DocsCommand extends FlameCommand {
    constructor() {
        super('docs', {
            description: 'Поиск чего-либо в документации discord.js.',
            category: 'general',
            usage: 'docs <v11/v12/stable> <Запрос>',
            aliases: []
        })
    }
    run(message, args) {
        const VERSIONS = ['v11', 'v12', 'stable'];
        const URL = 'https://djsdocs.sorta.moe/v2/embed';
        let version = args[0];

        if (!args[0] || !VERSIONS.includes(version)) return getHelp(message, this.name);
        if (!args.slice(1).join(' ')) return getHelp(message, this.name);
        if (!args.slice(1).join(' ').length > 500) return message.reply('Запрос не должен превышать лимит в **500** символов :no_entry:');

        version = `https://raw.githubusercontent.com/discordjs/discord.js/docs/${args[0].toLowerCase()}.json`;
        args.shift();

        const PARAMS = querystring.stringify({ src: version, q: args.join(' ') });

        fetch(`${URL}?${PARAMS}`).then((res) => res.json()).then((data) => {
            if (!data) return message.reply('Ваш запрос не вернул никаких результатов :no_entry:');

            return message.reply({ embed: data });
        });
    }
}

module.exports = DocsCommand;