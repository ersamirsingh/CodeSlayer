import { createClient } from 'redis';

const redisClient = createClient({
   username: 'default',
   password: 'q3IDkXKmkvVVlUCt1AvKbzMNJEcvjagh',
   socket: {
      host: 'redis-18443.c8.us-east-1-4.ec2.redns.redis-cloud.com',
      port: 18443
   }
});

redisClient.on('error', err => console.log('Redis Client Error', err));

export default redisClient;


