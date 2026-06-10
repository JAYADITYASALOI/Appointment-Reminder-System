function pad(value) {
  return String(value).padStart(2, '0');
}

function toMysqlDateTime(input) {
  const date = input instanceof Date ? input : new Date(input);

  if (Number.isNaN(date.getTime())) {
    throw new Error('Invalid appointment time');
  }

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function formatDisplayDateTime(input) {
  const date = input instanceof Date ? input : new Date(input);

  if (Number.isNaN(date.getTime())) {
    return 'Invalid date';
  }

  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

function isWithinNextHour(input) {
  const date = input instanceof Date ? input : new Date(input);

  if (Number.isNaN(date.getTime())) {
    return false;
  }

  const now = Date.now();
  const target = date.getTime();
  return target > now && target <= now + 60 * 60 * 1000;
}

module.exports = {
  toMysqlDateTime,
  formatDisplayDateTime,
  isWithinNextHour,
};