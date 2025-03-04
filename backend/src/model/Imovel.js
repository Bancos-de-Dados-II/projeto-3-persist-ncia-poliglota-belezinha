import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
// Definir o schema do Imóvel com dados espaciais
const imovelSchema = new mongoose.Schema({

  titulo: {
    type: String,
    required: true,
  },
  nome: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
  },
  valor: {
    type: Number,
    required: true,
  },
  contato: {
    type: String,
  },
  // Dados espaciais com tipo GeoJSON: Point (latitude e longitude)
  localizacao: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
});

// Criar um índice geoespacial para a localização
imovelSchema.index({ localizacao: '2dsphere' });

// Criar o modelo com base no schema
const Imovel = mongoose.model('Imovel', imovelSchema);

export default Imovel;