'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Briefcase, User, HelpCircle, Mail, Sun, Moon, Menu, X } from 'lucide-react';

const platformName = process.env.NEXT_PUBLIC_PLATFORM_NAME || 'DesignHub';

const links = [
  { href: '/', label: 'Inicio', icon: Home },
  { href: '/courses', label: 'Cursos', icon: BookOpen },
  { href: '/portfolio', label: 'Portfolio', icon: Briefcase },
  { href: '/about', label: 'Acerca', icon: User },
  { href: '/faq', label: 'FAQ', icon: HelpCircle },
  { href: '/contact', label: 'Contacto', icon: Mail },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
      setIsLight(true);
      document.documentElement.classList.add('light');
    }
  }, []);

  const toggleTheme = () => {
    const next = !isLight;
    setIsLight(next);
    document.documentElement.classList.toggle('light', next);
    localStorage.setItem('theme', next ? 'light' : 'dark');
  };

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Desktop & Tablet Top Bar */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-card/80 backdrop-blur-lg border-b border-border z-40 hidden md:flex items-center justify-between px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="text-xl font-bold glow-text tracking-tight">{platformName}</div>
        </Link>

        <div className="flex items-center gap-1">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-3 lg:px-4 py-2 rounded-lg text-sm font-medium smooth-transition whitespace-nowrap ${
                  isActive(link.href)
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                }`}
              >
                <Icon size={18} />
                <span className="hidden lg:inline">{link.label}</span>
              </Link>
            );
          })}

          <button
            onClick={toggleTheme}
            className="ml-2 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 smooth-transition"
            aria-label={isLight ? 'Modo oscuro' : 'Modo claro'}
          >
            {isLight ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile: Bottom controls (theme + menu) */}
      <div className="md:hidden fixed bottom-8 right-6 z-50 flex flex-col items-center gap-3">
        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-full bg-card/80 backdrop-blur-sm border border-border text-muted-foreground flex items-center justify-center hover:text-foreground smooth-transition"
          aria-label={isLight ? 'Modo oscuro' : 'Modo claro'}
        >
          {isLight ? <Moon size={16} /> : <Sun size={16} />}
        </button>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 flex items-center justify-center hover:scale-110 active:scale-95 smooth-transition"
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile: Solar System Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
            style={{ width: '340px', height: '340px' }}
          >
            {/* Orbital rings */}
            <div className="absolute rounded-full border border-primary/10 animate-[spin_20s_linear_infinite]" style={{ width: '280px', height: '280px' }} />
            <div className="absolute rounded-full border border-primary/5 animate-[spin_15s_linear_infinite_reverse]" style={{ width: '210px', height: '210px' }} />

            {/* Sun glow */}
            <div className="absolute w-24 h-24 rounded-full bg-primary/20 blur-3xl animate-pulse" />
            <div className="absolute w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/50">
              <div className="w-2 h-2 rounded-full bg-primary-foreground" />
            </div>

            {/* Planets */}
            {links.map((link, index) => {
              const Icon = link.icon;
              const angle = (index * 360) / links.length - 90;
              const rad = (angle * Math.PI) / 180;
              const radius = 120;
              const x = Math.cos(rad) * radius;
              const y = Math.sin(rad) * radius;

              return (
                <div
                  key={link.href}
                  className="absolute flex flex-col items-center"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: 'translate(-50%, -50%)',
                    transition: 'left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    transitionDelay: `${index * 0.08}s`,
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center hover:scale-125 hover:shadow-lg smooth-transition ${
                      isActive(link.href)
                        ? 'bg-primary text-primary-foreground shadow-primary/40'
                        : 'bg-neutral-900/90 border border-neutral-700/50 text-neutral-200 hover:border-primary hover:text-primary'
                    }`}
                  >
                    <Icon size={20} />
                  </Link>
                  <span className="text-xs font-semibold text-neutral-300 mt-1.5 whitespace-nowrap tracking-wide">
                    {link.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
