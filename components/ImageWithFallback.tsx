'use client';

import Image from 'next/image';
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
  priority,
  sizes,
  objectFit = 'cover',
  fallbackType = 'generic',
}: ImageWithFallbackProps) {
  const [isError, setIsError] = useState(false);

  const imageProps = {
    alt,
    onError: () => setIsError(true),
    className,
    priority,
    sizes,
    style: objectFit !== 'cover' ? { objectFit } : undefined,
  };

  const source = isError || !src ? fallbackMap[fallbackType] : src;

  if (fill) {
    return <Image {...imageProps} src={source} fill />;
  }

  return (
    <Image
      {...imageProps}
      src={source}
      width={width || 400}
      height={height || 300}
    />
  );
}
