import express from 'express';
import imageRouter from './api/image';

const routes = express.Router();

routes.get('/', (req, res) => {
    res.status(200).send('if you want the 100 100 go for /api/image?eh=100');
});

routes.use('/image', imageRouter);

export default routes;
