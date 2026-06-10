import AppointmentCard from './AppointmentCard';

export default function AppointmentList({ appointments, loading }) {
  if (loading) {
    return <div className="loading-state">Loading appointments from MySQL…</div>;
  }

  if (!appointments.length) {
    return (
      <div className="empty-state">
        No appointments yet. Create one on the left to see it appear here live.
      </div>
    );
  }

  return (
    <div className="appointments-list">
      {appointments.map((appointment) => (
        <AppointmentCard key={appointment.id} appointment={appointment} />
      ))}
    </div>
  );
}