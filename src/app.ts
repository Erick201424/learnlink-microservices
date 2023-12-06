import express from 'express';
import { Signale } from 'signale';
import dotenv from 'dotenv';

import { institutionRouter } from './InstitutionManagement/institution/insfraestructure/routes/institutionRoutes';
import { careerRouter } from './InstitutionManagement/career/insfraestructure/routes/careerRoutes';
import { relationshipInstitutionCareerRouter } from './InstitutionManagement/relationCareersInInstitution/infraestructure/routes/institutionCareerRoutes';

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