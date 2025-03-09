// src/database/redisClient.js
import { createClient } from 'redis';
import dotenv from 'dotenv'
dotenv.config()
const redisClient = createClient({
  url: process.env.REDIS_URL // Ajuste a URL conforme necessário
});

redisClient.on('connect', () => {
  console.log('Conectado ao Redis!');
});

redisClient.on('error', (err) => {
  console.error('Erro do Redis:', err);
});

redisClient.connect();

// Exporta a instância do redisClient para ser utilizada em outros arquivos
export { redisClient };
