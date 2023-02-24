import supertest from 'supertest';
import app from '..';

const request = supertest(app).get;

describe('Evaluate endpoints output', () => {
  describe('endpoint: /', () => {
    it('gets /', async () => {
      const response = await request('/');
      expect(response.status).toBe(200);
    });
  });

  describe('endpoint: /api/imageprocess', () => {
    it('gets /api/imageprocess?filename=fjord (valid args)', async () => {
      const response = await request('/api/imageprocess?filename=fjord');

      expect(response.status).toBe(200);
    });

    it('gets /api/imageprocess?filename=fjord&width=199&height=199 (valid args)', async () => {
      const response = await request(
        '/api/imageprocess?filename=fjord&width=199&height=199'
      );

      expect(response.status).toBe(200);
    });

    it('gets /api/imageprocess?filename=fjord&width=-200&height=200 (invalid args)', async () => {
      const response = await request(
        '/api/imageprocess?filename=fjord&width=-200&height=200'
      );

      expect(response.status).toBe(200);
    });

    it('gets /api/imageprocess (no arguments)', async () => {
      const response = await request('/api/imageprocess');

      expect(response.status).toBe(200);
    });
  });

  describe('endpoint: /tot', () => {
    it('returns 404 for invalid endpoint', async () => {
      const response = await request('/tot');

      expect(response.status).toBe(404);
    });
  });
});
