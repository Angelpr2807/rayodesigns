'use client';

import { ArrowRight, Star } from 'lucide-react';
import CourseCard from '@/components/CourseCard';
import ImageWithFallback from '@/components/ImageWithFallback';
import { useState, useEffect } from 'react';

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
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolue inset-0 z-0">
          <ImageWithFallback
            src="/images/hero.png"
            alt="Hero Background"
            fill
            className="object-cover object-top-right lg:object-center"
            priority
            fallbackType="generic"
          />
          <div className="absolute inset-0 bg-black/0" />
        </div>

        <div className="max-w-4xl z-2 mx-auto px-4 py-20 lg:py-32 text-center lg:text-left">
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-black text-white leading-tight">
                Bienvenido a <span className="text-primary">{platformName}</span>
              </h1>
              <p className="text-xl text-white max-w-2xl lg:mx-0 mx-auto">
                Aprende diseño gráfico, web design, branding y mucho más. Transformamos tu pasión en habilidades.
              </p>
            </div>

            <div className="flex gap-4 justify-center lg:justify-start">
              <a
                href="/courses"
                className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:scale-105 smooth-transition"
              >
                Explorar Cursos
                <ArrowRight size={20} />
              </a>
              <a
                href="/about"
                className="inline-flex items-center gap-2 px-8 py-3 border border-primary text-white font-semibold rounded-lg hover:bg-primary/10 smooth-transition"
              >
                Conocer Más
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 max-w-md lg:mx-0 mx-auto">
              <div>
                <div className="text-3xl font-bold text-primary">25K+</div>
                <div className="text-sm text-white">Estudiantes</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="text-sm text-white">Cursos</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">95%</div>
                <div className="text-sm text-white">Satisfacción</div>
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
                src="/images/instructor.png"
                alt="Instructor"
                fill
                className="object-cover rounded-lg"
                fallbackType="instructor"
              />
            </div>
            <div className="space-y-6">
              <div>
                <h2 className="text-4xl font-bold mb-4">Acerca de Mí</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Soy comunicador social, diseñador gráfico y director de arte con más de 15 años trabajando con grandes empresas.
                </p>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Star size={20} className="text-primary mt-1 flex-shrink-0" />
                  <span>Más de 25,000 estudiantes impactados</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star size={20} className="text-primary mt-1 flex-shrink-0" />
                  <span>95% de satisfacción de estudiantes</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star size={20} className="text-primary mt-1 flex-shrink-0" />
                  <span>Ponente en conferencias internacionales</span>
                </li>
              </ul>
              <a
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary font-semibold rounded-lg hover:bg-primary/10 smooth-transition"
              >
                Leer Biografía Completa
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Courses Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-4">Últimos Cursos</h2>
            <p className="text-muted-foreground">Explora nuestros cursos más recientes y populares</p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-80 bg-secondary rounded-lg animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <ArrowRight size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-4">Lo Que Dicen Nuestros Estudiantes</h2>
            <p className="text-muted-foreground">Reseñas reales de personas que transformaron sus carreras</p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-64 bg-card rounded-lg animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                        className={i < Math.floor(testimonial.rating) ? 'text-primary fill-primary' : 'text-border'}
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
