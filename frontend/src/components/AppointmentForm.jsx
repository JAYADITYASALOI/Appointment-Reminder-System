import { useState } from 'react';

const initialForm = {
  customerName: '',
  phoneNumber: '',
  appointmentTime: '',
};

export default function AppointmentForm({ onCreate, submitting }) {
  const [form, setForm] = useState(initialForm);
  const [localError, setLocalError] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLocalError('');

    try {
      await onCreate(form);
      setForm(initialForm);
    } catch (error) {
      setLocalError(error.message || 'Could not create appointment');
    }
  }

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="customerName">Customer name</label>
        <input
          id="customerName"
          name="customerName"
          type="text"
          placeholder="Enter customer name"
          value={form.customerName}
          onChange={handleChange}
          autoComplete="off"
          required
        />
      </div>

      <div className="field">
        <label htmlFor="phoneNumber">Phone number</label>
        <input
          id="phoneNumber"
          name="phoneNumber"
          type="tel"
          placeholder="+91 98765 43210"
          value={form.phoneNumber}
          onChange={handleChange}
          autoComplete="off"
          required
        />
      </div>

      <div className="field">
        <label htmlFor="appointmentTime">Appointment time</label>
        <input
          id="appointmentTime"
          name="appointmentTime"
          type="datetime-local"
          value={form.appointmentTime}
          onChange={handleChange}
          required
        />
        <div className="helper">
          Pick a local date and time. Reminders are triggered automatically when the time is within 1 hour.
        </div>
      </div>

      {localError ? <div className="form-error">{localError}</div> : null}

      <div className="form-actions">
        <button type="submit" className="primary-button" disabled={submitting}>
          {submitting ? 'Saving…' : 'Save appointment'}
        </button>
        <span className="helper">
          Confirmation messages are simulated in the backend console.
        </span>
      </div>
    </form>
  );
}