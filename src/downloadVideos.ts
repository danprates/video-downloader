import axios from 'axios'
import cliProgress from 'cli-progress'
import fs from 'fs'
import fse from 'fs-extra'
import path from 'path'
import { performance } from 'perf_hooks'

Object.defineProperty(Array.prototype, 'chunk_inefficient', {
  value: function (chunkSize: number) {
    var array = this
    return [].concat.apply(
      [],
      array.map(function (elem: any, i: number) {
        return i % chunkSize ? [] : [array.slice(i, i + chunkSize)]
      })
    )
  }
})

const downloadVideo = async (url: string, path: string) => {
  const writer = fs.createWriteStream(path)
  try {
    const { data } = await axios({
      url,
      method: 'GET',
      responseType: 'stream'
    })

    data.pipe(writer)
  } catch (err: any) {
    console.log('')
    console.log('error while downloading ' + url)
    console.log('Destination ' + path)
    console.log(err.toJSON())
    process.exit(-1)
  }

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve)
    writer.on('error', reject)
  })
}

export default async function (videos: any) {
  var start = performance.now()

  let chunks = videos.chunk_inefficient(process.env.CHUNKS || 5)
  let promises = []
  const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)

  console.log(
    `${videos.length} video will be downloaded in ${chunks.length} chunks.`
  )
  let finishedChunks = 0
  bar1.start(chunks.length, finishedChunks)
  for (let index = 0; index < chunks.length; index++) {
    let chunk = chunks[index]
    promises = []
    for (let i = 0; i < chunk.length; i++) {
      let video = chunk[i]
      let dir = path.join(
        __dirname,
        '..',
        'downloads',
        video.filename.split('/')[0]
      )
      fse.ensureDir(dir)
      let filename = video.filename.substr(
        video.filename.search('/') + 1,
        video.filename.length
      )

      video.url &&
        promises.push(
          downloadVideo(video.url, dir + '/' + filename.replace('/', '-'))
        )
      if (video.filenameSubtitles !== '') {
        let filenameSubtitles = video.filenameSubtitles.substr(
          video.filenameSubtitles.search('/') + 1,
          video.filenameSubtitles.length
        )
        promises.push(
          downloadVideo(
            video.urlSubtitles,
            dir + '/' + filenameSubtitles.replace('/', '-')
          )
        )
      }
    }

    await Promise.all(promises)
    bar1.update(++finishedChunks)
  }
  bar1.stop()
  const elapsedSec = ((performance.now() - start) / 1000).toFixed(2)
  console.log(`${videos.length} video downloaded in ${elapsedSec} seconds`)
}
