const ytdl = require('ytdl-core')
const { Search } = require('./youtube')
class Song {
    constructor(title, url, id, duration) {
        this.title = title
        this.url = url
        this.id = id
        this.duration = duration
    }
}

module.exports = {
    helper: true,

    async GetSong(query) {
        let song = await this.GetInfo(query)
        if (!song) {
            id = await Search(query).then(res => res.id.videoId).catch(() => { })
            if (!id) return
            link = this.ConvertId(id)
            song = await this.GetInfo(link)
        }
        return this.ConvertToSong(song)
    },

    async GetInfo(link) {
        return await ytdl.getInfo(link).catch(() => { })
    },

    ConvertToSong(info) {
        return new Song(info.title, info.video_url, info.video_id, info.length_seconds)
    },

    ConvertDuration(duration) {
        let minutes = Math.floor(duration / 60)
        let seconds = Math.floor(duration - minutes * 60)

        if (seconds < 10) seconds = '0' + seconds

        return `Duration: ${minutes}:${seconds}`
    },

    //ANCHOR returns a link from a video id
    ConvertId(id) {
        return `https://www.youtube.com/watch?v=${id}`
    }
}