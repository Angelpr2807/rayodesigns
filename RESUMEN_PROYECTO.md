# 🎨 DesignHub - Plataforma de Cursos de Diseño

## ✅ Proyecto Completado

Tu plataforma de cursos de diseño gráfico está **100% funcional** con todas las características solicitadas.

---

## 📋 Características Implementadas

### ✨ Página HOME (`/`)
- **Hero Section** con imagen de fondo, botones de CTA y estadísticas
- **Sección About Me** con descripción breve del instructor
- **Últimos 5 Cursos** con animación hover (zoom + sombra)
- **Testimonios de Estudiantes** con 5 reseñas y ratings
- Footer presente en todas las páginas

### 📚 Página de CURSOS (`/courses`)
- **Búsqueda dinámica** en tiempo real por nombre/descripción
- **Filtrado por categorías**: Diseño Gráfico, Diseño Web, UI/UX, Branding, Diseño 3D, Animación, Fotografía, Ilustración
- **Paginación** de 10 cursos por página (20 cursos totales)
- **Contador** "Mostrando X de Y cursos"
- Tarjetas con hover lift effect (escala + sombra)

### 👤 Página ABOUT (`/about`)
- **Foto del instructor** con descripción profesional
- **Navegación entre secciones**: Biografía, Formación, Experiencia, Docencia
- Cambio dinámico de contenido al hacer clic en botones
- **Sección Formación Profesional** con lista de educación y certificaciones
- **Experiencia laboral** con detalles de proyectos
- **Perfil como Docente** con información de metodología

### ❓ Página FAQ (`/faq`)
- **Accordion interactivo** con 8 preguntas frecuentes
- Abre/cierra suavemente con animaciones
- Incluye sección "¿No encontraste tu respuesta?" con CTA a contacto

### 📞 Página de CONTACTO (`/contact`)
- **Horarios de atención**: Lunes a Viernes 9:00 AM - 6:00 PM
- **Email de contacto**: contacto@designhub.com
- **Redes sociales**: Instagram, LinkedIn, Twitter, YouTube
- **Foto del instructor** en el lado derecho
- **Sección de Recursos Útiles** con links rápidos

### 🎨 Diseño Visual
- **Tema oscuro elegante** con verde neón (#22ff00) como color primario
- **Navbar fijo** en desktop con logo y menú de navegación
- **Mobile menu** desplegable con botón central (como en tu referencia)
- **Animaciones suaves** en todos los componentes
- **Responsive design** totalmente funcional en mobile, tablet y desktop

### 🚫 Página 404
- Página personalizada para rutas no encontradas
- Incluye link para volver a inicio
- Diseño acorde a la temática del sitio

---

## 📂 Estructura del Proyecto

```
/app
  ├── page.tsx              # HOME
  ├── layout.tsx            # Layout principal con Navbar y Footer
  ├── globals.css           # Estilos globales (tema oscuro + verde neón)
  ├── not-found.tsx         # Página 404
  ├── courses/
  │   └── page.tsx         # Página de cursos con búsqueda y filtros
  ├── about/
  │   └── page.tsx         # Página About con secciones navegables
  ├── faq/
  │   └── page.tsx         # FAQ con accordion
  └── contact/
      └── page.tsx         # Página de contacto

/components
  ├── Navbar.tsx           # Navbar con mobile menu desplegable
  ├── Footer.tsx           # Footer reutilizable
  ├── CourseCard.tsx       # Tarjeta de curso con hover effect
  └── FAQAccordion.tsx     # Componente accordion

/public
  ├── data/                # Datos en JSON
  │   ├── config.json       # Configuración (nombre plataforma)
  │   ├── courses.json      # 20 cursos con detalles
  │   ├── categories.json   # 8 categorías
  │   ├── testimonials.json # 5 testimonios
  │   ├── faq.json         # 8 preguntas FAQ
  │   └── instructor.json  # Datos del instructor
  └── images/
      ├── instructor.png
      ├── hero-bg.png
      └── courses/
          ├── course-1.png a course-20.png
      └── testimonials/
          ├── student-1.png a student-5.png
```

---

## 🔧 Variables de Entorno

El nombre de la plataforma está configurable en `.env.local`:

```env
NEXT_PUBLIC_PLATFORM_NAME=DesignHub
```

Todos los textos que refieren al nombre de la plataforma la utilizan desde esta variable.

---

## 🎯 Funcionalidades Verificadas

✅ Búsqueda de cursos en tiempo real
✅ Filtrado por categoría (botones con estado activo)
✅ Paginación de 10 cursos por página
✅ Navegación entre secciones en About
✅ Accordion FAQ abierto/cerrado
✅ Animaciones hover en tarjetas (escala + sombra)
✅ Mobile menu desplegable
✅ Navbar y footer en todas las rutas
✅ Página 404 personalizada
✅ Responsive en mobile (375px) y desktop (1920px)
✅ Imágenes generadas para todos los cursos y testimonios

---

## 🚀 Cómo Usar

### Iniciar el servidor de desarrollo:
```bash
cd /vercel/share/v0-project
pnpm dev
```

El sitio estará disponible en `http://localhost:3000`

### Personalizar el nombre de la plataforma:
1. Abre `.env.local`
2. Cambia `NEXT_PUBLIC_PLATFORM_NAME` al nombre deseado
3. Reinicia el servidor dev

### Actualizar datos:
Todos los datos están en `/public/data/` como archivos JSON. Puedes editar:
- `courses.json` - Agregar/editar cursos
- `categories.json` - Cambiar categorías
- `testimonials.json` - Agregar reseñas
- `faq.json` - Agregar preguntas
- `instructor.json` - Actualizar información del instructor

---

## 🎨 Paleta de Colores

- **Primary (Verde Neón)**: `#22ff00`
- **Background (Negro muy oscuro)**: `#0d0d0d`
- **Card (Gris oscuro)**: `#1a1a1a`
- **Text (Casi blanco)**: `#f0f0f0`
- **Muted (Gris medio)**: `#666666`

---

## 📱 Responsive Design

El sitio es **totalmente responsive**:
- **Mobile** (375px): Menu desplegable central, una columna
- **Tablet** (768px): Dos columnas en cursos
- **Desktop** (1024px+): Navbar fijo, múltiples columnas, layout completo

---

## 🎬 Próximos Pasos (Opcional)

Si deseas expandir el proyecto:
1. Agregar carrito de compras
2. Integrar pasarela de pagos
3. Agregar sistema de autenticación de usuarios
4. Crear panel de usuario con progreso de cursos
5. Agregar certificados digitales
6. Sistema de comentarios en cursos

---

## 📝 Notas Finales

- El sitio está completamente **estático** con datos locales en JSON
- **Sin backend requerido** - solo archivos estáticos
- **Totalmente funcional** - todas las características solicitadas están implementadas y verificadas
- **Código limpio y modular** - fácil de mantener y expandir
- **Tema oscuro elegante** con verde neón como especificaste

¡Tu plataforma está lista para usar! 🚀
