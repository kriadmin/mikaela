const db = require('./users')

async function removeSong(message, song, userTag) {
    message.channel.send(`Removed song: \`${song.id}\` from user: \`${userTag}\` favorites`);
    db.removeFromFavorite(song.id, userTag)
}

async function addSong(message, song, user) {
    const songs = await db.isSongFavorite(user.id, user.tag)
    console.dir(songs);
    db.addFavorite(song, user.id, user.tag)
}

module.exports = { addSong, removeSong }