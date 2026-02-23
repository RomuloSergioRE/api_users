import 'dotenv/config';
import express from 'express';
import routes from './routes/routes';

const app = express();
app.use(express.json());

app.use(routes);

export { app }; // Exportamos para o Supertest usar