import { createClient } from 'redis'

const redisClient = createClient({
  url: process.env.APP_REDIS!
})

export default redisClient
