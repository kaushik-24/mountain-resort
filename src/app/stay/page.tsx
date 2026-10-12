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
      <header style={{ padding: 'clamp(8rem, 15vw, 15rem) clamp(1.25rem, 6vw, 10%) clamp(4rem, 10vw, 10rem)', textAlign: 'center' }}>
        <h1 className="reveal-text" style={{ fontSize: 'clamp(2.75rem, 8vw, 6rem)', marginBottom: '2rem', letterSpacing: '-1px' }}>
          Sanctuaries of <span style={{ fontStyle: 'italic', color: 'var(--color-text-muted)' }}>Rest</span>
        </h1>
        <p className="reveal-text delay-1" style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto', lineHeight: 2 }}>
          Our suites are designed as private sanctuaries. Minimalist architecture, warm organic materials, and absolute silence allow the Himalayas to be the main character of your stay.
        </p>
      </header>

      <section style={{ padding: '0 clamp(1.25rem, 5vw, 5%)' }}>
        {suites.map((suite, index) => (
          <div key={suite.id} className="stay-suite-grid">
            <div className={index % 2 === 0 ? 'stay-suite-info-even' : 'stay-suite-info-odd'}>
              <p style={{ color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.7rem', marginBottom: '1rem' }}>
                Suite {suite.id} — Starting from {suite.price}
              </p>
              <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '2rem', fontStyle: 'italic', lineHeight: 1.1 }}>{suite.name}</h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', marginBottom: '3rem' }}>
                {suite.description}
              </p>
              <button style={{
                background: 'transparent',
                border: '1px solid var(--color-surface)',
                color: 'var(--color-text)',
                padding: '1rem clamp(1.5rem, 4vw, 3rem)',
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
            
            <div className={index % 2 === 0 ? 'stay-suite-img-even' : 'stay-suite-img-odd'}>
              <img src={suite.image} alt={suite.name} style={{ width: '100%', aspectRatio: index % 2 === 0 ? '3/4' : '4/3', objectFit: 'cover', filter: 'brightness(0.8)' }} />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
