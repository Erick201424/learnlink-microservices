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
app.use('/api/v1/institution_services', proxy('http://schedule-service-env.eba-y3wtajve.us-east-2.elasticbeanstalk.com/institution'));
app.use('/api/v1/career_services', proxy('http://schedule-service-env.eba-y3wtajve.us-east-2.elasticbeanstalk.com/career'));
app.use('/api/v1/relation_Services', proxy('http://schedule-service-env.eba-y3wtajve.us-east-2.elasticbeanstalk.com/careers/institution'));

//Service User
app.use('/api/v1/user_services', proxy('http://service1-env.eba-rfv62e7e.us-east-2.elasticbeanstalk.com/user'));

//Service Schedule
app.use('/api/v1/subject_services', proxy('http://schedule-service-env.eba-y3wtajve.us-east-2.elasticbeanstalk.com/subject'));
app.use('/api/v1/schedule_services', proxy('http://schedule-service-env.eba-y3wtajve.us-east-2.elasticbeanstalk.com/schedule'));

//Service Event
app.use('/api/v1/community_services', proxy('http://studygroup-service-env.eba-qrbgc3x2.us-east-2.elasticbeanstalk.com/community'));
app.use('/api/v1/event_services', proxy('http://studygroup-service-env.eba-qrbgc3x2.us-east-2.elasticbeanstalk.com/event'));
app.use('/api/v1/suscription_services', proxy('http://studygroup-service-env.eba-qrbgc3x2.us-east-2.elasticbeanstalk.com/suscription'));

// Iniciar el servidor
app.listen(port, () => {
    signale.success(`API Gateway en el puerto ${port}`);
});