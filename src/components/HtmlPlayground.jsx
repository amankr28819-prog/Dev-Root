import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Copy, Check, Code2, Eye, ExternalLink } from 'lucide-react';

export default function HtmlPlayground({
  initialCode = '<h1>Hello World</h1>\n<p>Edit this HTML to see live changes!</p>',
  title = 'Interactive HTML Playground',
  description = 'Modify the HTML code below to see the browser render changes instantly.',
  height = '320px'
}) {
  const [code, setCode] = useState(initialCode);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('both'); // 'both', 'code', 'preview'

  // Sync with initialCode if it changes
  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  const handleReset = () => {
    setCode(initialCode);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.warn('Copy failed', e);
    }
  };

  // Safe sandboxed document template
  const previewDoc = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      margin: 1rem;
      color: #1e293b;
      line-height: 1.5;
    }
    h1, h2, h3 { color: #0f172a; }
  </style>
</head>
<body>
  ${code}
</body>
</html>
  `;

  return (
    <div className="card html-playground" style={{ margin: '2rem 0', padding: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ padding: '0.35rem', backgroundColor: 'var(--color-brand-subtle)', color: 'var(--color-brand-primary)', borderRadius: 'var(--radius-sm)' }}>
            <Code2 size={18} aria-hidden="true" />
          </div>
          <div>
            <h4 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--color-text-primary)' }}>{title}</h4>
            {description && <p style={{ margin: 0, fontSize: '0.825rem', color: 'var(--color-text-muted)' }}>{description}</p>}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            type="button"
            onClick={handleCopy}
            className="btn btn-ghost btn-sm"
            style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem' }}
            aria-label="Copy HTML code"
          >
            {copied ? <Check size={14} style={{ color: 'var(--color-brand-primary)' }} /> : <Copy size={14} />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="btn btn-secondary btn-sm"
            style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem' }}
            aria-label="Reset to starter HTML code"
          >
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Editor & Preview Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: activeTab === 'both' ? 'repeat(auto-fit, minmax(280px, 1fr))' : '1fr',
          gap: '1rem',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          backgroundColor: 'var(--color-bg-surface)'
        }}
      >
        {/* Code Input Area */}
        {(activeTab === 'both' || activeTab === 'code') && (
          <div style={{ display: 'flex', flexDirection: 'column', borderRight: activeTab === 'both' ? '1px solid var(--color-border)' : 'none' }}>
            <div style={{ padding: '0.4rem 0.75rem', backgroundColor: 'var(--color-bg-subtle)', borderBottom: '1px solid var(--color-border)', fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
              HTML Editor (Live)
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck="false"
              style={{
                width: '100%',
                height: height,
                fontFamily: 'var(--font-mono)',
                fontSize: '0.875rem',
                lineHeight: 1.6,
                padding: '0.85rem',
                border: 'none',
                resize: 'vertical',
                backgroundColor: 'var(--color-bg-code)',
                color: 'var(--color-text-code)',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              aria-label="Live HTML Code Editor"
            />
          </div>
        )}

        {/* Live Preview Iframe */}
        {(activeTab === 'both' || activeTab === 'preview') && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '0.4rem 0.75rem', backgroundColor: 'var(--color-bg-subtle)', borderBottom: '1px solid var(--color-border)', fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Eye size={12} aria-hidden="true" />
              <span>Browser Render Preview</span>
            </div>
            <div style={{ height: height, backgroundColor: '#ffffff', overflow: 'hidden' }}>
              <iframe
                title="Live HTML Preview"
                srcDoc={previewDoc}
                sandbox="allow-scripts"
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  backgroundColor: '#ffffff'
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
