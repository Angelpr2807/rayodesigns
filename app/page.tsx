'use client';

import { ArrowRight, Star } from 'lucide-react';
import CourseCard from '@/components/CourseCard';
import ImageWithFallback from '@/components/ImageWithFallback';
import Carousel from '@/components/Carousel';
import CTASection from '@/components/CTASection';
import { useState, useEffect } from 'react';

const carruselImages = [
  '/images/carrusel-1.webp',
  '/images/carrusel-2.webp',
  '/images/carrusel-3.webp',
  '/images/carrusel-4.webp',
  '/images/carrusel-5.webp',
  '/images/carrusel-6.webp',
  '/images/carrusel-8.webp',
  '/images/carrusel-9.webp',
];

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
}

interface Testimonial {
  id: number;
  author: string;
  role: string;
  text: string;
  rating: number;
  image: string;
}

const platformName = process.env.NEXT_PUBLIC_PLATFORM_NAME || 'DesignHub';

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [coursesRes, testimonialRes] = await Promise.all([
          fetch('/data/courses.json'),
          fetch('/data/testimonials.json'),
        ]);
        const coursesData = await coursesRes.json();
        const testimonialsData = await testimonialRes.json();

        // Get last 5 courses (reverse order, newest first)
        setCourses(coursesData.slice(-5).reverse());
        setTestimonials(testimonialsData);
      } catch (error) {
        console.error('[v0] Error loading data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="/images/hero.webp"
            alt="Hero Background"
            fill
            className="object-cover object-top-right lg:object-center"
            priority
            fallbackType="generic"
          />
          <div className="absolute inset-0 bg-black/75 md:bg-black/50 lg:bg-black/0" />
        </div>

        <div className="max-w-xl z-2 mx-auto md:ml-[5vw] lg:ml-[17.5vw] px-4 py-16 lg:py-24 text-left">
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                Bienvenido a <span className="text-primary">{platformName}</span>
              </h1>
              <p className="text-base lg:text-lg text-white max-w-xl mx-auto">
                Aprende diseño gráfico, branding, fotomontaje y mucho más. Aprende <span className="text-primary font-bold">TÉCNICAS PROFESIONALES</span> y lleva tus habilidades a otro nivel.
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="/courses"
                className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:scale-105 smooth-transition"
              >
                Explorar Cursos
                <ArrowRight size={20} strokeWidth={1.5} />
              </a>
              <a
                href="/about"
                className="inline-flex items-center gap-2 px-8 py-3 border border-primary text-white font-semibold rounded-lg hover:bg-primary/10 smooth-transition"
              >
                Conocer Más
              </a>
            </div>

            <div className="grid w-full grid-cols-3 gap-6 pt-6">
              <div>
                <div className="text-4xl font-bold text-primary">1K+</div>
                <div className="text-md text-white">Estudiantes</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary">10+</div>
                <div className="text-md text-white">Cursos</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary">15+</div>
                <div className="text-md text-white">Años de experiencia</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-96">
              <ImageWithFallback
                src="/images/instructor.webp"
                alt="Instructor"
                fill
                className="object-cover object-top rounded-lg"
                fallbackType="instructor"
              />
            </div>
            <div className="space-y-6">
              <div>
                <h2 className="text-4xl font-semibold mb-4">Acerca de Mí</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Con más de 15 años de experiencia, he formado una comunidad de miles de estudiantes apasionados por el diseño. En RayoStudio comparto técnicas profesionales, proyectos reales y metodologías que te ayudarán a llevar tu creatividad al siguiente nivel.
                </p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Star size={20} className="text-yellow-400 mt-1 flex-shrink-0" strokeWidth={1.5} />
                  <span>+1.500 estudiantes impactados</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star size={20} className="text-yellow-400 mt-1 flex-shrink-0" strokeWidth={1.5} />
                  <span>10+ cursos profesionales</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star size={20} className="text-yellow-400 mt-1 flex-shrink-0" strokeWidth={1.5} />
                  <span>15+ años de experiencia</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star size={20} className="text-yellow-400 mt-1 flex-shrink-0" strokeWidth={1.5} />
                  <span>Conferencista internacional</span>
                </li>
              </ul>
              <a
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary font-semibold rounded-lg hover:bg-primary/10 smooth-transition"
              >
                Leer Biografía Completa
                <ArrowRight size={18} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="py-12 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-4xl font-semibold">Mis <span className="glow-text">Proyectos</span></h2>
          </div>
          <Carousel images={carruselImages} interval={5000} visibleCount={4} />
        </div>
      </section>

      {/* Latest Courses Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-semibold mb-4">Últimos Cursos</h2>
            <p className="text-muted-foreground">Explora nuestros cursos más recientes y populares</p>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-80 bg-secondary rounded-lg animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {courses.map((course) => (
                <CourseCard key={course.id} {...course} />
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <a
              href="/courses"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:scale-105 smooth-transition"
            >
              Ver Todos los Cursos
              <ArrowRight size={20} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-semibold mb-4">Lo Que Dicen Nuestros Estudiantes</h2>
            <p className="text-muted-foreground">Reseñas reales de personas que transformaron sus carreras</p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-64 bg-card rounded-lg animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 smooth-transition">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <ImageWithFallback
                        src={testimonial.image}
                        alt={testimonial.author}
                        width={50}
                        height={50}
                        className="rounded-full object-cover"
                        fallbackType="testimonial"
                      />
                      <div>
                        <h4 className="font-semibold">{testimonial.author}</h4>
                        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < Math.floor(testimonial.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-border'}
                      />
                    ))}
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed italic">
                    "{testimonial.text}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
