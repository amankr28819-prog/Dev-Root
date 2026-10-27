import React, { useState, useEffect } from 'react';
import { Layers, Code2, Sparkles, Terminal, Check } from 'lucide-react';

export default function Hero3D() {
  const [tilt, setTilt] = useState({ x: 18, y: -24 });
  const [activeLayers, setActiveLayers] = useState({
    html: true,
    css: true,
    js: true
  });
  const [exploded, setExploded] = useState(true);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Dampened tilt calculation
    setTilt({
      x: 18 - (y / rect.height) * 20,
      y: -24 + (x / rect.width) * 25
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 18, y: -24 });
  };

  const toggleLayer = (layer) => {
    setActiveLayers((prev) => ({
      ...prev,
      [layer]: !prev[layer]
    }));
  };

  return (
    <div
      className="hero-3d-wrapper"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '2rem 0 1rem'
      }}
    >
      {/* Layer Toggle Controls */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '0.6rem',
          marginBottom: '1.25rem',
          backgroundColor: 'var(--color-bg-subtle)',
          padding: '0.4rem 0.8rem',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--color-border)',
          zIndex: 10
        }}
      >
        <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-text-muted)', letterSpacing: '0.05em' }}>
          3D Web Stack:
        </span>

        <button
          type="button"
          onClick={() => toggleLayer('html')}
          className={`btn btn-sm ${activeLayers.html ? 'btn-primary' : 'btn-ghost'}`}
          style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)' }}
        >
          {activeLayers.html && <Check size={12} />}
          <span>HTML (Structure)</span>
        </button>

        <button
          type="button"
          onClick={() => toggleLayer('css')}
          className={`btn btn-sm ${activeLayers.css ? 'btn-primary' : 'btn-ghost'}`}
          style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)' }}
        >
          {activeLayers.css && <Check size={12} />}
          <span>CSS (Design)</span>
        </button>

        <button
          type="button"
          onClick={() => toggleLayer('js')}
          className={`btn btn-sm ${activeLayers.js ? 'btn-primary' : 'btn-ghost'}`}
          style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)' }}
        >
          {activeLayers.js && <Check size={12} />}
          <span>JS (Logic)</span>
        </button>

        <button
          type="button"
          onClick={() => setExploded(!exploded)}
          className="btn btn-secondary btn-sm"
          style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)' }}
        >
          <span>{exploded ? 'Exploded 3D' : 'Unified'}</span>
        </button>
      </div>

      {/* 3D Viewport Stage */}
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          width: '100%',
          maxWidth: '560px',
          height: '320px',
          perspective: '1200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'grab',
          userSelect: 'none'
        }}
        aria-label="Interactive 3D Web Development Architecture Stack"
      >
        <div
          style={{
            position: 'relative',
            width: '320px',
            height: '200px',
            transformStyle: 'preserve-3d',
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: 'transform 0.15s ease-out'
          }}
        >
          {/* Layer 1: HTML Skeleton (Bottom) */}
          {activeLayers.html && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(6, 182, 212, 0.18)',
                border: '2px solid #06b6d4',
                borderRadius: '12px',
                transform: `translateZ(${exploded ? -60 : 0}px)`,
                transformStyle: 'preserve-3d',
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 15px 35px rgba(6, 182, 212, 0.25)',
                transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0891b2', letterSpacing: '0.05em' }}>
                  1. HTML5 SKELETON
                </span>
                <span style={{ fontSize: '0.7rem', color: '#0891b2', fontFamily: 'var(--font-mono)' }}>
                  &lt;semantic-tree&gt;
                </span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <div style={{ flex: 1, height: '10px', backgroundColor: 'rgba(6, 182, 212, 0.35)', borderRadius: '4px' }} />
                <div style={{ flex: 2, height: '10px', backgroundColor: 'rgba(6, 182, 212, 0.35)', borderRadius: '4px' }} />
              </div>
              <div style={{ fontSize: '0.75rem', color: '#0e7490', fontFamily: 'var(--font-mono)' }}>
                &lt;header&gt; &lt;main&gt; &lt;footer&gt;
              </div>
            </div>
          )}

          {/* Layer 2: CSS Presentation (Middle) */}
          {activeLayers.css && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(16, 185, 129, 0.22)',
                border: '2px solid #10b981',
                borderRadius: '12px',
                transform: `translateZ(${exploded ? 0 : 0}px)`,
                transformStyle: 'preserve-3d',
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 18px 40px rgba(16, 185, 129, 0.3)',
                transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#059669', letterSpacing: '0.05em' }}>
                  2. CSS PRESENTATION
                </span>
                <span style={{ fontSize: '0.7rem', color: '#059669', fontFamily: 'var(--font-mono)' }}>
                  tokens.css
                </span>
              </div>
              <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                <div style={{ width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                <div style={{ width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#06b6d4' }} />
                <div style={{ width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#8b5cf6' }} />
              </div>
              <div style={{ fontSize: '0.75rem', color: '#047857', fontFamily: 'var(--font-mono)' }}>
                display: flex; gap: 1rem; box-sizing: border-box;
              </div>
            </div>
          )}

          {/* Layer 3: JavaScript Logic (Top) */}
          {activeLayers.js && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(139, 92, 246, 0.25)',
                border: '2px solid #8b5cf6',
                borderRadius: '12px',
                transform: `translateZ(${exploded ? 60 : 0}px)`,
                transformStyle: 'preserve-3d',
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 20px 45px rgba(139, 92, 246, 0.35)',
                transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#7c3aed', letterSpacing: '0.05em' }}>
                  3. JAVASCRIPT BRAIN
                </span>
                <span style={{ fontSize: '0.7rem', color: '#7c3aed', fontFamily: 'var(--font-mono)' }}>
                  api.js / events
                </span>
              </div>
              <div style={{ padding: '0.35rem 0.65rem', backgroundColor: 'rgba(255, 255, 255, 0.4)', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, color: '#5b21b6', width: 'fit-content' }}>
                ▶ addEventListener('click', fetchGrievances)
              </div>
              <div style={{ fontSize: '0.75rem', color: '#6d28d9', fontFamily: 'var(--font-mono)' }}>
                state: 200 OK • JSON • async/await
              </div>
            </div>
          )}
        </div>
      </div>
      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>
        Hover and move cursor over model to interactively rotate in 3D
      </span>
    </div>
  );
}
