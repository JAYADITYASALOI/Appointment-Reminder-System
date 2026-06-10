const app = require('./app');
const env = require('./config/env');
const logger = require('./utils/logger');
const { startReminderJob } = require('./jobs/reminder.job');

startReminderJob();

app.listen(env.PORT, () => {
  logger.info(`Backend running on http://localhost:${env.PORT}`);
});