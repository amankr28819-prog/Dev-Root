import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs({ items = [] }) {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumbs" style={{ marginBottom: '1.25rem' }}>
      <ol
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          listStyle: 'none',
          gap: '0.4rem',
          fontSize: '0.85rem',
          color: 'var(--color-text-muted)'
        }}
      >
        <li style={{ display: 'flex', alignItems: 'center' }}>
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              color: 'var(--color-text-muted)',
              transition: 'color var(--transition-fast)'
            }}
          >
            <Home size={14} style={{ marginRight: '0.25rem' }} aria-hidden="true" />
            <span>Home</span>
          </Link>
        </li>

        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;

          return (
            <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <ChevronRight size={14} style={{ color: 'var(--color-border-subtle)' }} aria-hidden="true" />
              {isLast || !item.href ? (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  style={{
                    color: isLast ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                    fontWeight: isLast ? 600 : 400
                  }}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.href}
                  style={{
                    color: 'var(--color-text-muted)',
                    transition: 'color var(--transition-fast)'
                  }}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
