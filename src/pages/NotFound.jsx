import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container" style={{ paddingTop: '5rem', paddingBottom: '5rem', textAlign: 'center' }}>
      <div
        style={{
          width: '4rem',
          height: '4rem',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'var(--color-bg-subtle)',
          border: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
          color: 'var(--color-text-muted)'
        }}
      >
        <Compass size={32} aria-hidden="true" />
      </div>

      <h1 style={{ fontSize: '2.5rem', marginBottom: '0.75rem', letterSpacing: '-0.025em' }}>
        Page Not Found (404)
      </h1>

      <p style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)', maxWidth: '480px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
        The learning route you requested doesn't exist or may have been moved.
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
        <Link to="/" className="btn btn-primary">
          <Home size={16} aria-hidden="true" />
          <span>Back to Dashboard</span>
        </Link>
        <Link to="/courses" className="btn btn-secondary">
          <span>Explore Course Catalogue</span>
        </Link>
      </div>
    </div>
  );
}
