import express, { Application } from 'express';
import { Signale } from 'signale';
import { Request, Response } from "express";

import cors from 'cors';
import dotenv from 'dotenv';
import proxy from 'express-http-proxy';
import morgan from 'morgan';

dotenv.config();

const app: Application = express();
const signale = new Signale();

app.use(express.urlencoded({ extended: true }));


app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT;

app.get('/rutine', (req: Request, res: Response) => {
    res.status(200).send('Rutina ejecutáda con éxito');
})

//Institution
app.use('/api/v1/institution_services', proxy('http://localhost:3001'));
app.use('/api/v1/career_services', proxy('http://localhost:3001'));
app.use('/api/v1/relation_Services', proxy('http://localhost:3001'));

//Service User
app.use('/api/v1/user_services', proxy('http://localhost:3002'));

//Service Schedule
app.use('/api/v1/subject_services', proxy('http://localhost:3003'));
app.use('/api/v1/schedule_services', proxy('http://localhost:3003'));

//Service Event
app.use('/api/v1/community_services', proxy('http://localhost:3004'));
app.use('/api/v1/event_services', proxy('http://localhost:3004'));
app.use('/api/v1/suscription_services', proxy('http://localhost:3004'));

// Iniciar el servidor
app.listen(port, () => {
    signale.success(`API Gateway en el puerto ${port}`);
});