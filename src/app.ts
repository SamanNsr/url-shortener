import express, { json } from 'express';
import 'express-async-errors';
import cors from 'cors';
import helmet from 'helmet';

import { errorHandler } from './middlewares/error-handler';
import { createUrlRouter, redirectRouter } from './routes';

require('dotenv').config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(json());
app.use(express.static('./public'));

app.use(createUrlRouter);
app.all('*', redirectRouter);

app.use(errorHandler);

export { app };
