import express from 'express';
import imageRouter from './api/image';

const routes = express.Router();

routes.get('/', (req, res) => {
    res.status(200).send('go for /images to resize');
});

routes.use('/images', imageRouter);

export default routes;
