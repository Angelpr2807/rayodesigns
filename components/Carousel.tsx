'use client';

import { useEffect, useRef, useState } from 'react';

import ImageWithFallback from './ImageWithFallback';

interface CarouselProps {
  images: string[];
  interval?: number; // ms que tarda en avanzar una imagen
  visibleCount?: number;
}

const GAP = 16;
const RESUME_DELAY = 10000;

export default function Carousel({
  images,
  interval = 5000,
  visibleCount = 4,
}: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  const posRef = useRef(0); // posición actual (en "slides", con decimales)
  const seekRef = useRef<number | null>(null); // destino manual (suave)
  const pausedRef = useRef(false);
  const resumeRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const swipeRef = useRef<number | null>(null);

  const [paused, setPaused] = useState(false);

  const max = Math.max(0, images.length - visibleCount);
  const itemWidth = `((100% - ${(visibleCount - 1) * GAP}px) / ${visibleCount})`;

  const pause = () => {
    pausedRef.current = true;
    setPaused(true);

    if (resumeRef.current) clearTimeout(resumeRef.current);
    resumeRef.current = setTimeout(() => {
      pausedRef.current = false;
      setPaused(false);
    }, RESUME_DELAY);
  };

  const seekTo = (value: number) => {
    seekRef.current = Math.max(0, Math.min(max, value));
    pause();
  };

  const stepBy = (delta: number) =>
    seekTo(Math.round(seekRef.current ?? posRef.current) + delta);

  /*
   * Bucle de animación (requestAnimationFrame).
   * - Autoplay: avanza de forma continua, como un rollo de película.
   * - Al llegar al final retrocede suavemente al inicio.
   * - Clicks, drag, swipe y teclado se acercan al destino con suavizado.
   * Escribe directo en el DOM: sin re-renders por frame.
   */
  useEffect(() => {
    let frame = 0;
    let last = performance.now();
    posRef.current = Math.min(posRef.current, max);

    const tick = (now: number) => {
      const dt = Math.min(now - last, 64); // evita saltos al volver a la pestaña
      last = now;

      const seek = seekRef.current;

      if (seek !== null) {
        const diff = seek - posRef.current;

        if (Math.abs(diff) < 0.002) {
          posRef.current = seek;
          if (!pausedRef.current) seekRef.current = null;
        } else {
          posRef.current += diff * (1 - Math.exp(-dt / 160));
        }
      } else if (!pausedRef.current && max > 0) {
        posRef.current += dt / interval;

        if (posRef.current >= max) {
          posRef.current = max;
          seekRef.current = 0; // rebobinar
        }
      }

      const pos = posRef.current;
      const percent = max ? (pos / max) * 100 : 0;

      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(calc(${(-pos).toFixed(4)} * (${itemWidth} + ${GAP}px)))`;
      }
      if (fillRef.current) fillRef.current.style.width = `${percent}%`;
      if (thumbRef.current) thumbRef.current.style.left = `${percent}%`;
      barRef.current?.setAttribute('aria-valuenow', String(Math.round(pos) + 1));

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [interval, max, itemWidth]);

  useEffect(
    () => () => {
      if (resumeRef.current) clearTimeout(resumeRef.current);
    },
    [],
  );

  const handleBar = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = barRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;

    seekTo(((event.clientX - rect.left) / rect.width) * max);
  };

  const handleBarDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    handleBar(event);
  };

  const handleBarMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      handleBar(event);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case 'ArrowRight':
        stepBy(1);
        break;
      case 'ArrowLeft':
        stepBy(-1);
        break;
      case 'Home':
        seekTo(0);
        break;
      case 'End':
        seekTo(max);
        break;
      default:
        return;
    }
    event.preventDefault();
  };

  const handleSwipeEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    const start = swipeRef.current;
    swipeRef.current = null;
    if (start === null) return;

    const distance = event.clientX - start;
    if (Math.abs(distance) >= 40) stepBy(distance < 0 ? 1 : -1);
  };

  if (images.length === 0) return null;

  return (
    <div className="w-full">
      <div
        className="w-full touch-pan-y overflow-hidden"
        onPointerDown={(event) => {
          swipeRef.current = event.clientX;
        }}
        onPointerUp={handleSwipeEnd}
        onPointerCancel={() => {
          swipeRef.current = null;
        }}
      >
        <div
          ref={trackRef}
          className="flex select-none will-change-transform"
          style={{ gap: GAP }}
        >
          {images.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="relative shrink-0 overflow-hidden rounded-xl"
              style={{ width: `calc${itemWidth}`, aspectRatio: '9 / 16' }}
            >
              <ImageWithFallback
                src={src}
                alt={`Proyecto ${i + 1}`}
                fill
                draggable={false}
                className="pointer-events-none object-cover"
                sizes={`${100 / visibleCount}vw`}
                fallbackType="generic"
              />
            </div>
          ))}
        </div>
      </div>

      {max > 0 && (
        <>
          <div
            ref={barRef}
            role="slider"
            aria-label="Progreso del carrusel"
            aria-valuemin={1}
            aria-valuemax={max + 1}
            aria-valuenow={1}
            tabIndex={0}
            className="group relative mt-5 flex h-4 w-full cursor-pointer touch-none select-none items-center outline-none"
            onPointerDown={handleBarDown}
            onPointerMove={handleBarMove}
            onKeyDown={handleKeyDown}
          >
            <div className="absolute inset-x-0 h-1 rounded-full bg-muted-foreground/20 transition-[height] group-hover:h-1.5" />

            <div
              ref={fillRef}
              className="absolute left-0 h-1 rounded-full bg-primary transition-[height] group-hover:h-1.5"
              style={{ width: '0%' }}
            />

            <div
              ref={thumbRef}
              className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
              style={{ left: '0%' }}
            />
          </div>

          {paused && (
            <div className="mt-2 text-center text-[10px] text-muted-foreground/60">
              Pausado
            </div>
          )}
        </>
      )}
    </div>
  );
}
