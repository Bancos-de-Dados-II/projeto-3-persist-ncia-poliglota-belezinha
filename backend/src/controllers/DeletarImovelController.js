import Imovel from '../model/Imovel.js';

export default class DeletarImovelController {
  static async deletar(req, res) {
    try {
      const { id } = req.params;
      const imovel = await Imovel.findByIdAndDelete(id);
      if (!imovel) {
        return res.status(404).json({ error: 'Imóvel não encontrado.' });
      }
      res.status(200).json({ message: 'Imóvel deletado com sucesso.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
