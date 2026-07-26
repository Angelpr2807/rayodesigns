'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import ImageWithFallback from './ImageWithFallback';

interface CarouselProps {
  images: string[];
  interval?: number;
  visibleCount?: number;
}

export default function Carousel({
  images,
  interval = 5000,
  visibleCount = 4,
}: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const targetRef = useRef(0);
  const rafRef = useRef<number>(0);
  const pausedRef = useRef(false);
  const lastTimeRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [dotIndex, setDotIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const N = images.length;
  const gap = 16;

  const getStep = useCallback(() => {
    if (!trackRef.current?.parentElement) return 300;
    const cw = trackRef.current.parentElement.clientWidth;
    return (cw - gap * (visibleCount - 1)) / visibleCount + gap;
  }, [visibleCount]);

  const duplicated = [...images, ...images, ...images];

  const wrapPosition = useCallback(
    (pos: number) => {
      const total = N * getStep();
      let p = pos % total;
      if (p > 0) p -= total;
      return p;
    },
    [N, getStep],
  );

  const getDotIndex = useCallback(
    (pos: number) => {
      const step = getStep();
      const total = N * step;
      let idx = Math.round(-pos / step) % N;
      if (idx < 0) idx += N;
      return idx;
    },
    [N, getStep],
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const animate = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;

      if (!pausedRef.current) {
        targetRef.current -= (delta / interval) * getStep();
        targetRef.current = wrapPosition(targetRef.current);
      }

      const diff = targetRef.current - posRef.current;
      if (Math.abs(diff) > 0.5) {
        posRef.current += diff * 0.12;
      } else {
        posRef.current = targetRef.current;
      }

      track.style.transform = `translateX(${posRef.current}px)`;
      setDotIndex(getDotIndex(posRef.current));

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [interval, wrapPosition, getStep, getDotIndex]);

  useEffect(() => {
    const onResize = () => {
      targetRef.current = wrapPosition(targetRef.current);
      posRef.current = targetRef.current;
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [wrapPosition]);

  const handleDotClick = (idx: number) => {
    const step = getStep();
    targetRef.current = wrapPosition(-idx * step);
    posRef.current = targetRef.current;
    pausedRef.current = true;
    setPaused(true);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      pausedRef.current = false;
      setPaused(false);
    }, 10000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="w-full">
      <div className="w-full overflow-hidden">
        <div
          ref={trackRef}
          className="flex"
          style={{ gap: `${gap}px` }}
        >
          {duplicated.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="flex-shrink-0 relative rounded-xl overflow-hidden"
              style={{
                width: `calc((100% - ${(visibleCount - 1) * gap}px) / ${visibleCount})`,
                aspectRatio: '9/16',
              }}
            >
              <ImageWithFallback
                src={src}
                alt={`Proyecto ${(i % N) + 1}`}
                fill
                className="object-cover"
                sizes={`${100 / visibleCount}vw`}
                fallbackType="generic"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => handleDotClick(i)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === dotIndex
                ? 'bg-primary w-7'
                : 'bg-muted-foreground/40 hover:bg-muted-foreground/70 w-2.5'
            }`}
            aria-label={`Ir a imagen ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
