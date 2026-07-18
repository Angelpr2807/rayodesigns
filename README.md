# DesignHub - Plataforma de Cursos de Diseño

Una hermosa landing page de cursos de diseño gráfico construida con Next.js 16, React 19 y Tailwind CSS. Diseñada con un tema oscuro profesional con acentos neon verde brillante.

## ✨ Características Principales

### Páginas Implementadas
- **`/` (HOME)** - Página de inicio con hero, últimos 5 cursos, testimonios y acerca de mí
- **`/courses`** - Panel de cursos con búsqueda dinámica, filtros por categoría y paginación (10 cursos por página)
- **`/about`** - Página con secciones navegables: Biografía, Formación, Experiencia y Perfil como Docente
- **`/faq`** - Preguntas frecuentes con accordion desplegable
- **`/contact`** - Información de contacto, horarios y redes sociales
- **`/404`** - Página de error 404 personalizada con diseño creativo
- **Navbar** - Navegación fija en desktop (sidebar), móvil con menú central desplegable
- **Footer** - Presente en todas las páginas con links rápidos

### Diseño & UX
- Tema oscuro profesional con fondo negro y texto claro
- Color primario: Verde neón brillante (#22ff00) con efecto glow
- Animaciones suaves de hover en tarjetas de cursos (escala + sombra)
- Responsive design: Mobile-first con navbar adaptativo
- Menú móvil centralizado y animado (similar al GIF que proporcionaste)
- Tarjetas de cursos con información de nivel, rating y precio

### Datos Locales
Todos los datos se cargan desde archivos JSON en `/public/data/`:
- `courses.json` - 20 cursos de ejemplo
- `categories.json` - 8 categorías de diseño
- `testimonials.json` - 5 testimonios de estudiantes
- `faq.json` - 8 preguntas frecuentes
- `instructor.json` - Información del instructor (educación, experiencia, docencia)
- `config.json` - Configuración general (nombre plataforma, contacto, redes)

### Configuración Personalizable
La plataforma usa variables de entorno para personalización:
- `NEXT_PUBLIC_PLATFORM_NAME=DesignHub` - Nombre de la plataforma
- `NEXT_PUBLIC_PLATFORM_DESCRIPTION` - Descripción de la plataforma

Puedes cambiar estos valores en `.env.local` y se actualizarán automáticamente en toda la aplicación.

## 🚀 Instalación & Uso

### Requisitos
- Node.js 18+ y pnpm (o npm/yarn)

### Setup Inicial
```bash
# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev

# Abrir http://localhost:3000 en el navegador
```

El servidor estará disponible en `http://localhost:3000`

### Compilación para Producción
```bash
# Compilar
pnpm build

# Iniciar servidor de producción
pnpm start
```

## 📁 Estructura del Proyecto

```
/vercel/share/v0-project/
├── app/
│   ├── layout.tsx           # Layout raíz con Navbar y Footer
│   ├── page.tsx             # Página HOME
│   ├── globals.css          # Estilos globales (tema oscuro + neón)
│   ├── courses/page.tsx     # Página de CURSOS con búsqueda y filtros
│   ├── about/page.tsx       # Página ABOUT con secciones navegables
│   ├── faq/page.tsx         # Página FAQ con accordion
│   ├── contact/page.tsx     # Página CONTACT
│   └── not-found.tsx        # Página 404
├── components/
│   ├── Navbar.tsx           # Navbar fijo con menú móvil centralizado
│   ├── Footer.tsx           # Footer con links rápidos
│   ├── CourseCard.tsx       # Tarjeta de curso reutilizable
│   └── FAQAccordion.tsx     # Accordion para FAQ
├── public/
│   ├── data/
│   │   ├── courses.json
│   │   ├── categories.json
│   │   ├── testimonials.json
│   │   ├── faq.json
│   │   ├── instructor.json
│   │   └── config.json
│   └── images/
│       ├── hero-bg.png
│       ├── instructor.png
│       ├── courses/course-1.png ... course-20.png
│       └── testimonials/student-1.png ... student-5.png
├── .env.local               # Variables de entorno
├── tailwind.config.ts       # Configuración Tailwind
├── tsconfig.json            # Configuración TypeScript
└── package.json             # Dependencias del proyecto
```

## 🎨 Sistema de Diseño

### Colores (Tema Oscuro + Neón)
- **Fondo primario**: #0D0D0D (negro oscuro)
- **Tarjetas**: #1A1A1A (gris oscuro)
- **Texto principal**: #F2F2F2 (blanco gris)
- **Texto secundario**: #A6A6A6 (gris claro)
- **Color primario**: #22FF00 (verde neón brillante)
- **Acentos**: #8D3DF5 (púrpura vibrante)
- **Bordes**: #262626 (gris muy oscuro)

### Animaciones
- Hover lift: Scale 105% + sombra proyectada (smooth transition 300ms)
- Fade in: Animaciones suaves al entrar en pantalla
- Glow text: Efecto luminoso en textos principales

### Tipografía
- Fuente sans-serif: Geist (moderna y limpia)
- Tamaños: H1 (56px), H2 (36px), H3 (24px), Body (16px)

## 💻 Tecnologías Usadas

- **Framework**: Next.js 16 (App Router)
- **React**: 19.2.4
- **Styling**: Tailwind CSS 3.4
- **Icons**: Lucide React
- **Data**: JSON estáticos en `/public/data/`
- **TypeScript**: Para type safety
- **Lenguaje**: Español

## 📱 Responsive Design

- **Desktop** (≥1024px): Navbar fijo lateral (260px), contenido con margen izquierdo
- **Tablet** (768px-1023px): Navbar móvil superior, menú centralizado al hacer clic
- **Mobile** (<768px): Navbar superior compacta, menú móvil desplegable central

## 🔧 Personalización

### Cambiar el Nombre de la Plataforma
Edita `.env.local`:
```
NEXT_PUBLIC_PLATFORM_NAME=Mi Plataforma
```

### Agregar Nuevos Cursos
Edita `/public/data/courses.json` y agrega un objeto con la estructura:
```json
{
  "id": 21,
  "title": "Nuevo Curso",
  "category": "graphic-design",
  "description": "Descripción del curso",
  "image": "/images/courses/course-21.png",
  "price": 29.99,
  "duration": "4 semanas",
  "level": "Principiante",
  "students": 100,
  "rating": 4.9
}
```

### Agregar Nuevas Categorías
Edita `/public/data/categories.json`:
```json
{
  "id": "new-category",
  "name": "Nueva Categoría",
  "color": "#FF5733"
}
```

### Modificar Preguntas FAQ
Edita `/public/data/faq.json` y sigue la estructura de los items existentes.

### Actualizar Información del Instructor
Edita `/public/data/instructor.json` con tu información personal y profesional.

## ⚡ Performance

- **Server Components**: Usadas donde es posible para reducir JS enviado al cliente
- **Image Optimization**: Imágenes Next.js con lazy loading
- **CSS**: Tailwind CSS purificado (solo clases usadas)
- **Code Splitting**: Next.js maneja automáticamente el code splitting por ruta

## 🔐 SEO & Metadata

- Meta tags dinámicos basados en la plataforma
- Descripciones en HTML semántico
- Open Graph ready (fácil de agregar)
- Lenguaje español (`lang="es"`)

## 📝 Notas Importantes

1. **Datos Estáticos**: Todos los datos se cargan desde JSON. Para agregar persistencia real (base de datos), necesitarías implementar una API.

2. **Búsqueda en Tiempo Real**: La búsqueda y filtros en `/courses` se hacen del lado del cliente usando Array.filter() - excelente para aplicaciones pequeñas a medianas.

3. **Imágenes Generadas**: Las imágenes de cursos, instructor y testimonios fueron generadas automáticamente. Reemplázalas con tus propias imágenes en `/public/images/`.

4. **Estático vs Dinámico**: Esta app es completamente estática (sin backend). Si necesitas funcionalidad dinámica (compra de cursos, auth, etc.), necesitarás agregar un backend.

5. **Despliegue**: Puedes deployar directamente a Vercel con `vercel deploy` o compilar y servir con cualquier host Node.js.

## 🚀 Próximos Pasos Opcionales

Para mejorar aún más la plataforma, considera:

- Agregar carrito de compras
- Sistema de autenticación (login/registro)
- Base de datos para persistencia de datos
- Sistema de pagos (Stripe)
- Comentarios y ratings de usuarios
- Sección de blog
- Sistema de notificaciones por email
- Dashboards para instructores

## 📧 Contacto & Soporte

Para cambiar la información de contacto, edita `/public/data/config.json`.

---

**Construido con ❤️ usando v0 by Vercel**

¡Disfruta tu plataforma de cursos! 🎨
