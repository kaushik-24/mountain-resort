import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import CustomCursor from '@/components/CustomCursor';
import './globals.css';

export const metadata: Metadata = {
  title: 'Annapurna Whispers | Silence, Elevated',
  description: 'A sensory journey into the heart of the Himalayas.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CustomCursor />
        <div className="grain-overlay"></div>
        
        <Navigation />

        <main>
          {children}
        </main>

        <footer style={{ 
          backgroundColor: '#030404', 
          padding: 'clamp(5rem, 12vw, 10rem) 1.5rem 4rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '100vw',
          boxSizing: 'border-box'
        }}>
          <h2 style={{ 
            fontFamily: 'var(--font-serif)', 
            fontSize: 'clamp(2rem, 5vw, 4rem)', 
            color: 'var(--color-text-muted)',
            marginBottom: '4rem',
            textAlign: 'center'
          }}>
            Leave the noise behind.
          </h2>
          <div style={{ width: '1px', height: '80px', backgroundColor: 'var(--color-surface)', marginBottom: '4rem' }}></div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>
            <span>Pokhara, Nepal</span>
            <span>Est. 2026</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
