'use client';

import React from 'react';

export default function Experience() {
  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh', paddingBottom: '10rem' }}>
      
      <header style={{
        height: '80vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100%'
        }}>
          <img src="/images/hero.png" alt="Experiences" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3, filter: 'grayscale(50%)' }} />
          <div style={{
            position: 'absolute',
            top: 0, left: 0, width: '100%', height: '100%',
            background: 'linear-gradient(to top, var(--color-bg) 0%, transparent 100%)'
          }}></div>
        </div>
        
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <p className="reveal-text" style={{ textTransform: 'uppercase', letterSpacing: '6px', color: 'var(--color-accent)', fontSize: '0.8rem', marginBottom: '2rem' }}>
            Journeys
          </p>
          <h1 className="reveal-text delay-1" style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', letterSpacing: '-2px', color: '#fff' }}>
            Into the <span style={{ fontStyle: 'italic', color: 'var(--color-text-muted)' }}>Wild.</span>
          </h1>
        </div>
      </header>

      <section style={{ padding: '5rem 10%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2rem', marginBottom: '15rem', alignItems: 'center' }}>
          
          <div style={{ gridColumn: '1 / 7', position: 'relative', zIndex: 2 }}>
            <div style={{ aspectRatio: '3/4', backgroundColor: 'var(--color-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
              <p style={{ color: 'var(--color-text-muted)', fontStyle: 'italic' }}>[ Spa Image ]</p>
            </div>
          </div>
          
          <div style={{ gridColumn: '6 / 12', background: 'var(--color-bg)', padding: '4rem', zIndex: 3, marginLeft: '-4rem', borderTop: '1px solid var(--color-surface)' }}>
            <h2 style={{ fontSize: '3.5rem', marginBottom: '2rem', fontStyle: 'italic', letterSpacing: '-1px' }}>The Spa Sanctuary</h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', lineHeight: 1.8 }}>
              Inspired by ancient Ayurvedic traditions, our spa offers holistic treatments using indigenous herbs and Himalayan salt. Reconnect with yourself to the sound of singing bowls and the gentle breeze from the lake.
            </p>
          </div>

        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2rem', alignItems: 'center' }}>
          
          <div style={{ gridColumn: '2 / 8', zIndex: 3, paddingRight: '4rem' }}>
            <h2 style={{ fontSize: '3.5rem', marginBottom: '2rem', fontStyle: 'italic', letterSpacing: '-1px' }}>Guided Treks</h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', lineHeight: 1.8 }}>
              Explore the untouched trails of the Annapurna circuit with our experienced private guides. From gentle morning walks to the World Peace Pagoda to multi-day luxury camping expeditions, we tailor every step to your pace.
            </p>
          </div>

          <div style={{ gridColumn: '7 / 13', position: 'relative', zIndex: 2 }}>
            <div style={{ aspectRatio: '4/3', backgroundColor: 'var(--color-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
              <p style={{ color: 'var(--color-text-muted)', fontStyle: 'italic' }}>[ Trekking Image ]</p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
