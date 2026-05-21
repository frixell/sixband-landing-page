"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const AUTOPLAY_MS = 4500;
const CROSSFADE_MS = 700;
const THUMB_SCROLL_PX = 260;

type GalleryCarouselProps = {
  images: readonly string[];
};

export function GalleryCarousel({ images }: GalleryCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const thumbStripRef = useRef<HTMLDivElement>(null);
  const count = images.length;

  const goTo = useCallback(
    (index: number) => {
      if (count === 0) return;
      const next = ((index % count) + count) % count;
      setActiveIndex(next);
    },
    [count],
  );

  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  const scrollThumbnails = useCallback((direction: "left" | "right") => {
    const strip = thumbStripRef.current;
    if (!strip) return;
    const amount = direction === "left" ? -THUMB_SCROLL_PX : THUMB_SCROLL_PX;
    strip.scrollBy({ left: amount, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const thumb = thumbRefs.current[activeIndex];
    const strip = thumbStripRef.current;
    if (!thumb || !strip) return;

    const stripRect = strip.getBoundingClientRect();
    const thumbRect = thumb.getBoundingClientRect();
    const thumbCenter = thumbRect.left + thumbRect.width / 2;
    const stripCenter = stripRect.left + stripRect.width / 2;
    const delta = thumbCenter - stripCenter;

    strip.scrollBy({ left: delta, behavior: "smooth" });
  }, [activeIndex]);

  useEffect(() => {
    if (isPaused || count <= 1) return;

    const id = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % count);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(id);
  }, [isPaused, count]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") goPrev();
      if (event.key === "ArrowLeft") goNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goPrev, goNext]);

  if (count === 0) return null;

  return (
    <div
      className="mx-auto max-w-4xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsPaused(false);
        }
      }}
    >
      <div className="card-glow relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-2xl shadow-violet-950/40 sm:rounded-3xl">
        <div className="relative aspect-[16/10] w-full bg-black/40 sm:aspect-[16/9]">
          {images.map((src, index) => {
            const isActive = index === activeIndex;
            return (
              <Image
                key={src}
                src={src}
                alt={
                  isActive
                    ? `SIXBAND בהופעה — תמונה ${index + 1}`
                    : `תמונה ${index + 1}`
                }
                fill
                sizes="(max-width: 1024px) 100vw, 896px"
                priority={index === 0}
                aria-hidden={!isActive}
                className={`object-cover transition-opacity ease-in-out ${
                  isActive ? "z-[1] opacity-100" : "z-0 opacity-0"
                }`}
                style={{ transitionDuration: `${CROSSFADE_MS}ms` }}
              />
            );
          })}

          <button
            type="button"
            onClick={goNext}
            className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/70 sm:right-4 sm:h-11 sm:w-11"
            aria-label="תמונה הבאה"
          >
            <ChevronIcon direction="next" />
          </button>
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/70 sm:left-4 sm:h-11 sm:w-11"
            aria-label="תמונה קודמת"
          >
            <ChevronIcon direction="prev" />
          </button>

          <span className="absolute bottom-3 left-3 rounded-full bg-black/55 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm">
            {activeIndex + 1} / {count}
          </span>
        </div>
      </div>

      <div className="mt-4 flex h-16 items-center gap-2 sm:h-[4.5rem]">
        <button
          type="button"
          onClick={() => scrollThumbnails("left")}
          className="flex h-full w-9 shrink-0 items-center justify-center self-center rounded-lg border border-white/15 bg-white/5 text-white transition hover:border-violet-400/40 hover:bg-white/10"
          aria-label="גלול תמונות ממוזערות שמאלה"
        >
          <ChevronIcon direction="prev" />
        </button>

        <div
          ref={thumbStripRef}
          className="flex h-full min-w-0 flex-1 items-center gap-2 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-violet-500/40"
          role="tablist"
          aria-label="תמונות הגלריה"
        >
          {images.map((src, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={src}
                ref={(el) => {
                  thumbRefs.current[index] = el;
                }}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`תמונה ${index + 1}`}
                onClick={() => setActiveIndex(index)}
                className={`relative h-full w-24 shrink-0 overflow-hidden rounded-lg border-2 transition duration-200 sm:w-28 ${
                  isActive
                    ? "border-amber-400 opacity-100 shadow-[inset_0_0_0_1px_rgba(251,191,36,0.5)]"
                    : "border-white/10 opacity-55 hover:border-violet-400/50 hover:opacity-90"
                }`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="112px"
                  className="object-cover"
                  aria-hidden
                />
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => scrollThumbnails("right")}
          className="flex h-full w-9 shrink-0 items-center justify-center self-center rounded-lg border border-white/15 bg-white/5 text-white transition hover:border-violet-400/40 hover:bg-white/10"
          aria-label="גלול תמונות ממוזערות ימינה"
        >
          <ChevronIcon direction="next" />
        </button>
      </div>
    </div>
  );
}

function ChevronIcon({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      className="h-5 w-5"
      aria-hidden
    >
      {direction === "next" ? (
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      )}
    </svg>
  );
}
