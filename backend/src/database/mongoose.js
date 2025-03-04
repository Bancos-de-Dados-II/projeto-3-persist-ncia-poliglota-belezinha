import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose';

// URL de conexão com o MongoDB Atlas

const conectarMongoDB = async () => {
  try {
    console.log(process.env.MONGO_URL, "url")
    await mongoose.connect(process.env.MONGO_URL , {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado ao MongoDB Atlas');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
  }
};

export default conectarMongoDB;
