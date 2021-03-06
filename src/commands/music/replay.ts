import { MessageEmbed } from 'discord.js';

import { getPlayer } from '../../util/musicUtil';
import { ICommand } from '../../classes/Command';
import { embedColor, QuickEmbed } from '../../util/styleUtil';

export const command: ICommand = {
    name: 'Replay',
    description: 'Replay last song played',
    args: false,

    async execute(message, args) {
        const player = getPlayer(message);
        if (!player) return;

        const lastPlayed = player.getLastPlayed();
        if (lastPlayed) {
            player.addSong(lastPlayed, message);
            const embed = new MessageEmbed()
                .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
                .setTitle(`Replaying: ${lastPlayed.title}`)
                .setDescription(`**Added to queue**\n${lastPlayed.duration.duration}`)
                .setURL(lastPlayed.url)
                .setColor(embedColor);

            message.channel.send(embed);
        } else {
            QuickEmbed(message, `No song was played previously`);
        }
    },
};
