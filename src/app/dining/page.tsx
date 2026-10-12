'use client';

import React from 'react';

export default function Dining() {
  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh', paddingBottom: '10rem' }}>
      
      <header style={{ padding: 'clamp(8rem, 15vw, 15rem) clamp(1.25rem, 6vw, 10%) clamp(3rem, 8vw, 5rem)', textAlign: 'center' }}>
        <h1 className="reveal-text" style={{ fontSize: 'clamp(2.75rem, 8vw, 6rem)', marginBottom: '2rem', letterSpacing: '-1px' }}>
          Taste the <span style={{ fontStyle: 'italic', color: 'var(--color-text-muted)' }}>Altitude</span>
        </h1>
        <p className="reveal-text delay-1" style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', maxWidth: '700px', margin: '0 auto', lineHeight: 2 }}>
          A culinary journey that respects the earth. We forage, harvest, and craft dishes that reflect the rich heritage of Nepal, presented with modern elegance.
        </p>
      </header>

      <div style={{ padding: '0 clamp(1.25rem, 5vw, 5%)', marginBottom: 'clamp(5rem, 10vw, 10rem)' }}>
        <div style={{ 
          width: '100%',
          aspectRatio: '21/9', 
          backgroundColor: 'var(--color-surface)', 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}>
          <p style={{ color: 'var(--color-text-muted)', fontStyle: 'italic', letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.8rem' }}>
            [ Panoramic Dining View ]
          </p>
        </div>
      </div>

      <section className="dining-grid">
        <div className="dining-col-1">
          <p style={{ color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.7rem', marginBottom: '1rem' }}>
            Breakfast & Dinner
          </p>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', marginBottom: '2rem', fontStyle: 'italic' }}>The Summit</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', lineHeight: 1.8 }}>
            Our signature dining venue offers an ever-evolving tasting menu. Chef Nima Sherpa works exclusively with local farmers to bring seasonal ingredients from the mountains to your plate.
          </p>
        </div>
        
        <div className="dining-col-2">
          <p style={{ color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.7rem', marginBottom: '1rem' }}>
            All Day
          </p>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', marginBottom: '2rem', fontStyle: 'italic' }}>The Lakeview Lounge</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', lineHeight: 1.8 }}>
            An intimate space for afternoon tea, artisanal cocktails, and light bites. Enjoy a curated selection of rare Himalayan teas as the sun sets over Fewa Lake.
          </p>
        </div>
      </section>

    </div>
  );
}
