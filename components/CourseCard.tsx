'use client';

import Link from 'next/link';
import { Star } from 'lucide-react';
import { slugify } from '@/lib/utils';
import ImageWithFallback from './ImageWithFallback';

interface CourseCardProps {
  id: number;
  title: string;
  image: string;
  price: number;
  level: string;
  rating: number;
  students: number;
  description: string;
}

const levelStyles: Record<string, string> = {
  Principiante: 'bg-blue-500/20 text-blue-300',
  Intermedio: 'bg-yellow-500/20 text-yellow-300',
  Avanzado: 'bg-red-500/20 text-red-300',
};

export default function CourseCard({
  title,
  image,
  price,
  level,
  rating,
  students,
}: CourseCardProps) {
  return (
    <Link
      href={`/course/${slugify(title)}`}
      className="group relative block bg-card border border-border overflow-hidden hover:scale-[1.03] smooth-transition"
      style={{ aspectRatio: '4/5' }}
    >
      <ImageWithFallback
        src={image}
        alt={title}
        fill
        className="object-cover group-hover:scale-110 smooth-transition"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        fallbackType="course"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 smooth-transition" />

      <div className="absolute inset-x-0 bottom-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 smooth-transition">
        <h3 className="text-sm font-semibold text-white leading-tight line-clamp-2 mb-2">
          {title}
        </h3>

        <div className="flex items-center justify-between mb-2">
          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
              levelStyles[level] || 'bg-gray-500/20 text-gray-300'
            }`}
          >
            {level}
          </span>
          <div className="flex items-center gap-1 text-xs text-white/80">
            <Star size={12} className="text-primary fill-primary" />
            <span>{rating}</span>
            <span>({students})</span>
          </div>
        </div>

        <div className="text-base font-bold text-white">S/ {price.toFixed(2)}</div>
      </div>
    </Link>
  );
}
