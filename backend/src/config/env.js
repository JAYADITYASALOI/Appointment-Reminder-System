const dotenv = require('dotenv');

dotenv.config();

const env = {
  PORT: Number(process.env.PORT || 5000),
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_USER: process.env.DB_USER || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DB_NAME: process.env.DB_NAME || 'whatsapp_reminder_db',
};

if (!Number.isFinite(env.PORT)) {
  throw new Error('PORT must be a valid number');
}

for (const key of ['DB_HOST', 'DB_USER', 'DB_NAME']) {
  if (!env[key]) {
    throw new Error(`${key} is required in backend/.env`);
  }
}

module.exports = env;