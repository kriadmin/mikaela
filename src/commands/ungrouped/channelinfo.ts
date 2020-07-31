import { ICommand } from '../../classes/Command';
import { Channel, Client, GuildChannel, MessageEmbed } from 'discord.js';
import { createFooter, sendErrorEmbed } from '../../util/Style';
import { CommandError } from '../../classes/CommandError';

export const command: ICommand = {
    name: 'channelinfo',
    description: 'Shows info of a channel',
    aliases: ['channel'],

    async execute(message, args) {
        let channel;

        if (args.length == 0) {
            channel = message.channel;
        } else {
            channel = await fetchChannel(message.client, args[0]);
            if (!channel) {
                return await sendErrorEmbed(message, `Could not find channel \`${args[0]}\``);
            }
        }

        let embed: MessageEmbed = createFooter(message.client);

        embed.setTitle('Channel info');
        embed.setDescription(`Channel info for ${channel}`);

        embed.addField('Channel ID', `\`${channel.id}\``);
        embed.addField('Created at', channel.createdAt.toUTCString());

        embed.addField('Position', channel.position, true);

        if (channel instanceof GuildChannel) {
            embed.addField('Members', channel.members.size, true);
        }

        await message.channel.send(embed);
    },
};

async function fetchChannel(client: Client, arg: string): Promise<Channel | CommandError> {
    // Remove mention
    arg = arg.replace(/<#|>/g, '');

    return client.channels.fetch(arg).catch(_ => {
        return null;
    });
}
