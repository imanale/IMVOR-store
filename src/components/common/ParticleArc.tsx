import React, { useEffect, useState } from 'react';
import { useCartStore } from '../../store/cartStore';

export const ParticleArc: React.FC = () => {
  const { flyingParticle } = useCartStore();
  const [coords, setCoords] = useState<{ x: number; y: number; opacity: number; scale: number } | null>(null);

  useEffect(() => {
    if (!flyingParticle) {
      setCoords(null);
      return;
    }

    const cartBtn = document.getElementById('nav-cart-btn');
    if (!cartBtn) return;

    const cartRect = cartBtn.getBoundingClientRect();
    const targetX = cartRect.left + cartRect.width / 2;
    const targetY = cartRect.top + cartRect.height / 2;

    const startX = flyingParticle.startX;
    const startY = flyingParticle.startY;

    // Control point for arc trajectory
    const controlX = (startX + targetX) / 2;
    const controlY = Math.min(startY, targetY) - 140; // peak of the arc

    const duration = 650; // ms
    const startTime = performance.now();

    let animationFrameId: number;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Quadratic Bezier formula: B(t) = (1-t)^2 * P0 + 2(1-t)t * P1 + t^2 * P2
      const t = progress;
      const x = Math.pow(1 - t, 2) * startX + 2 * (1 - t) * t * controlX + Math.pow(t, 2) * targetX;
      const y = Math.pow(1 - t, 2) * startY + 2 * (1 - t) * t * controlY + Math.pow(t, 2) * targetY;

      // Scale effect: starts larger, shrinks as it enters cart
      const scale = 1.3 - t * 0.5;
      const opacity = progress > 0.85 ? 1 - (progress - 0.85) / 0.15 : 1;

      setCoords({ x, y, opacity, scale });

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCoords(null);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [flyingParticle]);

  if (!coords) return null;

  return (
    <div 
      className="fixed z-50 pointer-events-none"
      style={{
        left: `${coords.x}px`,
        top: `${coords.y}px`,
        opacity: coords.opacity,
        transform: `translate(-50%, -50%) scale(${coords.scale})`,
        willChange: 'transform, opacity, left, top'
      }}
    >
      {/* Glowing red tactical particle with tail glow */}
      <div className="relative">
        <div className="w-3.5 h-3.5 rounded-full bg-rose-500 shadow-[0_0_15px_#f43f5e,0_0_30px_#e11d48]" />
        <div className="absolute inset-0 w-3.5 h-3.5 rounded-full bg-white opacity-80 animate-ping" />
        <div className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-rose-600/30 blur-sm" />
      </div>
    </div>
  );
};
