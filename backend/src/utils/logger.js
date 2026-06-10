function stamp() {
  return new Date().toISOString();
}

function info(...args) {
  console.log(`[INFO ${stamp()}]`, ...args);
}

function warn(...args) {
  console.warn(`[WARN ${stamp()}]`, ...args);
}

function error(...args) {
  console.error(`[ERROR ${stamp()}]`, ...args);
}

module.exports = { info, warn, error };