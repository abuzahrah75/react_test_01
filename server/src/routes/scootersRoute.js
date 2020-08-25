import _ from 'lodash';
import { Op, literal, col } from 'sequelize';
import { Router } from 'express';
import { getBoundsOfDistance, isPointWithinRadius } from 'geolib';

import models from '../models';

const router = Router();

async function getScooters(req, res) {
  const lat = _.toNumber(req.query.lat || 1.29027);
  const lng = _.toNumber(req.query.lng || 103.851959);
  const radius = _.toNumber(req.query.radius || 5000);
  const limit = _.toNumber(req.query.limit || 10);

  const centerPoint = { latitude: lat, longitude: lng };

  const bounds = getBoundsOfDistance(centerPoint, radius);
  const [{ latitude: latMin, longitude: lngMin }, { latitude: latMax, longitude: lngMax }] = bounds;

  const dbRows = await models.Scooter.findAll({
    where: {
      lat: { [Op.between]: [latMin, latMax] },
      lng: { [Op.between]: [lngMin, lngMax] },
    },
    attributes: {
      include: [
        [
          literal(
            `(6371 * acos( cos( radians(${lat}) ) * cos( radians( lat ) ) * cos( radians( lng ) - radians(${lng}) ) + sin( radians(${lat}) ) * sin(radians(lat)) ) )`,
          ),
          'distance',
        ],
      ],
    },
    order: [[col('distance'), 'ASC']],
    limit,
  });

  const data = dbRows
    .map(r => r.get())
    .map(r => ({ latitude: r.lat, longitude: r.lng, ...r }))
    .filter(r => isPointWithinRadius(r, centerPoint, radius));

  res.send({ data });
}

router.get('/scooters/', getScooters);

export default router;
