const appointmentService = require('./appointment.service');
const messageService = require('./message.service');
const logger = require('../utils/logger');

async function runReminderSweep() {
  const dueAppointments = await appointmentService.getUpcomingReminderAppointments();

  if (!dueAppointments.length) {
    logger.info('No reminders due right now.');
    return { processed: 0, total: 0 };
  }

  let processed = 0;

  for (const appointment of dueAppointments) {
    try {
      await messageService.sendReminderMessage(appointment);
      await appointmentService.updateReminderSent(appointment.id);
      processed += 1;
    } catch (error) {
      logger.error(`Reminder failed for appointment #${appointment.id}: ${error.message}`);
    }
  }

  return {
    processed,
    total: dueAppointments.length,
  };
}

module.exports = { runReminderSweep };