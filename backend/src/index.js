import express from 'express';
import conectarMongoDB from  "./database/mongoose.js"
import imovelRoutes from './routers/ImovelRouters.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

conectarMongoDB();
app.use('/api/imoveis', imovelRoutes);

app.listen(3000, () => {
  console.log(`Conectando com URL: ${process.env.MONGO_URL}`);

  console.log('Servidor rodando na porta 3000');
});