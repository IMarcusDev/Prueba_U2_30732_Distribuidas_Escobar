const Sentry = require('@sentry/node');
const { readFileSync } = require('node:fs');
const path = require('node:path');
require('dotenv').config();

const pkg = JSON.parse(readFileSync(path.join(__dirname, '../package.json'), 'utf8'));

Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV || 'development',
    release: process.env.SENTRY_RELEASE || `${pkg.name}@${pkg.version}`,
    tracesSampleRate: 0,
    sampleRate: 1.0,
    sendDefaultPii: false,
    enabled: Boolean(process.env.SENTRY_DSN),
    beforeSend(event) {
        if (event.request?.cookies) delete event.request.cookies;
        if (event.request?.headers?.cookie) delete event.request.headers.cookie;
        return event;
    }
});

module.exports = Sentry;
