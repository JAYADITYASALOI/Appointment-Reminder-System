const express = require('express');
const { asyncHandler } = require('../middleware/async.middleware');
const appointmentsController = require('../controllers/appointments.controller');

const router = express.Router();

router.get('/', asyncHandler(appointmentsController.listAppointments));
router.get('/:id', asyncHandler(appointmentsController.getAppointment));
router.post('/', asyncHandler(appointmentsController.createAppointment));

module.exports = router;