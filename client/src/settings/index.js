// 'development' or 'production'
const NODE_ENV = process.env.NODE_ENV || 'development';

const API_URLS = {
  development: 'http://localhost:3001',
  production: 'http://scooters-api.apps.bancuh.net',
};

export const API_URL = API_URLS[NODE_ENV];

export const GOOGLE_MAP_API_KEY = 'AIzaSyAJGuaAcVwy0iMQzMLX-va0nZ1QTSK5gVI';

export default { API_URL, GOOGLE_MAP_API_KEY };
