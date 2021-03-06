import { Message, MessageEmbed } from 'discord.js';
import { ICommand } from '../../classes/Command';
import { createFooter } from '../../util/styleUtil';

export const command: ICommand = {
    name: 'latency',
    description: 'Measures latency',
    aliases: ['ping'],

    async execute(message, _) {
        let embed: MessageEmbed = createFooter(message);

        embed.setTitle('Pong!');
        embed.addField('Websocket', `${message.client.ws.ping} ms`, true);
        embed.setColor('BLUE');

        let before: number = Date.now();

        let msg: Message = await message.channel.send(embed);

        let sendDelay = Date.now() - before;
        embed.addField('Send', `${sendDelay} ms`, true);

        let msgDelay = msg.createdTimestamp - message.createdTimestamp;
        embed.addField('Message', `${msgDelay} ms`, true);

        await msg.edit(embed);
    },
};
