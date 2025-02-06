import express from 'express';
import { stkPush, c2bRegisterUrl, mpesaCallback } from '../controllers/mpesaController.js';

const mpesaRouter = express.Router();

mpesaRouter.post('/stkpush', stkPush);
mpesaRouter.post('/c2b/register', c2bRegisterUrl);
mpesaRouter.post('/callback', mpesaCallback);

export default mpesaRouter;
