import StatusBadge from './StatusBadge';
import { formatDateTime } from '../api/appointments';

export default function AppointmentCard({ appointment }) {
  const confirmationTone = appointment.confirmation_sent ? 'success' : 'warning';
  const reminderTone = appointment.reminder_sent ? 'success' : 'warning';

  return (
    <article className="appointment-card">
      <div className="card-top">
        <div>
          <div className="card-title">{appointment.customer_name}</div>
          <div className="card-subtitle">{appointment.phone_number}</div>
        </div>

        <div className="badges">
          <StatusBadge tone={confirmationTone}>
            {appointment.confirmation_sent ? 'Confirmation sent' : 'Confirmation pending'}
          </StatusBadge>
          <StatusBadge tone={reminderTone}>
            {appointment.reminder_sent ? 'Reminder sent' : 'Reminder pending'}
          </StatusBadge>
        </div>
      </div>

      <div className="meta-grid">
        <div className="meta-item">
          <div className="meta-label">Appointment time</div>
          <div className="meta-value">{formatDateTime(appointment.appointment_time)}</div>
        </div>

        <div className="meta-item">
          <div className="meta-label">Created at</div>
          <div className="meta-value">{formatDateTime(appointment.created_at)}</div>
        </div>

        <div className="meta-item">
          <div className="meta-label">Confirmation status</div>
          <div className="meta-value">
            {appointment.confirmation_sent
              ? `Sent at ${formatDateTime(appointment.confirmation_sent_at)}`
              : 'Not sent yet'}
          </div>
        </div>

        <div className="meta-item">
          <div className="meta-label">Reminder status</div>
          <div className="meta-value">
            {appointment.reminder_sent
              ? `Sent at ${formatDateTime(appointment.reminder_sent_at)}`
              : 'Not sent yet'}
          </div>
        </div>
      </div>
    </article>
  );
}