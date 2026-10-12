'use client';

import React, { useEffect, useState } from 'react';

// A simple hook for scroll reveal effects
function useReveal() {
  const [element, setElement] = useState<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1 });
    
    observer.observe(element);
    return () => observer.disconnect();
  }, [element]);

  return [setElement, isVisible] as const;
}

export default function Home() {
  const [setSection1, section1Visible] = useReveal();
  const [setSection2, section2Visible] = useReveal();
  const [setSection3, section3Visible] = useReveal();

  return (
    <div style={{ backgroundColor: 'var(--color-bg)' }}>
      
      {/* Immersive Cinematic Hero */}
      <section style={{ height: '110vh', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100%',
        }}>
          <img 
            src="/images/hero.png" 
            alt="Misty Fewa Lake" 
            className="ambient-image"
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} 
          />
          {/* Vignette overlay */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, width: '100%', height: '100%',
            background: 'radial-gradient(circle at center, transparent 0%, var(--color-bg) 100%)',
            opacity: 0.8
          }}></div>
        </div>

        <div style={{
          position: 'absolute',
          top: '50%',
          left: '10%',
          transform: 'translateY(-50%)',
          zIndex: 10
        }}>
          <p className="reveal-text" style={{ 
            textTransform: 'uppercase', 
            letterSpacing: '8px', 
            fontSize: '0.8rem',
            color: 'var(--color-accent)',
            marginBottom: '1rem'
          }}>
            Awaken to the Annapurnas
          </p>
          <h1 className="reveal-text delay-1" style={{ 
            fontSize: 'clamp(4rem, 10vw, 9rem)', 
            letterSpacing: '-2px',
            lineHeight: 0.9,
            color: '#fff'
          }}>
            Breathe<br/>
            <span style={{ fontStyle: 'italic', color: 'var(--color-text-muted)' }}>again.</span>
          </h1>
        </div>
        
        {/* Scroll indicator */}
        <div className="reveal-text delay-3" style={{
          position: 'absolute',
          bottom: '10vh',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '3px', color: 'var(--color-text-muted)' }}>Descend</span>
          <div style={{ width: '1px', height: '60px', background: 'linear-gradient(to bottom, var(--color-text-muted), transparent)' }}></div>
        </div>
      </section>

      {/* Sensory Statement Section */}
      <section ref={setSection1} style={{
        padding: '15rem 10%',
        position: 'relative'
      }}>
        <div style={{ 
          maxWidth: '920px', 
          opacity: section1Visible ? 1 : 0, 
          transform: section1Visible ? 'translateY(0)' : 'translateY(50px)',
          transition: 'all 1.5s cubic-bezier(0.2, 0.8, 0.2, 1)'
        }}>
          <h2 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.75rem)', fontStyle: 'italic', color: 'var(--color-text)', marginBottom: '2.5rem', lineHeight: 1.2 }}>
            &ldquo;A place where time doesn&apos;t tick. It flows like the mist off Fewa Lake.&rdquo;
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', marginTop: '2rem' }}>
            <p style={{ fontSize: '1.15rem', color: 'var(--color-text-muted)', lineHeight: 1.9 }}>
              We stripped away the excess. No ringing phones. No crowded lobbies. Just the raw, elemental beauty of the Himalayas framed by brutalist stone and warm teak.
            </p>
            <p style={{ fontSize: '1.15rem', color: 'var(--color-text-muted)', lineHeight: 1.9, borderLeft: '1px solid rgba(184, 153, 98, 0.25)', paddingLeft: '2rem' }}>
              Annapurna Whispers is an isolation chamber for the modern soul, designed to quiet the noise until all you can hear is your own pulse, and the wind coming off Machapuchare.
            </p>
          </div>
        </div>
      </section>

      {/* Asymmetrical Image Gallery - Feeling of the Stay */}
      <section style={{ padding: '0 5%', marginBottom: '15rem' }}>
        <div className="gallery-grid">
          
          <div className="gallery-col-1">
            <img src="/images/architecture.png" alt="Architecture" style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', filter: 'brightness(0.7)' }} />
            <div style={{ position: 'absolute', bottom: '-2rem', right: '-2rem', background: 'var(--color-surface)', padding: '2rem', width: '70%', maxWidth: '320px' }}>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontStyle: 'italic' }}>Grounded in stone.</p>
              <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--color-text-muted)', marginTop: '1rem' }}>Local materials</p>
            </div>
          </div>

          <div className="gallery-col-2">
            <img src="/images/suite2.png" alt="Forest Bath" style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', filter: 'brightness(0.8)' }} />
            <p style={{ marginTop: '2rem', fontSize: '1.2rem', color: 'var(--color-text-muted)', paddingLeft: '2rem', borderLeft: '1px solid var(--color-surface)' }}>
              Water drawn directly from mountain springs, heated over wood fire. A bath that overlooks a forest older than memory.
            </p>
          </div>

        </div>
      </section>

      {/* Full-bleed Sensory Break */}
      <section ref={setSection2} style={{ height: '100vh', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          clipPath: section2Visible ? 'inset(0% 0% 0% 0%)' : 'inset(10% 5% 10% 5%)',
          transition: 'clip-path 2s cubic-bezier(0.2, 0.8, 0.2, 1)'
        }}>
          <img src="/images/suite3.png" alt="Balcony" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.5)' }} />
        </div>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
          <h2 style={{ fontSize: '5rem', fontStyle: 'italic', letterSpacing: '2px', color: '#fff' }}>Stillness.</h2>
        </div>
      </section>

      {/* The Final Invitation */}
      <section ref={setSection3} style={{ padding: '15rem 10%', textAlign: 'center' }}>
        <div style={{ 
          opacity: section3Visible ? 1 : 0, 
          transform: section3Visible ? 'scale(1)' : 'scale(0.95)',
          transition: 'all 2s ease'
        }}>
          <p style={{ textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--color-accent)', fontSize: '0.9rem', marginBottom: '2rem' }}>
            The Journey Awaits
          </p>
          <h2 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', marginBottom: '4rem', lineHeight: 1.2 }}>
            Your sanctuary is ready.<br/>
            <span style={{ color: 'var(--color-text-muted)', fontStyle: 'italic' }}>Will you answer the call?</span>
          </h2>
          <a href="/stay" style={{
            display: 'inline-block',
            border: '1px solid var(--color-accent)',
            padding: '1.5rem 4rem',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            fontSize: '0.8rem',
            color: 'var(--color-accent)',
            transition: 'all 0.4s ease'
          }} onMouseOver={e => {
            e.currentTarget.style.backgroundColor = 'var(--color-accent)';
            e.currentTarget.style.color = 'var(--color-bg)';
          }} onMouseOut={e => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = 'var(--color-accent)';
          }}>
            Explore Our Suites
          </a>
        </div>
      </section>

    </div>
  );
}
