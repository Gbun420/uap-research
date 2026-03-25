// Station Omega — Auth Guard v2
// Protects ALL pages except login.html
(function() {
  const token = localStorage.getItem('so_token');
  const path = window.location.pathname;
  const isLogin = path.includes('login.html');

  // Skip guard on login page
  if (isLogin) return;

  // Check token exists and has correct prefix
  if (!token || !token.startsWith('SO-')) {
    window.location.replace('login.html');
    return;
  }

  // Validate token format and expiry (24h)
  const parts = token.replace('SO-', '').split('-');
  const ts = parseInt(parts[0], 10);
  if (isNaN(ts) || (Date.now() - ts) > 86400000) {
    localStorage.removeItem('so_token');
    window.location.replace('login.html');
    return;
  }

  // Update last activity
  localStorage.setItem('so_last_activity', Date.now().toString());
})();
