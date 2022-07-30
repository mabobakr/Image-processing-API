import app from '../../../index';
import supertest from 'supertest';

const request = supertest(app);

describe('Images endpoint testing', () => {
    it('It should return 400 bad request if query parameters are not provided', async () => {
        const response = await request.get('/api/images');
        expect(response.status).toBe(400);
    });

    it("should return 404 not found if the image doesn't exist", async () => {
        const response = await request.get('/api/images').query({
            filename: 'non-existing',
            width: 100,
            height: 100,
        });
        expect(response.status).toBe(404);
    });
});
