import express from 'express';
import sharp from 'sharp';
import createError, { HttpError } from 'http-errors';
import path from 'path';
import fs from 'node:fs/promises';

const router = express.Router();

router.get('/', async (req, res, next) => {
    let filename = req.query.filename;
    const width = req.query.width;
    const height = req.query.height;
    if (!width || !height || !filename) {
        return next(
            createError(
                400,
                'Add filename, width and height in query parameters'
            )
        );
    }

    // if not found return error

    let assetPath = __dirname + '/../../../assets';
    assetPath = path.resolve(assetPath).normalize();

    // thumb and full folders paths
    const thumbPath = path.join(assetPath, 'thumb');
    const fPath = path.join(assetPath, 'full');

    const thumbs = await fs.readdir(thumbPath);
    const newThumbName = `${filename} ${width} ${height}` + '.jpg';

    if (thumbs.indexOf(newThumbName) != -1) {
        return res.status(200).sendFile(thumbPath + '/' + newThumbName);
    } else {
        const fullFiles = await fs.readdir(fPath);
        filename = filename + '.jpg';

        if (fullFiles.indexOf(filename) == -1) {
            return next(createError(404, "The file doesn't exist"));
        }
    }
});

export default router;
