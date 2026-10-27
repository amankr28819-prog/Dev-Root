import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export default function CodeBlock({ code = '', language = 'text', filename = '' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.warn('Clipboard write failed', e);
    }
  };

  return (
    <div className="code-block" style={{ margin: '1.25rem 0' }}>
      <div className="code-header">
        <span style={{ fontWeight: 600 }}>{filename || language}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="btn btn-ghost btn-sm"
          style={{
            padding: '0.2rem 0.5rem',
            color: copied ? 'var(--color-brand-primary)' : '#94a3b8',
            fontSize: '0.75rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.3rem'
          }}
          aria-label={copied ? 'Copied code to clipboard' : 'Copy code to clipboard'}
        >
          {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <pre className="code-content">
        <code>{code}</code>
      </pre>
    </div>
  );
}
