import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/index';
import cors from 'cors';
import errorMiddleware from './error';

dotenv.config();

const app = express();

app.use(cors());

const port = process.env.port;

app.listen(port, (): void => {
    console.log(`listening on port ${port}`);
});

app.use('/api', routes);

app.use(errorMiddleware);

export default app;
