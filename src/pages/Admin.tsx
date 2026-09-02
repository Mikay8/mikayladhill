import { useEffect, useState } from 'react';
import './Admin.css';
import { services, RAILWAY_USAGE_URL } from '../data/services';

const ADMIN_EMAIL = 'mikayla.hill8@gmail.com';

function Admin() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch('/api/session')
      .then((res) => res.json())
      .then((data) => setAuthenticated(Boolean(data.authenticated)))
      .catch(() => setAuthenticated(false));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'Login failed');
        return;
      }
      setAuthenticated(true);
      setPassword('');
    } catch {
      setError('Something went wrong. Try again.');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleLogout() {
    await fetch('/api/logout', { method: 'POST' }).catch(() => {});
    setAuthenticated(false);
  }

  if (authenticated === null) {
    return (
      <div className="admin-page">
        <div className="admin-card">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="admin-page">
        <div className="admin-card">
          <h1>Admin</h1>
          <form className="admin-form" onSubmit={handleSubmit}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            <button type="submit" disabled={submitting || password.length === 0}>
              {submitting ? 'Checking...' : 'Log in'}
            </button>
            {error && <p className="admin-error">{error}</p>}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-card admin-card-wide">
        <h1>Admin</h1>
        <p>Logged in as {ADMIN_EMAIL}</p>

        <h2>Services</h2>
        <ul className="admin-services">
          {services.map((s) => (
            <li key={s.url}>
              <span className="admin-service-project">{s.project}</span>
              <a href={s.url} target="_blank" rel="noreferrer">
                {s.service}
              </a>
            </li>
          ))}
        </ul>

        <p>
          <a href={RAILWAY_USAGE_URL} target="_blank" rel="noreferrer">
            View Railway usage &amp; billing →
          </a>
        </p>

        <button className="admin-logout" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </div>
  );
}

export default Admin;
