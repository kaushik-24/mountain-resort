'use client';

import React, { useEffect, useState, useSyncExternalStore } from 'react';

function subscribeResize(callback: () => void) {
  window.addEventListener('resize', callback);
  return () => window.removeEventListener('resize', callback);
}

export default function CustomCursor() {
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);
  const isMobile = useSyncExternalStore(
    subscribeResize,
    () => typeof window !== 'undefined' && window.innerWidth < 768,
    () => false
  );
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Expand cursor on links and buttons
      if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Return null until mounted on the client to avoid SSR hydration mismatch
  if (!mounted || isMobile) return null;

  return (
    <div style={{
      position: 'fixed',
      top: position.y,
      left: position.x,
      width: '12px',
      height: '12px',
      backgroundColor: isHovering ? 'rgba(229, 225, 216, 0.15)' : 'rgba(229, 225, 216, 0.6)',
      border: isHovering ? '1px solid rgba(229, 225, 216, 0.6)' : 'none',
      borderRadius: '50%',
      pointerEvents: 'none',
      transform: `translate(-50%, -50%) scale(${isHovering ? 3.2 : 1})`,
      transition: 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1), background-color 0.25s ease, border 0.25s ease',
      zIndex: 9999,
      mixBlendMode: 'difference'
    }} />
  );
}
