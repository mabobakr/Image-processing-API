import express from 'express';
import createError from 'http-errors';
import path from 'path';
import fs from 'node:fs/promises';
import resize from '../../resize';

const router = express.Router();

router.get(
    '/',
    async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<void> => {
        let filename = req.query.filename;
        const query_width = req.query.width as string;
        const query_height = req.query.height as string;

        if (!filename) {
            return next(
                createError(400, 'Please Add filename in query parameters')
            );
        }

        const valid = /^\d+$/
        if (!valid.test(query_width) || !valid.test(query_height)) {
            return next(
                createError(
                    400,
                    'Query parameters must have integer width and height'
                )
            );
        }

        const width = parseInt(query_width)
        const height = parseInt(query_height)

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
    }
);

export default router;
