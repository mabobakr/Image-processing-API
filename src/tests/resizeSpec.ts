import resize from '../resize';
import path from 'path';

describe('Image Processing testing suite', () => {
    it("should throw an error if file doesn't exist", async () => {
        await expectAsync(resize('non-existing', 100, 100)).toBeRejected();
    });

    it('should return a buffer if file exists', async () => {
        let fPath = __dirname + '/../../assets/full';
        fPath = path.resolve(fPath).normalize();

        const filename = 'space.jpg';

        // process file and save the thumb
        let imgPath = path.join(fPath, filename);
        if (process.platform == 'win32') {
            imgPath = imgPath.replaceAll('\\', '\\\\');
        }

        expect(await resize(imgPath, 100, 100)).toBeInstanceOf(Buffer);
    });
});
