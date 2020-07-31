import { ICommand } from '../../classes/Command';
import { Client, DMChannel, Message, MessageEmbed, NewsChannel, TextChannel } from 'discord.js';
import { createFooter, sendErrorEmbed } from '../../util/Style';

export const command: ICommand = {
    name: 'messageinfo',
    description: 'Shows info of a message',
    aliases: ['message', 'msg', 'msginfo'],
    usage: '[message]',
    args: true,

    async execute(message, args) {
        let fetchedMsg: Message = await parseMessage(message.channel, args[0]);

        if (!fetchedMsg) {
            await sendErrorEmbed(message, `Could not find message ${args[0]}`);
        }

        await sendEmbed(message.client, fetchedMsg);
    },
};

async function sendEmbed(client: Client, message: Message) {
    const embed: MessageEmbed = createFooter(client);

    embed.setTitle('Message info');
    embed.setDescription(message.content);
    embed.setThumbnail(message.author.avatarURL());

    embed.addField('Sent by', message.author, true);
    embed.addField('Message ID', `\`${message.id}\``, true);
    embed.addField('Created at', message.createdAt.toUTCString(), true);
    embed.addField('URL', message.url);

    if (message.editedAt) {
        embed.addField('Last edited at', message.editedAt.toUTCString());
    }

    await message.channel.send(embed);
}

async function parseMessage(channel: TextChannel | DMChannel | NewsChannel, arg: string): Promise<Message> {
    return await channel.messages.fetch(arg).catch(_ => {
        return null;
    });
}
