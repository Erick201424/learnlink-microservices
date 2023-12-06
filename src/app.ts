import express from 'express';
import { Signale } from 'signale';
import dotenv from 'dotenv';

import { communityRouter } from './studyGroup/insfraestructure/routes/communityRoutes';
import { eventRouter } from './event/insfraestructure/routes/eventRoutes';
import { SuscriptionRouter } from './suscription/insfraestructure/routes/suscriptionRoutes';

dotenv.config();

const app = express();
const signale = new Signale();
app.use(express.json());


app.use('/community', communityRouter);
app.use('/event', eventRouter);
app.use('/suscription', SuscriptionRouter);


const PORT = process.env.PORT || 3004;

app.listen(PORT, () => {
    signale.success(`Server online in port ${PORT}`);
});