import React, { useState, useRef, useEffect } from 'react';
import { 
  RotateCcw, 
  Play, 
  Pause, 
  ShoppingBag, 
  Layers, 
  CheckCircle2,
  Compass,
  Zap,
  Info
} from 'lucide-react';
import { KARAMBIT_VARIANTS, PRODUCTS } from '../../data/products';
import { formatPKR } from '../../utils/formatters';
import { useCartStore } from '../../store/cartStore';

export const KarambitScrubber360: React.FC = () => {
  const [selectedVariantId, setSelectedVariantId] = useState(1);
  const [rotationAngle, setRotationAngle] = useState(35); // in degrees 0-360
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [renderMode, setRenderMode] = useState<'solid' | 'wireframe'>('solid');
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDraggingRef = useRef(false);
  const lastMouseXRef = useRef(0);

  const { addToCart, openProductDetail } = useCartStore();

  const currentVariant = KARAMBIT_VARIANTS.find(v => v.id === selectedVariantId) || KARAMBIT_VARIANTS[0];
  
  // Find associated product
  const associatedProduct = PRODUCTS.find(p => p.karambitVariantId === selectedVariantId) || PRODUCTS[0];

  // Auto rotation loop
  useEffect(() => {
    let animId: number;
    const step = () => {
      if (isAutoRotating && !isDraggingRef.current) {
        setRotationAngle(prev => (prev + 0.6) % 360);
      }
      animId = requestAnimationFrame(step);
    };
    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isAutoRotating]);

  // Canvas drawing routine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width || 600;
    const height = rect.height || 420;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    // Center coordinates
    const cx = width / 2;
    const cy = height / 2;

    // Angle in radians
    const rad = (rotationAngle * Math.PI) / 180;
    const cosAngle = Math.cos(rad);
    const sinAngle = Math.sin(rad);

    // Light direction (top-left)
    const lightAngle = Math.PI / 4;
    const lightIntensity = Math.max(0.2, (cosAngle * Math.cos(lightAngle) + 0.8) / 1.8);

    // Tactical HUD background circular reticle inside canvas
    ctx.strokeStyle = 'rgba(244, 63, 94, 0.12)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, 150, 0, Math.PI * 2);
    ctx.stroke();

    // Crosshairs
    ctx.beginPath();
    ctx.moveTo(cx - 165, cy);
    ctx.lineTo(cx + 165, cy);
    ctx.moveTo(cx, cy - 165);
    ctx.lineTo(cx, cy + 165);
    ctx.stroke();

    // Subtle degree ticks
    for (let i = 0; i < 360; i += 30) {
      const a = (i * Math.PI) / 180;
      const x1 = cx + Math.cos(a) * 144;
      const y1 = cy + Math.sin(a) * 144;
      const x2 = cx + Math.cos(a) * 152;
      const y2 = cy + Math.sin(a) * 152;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    // Shadow on floor
    ctx.beginPath();
    ctx.ellipse(cx, cy + 120, 140 * Math.abs(cosAngle * 0.4 + 0.6), 18, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
    ctx.fill();

    // Project 3D Model:
    // Karambit components: Ring (center-right/left based on angle), Handle, Curved Hawkbill Blade
    // Variant adjustments:
    const isSkeleton = currentVariant.id === 5;
    const isTraining = currentVariant.id === 3;
    const isFolder = currentVariant.id === 2;

    const ringRadius = currentVariant.id === 5 ? 24 : 28;
    const ringOffsetX = 85 * cosAngle;
    const ringOffsetY = 85 * sinAngle * 0.2;

    const bladeTipX = -135 * cosAngle + sinAngle * 25;
    const bladeTipY = 65 - Math.abs(sinAngle) * 35;

    // Handle center
    const handleMidX = 0;
    const handleMidY = -15 * sinAngle * 0.2;

    // Perspective thickness
    const thickness = (4.5 * (Math.abs(sinAngle) * 2 + 1));

    if (renderMode === 'wireframe') {
      // Wireframe tactical CAD render mode
      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 1.2;

      // Ring wireframe
      ctx.beginPath();
      ctx.ellipse(cx + ringOffsetX, cy + ringOffsetY, ringRadius * Math.abs(cosAngle * 0.7 + 0.3), ringRadius, 0, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(cx + ringOffsetX, cy + ringOffsetY, (ringRadius - 8) * Math.abs(cosAngle * 0.7 + 0.3), ringRadius - 8, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Blade polygon
      ctx.beginPath();
      ctx.moveTo(cx + ringOffsetX - (15 * cosAngle), cy + ringOffsetY);
      ctx.quadraticCurveTo(cx + handleMidX, cy + handleMidY - 35, cx + bladeTipX, cy + bladeTipY);
      ctx.quadraticCurveTo(cx + handleMidX - 25 * cosAngle, cy + 25, cx + ringOffsetX - (10 * cosAngle), cy + ringOffsetY + 20);
      ctx.closePath();
      ctx.stroke();

      // Grid wirelines
      for (let s = 0.2; s <= 0.8; s += 0.2) {
        ctx.beginPath();
        const px = (cx + ringOffsetX) * (1 - s) + (cx + bladeTipX) * s;
        const py = (cy + ringOffsetY) * (1 - s) + (cy + bladeTipY) * s;
        ctx.moveTo(px, py - 20);
        ctx.lineTo(px, py + 20);
        ctx.stroke();
      }
    } else {
      // Solid Photorealistic Tactical Shader
      // 1. Blade Spine & Primary Bevel
      const bladeGrad = ctx.createLinearGradient(cx + bladeTipX, cy + bladeTipY, cx + ringOffsetX, cy + ringOffsetY);
      
      if (isTraining) {
        bladeGrad.addColorStop(0, '#e11d48');
        bladeGrad.addColorStop(0.5, '#be123c');
        bladeGrad.addColorStop(1, '#881337');
      } else if (currentVariant.id === 4) {
        // Cerakote desert sand/black
        bladeGrad.addColorStop(0, '#d4a373');
        bladeGrad.addColorStop(0.5, '#27272a');
        bladeGrad.addColorStop(1, '#09090b');
      } else {
        // High-end black matte / D2 cryo steel
        const shade = Math.floor(40 * lightIntensity + 20);
        bladeGrad.addColorStop(0, `rgb(${shade + 40}, ${shade + 40}, ${shade + 45})`);
        bladeGrad.addColorStop(0.6, `rgb(${shade}, ${shade}, ${shade + 5})`);
        bladeGrad.addColorStop(1, `rgb(${shade - 10}, ${shade - 10}, ${shade - 8})`);
      }

      // Draw Main Blade Body
      ctx.beginPath();
      ctx.moveTo(cx + ringOffsetX - (20 * cosAngle), cy + ringOffsetY - 10);
      // Top spine curve
      ctx.quadraticCurveTo(
        cx + handleMidX - 10 * cosAngle, 
        cy - 45 - (15 * Math.abs(cosAngle)), 
        cx + bladeTipX, 
        cy + bladeTipY
      );
      // Sharp belly cutting edge (Hawkbill curve)
      ctx.quadraticCurveTo(
        cx + handleMidX - (30 * cosAngle), 
        cy + 15, 
        cx + ringOffsetX - (15 * cosAngle), 
        cy + ringOffsetY + 25
      );
      ctx.closePath();
      ctx.fillStyle = bladeGrad;
      ctx.fill();
      ctx.strokeStyle = isTraining ? '#f43f5e' : 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // 2. Razor Edge Grind Line & Highlight
      ctx.beginPath();
      ctx.moveTo(cx + bladeTipX, cy + bladeTipY);
      ctx.quadraticCurveTo(
        cx + handleMidX - (30 * cosAngle), 
        cy + 15, 
        cx + ringOffsetX - (15 * cosAngle), 
        cy + ringOffsetY + 25
      );
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.4 * lightIntensity + 0.3})`;
      ctx.lineWidth = 2.2;
      ctx.stroke();

      // 3. Jimping notches on spine
      if (!isSkeleton) {
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.lineWidth = 2;
        for (let j = 0; j < 5; j++) {
          const jx = cx + handleMidX - 10 * cosAngle + j * 6 * cosAngle;
          const jy = cy - 25 - j * 2;
          ctx.beginPath();
          ctx.moveTo(jx, jy);
          ctx.lineTo(jx + 2 * cosAngle, jy + 5);
          ctx.stroke();
        }
      }

      // 4. Handle Scale (G10 or skeleton)
      if (!isSkeleton) {
        ctx.beginPath();
        ctx.moveTo(cx + ringOffsetX - (22 * cosAngle), cy + ringOffsetY - 12);
        ctx.lineTo(cx + handleMidX + 15 * cosAngle, cy + handleMidY - 18);
        ctx.lineTo(cx + handleMidX + 10 * cosAngle, cy + handleMidY + 22);
        ctx.lineTo(cx + ringOffsetX - (14 * cosAngle), cy + ringOffsetY + 20);
        ctx.closePath();
        ctx.fillStyle = '#18181b';
        ctx.fill();
        ctx.strokeStyle = 'rgba(244, 63, 94, 0.3)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Handle Rivets
        const rivet1X = cx + handleMidX + 18 * cosAngle;
        const rivet1Y = cy + handleMidY;
        const rivet2X = cx + ringOffsetX - 28 * cosAngle;
        const rivet2Y = cy + ringOffsetY;
        
        ctx.fillStyle = '#71717a';
        ctx.beginPath();
        ctx.arc(rivet1X, rivet1Y, 3, 0, Math.PI * 2);
        ctx.arc(rivet2X, rivet2Y, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // 5. Tactical Retention Ring
      // Outer ring
      ctx.beginPath();
      ctx.ellipse(
        cx + ringOffsetX, 
        cy + ringOffsetY, 
        ringRadius * Math.abs(cosAngle * 0.75 + 0.25), 
        ringRadius, 
        0, 
        0, 
        Math.PI * 2
      );
      ctx.fillStyle = isTraining ? '#9f1239' : '#27272a';
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Inner ring hole
      ctx.beginPath();
      ctx.ellipse(
        cx + ringOffsetX, 
        cy + ringOffsetY, 
        (ringRadius - 8) * Math.abs(cosAngle * 0.75 + 0.25), 
        ringRadius - 8, 
        0, 
        0, 
        Math.PI * 2
      );
      ctx.fillStyle = '#09090b';
      ctx.fill();
      ctx.stroke();
    }

    // Callout inspection points based on angle
    const inspectionPoints = [
      { label: `Angle: ${Math.round(rotationAngle)}°`, x: cx + 130, y: cy - 130 },
      { label: `Ring: ${currentVariant.ringDiameter}`, x: cx + ringOffsetX + 20, y: cy + ringOffsetY - 35 },
      { label: `Spine: ${currentVariant.spineThickness}`, x: cx - 110, y: cy - 65 },
    ];

    ctx.font = '10px "JetBrains Mono", monospace';
    inspectionPoints.forEach(pt => {
      ctx.fillStyle = 'rgba(244, 63, 94, 0.8)';
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#a1a1aa';
      ctx.fillText(pt.label, pt.x + 8, pt.y + 3);
    });

    ctx.restore();
  }, [rotationAngle, selectedVariantId, renderMode, currentVariant]);

  // Touch and Mouse Scrub Handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = true;
    lastMouseXRef.current = e.clientX;
    setIsAutoRotating(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - lastMouseXRef.current;
    lastMouseXRef.current = e.clientX;
    setRotationAngle(prev => (prev + deltaX * 0.8 + 360) % 360);
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length > 0) {
      isDraggingRef.current = true;
      lastMouseXRef.current = e.touches[0].clientX;
      setIsAutoRotating(false);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current || e.touches.length === 0) return;
    const deltaX = e.touches[0].clientX - lastMouseXRef.current;
    lastMouseXRef.current = e.touches[0].clientX;
    setRotationAngle(prev => (prev + deltaX * 0.8 + 360) % 360);
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 border-y border-white/10 bg-[#0c0c10] overflow-hidden">
      {/* Background HUD Grid */}
      <div className="absolute inset-0 tactical-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-rose-950/20 blur-[120px] pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs font-mono-numbers mb-3">
            <RotateCcw className="w-3.5 h-3.5 text-rose-400 animate-spin-slow" />
            <span>PRD INTERACTIVE INSPECTION LAB</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            360° Tactical Karambit Scrubber
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-400">
            Rotate dynamically with your cursor or touch to inspect hawkbill curves, retention rings, blade grinds, and ergonomics across all 5 combat variants.
          </p>
        </div>

        {/* Main Scrubber Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Interactive Canvas Viewport (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="relative w-full max-w-[620px] aspect-[4/3] rounded-xl bg-gradient-to-b from-[#111116] to-[#08080a] border border-zinc-800 shadow-2xl p-2 sm:p-4 select-none group">
              {/* Top Viewport HUD Overlays */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2 text-[11px] font-mono-numbers text-zinc-400 bg-black/60 backdrop-blur px-2.5 py-1 rounded border border-white/10">
                <Compass className="w-3.5 h-3.5 text-rose-400" />
                <span>ROTATION: {Math.round(rotationAngle)}°</span>
              </div>

              <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                <button
                  onClick={() => setRenderMode(prev => prev === 'solid' ? 'wireframe' : 'solid')}
                  className="px-2.5 py-1 rounded bg-black/60 backdrop-blur border border-white/10 hover:border-rose-500/40 text-[11px] font-mono-numbers text-zinc-300 hover:text-white flex items-center gap-1.5"
                >
                  <Layers className="w-3 h-3 text-rose-400" />
                  <span>{renderMode.toUpperCase()}</span>
                </button>
                <button
                  onClick={() => setIsAutoRotating(!isAutoRotating)}
                  className="p-1.5 rounded bg-black/60 backdrop-blur border border-white/10 hover:border-rose-500/40 text-zinc-300 hover:text-white"
                  title={isAutoRotating ? 'Pause Rotation' : 'Auto Rotate'}
                >
                  {isAutoRotating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* The 360 Canvas Element */}
              <canvas
                ref={canvasRef}
                className="w-full h-full cursor-grab active:cursor-grabbing rounded-lg touch-none"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              />

              {/* Scrub Prompt Indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 text-[11px] font-mono-numbers text-zinc-500 bg-black/60 backdrop-blur px-3 py-1 rounded border border-white/5 flex items-center gap-2 pointer-events-none">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                <span>DRAG HORIZONTALLY TO SCRUB 360°</span>
              </div>
            </div>

            {/* Rotation Slider Bar */}
            <div className="w-full max-w-[620px] mt-4 flex items-center gap-3">
              <span className="text-[10px] font-mono-numbers text-zinc-500">0°</span>
              <input
                type="range"
                min="0"
                max="359"
                value={Math.round(rotationAngle)}
                onChange={(e) => {
                  setRotationAngle(Number(e.target.value));
                  setIsAutoRotating(false);
                }}
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
              />
              <span className="text-[10px] font-mono-numbers text-zinc-500">360°</span>
            </div>
          </div>

          {/* Variant Selector & Specs Panel (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* 5 Variant Pills (Interactive selector buttons per PRD) */}
            <div>
              <label className="text-xs uppercase tracking-wider text-zinc-400 font-semibold block mb-2.5">
                Select Tactical Variant (5 PRD Models)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
                {KARAMBIT_VARIANTS.map((variant) => {
                  const isSelected = variant.id === selectedVariantId;
                  return (
                    <button
                      key={variant.id}
                      onClick={() => {
                        setSelectedVariantId(variant.id);
                        setRotationAngle(45);
                      }}
                      className={`text-left p-3 rounded-lg border transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-rose-950/40 border-rose-500/80 shadow-[0_0_15px_rgba(225,29,72,0.2)]'
                          : 'bg-zinc-900/60 border-zinc-800/80 hover:bg-zinc-850 hover:border-zinc-700'
                      }`}
                    >
                      <div className="pr-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono-numbers font-bold text-rose-400">
                            0{variant.id}.
                          </span>
                          <span className="text-xs font-bold text-white">
                            {variant.name}
                          </span>
                        </div>
                        <span className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5">
                          {variant.subtitle}
                        </span>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs font-bold font-mono-numbers text-white">
                          {formatPKR(variant.pricePKR)}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Variant Technical Specs Card */}
            <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-3.5">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <div>
                  <h3 className="text-sm font-bold text-white font-display">
                    {currentVariant.name}
                  </h3>
                  <span className="text-[11px] text-rose-400 font-mono-numbers">
                    Denominated in PKR · Certified Lawful Defense
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold font-mono-numbers text-white">
                    {formatPKR(currentVariant.pricePKR)}
                  </span>
                </div>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed">
                {currentVariant.description}
              </p>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono-numbers">
                <div className="p-2 rounded bg-black/40 border border-white/5">
                  <span className="text-zinc-500 block text-[10px]">Spine Thickness</span>
                  <strong className="text-zinc-200">{currentVariant.spineThickness}</strong>
                </div>
                <div className="p-2 rounded bg-black/40 border border-white/5">
                  <span className="text-zinc-500 block text-[10px]">Ring Diameter</span>
                  <strong className="text-zinc-200">{currentVariant.ringDiameter}</strong>
                </div>
                <div className="p-2 rounded bg-black/40 border border-white/5">
                  <span className="text-zinc-500 block text-[10px]">Blade Steel</span>
                  <strong className="text-zinc-200 truncate block">{currentVariant.bladeSteel}</strong>
                </div>
                <div className="p-2 rounded bg-black/40 border border-white/5">
                  <span className="text-zinc-500 block text-[10px]">Finish & Weight</span>
                  <strong className="text-zinc-200">{currentVariant.weight}</strong>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    addToCart(associatedProduct, 1, {
                      clientX: rect.left + rect.width / 2,
                      clientY: rect.top + rect.height / 2
                    });
                  }}
                  className="flex-1 py-2.5 px-4 rounded bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs transition-all shadow-[0_0_20px_rgba(225,29,72,0.3)] hover:shadow-[0_0_25px_rgba(225,29,72,0.5)] flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Cart ({formatPKR(currentVariant.pricePKR)})</span>
                </button>

                <button
                  onClick={() => openProductDetail(associatedProduct.id)}
                  className="py-2.5 px-4 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>Full Specs</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
