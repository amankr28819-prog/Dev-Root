import React, { useState } from 'react';
import { Layers, RotateCcw, Box, Eye, Sparkles } from 'lucide-react';

export default function BoxModel3D({
  title = 'Interactive 3D CSS Box Model Demonstrator',
  description = 'Inspect the physical concentric layers of the CSS Box Model in 3D space. Toggle the exploded view to see how Margin, Border, Padding, and Content separate.'
}) {
  const [rotX, setRotX] = useState(25);
  const [rotY, setRotY] = useState(-30);
  const [exploded, setExploded] = useState(true);
  const [margin, setMargin] = useState(24);
  const [padding, setPadding] = useState(24);
  const [borderWidth, setBorderWidth] = useState(4);
  const [boxSizing, setBoxSizing] = useState('border-box');
  const [activeLayer, setActiveLayer] = useState('all');

  const handleReset = () => {
    setRotX(25);
    setRotY(-30);
    setExploded(true);
    setMargin(24);
    setPadding(24);
    setBorderWidth(4);
    setBoxSizing('border-box');
    setActiveLayer('all');
  };

  const zOffset = exploded ? 35 : 0;

  return (
    <div className="card box-model-3d" style={{ margin: '2.5rem 0', padding: '1.5rem', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{ padding: '0.4rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-brand-primary)', borderRadius: 'var(--radius-sm)' }}>
            <Box size={20} aria-hidden="true" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h4 style={{ margin: 0, fontSize: '1.15rem' }}>{title}</h4>
              <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>3D Interactive</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{description}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="btn btn-secondary btn-sm"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem' }}
        >
          <RotateCcw size={14} />
          <span>Reset View</span>
        </button>
      </div>

      {/* Main Grid: Controls vs 3D Stage */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
        {/* Controls Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: 'var(--color-bg-subtle)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
          {/* 3D Exploded View Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid var(--color-border)' }}>
            <div>
              <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-text-primary)', display: 'block' }}>
                Exploded 3D Layer View:
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                Separates layers in Z-depth space
              </span>
            </div>
            <button
              type="button"
              onClick={() => setExploded(!exploded)}
              className={`btn btn-sm ${exploded ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.8rem' }}
            >
              {exploded ? 'Exploded (On)' : 'Flat (Off)'}
            </button>
          </div>

          {/* 3D Rotation Sliders */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>
              <span>3D Horizontal Tilt (Rotate Y):</span>
              <span style={{ fontFamily: 'var(--font-mono)' }}>{rotY}°</span>
            </div>
            <input
              type="range"
              min="-60"
              max="60"
              value={rotY}
              onChange={(e) => setRotY(Number(e.target.value))}
              style={{ width: '100%' }}
              aria-label="3D Horizontal Rotation Slider"
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>
              <span>3D Vertical Tilt (Rotate X):</span>
              <span style={{ fontFamily: 'var(--font-mono)' }}>{rotX}°</span>
            </div>
            <input
              type="range"
              min="-45"
              max="45"
              value={rotX}
              onChange={(e) => setRotX(Number(e.target.value))}
              style={{ width: '100%' }}
              aria-label="3D Vertical Rotation Slider"
            />
          </div>

          {/* Dimensions Sliders */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>
                <span>Padding:</span>
                <span style={{ color: '#10b981', fontFamily: 'var(--font-mono)' }}>{padding}px</span>
              </div>
              <input
                type="range"
                min="8"
                max="40"
                value={padding}
                onChange={(e) => setPadding(Number(e.target.value))}
                style={{ width: '100%' }}
                aria-label="Padding slider"
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>
                <span>Margin:</span>
                <span style={{ color: '#f59e0b', fontFamily: 'var(--font-mono)' }}>{margin}px</span>
              </div>
              <input
                type="range"
                min="8"
                max="40"
                value={margin}
                onChange={(e) => setMargin(Number(e.target.value))}
                style={{ width: '100%' }}
                aria-label="Margin slider"
              />
            </div>
          </div>

          {/* Layer Filter Buttons */}
          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem', color: 'var(--color-text-primary)' }}>
              Highlight Layer:
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              {[
                { id: 'all', label: 'All Layers' },
                { id: 'margin', label: 'Margin (Orange)' },
                { id: 'border', label: 'Border (Gold)' },
                { id: 'padding', label: 'Padding (Green)' },
                { id: 'content', label: 'Content (Cyan)' }
              ].map((layer) => (
                <button
                  key={layer.id}
                  type="button"
                  onClick={() => setActiveLayer(layer.id)}
                  className={`btn btn-sm ${activeLayer === layer.id ? 'btn-primary' : 'btn-ghost'}`}
                  style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}
                >
                  {layer.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3D Viewport Stage */}
        <div
          style={{
            height: '320px',
            perspective: '1000px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--color-bg-canvas)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
            position: 'relative'
          }}
        >
          {/* Rotatable 3D Container */}
          <div
            style={{
              position: 'relative',
              width: '240px',
              height: '180px',
              transformStyle: 'preserve-3d',
              transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            {/* Layer 1: Margin Layer (Outermost) */}
            {(activeLayer === 'all' || activeLayer === 'margin') && (
              <div
                style={{
                  position: 'absolute',
                  inset: `-${margin}px`,
                  backgroundColor: 'rgba(245, 158, 11, 0.15)',
                  border: '2px dashed #f59e0b',
                  borderRadius: '12px',
                  transform: `translateZ(${-zOffset * 1.5}px)`,
                  transformStyle: 'preserve-3d',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  padding: '6px',
                  color: '#f59e0b',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  transition: 'transform 0.4s ease, inset 0.2s ease',
                  boxShadow: exploded ? '0 10px 25px rgba(245, 158, 11, 0.2)' : 'none'
                }}
              >
                <span>MARGIN ({margin}px)</span>
              </div>
            )}

            {/* Layer 2: Border Layer */}
            {(activeLayer === 'all' || activeLayer === 'border') && (
              <div
                style={{
                  position: 'absolute',
                  inset: `-${borderWidth}px`,
                  border: `${borderWidth}px solid #eab308`,
                  borderRadius: '8px',
                  transform: `translateZ(${-zOffset * 0.5}px)`,
                  transformStyle: 'preserve-3d',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-end',
                  padding: '4px',
                  color: '#ca8a04',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  transition: 'transform 0.4s ease, border-width 0.2s ease',
                  boxShadow: exploded ? '0 10px 25px rgba(234, 179, 8, 0.25)' : 'none'
                }}
              >
                <span>BORDER ({borderWidth}px)</span>
              </div>
            )}

            {/* Layer 3: Padding Layer */}
            {(activeLayer === 'all' || activeLayer === 'padding') && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(16, 185, 129, 0.2)',
                  border: '1px solid rgba(16, 185, 129, 0.4)',
                  borderRadius: '6px',
                  transform: `translateZ(${zOffset * 0.5}px)`,
                  transformStyle: 'preserve-3d',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-start',
                  padding: '6px',
                  color: '#10b981',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  transition: 'transform 0.4s ease',
                  boxShadow: exploded ? '0 10px 25px rgba(16, 185, 129, 0.25)' : 'none'
                }}
              >
                <span>PADDING ({padding}px)</span>
              </div>
            )}

            {/* Layer 4: Content Layer (Center) */}
            {(activeLayer === 'all' || activeLayer === 'content') && (
              <div
                style={{
                  position: 'absolute',
                  inset: `${padding}px`,
                  backgroundColor: '#06b6d4',
                  borderRadius: '4px',
                  transform: `translateZ(${zOffset * 1.5}px)`,
                  transformStyle: 'preserve-3d',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  transition: 'transform 0.4s ease, inset 0.2s ease',
                  boxShadow: exploded ? '0 12px 30px rgba(6, 182, 212, 0.4)' : 'none',
                  textAlign: 'center'
                }}
              >
                <span>CONTENT</span>
                <span style={{ fontSize: '0.7rem', fontWeight: 500, opacity: 0.9 }}>
                  {240 - padding * 2} × {180 - padding * 2}px
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
