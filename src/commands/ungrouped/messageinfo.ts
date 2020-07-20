import { ICommand } from '../../classes/Command';
import { DMChannel, Message, MessageEmbed, NewsChannel, TextChannel } from 'discord.js';
import { createFooter } from '../../util/Style';
import { getUsage } from '../../util/CommandUtil';

export const command: ICommand = {
    name: 'messageinfo',
    description: 'Shows info of a message',
    aliases: ['message', 'msg', 'msginfo'],

    async execute(message, args) {
        if (args.length != 1) {
            throw getUsage(name);
        }

        let fetchedMsg: Message = await parseMessage(message.channel, args[0]);

        const embed: MessageEmbed = createFooter(message.client);

        embed.setTitle('Message info');
        embed.setDescription(fetchedMsg.content);
        embed.setThumbnail(fetchedMsg.author.avatarURL());

        embed.addField('Sent by', fetchedMsg.author);
        embed.addField('Message ID', `\`${fetchedMsg.id}\``);
        embed.addField('Created at', fetchedMsg.createdAt.toUTCString());
        embed.addField('URL', fetchedMsg.url);

        let editedAt: Date | null = fetchedMsg.editedAt;

        if (editedAt) {
            embed.addField('Edited at', editedAt.toUTCString());
        }

        await message.channel.send(embed);
    },
};

async function parseMessage(channel: TextChannel | DMChannel | NewsChannel, arg: string): Promise<Message> {
    return await channel.messages.fetch(arg);
}
