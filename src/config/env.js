require('dotenv').config();
const fs = require('fs');

module.exports = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET,
  sentryDsn: process.env.SENTRY_DSN,
  PRIVATE_KEY: process.env.PRIVATE_KEY_PATH ? fs.readFileSync(process.env.PRIVATE_KEY_PATH, 'utf8') : null,
  PUBLIC_KEY: process.env.PUBLIC_KEY_PATH ? fs.readFileSync(process.env.PUBLIC_KEY_PATH, 'utf8') : null,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '2m',
  JWT_ALGORITHM: process.env.JWT_ALGORITHM || 'RS256',
};
