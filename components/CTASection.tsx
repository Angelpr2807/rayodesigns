'use client';

import { Zap, Headphones } from 'lucide-react';

const platformName = process.env.NEXT_PUBLIC_PLATFORM_NAME || 'RayoDesigns';
const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+51942284364';

const buttons = [
  {
    label: 'UNIRME AL TEAM RAYO!',
    href: 'https://chat.whatsapp.com/LpAiO5yEatP5CMPVzBzSQG',
    icon: <Zap size={24} className="text-yellow-300 fill-yellow-300" />,
  },
  {
    label: 'DESCARGAR EL CONTENIDO EXCLUSIVO',
    href: 'https://www.patreon.com/c/RayoStudio',
    icon: <img src="/images/socials/patreon.svg" alt="Patreon" className="w-6 h-6" />,
  },
  {
    label: 'HABLAR CON UNA ASESORA EN VIVO',
    href: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hola, quisiera una asesoria sobre los servicios y cursos de ' + platformName + '.')}`,
    icon: <Headphones size={24} className="text-white" />,
  },
];

export default function CTASection() {
  return (
    <section className="py-12 px-4" style={{ backgroundColor: 'hsl(var(--primary))' }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4">
        {buttons.map((btn) => (
          <a
            key={btn.label}
            href={btn.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center flex-col justify-center gap-4 px-6 py-5 bg-black backdrop-blur-sm border border-black/20 rounded-xl text-white font-bold text-sm md:text-base text-center hover:bg-black/40 hover:scale-[1.02] smooth-transition"
          >
            <span className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-white/10">
              {btn.icon}
            </span>
            {btn.label}
          </a>
        ))}
      </div>
    </section>
  );
}
