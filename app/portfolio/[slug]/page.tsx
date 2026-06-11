'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import ImageWithFallback from '@/components/ImageWithFallback';

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  tags: string[];
  category: string;
  url: string;
  slug: string;
}

export default function PortfolioDetail() {
  const params = useParams();
  const [project, setProject] = useState<PortfolioItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/portfolio.json')
      .then((r) => r.json())
      .then((data: PortfolioItem[]) => {
        const found = data.find((p) => p.slug === params.slug);
        setProject(found || null);
      })
      .catch(() => setProject(null))
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

  if (!project) {
    notFound();
    return null;
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground smooth-transition mb-8"
        >
          <ArrowLeft size={18} />
          Volver al Portfolio
        </Link>

        <div className="relative w-full h-72 lg:h-96 rounded-xl overflow-hidden mb-8 bg-secondary">
          <ImageWithFallback
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
            fallbackType="portfolio"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <h1 className="text-3xl lg:text-4xl font-bold text-white">
              {project.title}
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-3">Descripción del Proyecto</h2>
              <p className="text-muted-foreground leading-relaxed">{project.fullDescription}</p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 h-fit sticky top-24 space-y-6">
            <div>
              <h3 className="font-semibold mb-3">Etiquetas</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-2.5 py-1 rounded bg-primary/10 text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-whatsapp text-white font-semibold rounded-lg hover:scale-105 smooth-transition"
            >
              <ExternalLink size={18} />
              Visitar Proyecto
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
