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

  // SVG fallbacks por tipo
  const fallbacks = {
    course: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Cdefs%3E%3ClinearGradient id="grad1" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:rgb(59, 130, 246);stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:rgb(37, 99, 235);stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="400" height="300" fill="url(%23grad1)"/%3E%3Ctext x="50%25" y="40%25" font-size="60" font-weight="bold" text-anchor="middle" fill="white" font-family="Arial"%3E📚%3C/text%3E%3Ctext x="50%25" y="65%25" font-size="24" text-anchor="middle" fill="white" font-family="Arial"%3ECurso%3C/text%3E%3Ctext x="50%25" y="85%25" font-size="16" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-family="Arial"%3EImagen no disponible%3C/text%3E%3C/svg%3E',
    portfolio: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Cdefs%3E%3ClinearGradient id="grad2" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:rgb(168, 85, 247);stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:rgb(126, 34, 206);stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="400" height="300" fill="url(%23grad2)"/%3E%3Ctext x="50%25" y="40%25" font-size="60" font-weight="bold" text-anchor="middle" fill="white" font-family="Arial"%3E🎨%3C/text%3E%3Ctext x="50%25" y="65%25" font-size="24" text-anchor="middle" fill="white" font-family="Arial"%3EPortafolio%3C/text%3E%3Ctext x="50%25" y="85%25" font-size="16" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-family="Arial"%3EProyecto destacado%3C/text%3E%3C/svg%3E',
    testimonial: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"%3E%3Cdefs%3E%3ClinearGradient id="grad3" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:rgb(236, 72, 153);stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:rgb(219, 39, 119);stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="400" height="400" fill="url(%23grad3)"/%3E%3Ccircle cx="200" cy="150" r="80" fill="rgba(255,255,255,0.2)"/%3E%3Ctext x="50%25" y="50%25" font-size="80" text-anchor="middle" dominant-baseline="middle" fill="white" font-family="Arial"%3E👤%3C/text%3E%3Ctext x="50%25" y="75%25" font-size="20" text-anchor="middle" fill="white" font-family="Arial"%3EEstudiante%3C/text%3E%3C/svg%3E',
    instructor: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"%3E%3Cdefs%3E%3ClinearGradient id="grad4" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:rgb(34, 197, 94);stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:rgb(22, 163, 74);stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="400" height="400" fill="url(%23grad4)"/%3E%3Ccircle cx="200" cy="150" r="80" fill="rgba(255,255,255,0.2)"/%3E%3Ctext x="50%25" y="50%25" font-size="80" text-anchor="middle" dominant-baseline="middle" fill="white" font-family="Arial"%3E👨‍🏫%3C/text%3E%3Ctext x="50%25" y="75%25" font-size="20" text-anchor="middle" fill="white" font-family="Arial"%3EInstructor%3C/text%3E%3C/svg%3E',
    generic: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Cdefs%3E%3ClinearGradient id="grad5" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:rgb(107, 114, 128);stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:rgb(75, 85, 99);stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="400" height="300" fill="url(%23grad5)"/%3E%3Ctext x="50%25" y="40%25" font-size="60" font-weight="bold" text-anchor="middle" fill="white" font-family="Arial"%3E🖼️%3C/text%3E%3Ctext x="50%25" y="65%25" font-size="24" text-anchor="middle" fill="white" font-family="Arial"%3EImagen%3C/text%3E%3Ctext x="50%25" y="85%25" font-size="16" text-anchor="middle" fill="rgba(255,255,255,0.8)" font-family="Arial"%3ENo disponible%3C/text%3E%3C/svg%3E',
  };

  const fallbackSrc = fallbacks[fallbackType];

  const imageProps = {
    alt,
    onError: () => setIsError(true),
    className,
    priority,
    sizes,
    style: objectFit !== 'cover' ? { objectFit } : undefined,
  };

  const source = isError || !src ? fallbackSrc : src;

  if (fill) {
    return (
      <Image
        {...imageProps}
        src={source}
        fill
      />
    );
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
