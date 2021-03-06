import { ICommand } from '../../classes/Command';
import { ISong } from '../../classes/Player';
import { getPlayer } from '../../util/musicUtil';
import { createFooter, embedColor, QuickEmbed, wrap } from '../../util/styleUtil';



export const command: ICommand = {
    name: 'Move',
    description: 'Move a commands position in the Queue',
    args: true,
    usage: '[song position] [desired position]',

    execute(message, args) {
        const player = getPlayer(message)
        if (player.getQueueCount() === 0) return QuickEmbed(message, 'Queue is empty')

        if (args.length < 2) return QuickEmbed(message, 'Not enough arguments..')

        let songPos: string | number = args.shift();
        let toPos: string | number = args.shift();

        songPos = Number(songPos)
        toPos = Number(toPos)

        if (songPos === toPos) return QuickEmbed(message, `Cannot move song to the same position`)

        songPos--;
        toPos--;

        const songSelected = player.queue.songs[songPos]
        const otherSong = player.queue.songs[toPos]

        if (!songSelected || !otherSong)
            return QuickEmbed(message, 'Song position incorrect')

        player.queue.songs[toPos] = songSelected
        player.queue.songs[songPos] = otherSong

        songPos++
        toPos++

        const embed = createFooter(message)
            .setColor(embedColor)
            .setTitle(`Moved songs in queue`)
            .addField(`\u200b`, `${moveString(songSelected, toPos)}\n\n${moveString(otherSong, songPos)}\n\u200b`)

        // embed.fields.push(createEmptyField())

        message.channel.send(embed)
    }
}

function moveString(song: ISong, toPos: number) {
    let to: string = wrap(toPos.toString())
    return `**Moved Song:**  ${song.title}\n**To Position: ${to}**`
}

