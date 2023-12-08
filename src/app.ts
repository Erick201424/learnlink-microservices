import express from 'express';
import { Signale } from 'signale';
import dotenv from 'dotenv';

import { institutionRouter } from './institution/insfraestructure/routes/institutionRoutes';
import { careerRouter } from './career/insfraestructure/routes/careerRoutes';
import { relationshipInstitutionCareerRouter } from './relationCareersInInstitution/infraestructure/routes/institutionCareerRoutes';

dotenv.config();

const app = express();
const signale = new Signale();

app.use(express.json());
app.use("/institution", institutionRouter);
app.use("/career", careerRouter);
app.use("/careers/institution", relationshipInstitutionCareerRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    signale.success(`Server online in port ${PORT}`);
});