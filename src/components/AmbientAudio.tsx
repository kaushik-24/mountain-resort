'use client';

import React, { useEffect, useState, useRef, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';

export default function AmbientAudio() {
  const hasChosen = useSyncExternalStore(
    () => () => {},
    () => typeof window !== 'undefined' && Boolean(sessionStorage.getItem('aw-audio-preference')),
    () => false
  );
  const [dismissed, setDismissed] = useState(false);
  const showLoader = !hasChosen && !dismissed;
  const [isPlaying, setIsPlaying] = useState(false);
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const mainGainRef = useRef<GainNode | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) audioCtxRef.current.close();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const mainGain = ctx.createGain();
      mainGain.gain.value = 0.3; // Overall volume
      mainGain.connect(ctx.destination);
      mainGainRef.current = mainGain;

      // Pentatonic scale frequencies for a healing/meditative feel (C Major Pentatonic)
      const frequencies = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25];

      const playChime = () => {
        if (!audioCtxRef.current || !mainGainRef.current) return;
        
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        // Very soft, round sine wave
        osc.type = 'sine';
        // Randomly pick a frequency from the healing scale
        osc.frequency.value = frequencies[Math.floor(Math.random() * frequencies.length)];
        
        // Soft Envelope: Slow fade in, long fade out
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 3); // 3 sec attack
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 10); // 10 sec release
        
        osc.connect(gain);
        gain.connect(mainGainRef.current);
        
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 10);
        
        // Schedule next note randomly between 2 and 5 seconds to create a continuous, overlapping ambient pad
        const nextTime = (Math.random() * 3 + 2) * 1000;
        timeoutRef.current = setTimeout(playChime, nextTime);
      };

      // Start the generative sequence
      playChime();
    } else if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const handleEnter = (withSound: boolean) => {
    setDismissed(true);
    sessionStorage.setItem('aw-audio-preference', 'true');
    if (withSound) {
      setIsPlaying(true);
      initAudio();
    }
  };

  const toggleSound = () => {
    if (isPlaying) {
      if (audioCtxRef.current) {
        audioCtxRef.current.suspend();
      }
      setIsPlaying(false);
    } else {
      initAudio();
      setIsPlaying(true);
    }
  };

  if (!mounted) return null;

  return (
    <>
      {/* Full Screen Entry Loader - Portaled to body to escape nav mix-blend-mode */}
      {typeof document !== 'undefined' && createPortal(
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'var(--color-bg)',
          zIndex: 999999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: showLoader ? 1 : 0,
          pointerEvents: showLoader ? 'auto' : 'none',
          transition: 'opacity 1.5s ease-in-out'
        }}>
          <h1 style={{ 
            fontFamily: 'var(--font-serif)', 
            fontSize: 'clamp(2rem, 4vw, 3.5rem)', 
            color: 'var(--color-text)',
            marginBottom: '3rem',
            letterSpacing: '2px'
          }}>
            Annapurna Whispers
          </h1>
          <p style={{ 
            color: 'var(--color-text-muted)', 
            textTransform: 'uppercase', 
            letterSpacing: '3px',
            fontSize: '0.8rem',
            marginBottom: '3rem',
            textAlign: 'center'
          }}>
            Would you like to experience the site with sound?
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', width: '100%', maxWidth: '400px', padding: '0 1rem', boxSizing: 'border-box' }}>
            <button 
              onClick={() => handleEnter(true)}
              style={{
                background: 'transparent',
                border: '1px solid var(--color-accent)',
                color: 'var(--color-accent)',
                padding: '1rem clamp(1.5rem, 4vw, 3rem)',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                fontSize: '0.8rem',
                cursor: 'pointer',
                transition: 'all 0.4s ease'
              }}
              onMouseOver={e => {
                e.currentTarget.style.backgroundColor = 'var(--color-accent)';
                e.currentTarget.style.color = 'var(--color-bg)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'var(--color-accent)';
              }}
            >
              With Sound
            </button>
            <button 
              onClick={() => handleEnter(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--color-text-muted)',
                padding: '1rem clamp(1.5rem, 4vw, 2rem)',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                fontSize: '0.8rem',
                cursor: 'pointer',
                transition: 'color 0.3s'
              }}
              onMouseOver={e => e.currentTarget.style.color = '#fff'}
              onMouseOut={e => e.currentTarget.style.color = 'var(--color-text-muted)'}
            >
              Enter Silently
            </button>
          </div>
        </div>,
        document.body
      )}

      {/* Nav Toggle (Only shown after loader disappears) */}
      <button 
        onClick={toggleSound}
        style={{
          background: 'transparent',
          border: 'none',
          color: 'var(--color-text-muted)',
          fontSize: '0.65rem',
          textTransform: 'uppercase',
          letterSpacing: '3px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          transition: 'color 0.3s',
          opacity: showLoader ? 0 : 1,
          pointerEvents: showLoader ? 'none' : 'auto'
        }}
        onMouseOver={e => e.currentTarget.style.color = '#fff'}
        onMouseOut={e => e.currentTarget.style.color = 'var(--color-text-muted)'}
      >
        {isPlaying ? (
          <>
            <span style={{ display: 'inline-block', width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--color-accent)', boxShadow: '0 0 8px var(--color-accent)' }}></span>
            Ambient On
          </>
        ) : (
          <>
            <span style={{ display: 'inline-block', width: '4px', height: '4px', borderRadius: '50%', border: '1px solid var(--color-text-muted)' }}></span>
            Ambient Off
          </>
        )}
      </button>
    </>
  );
}
