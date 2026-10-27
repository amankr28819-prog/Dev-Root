import React from 'react';

export default function ProgressBar({ percent = 0, height = '8px', showLabel = false, labelText = '' }) {
  const safePercent = Math.min(100, Math.max(0, Math.round(percent)));

  return (
    <div className="progress-container" style={{ width: '100%' }}>
      {showLabel && (
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '0.35rem' }}>
          <span>{labelText || 'Progress'}</span>
          <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{safePercent}%</span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={safePercent}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label={labelText || 'Course Progress'}
        style={{
          width: '100%',
          height,
          backgroundColor: 'var(--color-bg-subtle)',
          borderRadius: 'var(--radius-full)',
          overflow: 'hidden',
          border: '1px solid var(--color-border)'
        }}
      >
        <div
          style={{
            width: `${safePercent}%`,
            height: '100%',
            backgroundColor: 'var(--color-brand-primary)',
            borderRadius: 'var(--radius-full)',
            transition: 'width var(--transition-normal)'
          }}
        />
      </div>
    </div>
  );
}
