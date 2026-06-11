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
  description,
}: CourseCardProps) {
  return (
    <Link href={`/course/${slugify(title)}`} className="block group bg-card border border-border rounded-lg overflow-hidden hover-lift">
      <div className="relative w-full h-40 overflow-hidden bg-secondary">
        <ImageWithFallback
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 smooth-transition"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          fallbackType="course"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 smooth-transition" />
      </div>

      <div className="p-3 flex flex-col gap-2">
        <h3 className="font-semibold text-sm leading-tight line-clamp-2 group-hover:text-primary smooth-transition">
          {title}
        </h3>

        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {description}
        </p>

        <div className="flex items-center justify-between">
          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
              levelStyles[level] || 'bg-gray-500/20 text-gray-300'
            }`}
          >
            {level}
          </span>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star size={12} className="text-primary fill-primary" />
            <span>{rating}</span>
            <span>({students})</span>
          </div>
        </div>

        <div className="pt-2 border-t border-border">
          <span className="text-base font-bold text-primary">S/ {price.toFixed(2)}</span>
        </div>
      </div>
    </Link>
  );
}
