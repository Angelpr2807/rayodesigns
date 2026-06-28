'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Search, Filter, Package } from 'lucide-react';
import CourseCard from '@/components/CourseCard';

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

interface Category {
  id: string;
  name: string;
  color: string;
}

const COURSES_PER_PAGE = 10;
const materialsUrl = process.env.NEXT_PUBLIC_MATERIALS_URL || '';

export default function CoursesPage() {
  const params = useParams();
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const currentPage = params.slug ? parseInt(params.slug[0], 10) : 1;

  useEffect(() => {
    async function loadData() {
      try {
        const [coursesRes, categoriesRes] = await Promise.all([
          fetch('/data/courses.json'),
          fetch('/data/categories.json'),
        ]);
        const coursesData = await coursesRes.json();
        const categoriesData = await categoriesRes.json();

        setCourses(coursesData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('[v0] Error loading data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || course.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [courses, searchTerm, selectedCategory]);

  const totalPages = Math.ceil(filteredCourses.length / COURSES_PER_PAGE);
  const safePage = Math.min(currentPage, Math.max(totalPages, 1));
  const paginatedCourses = useMemo(() => {
    const start = (safePage - 1) * COURSES_PER_PAGE;
    return filteredCourses.slice(start, start + COURSES_PER_PAGE);
  }, [filteredCourses, safePage]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    if (currentPage !== 1) router.push('/courses');
  };

  const handleCategoryChange = (cat: string | null) => {
    setSelectedCategory(cat);
    if (currentPage !== 1) router.push('/courses');
  };

  const goToPage = (page: number) => {
    if (page === 1) {
      router.push('/courses');
    } else {
      router.push(`/courses/${page}`);
    }
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Todos Nuestros <span className="glow-text">Cursos</span>
          </h1>
          <p className="text-foreground text-lg">
            Explora más de 50 cursos en diseño gráfico, web design, branding y más
          </p>
        </div>

        {/* Search and Filters */}
        <div className="space-y-6 mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-muted-foreground" size={20} />
            <input
              type="text"
              placeholder="Buscar cursos por nombre o descripción..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:border-primary smooth-transition text-foreground"
            />
          </div>

          {/* Materials Banner */}
          {materialsUrl && (
            <a
              href={materialsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full p-4 rounded-lg border border-pink-400/30 bg-pink-500/55 hover:border-pink-400/60 hover:bg-pink-500/20 smooth-transition group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-pink-500/20 flex items-center justify-center group-hover:scale-110 smooth-transition">
                  <img src="/images/socials/patreon.svg" alt="Patreon" className="w-8 h-8" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">Materiales de Estudio</p>
                  <p className="text-xs text-foreground">Descarga guías, ejercicios y recursos complementarios, adquierelos en Patreon.</p>
                </div>
                <div className="hidden sm:flex items-center gap-1 text-xs font-medium text-pink-400 opacity-0 group-hover:opacity-100 smooth-transition">
                  Abrir <span className="text-lg leading-none">→</span>
                </div>
              </div>
            </a>
          )}

          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-semibold">
              <Filter size={18} className="text-primary" />
              Filtrar por Categoría
            </label>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => handleCategoryChange(null)}
                className={`px-4 py-2 rounded-lg font-medium smooth-transition ${selectedCategory === null
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border border-border text-foreground hover:border-primary'
                  }`}
              >
                Todas
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium smooth-transition ${selectedCategory === category.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card border border-border text-foreground hover:border-primary'
                    }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="text-sm text-muted-foreground pt-4">
            Mostrando {paginatedCourses.length} de {filteredCourses.length} cursos
          </div>
        </div>

        {/* Courses Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="h-80 bg-secondary rounded-lg animate-pulse" />
            ))}
          </div>
        ) : paginatedCourses.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {paginatedCourses.map((course) => (
                <CourseCard key={course.id} {...course} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                <button
                  onClick={() => goToPage(Math.max(1, safePage - 1))}
                  disabled={safePage === 1}
                  className="px-4 py-2 bg-card border border-border rounded-lg hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed smooth-transition"
                >
                  Anterior
                </button>

                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`px-3 py-2 rounded-lg font-medium smooth-transition ${safePage === page
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-card border border-border text-foreground hover:border-primary'
                        }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => goToPage(Math.min(totalPages, safePage + 1))}
                  disabled={safePage === totalPages}
                  className="px-4 py-2 bg-card border border-border rounded-lg hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed smooth-transition"
                >
                  Siguiente
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No se encontraron cursos que coincidan con tu búsqueda.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
