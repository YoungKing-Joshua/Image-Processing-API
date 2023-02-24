import express, { Request, Response } from 'express';
import imageRouter from './api/imageprocess';

const router: express.Router = express.Router();

router.use('/api/imageprocess', imageRouter);

router.get('/', (request: Request, response: Response): void => {
  response.send(
    `<h1>Welcome to image-processing-api</h1>
      <p>Listening at <code><a href="/api/imageprocess">/api/imageprocess</a></code> for queries containing at least a valid filename. 
      Optionally use both width and height to set the size...</p>
      <p>Examples:
      <ul>
        <li><a href="/api/imageprocess?filename=fjord">/api/imageprocess?filename=fjord</a></li>
        <li><a href="/api/imageprocess?filename=fjord&width=100&height=100">/api/imageprocess?filename=fjord&width=100&height=100</a></li>
      </ul>
      </p>`
  );
});

export default router;
