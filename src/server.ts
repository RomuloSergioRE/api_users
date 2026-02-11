import 'dotenv/config';
import express from 'express';
import routes from './routes/routes';

const app = express();
app.use(express.json());

app.use(routes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`🚀 Server rodando na porta ${PORT}`));