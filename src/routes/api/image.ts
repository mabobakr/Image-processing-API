import express from 'express';
import createError from 'http-errors';
import path from 'path';
import fs from 'node:fs/promises';
import resize from '../../resize';

const router = express.Router();

router.get('/', async (req, res, next) => {
    let filename = req.query.filename;
    const width = parseInt(req.query.width as string);
    const height = parseInt(req.query.height as string);

    if (!width || !height || !filename) {
        return next(
            createError(
                400,
                'Add filename, width and height in query parameters'
            )
        );
    }

    let assetPath = __dirname + '/../../../assets';
    assetPath = path.resolve(assetPath).normalize();

    // thumb and full folders paths
    const thumbPath = path.join(assetPath, 'thumb');
    const fPath = path.join(assetPath, 'full');

    const thumbs = await fs.readdir(thumbPath);
    const newThumbName = `${filename} ${width} ${height}` + '.jpg';
    const resizedPath = path.join(thumbPath, newThumbName);

    if (thumbs.indexOf(newThumbName) != -1) {
        return res.status(200).sendFile(resizedPath);
    } else {
        const fullFiles = await fs.readdir(fPath);
        filename = filename + '.jpg';

        if (fullFiles.indexOf(filename) == -1) {
            return next(createError(404, "The file doesn't exist"));
        }

        // process file and save the thumb
        let imgPath = path.join(fPath, filename);
        if (process.platform == 'win32') {
            imgPath = imgPath.replaceAll('\\', '\\\\');
        }

        const buffer = await resize(imgPath, height, width);

        await fs.writeFile(resizedPath, buffer);

        return res.status(200).sendFile(resizedPath);
    }
});

export default router;
