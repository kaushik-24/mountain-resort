'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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

  // Hero section refs
  const heroRef = useRef<HTMLElement | null>(null);
  const heroImgParallaxRef = useRef<HTMLDivElement | null>(null);
  const heroImgScrollRef = useRef<HTMLDivElement | null>(null);
  const flareRef = useRef<HTMLDivElement | null>(null);
  const textScrollRef = useRef<HTMLDivElement | null>(null);
  const textParallaxRef = useRef<HTMLDivElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const title1Ref = useRef<HTMLSpanElement | null>(null);
  const title2Ref = useRef<HTMLSpanElement | null>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Entrance timeline for masked typography and indicator
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.fromTo(subtitleRef.current, 
        { y: '120%', opacity: 0 }, 
        { y: '0%', opacity: 1, duration: 1.2 }
      )
      .fromTo(title1Ref.current, 
        { y: '120%', opacity: 0 }, 
        { y: '0%', opacity: 1, duration: 1.4 }, 
        '-=1.0'
      )
      .fromTo(title2Ref.current, 
        { y: '120%', opacity: 0 }, 
        { y: '0%', opacity: 1, duration: 1.4 }, 
        '-=1.2'
      )
      .fromTo(scrollIndicatorRef.current, 
        { y: 25, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }, 
        '-=0.8'
      );

      // 2. Scroll-Driven Hero Depth Dissolve (Dedicated scroll layers only)
      if (heroRef.current && heroImgScrollRef.current && textScrollRef.current && scrollIndicatorRef.current) {
        gsap.fromTo(heroImgScrollRef.current, 
          { y: 0, scale: 1, opacity: 1 },
          {
            y: 120,
            scale: 1.12,
            opacity: 0.25,
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true
            }
          }
        );

        gsap.fromTo(textScrollRef.current, 
          { y: 0, opacity: 1, filter: 'blur(0px)' },
          {
            y: -100,
            opacity: 0,
            filter: 'blur(6px)',
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: '60% top',
              scrub: true
            }
          }
        );

        gsap.fromTo(scrollIndicatorRef.current, 
          { y: 0, opacity: 1 },
          {
            y: -30,
            opacity: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: '20% top',
              scrub: true
            }
          }
        );
      }

      // 3. Subtle 2.5D Mouse Parallax & Interactive Dawn Light (Dedicated parallax layers only)
      const hasFinePointer = typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;
      if (hasFinePointer && heroRef.current && heroImgParallaxRef.current && textParallaxRef.current) {
        const xImg = gsap.quickTo(heroImgParallaxRef.current, 'x', { duration: 1.4, ease: 'power2.out' });
        const yImg = gsap.quickTo(heroImgParallaxRef.current, 'y', { duration: 1.4, ease: 'power2.out' });
        const xText = gsap.quickTo(textParallaxRef.current, 'x', { duration: 0.9, ease: 'power2.out' });
        const yText = gsap.quickTo(textParallaxRef.current, 'y', { duration: 0.9, ease: 'power2.out' });

        const handleMouseMove = (e: MouseEvent) => {
          const rect = heroRef.current?.getBoundingClientRect();
          if (!rect) return;
          const nx = (e.clientX / rect.width) - 0.5;
          const ny = (e.clientY / rect.height) - 0.5;

          xImg(nx * -22);
          yImg(ny * -16);
          xText(nx * 18);
          yText(ny * 12);

          if (flareRef.current) {
            const relX = e.clientX - rect.left;
            const relY = e.clientY - rect.top;
            flareRef.current.style.background = `radial-gradient(650px circle at ${relX}px ${relY}px, rgba(184, 153, 98, 0.12), transparent 70%)`;
          }
        };

        const heroEl = heroRef.current;
        heroEl.addEventListener('mousemove', handleMouseMove);

        return () => {
          heroEl.removeEventListener('mousemove', handleMouseMove);
        };
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div style={{ backgroundColor: 'var(--color-bg)' }}>
      
      {/* Immersive Cinematic Hero */}
      <section 
        ref={heroRef}
        style={{ height: '110vh', position: 'relative', overflow: 'hidden' }}
      >
        {/* Mountain Image Background Parallax (Mouse pointer layer) */}
        <div 
          ref={heroImgParallaxRef}
          style={{
            position: 'absolute',
            top: '-6%', left: '-6%', width: '112%', height: '112%',
            willChange: 'transform'
          }}
        >
          {/* Mountain Image Background Scroll (ScrollTrigger layer) */}
          <div 
            ref={heroImgScrollRef}
            style={{ width: '100%', height: '100%', position: 'relative', willChange: 'transform, opacity' }}
          >
            <img 
              src="/images/hero.png" 
              alt="Misty Fewa Lake" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} 
            />
            {/* Vignette overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at center, transparent 0%, var(--color-bg) 100%)',
              opacity: 0.82
            }}></div>
          </div>
        </div>

        {/* Interactive Dawn Mist Flare */}
        <div ref={flareRef} className="hero-ambient-flare"></div>

        {/* Floating Typography Anchor (Static CSS centering) */}
        <div 
          style={{
            position: 'absolute',
            top: '50%',
            left: 'clamp(1.5rem, 8vw, 10%)',
            right: 'clamp(1.5rem, 8vw, 10%)',
            maxWidth: '850px',
            transform: 'translateY(-50%)',
            zIndex: 10
          }}
        >
          {/* Scroll Layer (ScrollTrigger depth & blur out) */}
          <div 
            ref={textScrollRef}
            style={{ willChange: 'transform, opacity, filter' }}
          >
            {/* Mouse Parallax Layer (Local x & y drift) */}
            <div 
              ref={textParallaxRef}
              style={{ willChange: 'transform' }}
            >
              <div className="hero-line-mask">
                <p ref={subtitleRef} className="hero-subtitle">
                  Awaken to the Annapurnas
                </p>
              </div>
              <h1>
                <span className="hero-line-mask">
                  <span ref={title1Ref} className="hero-title-line">Breathe</span>
                </span>
                <span className="hero-line-mask">
                  <span ref={title2Ref} className="hero-title-line hero-title-italic">again.</span>
                </span>
              </h1>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator with smooth scroll trigger */}
        <div 
          ref={scrollIndicatorRef}
          className="hero-scroll-indicator"
          onClick={() => {
            window.scrollTo({ top: window.innerHeight * 0.95, behavior: 'smooth' });
          }}
          role="button"
          tabIndex={0}
          aria-label="Scroll to next section"
        >
          <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '3px', color: 'var(--color-text-muted)' }}>Descend</span>
          <div style={{ width: '1px', height: '60px', background: 'linear-gradient(to bottom, var(--color-text-muted), transparent)' }}></div>
        </div>
      </section>

      {/* Sensory Statement Section */}
      <section ref={setSection1} style={{
        padding: 'clamp(8rem, 15vw, 15rem) clamp(1.25rem, 6vw, 10%)',
        position: 'relative'
      }}>
        <div style={{ 
          maxWidth: '920px', 
          opacity: section1Visible ? 1 : 0, 
          transform: section1Visible ? 'translateY(0)' : 'translateY(50px)',
          transition: 'all 1.5s cubic-bezier(0.2, 0.8, 0.2, 1)'
        }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.75rem)', fontStyle: 'italic', color: 'var(--color-text)', marginBottom: '2.5rem', lineHeight: 1.2 }}>
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
      <section style={{ padding: '0 clamp(1.25rem, 5vw, 5%)', marginBottom: 'clamp(8rem, 15vw, 15rem)' }}>
        <div className="gallery-grid">
          
          <div className="gallery-col-1">
            <img src="/images/architecture.png" alt="Architecture" style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', filter: 'brightness(0.7)' }} />
            <div className="gallery-badge">
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
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '90%' }}>
          <h2 style={{ fontSize: 'clamp(2.8rem, 11vw, 5rem)', fontStyle: 'italic', letterSpacing: '2px', color: '#fff' }}>Stillness.</h2>
        </div>
      </section>

      {/* The Final Invitation */}
      <section ref={setSection3} style={{ padding: 'clamp(8rem, 15vw, 15rem) clamp(1.25rem, 6vw, 10%)', textAlign: 'center' }}>
        <div style={{ 
          opacity: section3Visible ? 1 : 0, 
          transform: section3Visible ? 'scale(1)' : 'scale(0.95)',
          transition: 'all 2s ease'
        }}>
          <p style={{ textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--color-accent)', fontSize: '0.9rem', marginBottom: '2rem' }}>
            The Journey Awaits
          </p>
          <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', marginBottom: '4rem', lineHeight: 1.2 }}>
            Your sanctuary is ready.<br/>
            <span style={{ color: 'var(--color-text-muted)', fontStyle: 'italic' }}>Will you answer the call?</span>
          </h2>
          <a href="/stay" style={{
            display: 'inline-block',
            border: '1px solid var(--color-accent)',
            padding: '1.25rem clamp(2rem, 5vw, 4rem)',
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
