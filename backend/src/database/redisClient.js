// src/database/redisClient.js
import { createClient } from 'redis';
import dotenv from 'dotenv'
dotenv.config()
const redisClient = createClient({
  url: process.env.REDIS_URL 
});

redisClient.on('connect', () => {
  console.log('Conectado ao Redis!');
});

redisClient.on('error', (err) => {
  console.error('Erro do Redis:', err);
});

redisClient.connect();

export { redisClient };
