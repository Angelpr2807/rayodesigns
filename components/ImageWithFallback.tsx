'use client';

import { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down';
  fallbackType?: 'course' | 'portfolio' | 'testimonial' | 'instructor' | 'generic';
}

const fallbackMap: Record<string, string> = {
  course: '/images/courses/course-default.png',
  portfolio: '/images/portfolio/portfolio-default.png',
  testimonial: '/images/testimonials/avatar-default.png',
  instructor: '/images/testimonials/avatar-default.png',
  generic: '/images/testimonials/avatar-default.png',
};

export default function ImageWithFallback({
  src,
  alt,
  width,
  height,
  fill,
  className,
  objectFit = 'cover',
  fallbackType = 'generic',
}: ImageWithFallbackProps) {
  const [isError, setIsError] = useState(false);

  const source = isError || !src ? fallbackMap[fallbackType] : src;

  if (fill) {
    return (
      <img
        src={source}
        alt={alt}
        onError={() => setIsError(true)}
        className={className}
        style={{ objectFit, width: '100%', height: '100%' }}
      />
    );
  }

  return (
    <img
      src={source}
      alt={alt}
      onError={() => setIsError(true)}
      width={width || 400}
      height={height || 300}
      className={className}
      style={{ objectFit }}
    />
  );
}
