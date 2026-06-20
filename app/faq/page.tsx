'use client';

import { useState, useEffect } from 'react';
import FAQAccordion from '@/components/FAQAccordion';
import { HelpCircle } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/data/faq.json');
        const faqData = await res.json();
        setFaqs(faqData);
      } catch (error) {
        console.error('[v0] Error loading FAQ data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-6">
            <HelpCircle className="text-primary" size={32} strokeWidth={1.5} />
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold mb-4">
            Preguntas <span className="glow-text">Frecuentes</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Encuentra respuestas a las preguntas más comunes sobre nuestros cursos
          </p>
        </div>

        {/* FAQ Content */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-16 bg-secondary rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <FAQAccordion items={faqs} />
        )}

        {/* Additional Help */}
        <div className="mt-20 bg-secondary/30 border border-border rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">¿No encontraste tu respuesta?</h3>
          <p className="text-muted-foreground mb-6">
            Si tienes una pregunta que no aparece aquí, estamos disponibles para ayudarte.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:scale-105 smooth-transition"
          >
            Contáctanos
          </a>
        </div>
      </div>
    </div>
  );
}
