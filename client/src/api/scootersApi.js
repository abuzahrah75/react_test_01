import axios from 'axios';

import { API_URL } from '../settings';

// eslint-disable-next-line
export async function getScooters(lat, lng, radius, limit) {
  const response = await axios.get(`${API_URL}/scooters`, {
    params: { lat, lng, radius, limit },
  });

  return response.data.data;
}
