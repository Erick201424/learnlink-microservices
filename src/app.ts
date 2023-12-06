import express from 'express';
import { Signale } from 'signale';
import dotenv from 'dotenv';

import { subjectRouter } from './subject/insfraestructure/routes/subjectRoutes';
import { scheduleRouter } from './schedule/insfraestructure/routes/scheduleRoutes';

dotenv.config();

const app = express();
const signale = new Signale();
app.use(express.json());

app.use('/subject_service', subjectRouter);
app.use('/schedule_service', scheduleRouter);

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
    signale.success(`Server online in port ${PORT}`);
});