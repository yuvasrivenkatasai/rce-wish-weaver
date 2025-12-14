import React, { useState, useEffect } from 'react';

interface LaunchScreenProps {
  onComplete: () => void;
}

const LaunchScreen = ({ onComplete }: LaunchScreenProps) => {
  const [phase, setPhase] = useState<'intro' | 'countdown' | 'done'>('intro');
  const [countdown, setCountdown] = useState(3);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Phase 1: Show intro for 3 seconds
    const introTimer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setFadeOut(false);
        setPhase('countdown');
      }, 500);
    }, 3000);

    return () => clearTimeout(introTimer);
  }, []);

  useEffect(() => {
    if (phase === 'countdown') {
      if (countdown > 0) {
        const timer = setTimeout(() => {
          setCountdown(prev => prev - 1);
        }, 250);
        return () => clearTimeout(timer);
      } else {
        setFadeOut(true);
        setTimeout(() => {
          setPhase('done');
          onComplete();
        }, 300);
      }
    }
  }, [phase, countdown, onComplete]);

  if (phase === 'done') return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
      style={{
        background: 'linear-gradient(135deg, #0a1628 0%, #1a1a3e 50%, #0d1b2a 100%)',
      }}
    >
      {phase === 'intro' && (
        <div className="flex flex-col items-center animate-fade-in">
          {/* RCE Logo with rotating gear */}
          <div className="relative w-64 h-48 mb-8">
            <svg viewBox="0 0 300 200" className="w-full h-full">
              {/* C Letter - Static */}
              <path
                d="M60 40 L60 160 L100 160 L100 140 L80 140 L80 60 L100 60 L100 40 Z"
                fill="#2d2d2d"
              />
              <path
                d="M100 40 L140 40 L140 60 L100 60 Z"
                fill="#2d2d2d"
              />
              <path
                d="M100 140 L140 140 L140 160 L100 160 Z"
                fill="#2d2d2d"
              />
              
              {/* R Letter - Static */}
              <path
                d="M160 40 L160 160 L180 160 L180 120 L200 120 L220 160 L245 160 L220 115 
                   C235 110 245 95 245 75 C245 55 230 40 210 40 Z
                   M180 60 L210 60 C220 60 225 67 225 75 C225 83 220 90 210 90 L180 90 Z"
                fill="#e67e22"
              />
              
              {/* Blue Gear - Rotating */}
              <g className="origin-center" style={{ transformOrigin: '150px 120px' }}>
                <g className="animate-spin" style={{ animationDuration: '4s', transformOrigin: '150px 120px' }}>
                  {/* Gear outer ring with teeth */}
                  <circle cx="150" cy="120" r="28" fill="#2980b9" />
                  <circle cx="150" cy="120" r="18" fill="#3498db" />
                  <circle cx="150" cy="120" r="8" fill="#2980b9" />
                  
                  {/* Gear teeth */}
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                    <rect
                      key={i}
                      x="146"
                      y="88"
                      width="8"
                      height="12"
                      fill="#2980b9"
                      transform={`rotate(${angle} 150 120)`}
                      rx="1"
                    />
                  ))}
                </g>
              </g>
            </svg>
          </div>

          {/* Text below logo */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-wide">
            RCE Welcomes 2026
          </h1>
          <p className="text-lg md:text-xl text-white/70 tracking-widest">
            Innovation • Excellence • Growth
          </p>
        </div>
      )}

      {phase === 'countdown' && (
        <div className="flex flex-col items-center animate-fade-in">
          <p className="text-2xl md:text-3xl text-white/80 font-light tracking-wider">
            Launching in{' '}
            <span className="text-white font-semibold text-4xl md:text-5xl animate-pulse">
              {countdown > 0 ? countdown : '🚀'}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default LaunchScreen;
