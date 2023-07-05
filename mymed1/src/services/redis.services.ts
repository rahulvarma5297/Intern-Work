import { REDIS_PASSWORD, REDIS_URL, REDIS_USERNAME } from '@/config';
import { createClient } from 'redis';

//Initialized redis client

const redisClient = createClient({
  url: REDIS_URL,
});

redisClient
  .connect()
  .then(() => console.log('Redis connected'))
  .catch(err => console.log(err));

export default redisClient;
