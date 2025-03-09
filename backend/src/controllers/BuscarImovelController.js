import Imovel from '../model/Imovel.js';
import { redisClient } from '../database/redisClient.js'; // Verifique se você tem a instância redisClient configurada

export default class BuscarImovelController {
  static async buscarImovel(req, res) {
    try {
      const cacheKey = 'imoveis';

      // Verificar se já existe cache
      const cachedImoveis = await redisClient.get(cacheKey);
      let imoveis;

      if (cachedImoveis) {
        // Se estiver no cache, retornar os dados do cache

        console.log(cachedImoveis, "cachedImoveis")
        imoveis = JSON.parse(cachedImoveis); // Convertendo de volta para JSON
        console.log('Retornando imóveis do cache');
        return res.status(200).json(imoveis);
      }

      // Se não estiver no cache, buscar do MongoDB
      imoveis = await Imovel.find().lean(); // 'lean()' retorna objetos simples em vez de instâncias Mongoose

      // Armazenar os dados no cache do Redis com expiração de 1 hora
      await redisClient.set(cacheKey, JSON.stringify(imoveis), {
        EX: 3600, // Expira após 1 hora
      });

      // Retornar os dados do MongoDB
      res.status(200).json(imoveis);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
