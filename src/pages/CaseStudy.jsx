import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ShieldCheck, Database, Server, Layers, FileCode, ArrowLeft, ExternalLink, Terminal, AlertCircle } from 'lucide-react';
import { CRP_INDIA_CASE_STUDY } from '../data/caseStudies';
import Breadcrumbs from '../components/Breadcrumbs';
import Badge from '../components/Badge';

export default function CaseStudy() {
  return (
    <div className="case-study-page" style={{ paddingTop: '1.5rem' }}>
      <div className="container">
        <Breadcrumbs
          items={[
            { label: 'Case Studies', href: '/' },
            { label: 'CRP India' }
          ]}
        />

        {/* Case Study Hero */}
        <div
          className="card"
          style={{
            padding: '2.5rem',
            marginBottom: '2.5rem',
            borderLeft: '4px solid var(--color-accent-purple)',
            background: 'linear-gradient(135deg, var(--color-bg-subtle) 0%, var(--color-bg-card) 60%)'
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
            <Badge variant="cyan">{CRP_INDIA_CASE_STUDY.status}</Badge>
            <Badge variant="muted">{CRP_INDIA_CASE_STUDY.stats.architecture}</Badge>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
              Isolated Reference at: <code style={{ color: 'var(--color-brand-primary)' }}>{CRP_INDIA_CASE_STUDY.location}</code>
            </span>
          </div>

          <h1 style={{ fontSize: '2.25rem', marginBottom: '1rem' }}>
            {CRP_INDIA_CASE_STUDY.title}
          </h1>

          <p style={{ fontSize: '1.15rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, maxWidth: '860px', marginBottom: '1.5rem' }}>
            {CRP_INDIA_CASE_STUDY.summary}
          </p>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: 'var(--color-warning-bg)',
              color: 'var(--color-warning-text)',
              border: '1px solid var(--color-warning-border)',
              padding: '0.6rem 1rem',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.85rem'
            }}
          >
            <AlertCircle size={16} aria-hidden="true" />
            <span>
              <strong>Educational Architecture Note:</strong> This project is used purely as an architectural case study.
              Its original code is kept isolated and is not executed inside the Dev-root learning runtime.
            </span>
          </div>
        </div>

        {/* Core Architecture Stats */}
        <div className="grid-cols-3" style={{ marginBottom: '2.5rem' }}>
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--color-brand-primary)' }}>
              <Layers size={20} aria-hidden="true" />
              <h3 style={{ fontSize: '1.05rem' }}>Frontend Client</h3>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
              <strong>{CRP_INDIA_CASE_STUDY.stats.frontendStack}</strong><br />
              Custom CSS tokens in index.css, dual themes (light & dark), Inter typography, accessible status badges, and React Router DOM v7.
            </p>
          </div>

          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--color-accent-cyan)' }}>
              <Server size={20} aria-hidden="true" />
              <h3 style={{ fontSize: '1.05rem' }}>Backend Server</h3>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
              <strong>{CRP_INDIA_CASE_STUDY.stats.backendStack}</strong><br />
              Node.js HTTP service with Helmet, rate limiting, NoSQL sanitizer, Multer file handling, and Morgan dev logging.
            </p>
          </div>

          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--color-accent-purple)' }}>
              <Database size={20} aria-hidden="true" />
              <h3 style={{ fontSize: '1.05rem' }}>Database & ODM</h3>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
              <strong>{CRP_INDIA_CASE_STUDY.stats.database}</strong><br />
              Mongoose schemas for complaints, subdocument status timelines, sequence counters, and automated in-memory MongoDB fallback in dev.
            </p>
          </div>
        </div>

        {/* Verified Technical Features Grid */}
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.35rem' }}>Verified Architectural Implementations</h2>
            <p style={{ fontSize: '0.95rem' }}>
              These implementation details have been audited directly against the source code files in the repository.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {CRP_INDIA_CASE_STUDY.verifiedFeatures.map((feature, idx) => (
              <div
                key={idx}
                className="card"
                style={{
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem'
                }}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 size={18} style={{ color: 'var(--color-brand-primary)' }} aria-hidden="true" />
                    <h3 style={{ fontSize: '1.15rem' }}>{feature.title}</h3>
                  </div>
                  <Badge variant="emerald">{feature.learningModule}</Badge>
                </div>

                <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                  {feature.description}
                </p>

                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  <span>Verified Source Location: </span>
                  <code style={{ color: 'var(--color-brand-primary)', backgroundColor: 'var(--color-bg-subtle)', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-sm)' }}>
                    {CRP_INDIA_CASE_STUDY.location}{feature.evidencePath}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Original Documentation Directory Reference */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.35rem' }}>Curated Reference Documentation</h2>
            <p style={{ fontSize: '0.95rem' }}>
              The reference directory contains comprehensive documentation authored to guide future lesson development.
            </p>
          </div>

          <div className="grid-cols-2">
            {CRP_INDIA_CASE_STUDY.documentationFiles.map((doc, idx) => (
              <div key={idx} className="card" style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <FileCode size={18} style={{ color: 'var(--color-brand-primary)' }} aria-hidden="true" />
                  <h4 style={{ fontSize: '1.05rem' }}>{doc.name}</h4>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '0.75rem' }}>
                  {doc.desc}
                </p>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                  Path: <code style={{ color: 'var(--color-text-primary)' }}>{doc.path}</code>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="card" style={{ padding: '2rem', textAlign: 'center', backgroundColor: 'var(--color-bg-subtle)' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Ready to Build Your Foundations?</h3>
          <p style={{ color: 'var(--color-text-secondary)', maxWidth: '520px', margin: '0 auto 1.5rem' }}>
            Begin with Lesson 1 to master the foundational client-server mechanics that power applications like CRP India.
          </p>
          <Link to="/lessons/how-websites-work" className="btn btn-primary">
            <span>Start with Lesson 1: How Websites Work</span>
            <ExternalLink size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
