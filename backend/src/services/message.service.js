const db = require('../config/db');
const logger = require('../utils/logger');
const { formatDisplayDateTime } = require('../utils/time');

async function logMessage({
  appointmentId,
  messageType,
  channel = 'mock',
  status = 'sent',
  messageBody,
  errorMessage = null,
}) {
  try {
    await db.execute(
      `INSERT INTO message_logs
        (appointment_id, message_type, channel, status, message_body, error_message)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [appointmentId, messageType, channel, status, messageBody, errorMessage]
    );
  } catch (error) {
    logger.warn(`Could not save message log for appointment #${appointmentId}: ${error.message}`);
  }
}

function buildConfirmationMessage(appointment) {
  return [
    `Hello ${appointment.customer_name},`,
    ``,
    `Your appointment is confirmed for ${formatDisplayDateTime(appointment.appointment_time)}.`,
    `Thank you.`,
  ].join('\n');
}

function buildReminderMessage(appointment) {
  return [
    `Reminder for ${appointment.customer_name},`,
    ``,
    `Your appointment is coming up at ${formatDisplayDateTime(appointment.appointment_time)}.`,
    `Please be ready.`,
  ].join('\n');
}

async function sendConfirmationMessage(appointment) {
  const body = buildConfirmationMessage(appointment);

  logger.info(`MOCK confirmation send -> ${appointment.phone_number}`);
  logger.info(body);

  await logMessage({
    appointmentId: appointment.id,
    messageType: 'confirmation',
    channel: 'mock',
    status: 'sent',
    messageBody: body,
  });

  return {
    sent: true,
    channel: 'mock',
    body,
  };
}

async function sendReminderMessage(appointment) {
  const body = buildReminderMessage(appointment);

  logger.info(`MOCK reminder send -> ${appointment.phone_number}`);
  logger.info(body);

  await logMessage({
    appointmentId: appointment.id,
    messageType: 'reminder',
    channel: 'mock',
    status: 'sent',
    messageBody: body,
  });

  return {
    sent: true,
    channel: 'mock',
    body,
  };
}

module.exports = {
  sendConfirmationMessage,
  sendReminderMessage,
};