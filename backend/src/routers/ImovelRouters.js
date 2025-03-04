import { Router } from 'express';
import ImovelController from '../controllers/CriarImovelController.js';
import BuscarImovelController from '../controllers/BuscarImovelController.js';
import EditarImovelController from '../controllers/EditarImovelController.js';
import DeletarImovelController from '../controllers/DeletarImovelController.js';

const router = Router();
router.post('/', ImovelController.criarImovel);
router.get('/', BuscarImovelController.buscarImovel);
router.put('/:id', EditarImovelController.editar);
router.delete('/:id', DeletarImovelController.deletar);

export default router;