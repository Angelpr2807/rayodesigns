'use client';

import { useState, useEffect } from 'react';
import { Mail, Clock, Link } from 'lucide-react';
import ImageWithFallback from '@/components/ImageWithFallback';

interface Contact {
  hours: string;
  timezone: string;
  social: Array<{
    name: string;
    url: string;
    icon: string;
  }>;
}

const iconMap: Record<string, React.ReactNode> = {
  instagram: <img src="/images/socials/instagram.svg" alt="Instagram" className="w-6 h-6" />,
  facebook: <img src="/images/socials/facebook.svg" alt="Facebook" className="w-6 h-6" />,
  linkedin: <img src="/images/socials/linkedin.svg" alt="LinkedIn" className="w-6 h-6" />,
  tiktok: <img src="/images/socials/tiktok.svg" alt="TikTok" className="w-6 h-6" />,
};

export default function ContactPage() {
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/data/config.json');
        const config = await res.json();
        setContact(config.contact);
      } catch (error) {
        console.error('[v0] Error loading contact data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-4">
            Ponte en <span className="glow-text">Contacto</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Estoy aquí para responder tus preguntas y ayudarte en tu camino hacia el diseño
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Left: Contact Info */}
          <div className="space-y-8">
            {/* Hours */}
            {contact && (
              <>
                <div className="bg-card border border-border rounded-xl p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <Clock className="text-primary mt-1 flex-shrink-0" size={28} />
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Horarios de Atención</h3>
                      <p className="text-muted-foreground mb-2">{contact.hours}</p>
                      <p className="text-sm text-primary font-medium">Zona horaria: {contact.timezone}</p>
                    </div>
                  </div>
                </div>

                {/* Contact Methods */}
                <div className="bg-card border border-border rounded-xl p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <Mail className="text-primary mt-1 flex-shrink-0" size={28} />
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Email</h3>
                      <a
                        href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'correo no disponible'}`}
                        className="text-primary hover:underline"
                      >
                        {process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'Correo no disponible'}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="bg-card border border-border rounded-xl p-8">
                  <h3 className="text-xl font-semibold mb-6">Sígueme en Redes Sociales</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {contact.social.map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-4 bg-secondary border border-border rounded-lg hover:border-primary hover:bg-primary/5 smooth-transition flex items-center gap-3"
                      >
                        <span className="text-primary flex items-center justify-center">{iconMap[social.icon] || <Link size={24} />}</span>
                        <span className="font-medium">{social.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Right: Image */}
          <div className="flex items-center justify-center">
            <div className="relative w-full h-full min-h-96 lg:h-auto">
              <ImageWithFallback
                src="/images/instructor.png"
                alt="Instructor"
                fill
                className="object-cover rounded-xl"
                fallbackType="instructor"
              />
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-secondary/30 border border-border rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Recursos Útiles</h3>
          <p className="text-muted-foreground mb-6">Explora más de nuestros contenidos</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/courses"
              className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:scale-105 smooth-transition"
            >
              Ver Cursos
            </a>
            <a
              href="/faq"
              className="px-6 py-3 border border-primary text-primary font-semibold rounded-lg hover:bg-primary/10 smooth-transition"
            >
              Preguntas Frecuentes
            </a>
            <a
              href="/about"
              className="px-6 py-3 border border-primary text-primary font-semibold rounded-lg hover:bg-primary/10 smooth-transition"
            >
              Acerca de Mí
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
