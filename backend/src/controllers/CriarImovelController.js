import Imovel from '../model/Imovel.js';

export default class CriarImovelController {
  static async criarImovel(req, res) {
    try {
      const { dados, latitude, longitude } = req.body;
 console.log(req.body, "dados valor")
      // Verificação das coordenadas
      if (latitude == null || longitude == null) {
        return res.status(400).json({ error: 'Latitude e Longitude são obrigatórias.' });
      }

      // Verificação do valor
      if (isNaN(dados.valor) || dados.valor <= 0) {
        return res.status(400).json({ error: 'Valor do imóvel inválido.' });
      }

      // Criação do objeto de imóvel
      const imovel = new Imovel({
        titulo: dados.titulo,
        nome: dados.nome,
        descricao: dados.descricao,
        valor: parseFloat(dados.valor), // Garantir que o valor seja um número
        contato: dados.contato,
        localizacao: {
          type: 'Point',
          coordinates: [longitude, latitude], // [longitude, latitude]
        },
      });

      // Salvamento do imóvel no banco de dados
      await imovel.save();

      // Resposta com o imóvel criado
      res.status(201).json(imovel);
    } catch (error) {
      // Caso haja erro no processo de criação
      res.status(500).json({ error: error.message });
    }
  }
}
