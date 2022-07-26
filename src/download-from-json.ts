import fs from 'fs'
import path from 'path'
import downloadVideos from './downloadVideos'

const filename = process.argv[2] || 'videos.json'

;(async () => {
  const videos = JSON.parse(
    String(fs.readFileSync(path.join(__dirname, filename)))
  )
  await downloadVideos(videos)
})()
