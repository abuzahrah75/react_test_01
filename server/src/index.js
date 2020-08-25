import express from 'express';
import cors from 'cors';

import { initModels } from './models';
import helloRoute from './routes/helloRoute';
import scootersRoute from './routes/scootersRoute';
import { API_PORT } from './settings';

async function main() {
  await initModels();
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(helloRoute);
  app.use(scootersRoute);

  app.listen(API_PORT, () => {
    console.log(`Server listening on port ${API_PORT}!`);
  });
}

main().catch(e => {
  console.log(e);
  console.log();
  console.log('An error has occurred. Exiting.');
  process.exit(1);
});
