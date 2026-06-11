'use client';

const platformName = process.env.NEXT_PUBLIC_PLATFORM_NAME || 'DesignHub';
const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contacto@designhub.com';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold glow-text mb-4">{platformName}</h3>
            <p className="text-sm text-muted-foreground">
              La mejor plataforma para aprender diseño gráfico y desarrollar tus habilidades creativas.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/" className="hover:text-primary smooth-transition">Inicio</a></li>
              <li><a href="/courses" className="hover:text-primary smooth-transition">Cursos</a></li>
              <li><a href="/portfolio" className="hover:text-primary smooth-transition">Portfolio</a></li>
              <li><a href="/about" className="hover:text-primary smooth-transition">Acerca de</a></li>
              <li><a href="/faq" className="hover:text-primary smooth-transition">FAQ</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/contact" className="hover:text-primary smooth-transition">Contacto</a></li>
              <li><a href={`mailto:${contactEmail}`} className="hover:text-primary smooth-transition">Email</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {currentYear} {platformName}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
