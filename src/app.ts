import express from 'express';
import dotenv from 'dotenv';
import { Signale } from 'signale';

import { studentRouter } from './student/infraestructure/routes/studentRoutes';

dotenv.config();

const app = express();
const signale = new Signale();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Habilitar el manejo de datos de formularios

app.use('/user', studentRouter);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
    signale.success(`Server online in port ${PORT}`);
});