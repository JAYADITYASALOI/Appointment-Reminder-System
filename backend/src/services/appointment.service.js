const db = require('../config/db');

async function createAppointment({ customerName, phoneNumber, appointmentTime }) {
  const [result] = await db.execute(
    `INSERT INTO appointments (customer_name, phone_number, appointment_time)
     VALUES (?, ?, ?)`,
    [customerName, phoneNumber, appointmentTime]
  );

  return getAppointmentById(result.insertId);
}

async function getAppointments() {
  const [rows] = await db.execute(
    `SELECT *
     FROM appointments
     ORDER BY appointment_time ASC, id ASC`
  );

  return rows;
}

async function getAppointmentById(id) {
  const [rows] = await db.execute(
    `SELECT *
     FROM appointments
     WHERE id = ?
     LIMIT 1`,
    [id]
  );

  return rows[0] || null;
}

async function updateConfirmationSent(id) {
  await db.execute(
    `UPDATE appointments
     SET confirmation_sent = 1,
         confirmation_sent_at = NOW()
     WHERE id = ?`,
    [id]
  );

  return getAppointmentById(id);
}

async function updateReminderSent(id) {
  await db.execute(
    `UPDATE appointments
     SET reminder_sent = 1,
         reminder_sent_at = NOW()
     WHERE id = ?`,
    [id]
  );

  return getAppointmentById(id);
}

async function getUpcomingReminderAppointments() {
  const [rows] = await db.execute(
    `SELECT *
     FROM appointments
     WHERE reminder_sent = 0
       AND appointment_time BETWEEN NOW() AND DATE_ADD(NOW(), INTERVAL 1 HOUR)
     ORDER BY appointment_time ASC`
  );

  return rows;
}

module.exports = {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateConfirmationSent,
  updateReminderSent,
  getUpcomingReminderAppointments,
};