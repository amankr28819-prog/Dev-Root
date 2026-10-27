import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, BookOpen, Layers, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      style={{
        marginTop: 'auto',
        backgroundColor: 'var(--color-bg-surface)',
        borderTop: '1px solid var(--color-border)',
        paddingTop: '3rem',
        paddingBottom: '2.5rem',
        color: 'var(--color-text-secondary)',
        fontSize: '0.9rem'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '2.5rem',
            paddingBottom: '2.5rem',
            borderBottom: '1px solid var(--color-border)'
          }}
        >
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <div
                style={{
                  width: '1.75rem',
                  height: '1.75rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--color-brand-subtle)',
                  color: 'var(--color-brand-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Sprout size={16} aria-hidden="true" />
              </div>
              <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--color-text-primary)' }}>
                Dev<span style={{ color: 'var(--color-brand-primary)' }}>-root</span>
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.6, maxWidth: '320px' }}>
              Start at the roots. Build to the full stack. An interactive web development learning platform grounded in real-world application architecture.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-primary)', marginBottom: '1rem' }}>
              Platform Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li>
                <Link to="/" style={{ color: 'var(--color-text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Layers size={14} aria-hidden="true" />
                  <span>Learning Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/courses" style={{ color: 'var(--color-text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <BookOpen size={14} aria-hidden="true" />
                  <span>Course Catalogue (16 Paths)</span>
                </Link>
              </li>
              <li>
                <Link to="/case-studies/crp-india" style={{ color: 'var(--color-text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <CheckCircle2 size={14} aria-hidden="true" />
                  <span>CRP India Case Study</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Educational Principles */}
          <div>
            <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-primary)', marginBottom: '1rem' }}>
              Core Principles
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              <li>✓ First-principles mental models</li>
              <li>✓ Code grounded in production projects</li>
              <li>✓ Zero fabricated streaks or fake stats</li>
              <li>✓ Local, offline-first progress storage</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            paddingTop: '1.5rem',
            fontSize: '0.8rem',
            color: 'var(--color-text-muted)'
          }}
        >
          <div>
            © {new Date().getFullYear()} Dev-root. Designed for structured full-stack mastery.
          </div>
          <div>
            Local Workspace: <code style={{ color: 'var(--color-text-primary)' }}>Z:/Dev Root/Dev-Root</code>
          </div>
        </div>
      </div>
    </footer>
  );
}
