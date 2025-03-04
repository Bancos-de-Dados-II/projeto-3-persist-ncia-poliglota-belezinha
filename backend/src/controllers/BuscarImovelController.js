import Imovel from '../model/Imovel.js';

export default class BuscarImovelController {
  static async buscarImovel(req, res) {
    try {
      const imoveis = await Imovel.find();
      res.status(200).json(imoveis);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}