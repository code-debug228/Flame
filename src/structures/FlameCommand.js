class FlameCommand {
    constructor(name, options = {}) {
        this.name = name;
        this.description = options.description || 'Описание данной команды не установлено.';
        this.usage = options.usage || 'Пример использования команды не установлен.';
        this.aliases = options.aliases || [];
        this.cooldown = options.cooldown || 0;
    }
}

module.exports = FlameCommand;