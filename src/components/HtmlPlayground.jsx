import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Copy, Check, Code2, Eye, LayoutTemplate } from 'lucide-react';

const PREBUILT_TEMPLATES = {
  custom: {
    name: 'Starter Document',
    html: `<h1>Hello Dev-Root!</h1>\n<p>Edit this HTML and CSS to see live changes instantly.</p>`,
    css: `h1 { color: #4f46e5; }\np { font-size: 1rem; color: #4b5563; }`
  },
  profileCard: {
    name: 'Profile Card',
    html: `<div class="profile-card">
  <div class="avatar">👨‍💻</div>
  <h2>Priya Nair</h2>
  <span class="role">Municipal Software Engineer</span>
  <p>Building high-integrity public grievance systems for smart cities.</p>
  <button class="btn-connect">View Grievances</button>
</div>`,
    css: `.profile-card {
  max-width: 320px;
  margin: 1.5rem auto;
  padding: 1.5rem;
  border-radius: 16px;
  background: white;
  border: 1px solid #e2e8f0;
  text-align: center;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}
.avatar { font-size: 2.5rem; margin-bottom: 0.5rem; }
h2 { margin: 0 0 0.25rem 0; color: #0f172a; font-size: 1.25rem; }
.role { display: inline-block; font-size: 0.75rem; font-weight: 600; color: #4f46e5; background: #eef2ff; padding: 0.2rem 0.6rem; border-radius: 9999px; margin-bottom: 0.75rem; }
p { font-size: 0.875rem; color: #64748b; line-height: 1.4; margin-bottom: 1rem; }
.btn-connect { background: #4f46e5; color: white; border: none; padding: 0.5rem 1rem; border-radius: 8px; font-weight: 600; cursor: pointer; }`
  },
  navbar: {
    name: 'Responsive Navbar',
    html: `<header class="navbar">
  <a href="#" class="brand">CRP India</a>
  <nav class="nav-links">
    <a href="#">Dashboard</a>
    <a href="#">Grievances</a>
    <a href="#">Analytics</a>
  </nav>
  <button class="btn-primary">File Complaint</button>
</header>`,
    css: `.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background: #1e1b4b;
  color: white;
  border-radius: 8px;
}
.brand { font-weight: 800; font-size: 1.1rem; color: #a5b4fc; text-decoration: none; }
.nav-links { display: flex; gap: 1.25rem; }
.nav-links a { color: #e0e7ff; text-decoration: none; font-size: 0.875rem; }
.nav-links a:hover { color: white; text-decoration: underline; }
.btn-primary { background: #6366f1; color: white; border: none; padding: 0.4rem 0.85rem; border-radius: 6px; font-weight: 600; cursor: pointer; }`
  },
  feedbackForm: {
    name: 'Accessible Form',
    html: `<form class="form-card">
  <h3>Register Citizen Grievance</h3>
  <div class="field">
    <label for="dept">Department</label>
    <select id="dept" required>
      <option value="">Select Department...</option>
      <option value="water">Water Works</option>
      <option value="roads">Road Infrastructure</option>
      <option value="sanitation">Sanitation & Health</option>
    </select>
  </div>
  <div class="field">
    <label for="desc">Issue Description</label>
    <textarea id="desc" rows="3" placeholder="Describe the municipal issue in detail..." required></textarea>
  </div>
  <button type="submit" class="submit-btn">Submit Grievance</button>
</form>`,
    css: `.form-card {
  max-width: 380px;
  margin: 1rem auto;
  padding: 1.5rem;
  background: #ffffff;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
}
h3 { margin-top: 0; color: #0f172a; font-size: 1.1rem; }
.field { margin-bottom: 1rem; }
label { display: block; font-size: 0.8rem; font-weight: 600; color: #334155; margin-bottom: 0.35rem; }
select, textarea { width: 100%; padding: 0.5rem; border: 1px solid #94a3b8; border-radius: 6px; font-size: 0.875rem; box-sizing: border-box; }
select:focus, textarea:focus { outline: 2px solid #4f46e5; border-color: transparent; }
.submit-btn { width: 100%; background: #059669; color: white; border: none; padding: 0.6rem; border-radius: 6px; font-weight: 600; cursor: pointer; }`
  }
};

export default function HtmlPlayground({
  initialCode = '<h1>Hello World</h1>\n<p>Edit this HTML to see live changes!</p>',
  initialCss = '',
  title = 'Interactive HTML & CSS Playground',
  description = 'Modify HTML markup and CSS styling below to see the browser render changes instantly.',
  height = '340px'
}) {
  const [htmlCode, setHtmlCode] = useState(initialCode);
  const [cssCode, setCssCode] = useState(initialCss);
  const [selectedTemplate, setSelectedTemplate] = useState('custom');
  const [activeEditorTab, setActiveEditorTab] = useState('html'); // 'html' or 'css'
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setHtmlCode(initialCode);
    if (initialCss) setCssCode(initialCss);
  }, [initialCode, initialCss]);

  const handleTemplateChange = (e) => {
    const key = e.target.value;
    setSelectedTemplate(key);
    if (PREBUILT_TEMPLATES[key]) {
      setHtmlCode(PREBUILT_TEMPLATES[key].html);
      setCssCode(PREBUILT_TEMPLATES[key].css);
    }
  };

  const handleReset = () => {
    if (selectedTemplate === 'custom') {
      setHtmlCode(initialCode);
      setCssCode(initialCss);
    } else if (PREBUILT_TEMPLATES[selectedTemplate]) {
      setHtmlCode(PREBUILT_TEMPLATES[selectedTemplate].html);
      setCssCode(PREBUILT_TEMPLATES[selectedTemplate].css);
    }
  };

  const handleCopy = async () => {
    const bundle = `<!-- HTML -->\n${htmlCode}\n\n/* CSS */\n${cssCode}`;
    try {
      await navigator.clipboard.writeText(bundle);
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
    * { box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      margin: 1rem;
      color: #1e293b;
      line-height: 1.5;
      background: #f8fafc;
    }
    ${cssCode}
  </style>
</head>
<body>
  ${htmlCode}
</body>
</html>
  `;

  return (
    <div className="card html-playground" style={{ margin: '2rem 0', padding: '1.25rem' }}>
      {/* Header bar */}
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

        {/* Template Selector & Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem' }}>
            <LayoutTemplate size={14} style={{ color: 'var(--color-text-muted)' }} />
            <select
              value={selectedTemplate}
              onChange={handleTemplateChange}
              style={{
                fontSize: '0.8rem',
                padding: '0.25rem 0.5rem',
                borderRadius: '6px',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-bg-surface)',
                color: 'var(--color-text-primary)'
              }}
              aria-label="Select prebuilt component template"
            >
              <option value="custom">Blank / Starter</option>
              <option value="profileCard">Component: Profile Card</option>
              <option value="navbar">Component: Responsive Navbar</option>
              <option value="feedbackForm">Component: Accessible Form</option>
            </select>
          </div>

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
          gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
          gap: '1rem',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          backgroundColor: 'var(--color-bg-surface)'
        }}
      >
        {/* Code Input Area with HTML & CSS tabs */}
        <div style={{ display: 'flex', flexDirection: 'column', borderRight: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'var(--color-bg-subtle)', borderBottom: '1px solid var(--color-border)', padding: '0.25rem 0.5rem' }}>
            <div style={{ display: 'flex', gap: '0.25rem' }}>
              <button
                type="button"
                onClick={() => setActiveEditorTab('html')}
                style={{
                  padding: '0.3rem 0.65rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  borderRadius: '4px',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: activeEditorTab === 'html' ? 'var(--color-bg-surface)' : 'transparent',
                  color: activeEditorTab === 'html' ? 'var(--color-brand-primary)' : 'var(--color-text-muted)'
                }}
              >
                HTML
              </button>
              <button
                type="button"
                onClick={() => setActiveEditorTab('css')}
                style={{
                  padding: '0.3rem 0.65rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  borderRadius: '4px',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: activeEditorTab === 'css' ? 'var(--color-bg-surface)' : 'transparent',
                  color: activeEditorTab === 'css' ? 'var(--color-brand-primary)' : 'var(--color-text-muted)'
                }}
              >
                CSS
              </button>
            </div>
            <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
              Live Sandboxed
            </span>
          </div>

          {activeEditorTab === 'html' ? (
            <textarea
              value={htmlCode}
              onChange={(e) => setHtmlCode(e.target.value)}
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
          ) : (
            <textarea
              value={cssCode}
              onChange={(e) => setCssCode(e.target.value)}
              spellCheck="false"
              placeholder="/* Add custom CSS rules here */"
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
              aria-label="Live CSS Code Editor"
            />
          )}
        </div>

        {/* Live Preview Iframe */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '0.4rem 0.75rem', backgroundColor: 'var(--color-bg-subtle)', borderBottom: '1px solid var(--color-border)', fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Eye size={12} aria-hidden="true" />
            <span>Interactive Live Preview</span>
          </div>
          <div style={{ height: height, backgroundColor: '#f8fafc', overflow: 'hidden' }}>
            <iframe
              title="Live HTML & CSS Preview"
              srcDoc={previewDoc}
              sandbox="allow-scripts"
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                backgroundColor: '#f8fafc'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
