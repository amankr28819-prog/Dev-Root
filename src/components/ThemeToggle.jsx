import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`btn btn-ghost btn-sm ${className}`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.45rem',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-bg-surface)'
      }}
    >
      {isDark ? (
        <Sun size={18} style={{ color: 'var(--color-warning)' }} aria-hidden="true" />
      ) : (
        <Moon size={18} style={{ color: 'var(--color-text-secondary)' }} aria-hidden="true" />
      )}
      <span style={{ fontSize: '0.8rem', marginLeft: '0.35rem', fontWeight: 500 }}>
        {isDark ? 'Light' : 'Dark'}
      </span>
    </button>
  );
}
