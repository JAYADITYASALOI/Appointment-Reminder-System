const appointmentService = require('../services/appointment.service');
const messageService = require('../services/message.service');
const logger = require('../utils/logger');
const { toMysqlDateTime } = require('../utils/time');

function createHttpError(statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

async function createAppointment(req, res) {
  const customerName = String(req.body.customerName || '').trim();
  const phoneNumber = String(req.body.phoneNumber || '').trim();
  const appointmentTimeInput = String(req.body.appointmentTime || '').trim();

  if (!customerName) {
    throw createHttpError(400, 'Customer name is required');
  }

  if (!phoneNumber) {
    throw createHttpError(400, 'Phone number is required');
  }

  if (!appointmentTimeInput) {
    throw createHttpError(400, 'Appointment time is required');
  }

  const appointmentTime = toMysqlDateTime(appointmentTimeInput);

  const createdAppointment = await appointmentService.createAppointment({
    customerName,
    phoneNumber,
    appointmentTime,
  });

  let finalAppointment = createdAppointment;

  try {
    await messageService.sendConfirmationMessage(createdAppointment);
    finalAppointment = await appointmentService.updateConfirmationSent(createdAppointment.id);
  } catch (error) {
    logger.error(`Confirmation send failed for appointment #${createdAppointment.id}: ${error.message}`);
  }

  res.status(201).json({
    success: true,
    message: 'Appointment created successfully',
    data: finalAppointment,
  });
}

async function listAppointments(req, res) {
  const appointments = await appointmentService.getAppointments();

  res.json({
    success: true,
    count: appointments.length,
    data: appointments,
  });
}

async function getAppointment(req, res) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    throw createHttpError(400, 'Invalid appointment id');
  }

  const appointment = await appointmentService.getAppointmentById(id);

  if (!appointment) {
    throw createHttpError(404, 'Appointment not found');
  }

  res.json({
    success: true,
    data: appointment,
  });
}

module.exports = {
  createAppointment,
  listAppointments,
  getAppointment,
};