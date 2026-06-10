export default function StatusBadge({ tone = 'neutral', children }) {
  return <span className={`status-badge status-${tone}`}>{children}</span>;
}