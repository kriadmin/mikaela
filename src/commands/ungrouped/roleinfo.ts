import { ICommand } from '../../classes/Command';
import { createFooter, sendErrorEmbed } from '../../util/Style';
import { Guild, MessageEmbed, Role } from 'discord.js';

export const command: ICommand = {
    name: 'roleinfo',
    description: 'Shows info about a role',
    aliases: ['role'],
    args: true,

    async execute(message, args) {
        let embed: MessageEmbed = createFooter(message.client);
        let role: Role = await parseRole(args[0], message.guild);

        if (!role) {
            return await sendErrorEmbed(message, `Cannot find role ${role}`);
        }

        embed.setTitle('Role info');
        embed.setDescription(`Role info for ${role}`);

        embed.setColor(role.color);

        embed.addField('Role ID', `\`${role.id}\``);
        embed.addField('Created at', role.createdAt.toUTCString());
        embed.addField('Hoist', role.hoist, true);
        embed.addField('Mentionable', role.mentionable, true);
        embed.addField('Position', role.position, true);
        embed.addField('Members with role', role.members.size, true);

        await message.channel.send(embed);
    },
};

const ROLE_MENTION_PATTERN = /<@&|>/g;

async function parseRole(roleStr: string, guild: Guild): Promise<Role> {
    let parsedStr: string = roleStr.replace(ROLE_MENTION_PATTERN, '');

    return await guild.roles.fetch(parsedStr).catch(_ => {
        return null;
    });
}
