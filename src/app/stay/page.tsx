'use client';

import React from 'react';

export default function Stay() {
  const suites = [
    {
      id: 1,
      name: 'The Machapuchare Suite',
      description: 'Wake up to the unobstructed, majestic view of the Fishtail mountain from your bed. Features a private terrace and an open-air stone bathtub.',
      price: '$450',
      image: '/images/suite1.png'
    },
    {
      id: 2,
      name: 'The Forest Bath Suite',
      description: 'Immerse yourself in the tranquility of the lush Nepalese forest. Floor-to-ceiling windows and a deep soaking tub create a seamless indoor-outdoor sanctuary.',
      price: '$520',
      image: '/images/suite2.png'
    },
    {
      id: 3,
      name: 'The Valley Balcony Suite',
      description: 'Suspended above the valley, this suite offers panoramic views of the misty mornings over Fewa Lake. Perfect for morning tea and contemplation.',
      price: '$600',
      image: '/images/suite3.png'
    }
  ];

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh', paddingBottom: '10rem' }}>
      <header style={{ padding: '15rem 10% 10rem 10%', textAlign: 'center' }}>
        <h1 className="reveal-text" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', marginBottom: '2rem', letterSpacing: '-1px' }}>
          Sanctuaries of <span style={{ fontStyle: 'italic', color: 'var(--color-text-muted)' }}>Rest</span>
        </h1>
        <p className="reveal-text delay-1" style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto', lineHeight: 2 }}>
          Our suites are designed as private sanctuaries. Minimalist architecture, warm organic materials, and absolute silence allow the Himalayas to be the main character of your stay.
        </p>
      </header>

      <section style={{ padding: '0 5%' }}>
        {suites.map((suite, index) => (
          <div key={suite.id} style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(12, 1fr)', 
            gap: '2rem',
            alignItems: 'center',
            marginBottom: '15rem'
          }}>
            <div style={{ 
              gridColumn: index % 2 === 0 ? '2 / 6' : '8 / 12',
              order: index % 2 === 0 ? 1 : 2 
            }}>
              <p style={{ color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.7rem', marginBottom: '1rem' }}>
                Suite {suite.id} — Starting from {suite.price}
              </p>
              <h2 style={{ fontSize: '3rem', marginBottom: '2rem', fontStyle: 'italic', lineHeight: 1.1 }}>{suite.name}</h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', marginBottom: '3rem' }}>
                {suite.description}
              </p>
              <button style={{
                background: 'transparent',
                border: '1px solid var(--color-surface)',
                color: 'var(--color-text)',
                padding: '1rem 3rem',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                fontSize: '0.8rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={e => {
                e.currentTarget.style.borderColor = 'var(--color-accent)';
                e.currentTarget.style.color = 'var(--color-accent)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.borderColor = 'var(--color-surface)';
                e.currentTarget.style.color = 'var(--color-text)';
              }}>
                Check Availability
              </button>
            </div>
            
            <div style={{ 
              gridColumn: index % 2 === 0 ? '7 / 12' : '2 / 7',
              order: index % 2 === 0 ? 2 : 1,
              position: 'relative'
            }}>
              <img src={suite.image} alt={suite.name} style={{ width: '100%', aspectRatio: index % 2 === 0 ? '3/4' : '4/3', objectFit: 'cover', filter: 'brightness(0.8)' }} />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
