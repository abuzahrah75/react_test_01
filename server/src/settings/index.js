// 'development' or 'production'
const NODE_ENV = process.env.NODE_ENV || 'development';

const API_PORTS = {
  development: 3001,
  production: 80,
};

export const API_PORT = API_PORTS[NODE_ENV];

export default {
  API_PORT,
};
