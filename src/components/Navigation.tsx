'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AmbientAudio from '@/components/AmbientAudio';
import ReservationModal from '@/components/ReservationModal';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [reservationOpen, setReservationOpen] = useState(false);

  return (
    <>
      <nav 
        aria-label="Main navigation"
        className="main-navbar"
      >
        {/* Left: Brand Identity & Sound Toggle */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', zIndex: 60 }}>
          <Link 
            href="/" 
            style={{ 
              fontFamily: 'var(--font-serif)', 
              fontSize: '1.2rem', 
              textTransform: 'uppercase', 
              letterSpacing: '4px',
              color: '#fff'
            }}
          >
            A.W.
          </Link>
          <AmbientAudio />
        </div>

        {/* Right Desktop Navigation */}
        <div className="nav-desktop-links">
          <Link href="/stay" className="nav-link">Sanctuaries</Link>
          <Link href="/experience" className="nav-link">Journeys</Link>
          <Link href="/dining" className="nav-link">Taste</Link>
          <button 
            onClick={() => setReservationOpen(true)}
            className="nav-btn"
            aria-haspopup="dialog"
          >
            Reserve
          </button>
        </div>

        {/* Mobile Hamburger / Menu Button */}
        <div className="nav-mobile-trigger">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#fff',
              fontSize: '0.8rem',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              padding: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            {mobileMenuOpen ? 'CLOSE' : 'MENU'}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer / Overlay */}
      {mobileMenuOpen && (
        <div 
          className="mobile-nav-overlay"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            className="mobile-nav-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center', textAlign: 'center' }}>
              <Link 
                href="/stay" 
                className="mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sanctuaries
              </Link>
              <Link 
                href="/experience" 
                className="mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                Journeys
              </Link>
              <Link 
                href="/dining" 
                className="mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                Taste
              </Link>
              
              <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--color-surface)', margin: '1rem 0' }} />

              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  setReservationOpen(true);
                }}
                style={{
                  border: '1px solid var(--color-accent)',
                  background: 'var(--color-accent)',
                  color: 'var(--color-bg)',
                  padding: '1rem 3rem',
                  textTransform: 'uppercase',
                  letterSpacing: '3px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Reserve Stay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reservation Dialog */}
      <ReservationModal 
        isOpen={reservationOpen}
        onClose={() => setReservationOpen(false)}
      />
    </>
  );
}
