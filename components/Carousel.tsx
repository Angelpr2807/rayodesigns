'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

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
  const progressRef = useRef<HTMLDivElement>(null);

  const positionRef = useRef(0);
  const targetRef = useRef(0);

  const animationRef = useRef<number | null>(null);
  const pauseTimerRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  const lastTimeRef = useRef(0);

  const pausedRef = useRef(false);
  const draggingRef = useRef(false);

  const dragStartXRef = useRef(0);
  const dragStartPositionRef = useRef(0);

  const touchStartXRef =
    useRef<number | null>(null);

  const [activeIndex, setActiveIndex] =
    useState(0);

  const [progress, setProgress] =
    useState(0);

  const [paused, setPaused] =
    useState(false);

  const gap = 16;

  const imageCount = images.length;

  /*
   * Número máximo de posiciones.
   *
   * Ejemplo:
   * 10 imágenes / 4 visibles = 7 posiciones.
   *
   * 0 → 1 2 3 4
   * 1 → 2 3 4 5
   * 2 → 3 4 5 6
   * ...
   * 6 → 7 8 9 10
   */
  const maxIndex = Math.max(
    0,
    imageCount - visibleCount,
  );

  /*
   * ------------------------------------------------
   * STEP
   * ------------------------------------------------
   */

  const getStep = useCallback(() => {
    const container =
      trackRef.current?.parentElement;

    if (!container) {
      return 0;
    }

    const width =
      container.clientWidth;

    return (
      (width -
        gap * (visibleCount - 1)) /
        visibleCount +
      gap
    );
  }, [visibleCount]);

  /*
   * ------------------------------------------------
   * INDEX → POSITION
   * ------------------------------------------------
   */

  const getPositionForIndex =
    useCallback(
      (index: number) => {
        const step = getStep();

        const safeIndex = Math.max(
          0,
          Math.min(maxIndex, index),
        );

        return -safeIndex * step;
      },
      [getStep, maxIndex],
    );

  /*
   * ------------------------------------------------
   * POSITION → INDEX
   * ------------------------------------------------
   */

  const getIndexFromPosition =
    useCallback(
      (position: number) => {
        const step = getStep();

        if (!step || maxIndex === 0) {
          return 0;
        }

        return Math.max(
          0,
          Math.min(
            maxIndex,
            Math.round(
              -position / step,
            ),
          ),
        );
      },
      [getStep, maxIndex],
    );

  /*
   * ------------------------------------------------
   * PAUSE
   * ------------------------------------------------
   */

  const pauseCarousel =
    useCallback(() => {
      pausedRef.current = true;
      setPaused(true);

      if (pauseTimerRef.current) {
        clearTimeout(
          pauseTimerRef.current,
        );
      }

      pauseTimerRef.current =
        setTimeout(() => {
          pausedRef.current = false;
          setPaused(false);
        }, 10000);
    }, []);

  /*
   * ------------------------------------------------
   * GO TO INDEX
   * ------------------------------------------------
   */

  const goToIndex =
    useCallback(
      (
        index: number,
        shouldPause = false,
      ) => {
        const safeIndex = Math.max(
          0,
          Math.min(maxIndex, index),
        );

        targetRef.current =
          getPositionForIndex(
            safeIndex,
          );

        if (shouldPause) {
          pauseCarousel();
        }
      },
      [
        getPositionForIndex,
        maxIndex,
        pauseCarousel,
      ],
    );

  /*
   * ------------------------------------------------
   * MAIN ANIMATION
   * ------------------------------------------------
   */

  useEffect(() => {
    if (imageCount === 0) {
      return;
    }

    const track =
      trackRef.current;

    if (!track) {
      return;
    }

    const animate = (
      time: number,
    ) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = time;
      }

      const delta =
        time -
        lastTimeRef.current;

      lastTimeRef.current = time;

      /*
       * --------------------------------------------
       * AUTOPLAY
       * --------------------------------------------
       *
       * Mientras no esté pausado:
       *
       * 1 → 2 → 3 → ... → último
       *
       * Cuando llega al último:
       *
       * último → 1
       *
       * No se duplican imágenes.
       */
      if (
        !pausedRef.current &&
        !draggingRef.current &&
        maxIndex > 0
      ) {
        /*
         * Si todavía no estamos al final,
         * seguimos avanzando normalmente.
         */
        if (
          positionRef.current >
          getPositionForIndex(
            maxIndex,
          )
        ) {
          targetRef.current -=
            (delta / interval) *
            getStep();

          const minimumPosition =
            getPositionForIndex(
              maxIndex,
            );

          if (
            targetRef.current <
            minimumPosition
          ) {
            targetRef.current =
              minimumPosition;
          }
        }
        /*
         * Ya estamos en el último slide.
         *
         * Esperamos el intervalo completo
         * y después volvemos al inicio.
         */
        else if (
          Math.abs(
            positionRef.current -
              getPositionForIndex(
                maxIndex,
              ),
          ) < 0.5
        ) {
          /*
           * Usamos un timestamp independiente
           * para evitar que vuelva al inicio
           * inmediatamente.
           */
          if (
            !(
              animate as unknown as {
                endTime?: number;
              }
            ).endTime
          ) {
            (
              animate as unknown as {
                endTime?: number;
              }
            ).endTime =
              time + interval;
          }

          const endTime = (
            animate as unknown as {
              endTime?: number;
            }
          ).endTime;

          if (
            endTime &&
            time >= endTime
          ) {
            (
              animate as unknown as {
                endTime?: number;
              }
            ).endTime = undefined;

            targetRef.current = 0;
          }
        }
      }

      /*
       * --------------------------------------------
       * SMOOTH MOVEMENT
       * --------------------------------------------
       */

      const difference =
        targetRef.current -
        positionRef.current;

      if (
        Math.abs(difference) > 0.25
      ) {
        positionRef.current +=
          difference * 0.12;
      } else {
        positionRef.current =
          targetRef.current;
      }

      /*
       * --------------------------------------------
       * TRANSFORM
       * --------------------------------------------
       */

      track.style.transform =
        `translate3d(${positionRef.current}px, 0, 0)`;

      /*
       * --------------------------------------------
       * ACTIVE INDEX
       * --------------------------------------------
       */

      const index =
        getIndexFromPosition(
          positionRef.current,
        );

      setActiveIndex((current) =>
        current === index
          ? current
          : index,
      );

      /*
       * --------------------------------------------
       * PROGRESS
       * --------------------------------------------
       */

      const nextProgress =
        maxIndex === 0
          ? 0
          : Math.max(
              0,
              Math.min(
                1,
                -positionRef.current /
                  Math.abs(
                    getPositionForIndex(
                      maxIndex,
                    ),
                  ),
              ),
            );

      setProgress((current) =>
        Math.abs(
          current -
            nextProgress,
        ) < 0.001
          ? current
          : nextProgress,
      );

      animationRef.current =
        requestAnimationFrame(
          animate,
        );
    };

    animationRef.current =
      requestAnimationFrame(
        animate,
      );

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(
          animationRef.current,
        );
      }

      animationRef.current = null;
      lastTimeRef.current = 0;
    };
  }, [
    imageCount,
    interval,
    maxIndex,
    getStep,
    getPositionForIndex,
    getIndexFromPosition,
  ]);

  /*
   * ------------------------------------------------
   * RESIZE
   * ------------------------------------------------
   */

  useEffect(() => {
    const handleResize = () => {
      const position =
        getPositionForIndex(
          activeIndex,
        );

      positionRef.current =
        position;

      targetRef.current =
        position;
    };

    window.addEventListener(
      'resize',
      handleResize,
    );

    return () => {
      window.removeEventListener(
        'resize',
        handleResize,
      );
    };
  }, [
    activeIndex,
    getPositionForIndex,
  ]);

  /*
   * ------------------------------------------------
   * PROGRESS CLICK
   * ------------------------------------------------
   */

  const handleProgressClick = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    if (maxIndex === 0) {
      return;
    }

    const bar =
      progressRef.current;

    if (!bar) {
      return;
    }

    const rect =
      bar.getBoundingClientRect();

    const percentage =
      Math.max(
        0,
        Math.min(
          1,
          (event.clientX -
            rect.left) /
            rect.width,
        ),
      );

    const index =
      Math.round(
        percentage * maxIndex,
      );

    goToIndex(index, true);
  };

  /*
   * ------------------------------------------------
   * PROGRESS DRAG START
   * ------------------------------------------------
   */

  const handlePointerDown = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    if (maxIndex === 0) {
      return;
    }

    draggingRef.current = true;

    dragStartXRef.current =
      event.clientX;

    dragStartPositionRef.current =
      targetRef.current;

    event.currentTarget.setPointerCapture(
      event.pointerId,
    );

    pauseCarousel();
  };

  /*
   * ------------------------------------------------
   * PROGRESS DRAG MOVE
   * ------------------------------------------------
   */

  const handlePointerMove = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    if (
      !draggingRef.current ||
      maxIndex === 0
    ) {
      return;
    }

    const bar =
      progressRef.current;

    if (!bar) {
      return;
    }

    const step = getStep();

    if (!step) {
      return;
    }

    const rect =
      bar.getBoundingClientRect();

    const deltaX =
      event.clientX -
      dragStartXRef.current;

    const slideDelta =
      (deltaX / rect.width) *
      maxIndex;

    const startingIndex =
      -dragStartPositionRef.current /
      step;

    const newIndex = Math.max(
      0,
      Math.min(
        maxIndex,
        Math.round(
          startingIndex -
            slideDelta,
        ),
      ),
    );

    targetRef.current =
      getPositionForIndex(
        newIndex,
      );
  };

  /*
   * ------------------------------------------------
   * PROGRESS DRAG END
   * ------------------------------------------------
   */

  const handlePointerUp = (
    event: React.PointerEvent<HTMLDivElement>,
  ) => {
    if (
      !draggingRef.current
    ) {
      return;
    }

    draggingRef.current = false;

    try {
      event.currentTarget.releasePointerCapture(
        event.pointerId,
      );
    } catch {
      // Pointer capture ya fue liberado.
    }

    const index =
      getIndexFromPosition(
        targetRef.current,
      );

    goToIndex(index, true);
  };

  /*
   * ------------------------------------------------
   * SWIPE START
   * ------------------------------------------------
   */

  const handleTouchStart = (
    event: React.TouchEvent<HTMLDivElement>,
  ) => {
    touchStartXRef.current =
      event.touches[0]?.clientX ??
      null;
  };

  /*
   * ------------------------------------------------
   * SWIPE END
   * ------------------------------------------------
   */

  const handleTouchEnd = (
    event: React.TouchEvent<HTMLDivElement>,
  ) => {
    if (
      touchStartXRef.current ===
      null
    ) {
      return;
    }

    const endX =
      event.changedTouches[0]?.clientX;

    if (
      endX === undefined
    ) {
      return;
    }

    const startX =
      touchStartXRef.current;

    touchStartXRef.current =
      null;

    const distance =
      endX - startX;

    if (
      Math.abs(distance) < 40
    ) {
      return;
    }

    const direction =
      distance < 0 ? 1 : -1;

    const nextIndex = Math.max(
      0,
      Math.min(
        maxIndex,
        activeIndex +
          direction,
      ),
    );

    goToIndex(
      nextIndex,
      true,
    );
  };

  /*
   * ------------------------------------------------
   * KEYBOARD
   * ------------------------------------------------
   */

  const handleProgressKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
  ) => {
    if (maxIndex === 0) {
      return;
    }

    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();

        goToIndex(
          activeIndex + 1,
          true,
        );
        break;

      case 'ArrowLeft':
        event.preventDefault();

        goToIndex(
          activeIndex - 1,
          true,
        );
        break;

      case 'Home':
        event.preventDefault();

        goToIndex(0, true);
        break;

      case 'End':
        event.preventDefault();

        goToIndex(
          maxIndex,
          true,
        );
        break;
    }
  };

  /*
   * ------------------------------------------------
   * CLEANUP
   * ------------------------------------------------
   */

  useEffect(() => {
    return () => {
      if (pauseTimerRef.current) {
        clearTimeout(
          pauseTimerRef.current,
        );
      }

      if (animationRef.current) {
        cancelAnimationFrame(
          animationRef.current,
        );
      }
    };
  }, []);

  /*
   * ------------------------------------------------
   * EMPTY STATE
   * ------------------------------------------------
   */

  if (imageCount === 0) {
    return null;
  }

  /*
   * Si todas las imágenes caben,
   * no necesitamos navegación.
   */
  const hasNavigation =
    imageCount > visibleCount;

  return (
    <div className="w-full">
      {/* ==========================================
          CAROUSEL
          ========================================== */}

      <div
        className="
          w-full
          overflow-hidden
          touch-pan-y
        "
        onTouchStart={
          handleTouchStart
        }
        onTouchEnd={
          handleTouchEnd
        }
      >
        <div
          ref={trackRef}
          className="
            flex
            select-none
            will-change-transform
          "
          style={{
            gap: `${gap}px`,
          }}
        >
          {images.map(
            (src, index) => (
              <div
                key={`${src}-${index}`}
                className="
                  relative
                  flex-shrink-0
                  overflow-hidden
                  rounded-xl
                "
                style={{
                  width: `calc((100% - ${
                    (visibleCount - 1) *
                    gap
                  }px) / ${visibleCount})`,
                  aspectRatio:
                    '9 / 16',
                }}
              >
                <ImageWithFallback
                  src={src}
                  alt={`Proyecto ${
                    index + 1
                  }`}
                  fill
                  draggable={false}
                  className="
                    pointer-events-none
                    object-cover
                  "
                  sizes={`${
                    100 /
                    visibleCount
                  }vw`}
                  fallbackType="generic"
                />
              </div>
            ),
          )}
        </div>
      </div>

      {/* ==========================================
          PROGRESS
          ========================================== */}

      {hasNavigation && (
        <>
          <div
            ref={progressRef}
            role="slider"
            aria-label="Progreso del carrusel"
            aria-valuemin={1}
            aria-valuemax={
              maxIndex + 1
            }
            aria-valuenow={
              activeIndex + 1
            }
            aria-valuetext={`Imagen ${
              activeIndex + 1
            } de ${
              imageCount
            }`}
            tabIndex={0}
            className="
              group
              relative
              mt-5
              flex
              h-4
              w-full
              cursor-pointer
              touch-none
              select-none
              items-center
              outline-none
            "
            onClick={
              handleProgressClick
            }
            onPointerDown={
              handlePointerDown
            }
            onPointerMove={
              handlePointerMove
            }
            onPointerUp={
              handlePointerUp
            }
            onPointerCancel={
              handlePointerUp
            }
            onKeyDown={
              handleProgressKeyDown
            }
          >
            {/* Background */}
            <div
              className="
                absolute
                left-0
                right-0
                h-1
                rounded-full
                bg-muted-foreground/20
                transition-all
                duration-200
                group-hover:h-1.5
                group-focus-visible:h-1.5
              "
            />

            {/* Progress */}
            <div
              className="
                absolute
                left-0
                h-1
                rounded-full
                bg-primary
                transition-[width]
                duration-150
                ease-linear
                group-hover:h-1.5
                group-focus-visible:h-1.5
              "
              style={{
                width: `${
                  progress * 100
                }%`,
              }}
            />

            {/* Thumb */}
            <div
              className="
                absolute
                top-1/2
                h-2.5
                w-2.5
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-primary
                opacity-0
                shadow-sm
                transition-opacity
                duration-200
                group-hover:opacity-100
                group-focus-visible:opacity-100
              "
              style={{
                left: `${
                  progress * 100
                }%`,
              }}
            />
          </div>

          {/* Pause indicator */}
          {paused && (
            <div
              className="
                mt-2
                text-center
                text-[10px]
                text-muted-foreground/60
              "
            >
              Pausado
            </div>
          )}
        </>
      )}
    </div>
  );
}
