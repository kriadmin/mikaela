import { MessageEmbed } from 'discord.js';
import { ICommand } from '../../classes/Command';
import { embedColor, QuickEmbed } from '../../util/styleUtil';
import { findFavorite } from './play';


export const command: ICommand = {
    name: 'info',
    description: 'Get a songs info',
    aliases: ['i'],
    args: true,
    usage: '',

    async execute(message, args) {
        const song = await findFavorite(message, args);

        if (!song || song instanceof Array)
            return QuickEmbed(message, `Song not found`)

        const embed = new MessageEmbed()
            .setColor(embedColor)
            .setTitle(song.title)
            .setDescription(`id: ${song.id}`)
            .addField('Duration', song.duration.duration)
            .setURL(song.url);

        message.channel.send(embed);
    },
};
