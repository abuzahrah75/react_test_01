import _ from 'lodash';
import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  const data = _.pick(req, ['originalUrl', 'body', 'query', 'params']);
  res.send({ message: 'Hello World!', data });
});

export default router;
