import React, { useState } from 'react';
import { Sliders, RotateCcw, Copy, Check, Eye } from 'lucide-react';

export default function CssPlayground({
  title = 'Interactive CSS Box & Layout Playground',
  description = 'Adjust properties using the controls below and observe how the box geometry and generated CSS change in real-time.'
}) {
  const defaultState = {
    padding: 20,
    margin: 20,
    borderWidth: 3,
    borderRadius: 8,
    boxSizing: 'border-box',
    width: 240,
    bgColor: '#10b981',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12
  };

  const [state, setState] = useState(defaultState);
  const [copied, setCopied] = useState(false);

  const handleReset = () => {
    setState(defaultState);
  };

  const generatedCss = `.custom-card {
  box-sizing: ${state.boxSizing};
  width: ${state.width}px;
  padding: ${state.padding}px;
  margin: ${state.margin}px;
  border: ${state.borderWidth}px solid #047857;
  border-radius: ${state.borderRadius}px;
  background-color: ${state.bgColor};
  display: ${state.display};
  justify-content: ${state.justifyContent};
  align-items: ${state.alignItems};
  gap: ${state.gap}px;
}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedCss);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.warn('Copy failed', e);
    }
  };

  return (
    <div className="card css-playground" style={{ margin: '2rem 0', padding: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ padding: '0.35rem', backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', borderRadius: 'var(--radius-sm)' }}>
            <Sliders size={18} aria-hidden="true" />
          </div>
          <div>
            <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--color-text-primary)' }}>{title}</h4>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{description}</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            type="button"
            onClick={handleCopy}
            className="btn btn-ghost btn-sm"
            style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem' }}
          >
            {copied ? <Check size={14} style={{ color: 'var(--color-brand-primary)' }} /> : <Copy size={14} />}
            <span>{copied ? 'CSS Copied' : 'Copy CSS'}</span>
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="btn btn-secondary btn-sm"
            style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem' }}
          >
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* 2-Column Interface: Controls on left, Live Render + CSS on right */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {/* Controls Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: 'var(--color-bg-subtle)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
          {/* Box Sizing Toggle */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--color-text-primary)' }}>
              box-sizing:
            </label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {['border-box', 'content-box'].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setState({ ...state, boxSizing: val })}
                  className={`btn btn-sm ${state.boxSizing === val ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ fontSize: '0.8rem', padding: '0.25rem 0.6rem' }}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          {/* Padding Slider */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.25rem' }}>
              <span>padding:</span>
              <span style={{ color: 'var(--color-brand-primary)', fontFamily: 'var(--font-mono)' }}>{state.padding}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={state.padding}
              onChange={(e) => setState({ ...state, padding: Number(e.target.value) })}
              style={{ width: '100%' }}
              aria-label="Padding slider"
            />
          </div>

          {/* Margin Slider */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.25rem' }}>
              <span>margin:</span>
              <span style={{ color: 'var(--color-warning)', fontFamily: 'var(--font-mono)' }}>{state.margin}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="40"
              value={state.margin}
              onChange={(e) => setState({ ...state, margin: Number(e.target.value) })}
              style={{ width: '100%' }}
              aria-label="Margin slider"
            />
          </div>

          {/* Border Width & Radius */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>
                <span>border-width:</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>{state.borderWidth}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="12"
                value={state.borderWidth}
                onChange={(e) => setState({ ...state, borderWidth: Number(e.target.value) })}
                style={{ width: '100%' }}
                aria-label="Border width slider"
              />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>
                <span>border-radius:</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>{state.borderRadius}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="32"
                value={state.borderRadius}
                onChange={(e) => setState({ ...state, borderRadius: Number(e.target.value) })}
                style={{ width: '100%' }}
                aria-label="Border radius slider"
              />
            </div>
          </div>

          {/* Width Slider */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.25rem' }}>
              <span>declared width:</span>
              <span style={{ fontFamily: 'var(--font-mono)' }}>{state.width}px</span>
            </div>
            <input
              type="range"
              min="160"
              max="340"
              value={state.width}
              onChange={(e) => setState({ ...state, width: Number(e.target.value) })}
              style={{ width: '100%' }}
              aria-label="Width slider"
            />
          </div>

          {/* Flexbox Justify Content */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--color-text-primary)' }}>
              justify-content (flex):
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {['center', 'flex-start', 'space-between', 'flex-end'].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setState({ ...state, justifyContent: val })}
                  className={`btn btn-sm ${state.justifyContent === val ? 'btn-primary' : 'btn-ghost'}`}
                  style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Preview & Code Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Stage Area */}
          <div
            style={{
              padding: '1.5rem',
              backgroundColor: 'var(--color-bg-canvas)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              minHeight: '220px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            {/* Outer Margin indicator box */}
            <div
              style={{
                backgroundColor: 'rgba(245, 158, 11, 0.15)',
                border: '1px dashed #f59e0b',
                borderRadius: 'var(--radius-sm)',
                display: 'inline-block'
              }}
            >
              {/* Element Box */}
              <div
                style={{
                  boxSizing: state.boxSizing,
                  width: `${state.width}px`,
                  padding: `${state.padding}px`,
                  margin: `${state.margin}px`,
                  border: `${state.borderWidth}px solid #047857`,
                  borderRadius: `${state.borderRadius}px`,
                  backgroundColor: state.bgColor,
                  color: '#ffffff',
                  display: state.display,
                  justifyContent: state.justifyContent,
                  alignItems: state.alignItems,
                  gap: `${state.gap}px`,
                  transition: 'all 0.15s ease',
                  boxShadow: 'var(--shadow-md)',
                  textAlign: 'center'
                }}
              >
                <div style={{ padding: '0.4rem 0.75rem', backgroundColor: 'rgba(255, 255, 255, 0.25)', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600 }}>
                  Item 1
                </div>
                <div style={{ padding: '0.4rem 0.75rem', backgroundColor: 'rgba(255, 255, 255, 0.25)', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600 }}>
                  Item 2
                </div>
              </div>
            </div>
          </div>

          {/* Generated Live CSS */}
          <div style={{ backgroundColor: 'var(--color-bg-code)', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
            <div style={{ padding: '0.4rem 0.75rem', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8' }}>
              Generated CSS Code
            </div>
            <pre style={{ margin: 0, padding: '0.85rem', fontFamily: 'var(--font-mono)', fontSize: '0.825rem', color: 'var(--color-text-code)', overflowX: 'auto', lineHeight: 1.5 }}>
              <code>{generatedCss}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
