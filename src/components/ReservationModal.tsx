'use client';

import React, { useState, useEffect } from 'react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReservationModal({ isOpen, onClose }: ReservationModalProps) {
  const [suite, setSuite] = useState('The Machapuchare Suite');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(7, 9, 8, 0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        zIndex: 100000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        animation: 'fadeIn 0.4s ease forwards'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div style={{
        maxWidth: '540px',
        width: '100%',
        backgroundColor: 'var(--color-surface)',
        border: '1px solid rgba(184, 153, 98, 0.25)',
        padding: 'clamp(2rem, 5vw, 3.5rem)',
        position: 'relative',
        boxShadow: '0 24px 64px rgba(0, 0, 0, 0.8)'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close reservation dialog"
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            background: 'transparent',
            border: 'none',
            color: 'var(--color-text-muted)',
            fontSize: '1.25rem',
            cursor: 'pointer',
            padding: '0.5rem',
            lineHeight: 1
          }}
        >
          ✕
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <p style={{
              textTransform: 'uppercase',
              letterSpacing: '4px',
              fontSize: '0.75rem',
              color: 'var(--color-accent)',
              marginBottom: '1rem'
            }}>
              Inquiry Received
            </p>
            <h3 id="modal-title" style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '2rem',
              marginBottom: '1.5rem',
              color: 'var(--color-text)'
            }}>
              Peace awaits your arrival.
            </h3>
            <p style={{
              color: 'var(--color-text-muted)',
              fontSize: '0.95rem',
              lineHeight: 1.8,
              marginBottom: '2.5rem'
            }}>
              Our host at Annapurna Whispers will review your request and connect with you personally within twenty-four hours.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              style={{
                border: '1px solid var(--color-accent)',
                background: 'transparent',
                color: 'var(--color-accent)',
                padding: '0.75rem 2.5rem',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                fontSize: '0.75rem',
                cursor: 'pointer'
              }}
            >
              Return to Sanctuary
            </button>
          </div>
        ) : (
          <div>
            <p style={{
              textTransform: 'uppercase',
              letterSpacing: '4px',
              fontSize: '0.75rem',
              color: 'var(--color-accent)',
              marginBottom: '0.75rem'
            }}>
              Reservations
            </p>
            <h3 id="modal-title" style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
              marginBottom: '1.5rem',
              color: 'var(--color-text)'
            }}>
              Begin Your Journey
            </h3>
            <p style={{
              color: 'var(--color-text-muted)',
              fontSize: '0.85rem',
              lineHeight: 1.7,
              marginBottom: '2rem'
            }}>
              With only six residences along Fewa Lake, every stay is tailored to singular stillness.
            </p>

            <form onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.7rem',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  color: 'var(--color-text-muted)',
                  marginBottom: '0.5rem'
                }}>
                  Selected Sanctuary
                </label>
                <select
                  value={suite}
                  onChange={(e) => setSuite(e.target.value)}
                  style={{
                    width: '100%',
                    backgroundColor: 'var(--color-bg)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: 'var(--color-text)',
                    padding: '0.75rem 1rem',
                    fontSize: '0.9rem',
                    outline: 'none',
                    fontFamily: 'inherit'
                  }}
                >
                  <option value="The Machapuchare Suite">The Machapuchare Suite ($450/night)</option>
                  <option value="The Forest Bath Suite">The Forest Bath Suite ($520/night)</option>
                  <option value="The Valley Balcony Suite">The Valley Balcony Suite ($600/night)</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.7rem',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    color: 'var(--color-text-muted)',
                    marginBottom: '0.5rem'
                  }}>
                    Arrival Window
                  </label>
                  <input
                    type="date"
                    required
                    style={{
                      width: '100%',
                      backgroundColor: 'var(--color-bg)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: 'var(--color-text)',
                      padding: '0.75rem 0.5rem',
                      fontSize: '0.85rem',
                      outline: 'none',
                      fontFamily: 'inherit'
                    }}
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '0.7rem',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    color: 'var(--color-text-muted)',
                    marginBottom: '0.5rem'
                  }}>
                    Guests
                  </label>
                  <select
                    style={{
                      width: '100%',
                      backgroundColor: 'var(--color-bg)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: 'var(--color-text)',
                      padding: '0.75rem 1rem',
                      fontSize: '0.9rem',
                      outline: 'none',
                      fontFamily: 'inherit'
                    }}
                  >
                    <option>1 Guest</option>
                    <option>2 Guests</option>
                    <option>3 Guests</option>
                    <option>4 Guests</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.7rem',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  color: 'var(--color-text-muted)',
                  marginBottom: '0.5rem'
                }}>
                  Your Contact (Email or WhatsApp)
                </label>
                <input
                  type="text"
                  required
                  placeholder="name@sanctuary.com"
                  style={{
                    width: '100%',
                    backgroundColor: 'var(--color-bg)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: 'var(--color-text)',
                    padding: '0.75rem 1rem',
                    fontSize: '0.9rem',
                    outline: 'none',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  border: '1px solid var(--color-accent)',
                  backgroundColor: 'var(--color-accent)',
                  color: 'var(--color-bg)',
                  padding: '1rem',
                  textTransform: 'uppercase',
                  letterSpacing: '3px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'opacity 0.3s'
                }}
              >
                Submit Inquiry
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
