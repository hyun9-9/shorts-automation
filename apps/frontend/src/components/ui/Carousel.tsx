'use client';

import React, { useState, useRef, useEffect } from 'react';
import { colors, spacing, borderRadius, shadows } from '@/lib/theme';

export interface CarouselProps {
  children: React.ReactNode;
  autoPlay?: boolean;
  interval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  className?: string;
  height?: string;
}

export interface CarouselItemProps {
  children: React.ReactNode;
  className?: string;
}

const CarouselItem: React.FC<CarouselItemProps> = ({ children, className = '' }) => {
  return (
    <div 
      className={className}
      style={{
        flex: '0 0 100%',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </div>
  );
};

const Carousel: React.FC<CarouselProps> = ({
  children,
  autoPlay = false,
  interval = 3000,
  showDots = true,
  showArrows = true,
  className = '',
  height = '400px',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const childrenArray = React.Children.toArray(children);
  const totalSlides = childrenArray.length;

  const goToSlide = (index: number) => {
    if (index < 0 || index >= totalSlides || isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex(index);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  const nextSlide = () => {
    goToSlide((currentIndex + 1) % totalSlides);
  };

  const prevSlide = () => {
    goToSlide(currentIndex === 0 ? totalSlides - 1 : currentIndex - 1);
  };

  const goToSlideByDot = (index: number) => {
    goToSlide(index);
  };

  useEffect(() => {
    if (autoPlay && totalSlides > 1) {
      intervalRef.current = setInterval(() => {
        nextSlide();
      }, interval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoPlay, interval, currentIndex, totalSlides]);

  const handleMouseEnter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (autoPlay && totalSlides > 1) {
      intervalRef.current = setInterval(() => {
        nextSlide();
      }, interval);
    }
  };

  const arrowStyles = {
    position: 'absolute' as const,
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: colors.text.primary,
    border: 'none',
    borderRadius: borderRadius.full,
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 10,
    transition: 'all 0.2s ease-in-out',
    fontSize: '18px',
  };

  const dotStyles = {
    width: '8px',
    height: '8px',
    borderRadius: borderRadius.full,
    backgroundColor: currentIndex === 0 ? colors.primary.main : 'rgba(255, 255, 255, 0.3)',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
  };

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height,
        overflow: 'hidden',
        borderRadius: borderRadius.lg,
        boxShadow: shadows.md,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={containerRef}
    >
      {/* Carousel Container */}
      <div
        style={{
          display: 'flex',
          width: `${totalSlides * 100}%`,
          height: '100%',
          transform: `translateX(-${(currentIndex / totalSlides) * 100}%)`,
          transition: isTransitioning ? 'transform 0.3s ease-in-out' : 'none',
        }}
      >
        {childrenArray.map((child, index) => (
          <CarouselItem key={index}>
            {child}
          </CarouselItem>
        ))}
      </div>

      {/* Navigation Arrows */}
      {showArrows && totalSlides > 1 && (
        <>
          <button
            onClick={prevSlide}
            style={{
              ...arrowStyles,
              left: '16px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            }}
          >
            ‹
          </button>
          <button
            onClick={nextSlide}
            style={{
              ...arrowStyles,
              right: '16px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            }}
          >
            ›
          </button>
        </>
      )}

      {/* Dots Navigation */}
      {showDots && totalSlides > 1 && (
        <div
          style={{
            position: 'absolute',
            bottom: '16px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: spacing.sm,
            zIndex: 10,
          }}
        >
          {childrenArray.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlideByDot(index)}
              style={{
                ...dotStyles,
                backgroundColor: currentIndex === index ? colors.primary.main : 'rgba(255, 255, 255, 0.3)',
              }}
              onMouseEnter={(e) => {
                if (currentIndex !== index) {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
                }
              }}
              onMouseLeave={(e) => {
                if (currentIndex !== index) {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                }
              }}
            />
          ))}
        </div>
      )}

      {/* Slide Counter */}
      {totalSlides > 1 && (
        <div
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: colors.text.primary,
            padding: `${spacing.xs} ${spacing.sm}`,
            borderRadius: borderRadius.md,
            fontSize: '12px',
            zIndex: 10,
          }}
        >
          {currentIndex + 1} / {totalSlides}
        </div>
      )}
    </div>
  );
};

export { CarouselItem };
export default Carousel; 