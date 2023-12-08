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

const port = process.env.PORT;

app.get('/rutine', (req: Request, res: Response) => {
    res.status(200).send('Rutina ejecutáda con éxito');
})

//Institution
app.use('/api/v1/institution_services', proxy('https://institution.learnlinked.net'));
app.use('/api/v1/career_services', proxy('https://institution.learnlinked.net'));
app.use('/api/v1/relation_services', proxy('https://institution.learnlinked.net'));

//Service User
app.use('/api/v1/user_services', proxy('https://student.learnlinked.net'));

//Service Schedule
app.use('/api/v1/subject_services', proxy('https://schedule.learnlinked.net'));
app.use('/api/v1/schedule_services', proxy('https://schedule.learnlinked.net'));

//Service Event
app.use('/api/v1/community_services', proxy('https://groups.learnlinked.net'));
app.use('/api/v1/event_services', proxy('https://groups.learnlinked.net'));
app.use('/api/v1/suscription_services', proxy('https://groups.learnlinked.net'));

// Iniciar el servidor
app.listen(port, () => {
    signale.success(`API Gateway en el puerto ${port}`);
});