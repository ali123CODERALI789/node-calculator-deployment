const request = require('supertest');
const app = require('./server.js');

describe('Calculator API', () => {
    let server;

    beforeAll((done) => {
        server = app.listen(0, done); // Use random port for tests
    });

    afterAll((done) => {
        server.close(done);
    });

    test('GET /api should return API status', async () => {
        const response = await request(server).get('/api');
        expect(response.status).toBe(200);
        expect(response.body.message).toContain('Calculator API');
    });

    test('GET /api/calculate should add numbers', async () => {
        const response = await request(server)
            .get('/api/calculate?operation=add&a=5&b=3');
        expect(response.status).toBe(200);
        expect(response.body.result).toBe(8);
    });

    test('GET /api/calculate should multiply numbers', async () => {
        const response = await request(server)
            .get('/api/calculate?operation=multiply&a=4&b=7');
        expect(response.status).toBe(200);
        expect(response.body.result).toBe(28);
    });
});
