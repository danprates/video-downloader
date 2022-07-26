require('dotenv').config()
import { run } from './app'
import courses from './courses'

const type = process.argv[2] || 'all'

run(courses, type)
