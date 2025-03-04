import Imovel from '../model/Imovel.js';

export default class EditarImovelController {
  static async editar(req, res) {
    try {
      const { id } = req.params;
      const { titulo, nome, descricao, valor, contato, latitude, longitude } = req.body;
      
      console.log(req.body, id, "valor ee")
      // Verificar se latitude e longitude são fornecidos
      if (latitude == null || longitude == null) {
        return res.status(400).json({ error: 'Latitude e Longitude são obrigatórias.' });
      }

      // Verificar se o valor é um número válido
      if (isNaN(valor) || valor == null) {
        return res.status(400).json({ error: 'Valor inválido, deve ser um número.' });
      }

      // Atualiza o imóvel com o novo título, nome, descrição, valor e coordenadas
      const imovel = await Imovel.findByIdAndUpdate(id, {
        titulo,
        nome,
        descricao,
        valor,  // Converter o valor para número
        contato,
        localizacao: { 
          type: 'Point',
          coordinates: [longitude, latitude],  // Corrigido para o nome correto 'localizacao'
        },
      }, { new: true });

       console.log(imovel, "imovel")
      if (!imovel) {
        return res.status(404).json({ error: 'Imóvel não encontrado.' });
      }

      res.status(200).json(imovel);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
