const FlameClient = require('./structures/FlameClient');
const { Intents, Structures } = require('discord.js');

const clientOptions = { intents: Intents.ALL, disabledMentions: 'everyone' };
const client = new FlameClient(clientOptions);

client._launch();