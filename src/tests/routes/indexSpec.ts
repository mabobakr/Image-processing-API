import app from '../../index';
import supertest from 'supertest';

const request = supertest(app);

describe('API root endpoint testing', () => {
    it('It should return response with status code 200', async () => {
        const response = await request.get('/api');
        expect(response.status).toBe(200);
    });
});
