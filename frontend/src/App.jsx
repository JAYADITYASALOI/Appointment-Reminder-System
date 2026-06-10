import { useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';
import AppointmentForm from './components/AppointmentForm';
import AppointmentList from './components/AppointmentList';
import { createAppointment, listAppointments } from './api/appointments';

function formatCompactDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Invalid date';

  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

export default function App() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState({
    type: 'info',
    message: 'Mock sender active. Messages are logged in the backend console.',
  });

  const loadAppointments = useCallback(async (silent = false) => {
    if (silent) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const response = await listAppointments();
      setAppointments(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      setNotice({
        type: 'error',
        message: error.message || 'Failed to load appointments',
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadAppointments();

    const timer = setInterval(() => {
      loadAppointments(true);
    }, 5000);

    return () => clearInterval(timer);
  }, [loadAppointments]);

  const handleCreate = async (payload) => {
    setSubmitting(true);
    try {
      await createAppointment(payload);
      setNotice({
        type: 'success',
        message: 'Appointment saved and confirmation logged successfully.',
      });
      await loadAppointments(true);
    } catch (error) {
      setNotice({
        type: 'error',
        message: error.message || 'Could not create appointment',
      });
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  const stats = useMemo(() => {
    const total = appointments.length;
    const confirmed = appointments.filter((item) => item.confirmation_sent).length;
    const reminders = appointments.filter((item) => item.reminder_sent).length;
    const upcomingReminders = appointments.filter((item) => {
      const time = new Date(item.appointment_time).getTime();
      const now = Date.now();
      return time > now && time <= now + 60 * 60 * 1000 && !item.reminder_sent;
    }).length;

    return [
      { label: 'Appointments', value: total, note: 'Stored in MySQL' },
      { label: 'Confirmed', value: confirmed, note: 'Mock send logged' },
      { label: 'Reminders sent', value: reminders, note: 'Cron job tracked' },
      { label: 'Due in 1 hour', value: upcomingReminders, note: 'Auto reminder pending' },
    ];
  }, [appointments]);

  const nextAppointment = useMemo(() => {
    const futureAppointments = appointments
      .map((item) => ({
        ...item,
        ts: new Date(item.appointment_time).getTime(),
      }))
      .filter((item) => Number.isFinite(item.ts) && item.ts >= Date.now())
      .sort((a, b) => a.ts - b.ts);

    return futureAppointments[0] || null;
  }, [appointments]);

  return (
    <div className="app-page">
      <div className="ambient ambient-1" />
      <div className="ambient ambient-2" />

      <main className="shell">
        <section className="hero-card">
          <div className="hero-copy">
            <span className="eyebrow">React + Vite • Express • MySQL • Mock sender</span>
            <h1>WhatsApp Appointment Reminder System</h1>
            <p className="hero-text">
              Create appointments, save them to MySQL, send a simulated confirmation message,
              and automatically send a reminder when the appointment is within one hour.
            </p>

            <div className="hero-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={() => loadAppointments(false)}
                disabled={refreshing}
              >
                {refreshing ? 'Refreshing…' : 'Refresh now'}
              </button>
              <div className="pill">
                {nextAppointment
                  ? `Next appointment: ${formatCompactDate(nextAppointment.appointment_time)}`
                  : 'No upcoming appointments'}
              </div>
            </div>
          </div>

          <div className="metric-grid">
            {stats.map((stat) => (
              <div className="metric" key={stat.label}>
                <div className="metric-label">{stat.label}</div>
                <div className="metric-value">{stat.value}</div>
                <div className="metric-note">{stat.note}</div>
              </div>
            ))}
          </div>
        </section>

        {notice.message ? (
          <div className={`notice notice-${notice.type}`}>
            {notice.message}
          </div>
        ) : null}

        <section className="content-grid">
          <div className="panel">
            <div className="panel-header">
              <div>
                <h2>New appointment</h2>
                <span>Saved locally and sent to the backend</span>
              </div>
              <span className="small-pill">Mock sender enabled</span>
            </div>

            <AppointmentForm onCreate={handleCreate} submitting={submitting} />
          </div>

          <div className="panel">
            <div className="panel-header">
              <div>
                <h2>Appointments dashboard</h2>
                <span>Auto-refresh every 5 seconds</span>
              </div>
              <span className="small-pill">
                {refreshing ? 'Refreshing…' : 'Live from MySQL'}
              </span>
            </div>

            <AppointmentList
              appointments={appointments}
              loading={loading}
            />
          </div>
        </section>
      </main>
    </div>
  );
}