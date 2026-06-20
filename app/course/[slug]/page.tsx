'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { Star, Clock, Users, ArrowLeft, ShoppingCart, CheckCircle, PlayCircle } from 'lucide-react';
import { slugify } from '@/lib/utils';
import ImageWithFallback from '@/components/ImageWithFallback';

interface ClassItem {
  title: string;
  duration: string;
}

interface Module {
  module: string;
  classes: ClassItem[];
}

interface Course {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  price: number;
  duration: string;
  level: string;
  students: number;
  rating: number;
  whatYouLearn: string[];
  curriculum: Module[];
}

const levelColors: Record<string, string> = {
  Principiante: 'bg-blue-500/20 text-blue-300',
  Intermedio: 'bg-yellow-500/20 text-yellow-300',
  Avanzado: 'bg-red-500/20 text-red-300',
};

const platformName = process.env.NEXT_PUBLIC_PLATFORM_NAME || 'DesignHub';
const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '593000000000';

export default function CourseDetail() {
  const params = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/courses.json')
      .then((r) => r.json())
      .then((data: Course[]) => {
        const found = data.find((c) => slugify(c.title) === params.slug);
        setCourse(found || null);
      })
      .catch(() => setCourse(null))
      .finally(() => setLoading(false));
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen py-20 px-4 flex items-center justify-center">
        <div className="w-full max-w-4xl animate-pulse space-y-8">
          <div className="h-8 w-32 bg-secondary rounded" />
          <div className="h-96 bg-secondary rounded-lg" />
          <div className="h-6 w-3/4 bg-secondary rounded" />
          <div className="h-4 w-1/2 bg-secondary rounded" />
        </div>
      </div>
    );
  }

  if (!course) {
    notFound();
    return null;
  }

  const whatsappMsg = encodeURIComponent(
    `Hola! Quiero adquirir el curso "${course.title}" de ${platformName} (S/ ${course.price.toFixed(2)})`
  );

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground smooth-transition mb-8"
        >
          <ArrowLeft size={18} />
          Volver a Cursos
        </Link>

        <div className="relative w-full h-72 lg:h-96 rounded-xl overflow-hidden mb-8 bg-secondary">
          <ImageWithFallback
            src={course.image}
            alt={course.title}
            fill
            className="object-cover"
            priority
            fallbackType="course"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <span
              className={`inline-block text-xs font-semibold px-3 py-1 rounded mb-3 ${
                levelColors[course.level] || 'bg-gray-500/20 text-gray-300'
              }`}
            >
              {course.level}
            </span>
            <h1 className="text-3xl lg:text-4xl font-bold text-white">
              {course.title}
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-xl font-bold mb-3">Descripción</h2>
              <p className="text-muted-foreground leading-relaxed">{course.description}</p>
            </div>

            {course.whatYouLearn && course.whatYouLearn.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-4">¿Qué aprenderás?</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {course.whatYouLearn.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle size={16} className="text-primary shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock size={16} className="text-primary" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users size={16} className="text-primary" />
                <span>{course.students.toLocaleString()} estudiantes</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Star size={16} className="text-yellow-400 fill-yellow-400" strokeWidth={1.5} />
                <span>{course.rating} / 5</span>
              </div>
            </div>

            {course.curriculum && course.curriculum.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-4">Plan de Estudios</h2>
                <div className="space-y-3">
                  {course.curriculum.map((module, i) => (
                    <details key={i} className="group bg-card border border-border rounded-lg overflow-hidden">
                      <summary className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-secondary/50 smooth-transition list-none">
                        <span className="font-semibold text-sm">{module.module}</span>
                        <span className="text-xs text-muted-foreground shrink-0 ml-4">
                          {module.classes.length} clases
                        </span>
                      </summary>
                      <div className="border-t border-border">
                        {module.classes.map((cls, j) => (
                          <div
                            key={j}
                            className="flex items-center justify-between px-4 py-2.5 text-sm text-muted-foreground hover:bg-secondary/30 smooth-transition"
                          >
                            <div className="flex items-center gap-2">
                              <PlayCircle size={14} className="text-primary shrink-0" />
                              <span>{cls.title}</span>
                            </div>
                            <span className="text-xs">{cls.duration}</span>
                          </div>
                        ))}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="bg-card border border-border rounded-xl p-6 h-fit sticky top-24 space-y-4">
            <div>
              <span className="text-3xl font-bold text-primary">S/ {course.price.toFixed(2)}</span>
            </div>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-whatsapp text-white font-semibold rounded-lg hover:scale-105 smooth-transition"
            >
              <ShoppingCart size={18} />
              Adquirir Curso
            </a>
            <p className="text-xs text-muted-foreground text-center">
              Pago directo por WhatsApp. Responde cualquier duda antes de comprar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
