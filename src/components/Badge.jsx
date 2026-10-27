import React from 'react';

export default function Badge({ children, variant = 'muted', className = '' }) {
  const variantClasses = {
    emerald: 'badge-emerald',
    cyan: 'badge-cyan',
    amber: 'badge-amber',
    muted: 'badge-muted'
  };

  const selectedClass = variantClasses[variant] || 'badge-muted';

  return (
    <span className={`badge ${selectedClass} ${className}`}>
      {children}
    </span>
  );
}
