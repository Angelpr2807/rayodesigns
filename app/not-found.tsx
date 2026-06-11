'use client';

import Link from 'next/link';
import { useEffect, useState, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, User, HelpCircle, Mail, ArrowRight } from 'lucide-react';

interface Course {
  id: number;
  title: string;
  category: string;
  image: string;
  price: number;
}

const suggestedRoutes: Record<string, string> = {
  '/inicio': '/',
  '/cursos': '/courses',
  '/curso': '/courses',
  '/cursoss': '/courses',
  '/acercade': '/about',
  '/acerca': '/about',
  '/sobremi': '/about',
  '/preguntas': '/faq',
  '/preguntasfrecuentes': '/faq',
  '/contacto': '/contact',
  '/contactos': '/contact',
  '/email': '/contact',
};

function findSuggestion(path: string): { suggestion: string; label: string } | null {
  const lower = path.toLowerCase().replace(/\/$/, '');
  if (suggestedRoutes[lower]) {
    const label = suggestedRoutes[lower] === '/' ? 'Inicio' : suggestedRoutes[lower].replace('/', '').replace(/^\w/, (c) => c.toUpperCase());
    return { suggestion: suggestedRoutes[lower], label };
  }
  for (const [key, value] of Object.entries(suggestedRoutes)) {
    if (lower.includes(key) || key.includes(lower)) {
      const label = value === '/' ? 'Inicio' : value.replace('/', '').replace(/^\w/, (c) => c.toUpperCase());
      return { suggestion: value, label };
    }
  }
  return null;
}

export default function NotFound() {
  const [isVisible, setIsVisible] = useState(false);
  const [popularCourses, setPopularCourses] = useState<Course[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    setIsVisible(true);
    fetch('/data/courses.json')
      .then((res) => res.json())
      .then((data: Course[]) => {
        const sorted = [...data].sort((a, b) => b.price - a.price).slice(0, 3);
        setPopularCourses(sorted);
      })
      .catch(() => {});
  }, []);

  const suggestion = useMemo(() => findSuggestion(pathname), [pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-primary/20 rounded-lg -rotate-12 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-48 h-48 border-2 border-primary/10 rounded-full animate-pulse" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 border-2 border-accent/20 rounded-lg rotate-45 animate-pulse" />
      </div>

      <div className={`w-full max-w-2xl text-center transform transition-all duration-1000 ${isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
        {/* 404 Text */}
        <div className="mb-8">
          <h1 className="text-9xl lg:text-[150px] font-black glow-text leading-none mb-4">
            404
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-primary via-accent to-transparent mx-auto mb-8" />
        </div>

        {/* Message */}
        <div className="space-y-4 mb-8 max-w-lg mx-auto">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
            Página No Encontrada
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            La ruta <code className="px-2 py-1 bg-secondary rounded text-sm font-mono text-primary">{pathname}</code> no existe en nuestro sitio.
          </p>
        </div>

        {/* Suggestion */}
        {suggestion && (
          <div className="mb-8 p-4 bg-primary/10 border border-primary/20 rounded-xl inline-block">
            <p className="text-sm text-muted-foreground mb-2">Quizás quisiste ir a:</p>
            <Link
              href={suggestion.suggestion}
              className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
            >
              {suggestion.label} <ArrowRight size={16} />
            </Link>
          </div>
        )}

        {/* Popular Courses */}
        {popularCourses.length > 0 && (
          <div className="mb-8">
            <p className="text-sm text-muted-foreground mb-4">Mientras tanto, explora nuestros cursos populares:</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto">
              {popularCourses.map((course) => (
                <Link
                  key={course.id}
                  href="/courses"
                  className="p-3 bg-card border border-border rounded-lg hover:border-primary/50 smooth-transition text-left"
                >
                  <h4 className="font-semibold text-xs line-clamp-2 mb-1">{course.title}</h4>
                  <span className="text-primary text-sm font-bold">${course.price}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:scale-105 smooth-transition"
          >
            <Home size={18} />
            Volver al Inicio
          </Link>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 px-8 py-3 border border-primary text-primary font-semibold rounded-lg hover:bg-primary/10 smooth-transition"
          >
            <BookOpen size={18} />
            Explorar Cursos
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="text-sm text-muted-foreground space-y-2">
          <p>O visita alguna de estas secciones:</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/about" className="inline-flex items-center gap-1 hover:text-primary smooth-transition">
              <User size={14} /> Acerca de
            </Link>
            <span className="text-border">•</span>
            <Link href="/faq" className="inline-flex items-center gap-1 hover:text-primary smooth-transition">
              <HelpCircle size={14} /> FAQ
            </Link>
            <span className="text-border">•</span>
            <Link href="/contact" className="inline-flex items-center gap-1 hover:text-primary smooth-transition">
              <Mail size={14} /> Contacto
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
