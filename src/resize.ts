import sharp from 'sharp';

const resize = async (
    imgPath: string,
    height: number,
    width: number
): Promise<Buffer> => {
    return await sharp(imgPath)
        .resize({ height: height, width: width })
        .toBuffer();
};

export default resize;
