// src/server.ts
import 'dotenv/config';
import express from 'express';
import userRoutes from './routes/userRoutes';

const app = express();
app.use(express.json());

app.use(userRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server rodando na porta ${PORT}`));