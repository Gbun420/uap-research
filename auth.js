const VALID_PASSCODES = ['zephyr', 'omega'];
const TOKEN_PREFIX = 'SO-';
const TOKEN_TTL = 86400000; // 24 hours

function generateToken() {
  const ts = Date.now();
  const rand = Math.random().toString(36).substring(2, 10);
  return `${TOKEN_PREFIX}${ts}-${rand}`;
}

function validateToken(token) {
  if (!token || !token.startsWith(TOKEN_PREFIX)) return false;
  const parts = token.replace(TOKEN_PREFIX, '').split('-');
  const ts = parseInt(parts[0], 10);
  return !isNaN(ts) && (Date.now() - ts) < TOKEN_TTL;
}

// Check if already authenticated
const existingToken = localStorage.getItem('so_token');
if (existingToken && validateToken(existingToken)) {
  window.location.href = 'index.html';
}

// Handle passcode input
const input = document.getElementById('passcode');
const error = document.getElementById('error');

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const passcode = input.value.trim().toLowerCase();
    if (VALID_PASSCODES.includes(passcode)) {
      const token = generateToken();
      localStorage.setItem('so_token', token);
      window.location.href = 'index.html';
    } else {
      error.classList.add('show');
      input.value = '';
      setTimeout(() => error.classList.remove('show'), 2000);
    }
  }
});
