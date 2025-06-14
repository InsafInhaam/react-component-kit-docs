"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./Slider.module.scss";

type AnimationType = "fade" | "slide";

type SliderProps = {
  children: React.ReactNode[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  animationType?: AnimationType;
  infinite?: boolean;
};

export const Slider: React.FC<SliderProps> = ({
  children,
  autoPlay = false,
  autoPlayInterval = 3000,
  showArrows = true,
  showDots = true,
  animationType = "fade",
  infinite = true,
}) => {
  const [current, setCurrent] = useState(0);
  const length = children.length;
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Auto play effect
  useEffect(() => {
    if (autoPlay) {
      autoPlayRef.current = setInterval(() => {
        setCurrent((prev) =>
          infinite ? (prev === length - 1 ? 0 : prev + 1) : Math.min(prev + 1, length - 1)
        );
      }, autoPlayInterval);

      return () => {
        if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      };
    }
  }, [autoPlay, autoPlayInterval, length, infinite]);

  const goToPrev = useCallback(() => {
    setCurrent((prev) =>
      infinite ? (prev === 0 ? length - 1 : prev - 1) : Math.max(prev - 1, 0)
    );
  }, [length, infinite]);

  const goToNext = useCallback(() => {
    setCurrent((prev) =>
      infinite ? (prev === length - 1 ? 0 : prev + 1) : Math.min(prev + 1, length - 1)
    );
  }, [length, infinite]);

  const goToSlide = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  // Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50; // adjust swipe sensitivity

    if (distance > minSwipeDistance) {
      // swiped left
      goToNext();
    } else if (distance < -minSwipeDistance) {
      // swiped right
      goToPrev();
    }

    // Reset refs
    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (!Array.isArray(children) || length === 0) return null;

  return (
    <div
      className={styles.slider}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {showArrows && (
        <button
          className={styles.leftArrow}
          onClick={goToPrev}
          aria-label="Previous Slide"
          type="button"
        >
          &#10094;
        </button>
      )}

      {children.map((slide, index) => {
        const isActive = index === current;
        return (
          <div
            key={index}
            className={`${styles.slide} ${
              isActive ? styles.active : ""
            } ${animationType === "slide" ? styles.slideAnimation : styles.fadeAnimation}`}
            aria-hidden={!isActive}
          >
            {slide}
          </div>
        );
      })}

      {showArrows && (
        <button
          className={styles.rightArrow}
          onClick={goToNext}
          aria-label="Next Slide"
          type="button"
        >
          &#10095;
        </button>
      )}

      {showDots && (
        <div className={styles.dots}>
          {children.map((_, idx) => (
            <button
              key={idx}
              className={`${styles.dot} ${idx === current ? styles.active : ""}`}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              type="button"
            />
          ))}
        </div>
      )}
    </div>
  );
};
