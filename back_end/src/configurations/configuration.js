import * as express from './express.js'
import * as mongoose from './mongoose.js'

export async function configure (app) {
  await express.configure(app)
  await mongoose.configure(app)
}

export default configure