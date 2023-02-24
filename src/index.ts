import express from 'express';
import router from './routes/routes';
import Image from './utilities/imageProcessing';

const createPath = Image.generateThumbPath;

const app = express();
const PORT = 3000;

app.use(router);

app.listen(PORT, async () => {
  await createPath();
  console.log(`Open http://localhost:${PORT} to view the project`);
});

export default app;
