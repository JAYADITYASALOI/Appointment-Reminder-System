const cron = require('node-cron');
const logger = require('../utils/logger');
const { runReminderSweep } = require('../services/reminder.service');

let jobStarted = false;
let isRunning = false;

function startReminderJob() {
  if (jobStarted) return;

  jobStarted = true;

  cron.schedule(
    '* * * * *',
    async () => {
      if (isRunning) return;

      isRunning = true;
      try {
        logger.info('Starting reminder sweep...');
        await runReminderSweep();
      } catch (error) {
        logger.error(`Reminder job crashed: ${error.message}`);
      } finally {
        isRunning = false;
      }
    },
    {
      scheduled: true,
    }
  );

  logger.info('Reminder job scheduled to run every minute.');
}

module.exports = { startReminderJob };