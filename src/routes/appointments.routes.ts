import { Router } from 'express';

const appointmentsRouter = Router();

appointmentsRouter.get('/', (req, res)=>res.send('Hello World'));

export default appointmentsRouter;
