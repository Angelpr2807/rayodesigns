'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Search, ExternalLink } from 'lucide-react';
import ImageWithFallback from '@/components/ImageWithFallback';
import { slugify } from '@/lib/utils';

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
}

export default function PortfolioPage() {
  const [projects, setProjects] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/data/portfolio.json')
      .then((r) => r.json())
      .then((data: PortfolioItem[]) => setProjects(data))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      return !searchTerm || 
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [projects, searchTerm]);

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl lg:text-6xl font-bold mb-4">
            Mi <span className="glow-text">Portfolio</span>
          </h1>
          <p className="text-foreground text-lg">
            Proyectos seleccionados que muestran mi trabajo en diseño gráfico, branding, UI/UX y más
          </p>
        </div>

        <div className="space-y-6 mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-muted-foreground" size={20} />
            <input
              type="text"
              placeholder="Buscar proyectos por nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:border-primary smooth-transition text-foreground"
            />
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-72 bg-secondary rounded-lg animate-pulse" />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((project) => (
              <Link
                key={project.id}
                href={`/portfolio/${slugify(project.title)}`}
                className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 smooth-transition shadow-sm"
              >
                <div className="relative w-full h-52 overflow-hidden bg-secondary">
                  <ImageWithFallback
                    src={`${project.image || '/images/portfolio-default.png'}`}
                    alt={project.title}
                    fill
                    className="object-cover object-top-left group-hover:scale-110 smooth-transition"
                    fallbackType="portfolio"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 smooth-transition flex items-end p-4">
                    <span className="flex items-center gap-2 text-white text-sm font-semibold">
                      Ver proyecto <ExternalLink size={14} />
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2 group-hover:text-primary smooth-transition">
                    {project.title}
                  </h3>
                  <p className="text-sm text-foreground line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No se encontraron proyectos que coincidan con tu búsqueda.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
