// src/database/redisClient.js
import { createClient } from 'redis';

const redisClient = createClient({
  url: 'redis://localhost:6379' // Ajuste a URL conforme necessário
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
