import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { BookOpen, Layers, Menu, X, Sprout, CheckCircle2 } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useProgress } from '../context/ProgressContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getOverallProgress } = useProgress();
  const overall = getOverallProgress();

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'var(--color-bg-overlay)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--color-border)',
        transition: 'background-color var(--transition-normal), border-color var(--transition-normal)'
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '4.25rem' }}>
        {/* Brand Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            textDecoration: 'none',
            color: 'var(--color-text-primary)'
          }}
        >
          <div
            style={{
              width: '2.25rem',
              height: '2.25rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-brand-subtle)',
              border: '1px solid var(--color-brand-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-brand-primary)'
            }}
          >
            <Sprout size={20} aria-hidden="true" />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.025em', lineHeight: 1.1 }}>
              Dev<span style={{ color: 'var(--color-brand-primary)' }}>-root</span>
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>
              Full-Stack Learning
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          aria-label="Main Navigation"
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '1.5rem'
          }}
          className="desktop-nav"
        >
          <NavLink
            to="/"
            end
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.9rem',
              fontWeight: isActive ? 600 : 500,
              color: isActive ? 'var(--color-brand-primary)' : 'var(--color-text-secondary)',
              padding: '0.4rem 0.6rem',
              borderRadius: 'var(--radius-sm)'
            })}
          >
            <Layers size={16} aria-hidden="true" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/courses"
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.9rem',
              fontWeight: isActive ? 600 : 500,
              color: isActive ? 'var(--color-brand-primary)' : 'var(--color-text-secondary)',
              padding: '0.4rem 0.6rem',
              borderRadius: 'var(--radius-sm)'
            })}
          >
            <BookOpen size={16} aria-hidden="true" />
            <span>Courses</span>
          </NavLink>

          <NavLink
            to="/case-studies/crp-india"
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.9rem',
              fontWeight: isActive ? 600 : 500,
              color: isActive ? 'var(--color-brand-primary)' : 'var(--color-text-secondary)',
              padding: '0.4rem 0.6rem',
              borderRadius: 'var(--radius-sm)'
            })}
          >
            <CheckCircle2 size={16} aria-hidden="true" />
            <span>CRP India Case Study</span>
          </NavLink>
        </nav>

        {/* Action Controls & Theme Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          {/* Progress Pill */}
          <Link
            to="/courses"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              backgroundColor: 'var(--color-bg-subtle)',
              border: '1px solid var(--color-border)',
              padding: '0.35rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.8rem',
              color: 'var(--color-text-secondary)',
              textDecoration: 'none'
            }}
            title={`${overall.completed} of ${overall.total} available lessons completed (${overall.percent}%)`}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: overall.completed > 0 ? 'var(--color-brand-primary)' : 'var(--color-text-muted)'
              }}
            />
            <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>
              {overall.completed}/{overall.total}
            </span>
            <span style={{ color: 'var(--color-text-muted)' }}>Lessons</span>
          </Link>

          <ThemeToggle />

          {/* Mobile Menu Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn btn-ghost btn-sm mobile-menu-btn"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            style={{
              display: 'none',
              padding: '0.5rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)'
            }}
          >
            {mobileMenuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: 'var(--color-bg-surface)',
            borderBottom: '1px solid var(--color-border)',
            padding: '1rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}
          className="mobile-drawer"
        >
          <NavLink
            to="/"
            end
            onClick={closeMenu}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.65rem 0.75rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.95rem',
              fontWeight: isActive ? 600 : 500,
              backgroundColor: isActive ? 'var(--color-brand-subtle)' : 'transparent',
              color: isActive ? 'var(--color-brand-primary)' : 'var(--color-text-primary)'
            })}
          >
            <Layers size={18} aria-hidden="true" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/courses"
            onClick={closeMenu}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.65rem 0.75rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.95rem',
              fontWeight: isActive ? 600 : 500,
              backgroundColor: isActive ? 'var(--color-brand-subtle)' : 'transparent',
              color: isActive ? 'var(--color-brand-primary)' : 'var(--color-text-primary)'
            })}
          >
            <BookOpen size={18} aria-hidden="true" />
            <span>Courses</span>
          </NavLink>

          <NavLink
            to="/case-studies/crp-india"
            onClick={closeMenu}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.65rem 0.75rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.95rem',
              fontWeight: isActive ? 600 : 500,
              backgroundColor: isActive ? 'var(--color-brand-subtle)' : 'transparent',
              color: isActive ? 'var(--color-brand-primary)' : 'var(--color-text-primary)'
            })}
          >
            <CheckCircle2 size={18} aria-hidden="true" />
            <span>CRP India Case Study</span>
          </NavLink>
        </div>
      )}

      {/* Style hook to switch between desktop and mobile nav */}
      <style>{`
        @media (min-width: 769px) {
          .desktop-nav { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
        }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: inline-flex !important; }
        }
      `}</style>
    </header>
  );
}
