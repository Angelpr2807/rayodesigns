# Sistema de Fallbacks para Imágenes y Contenido

## Descripción General
Se ha implementado un sistema robusto de fallbacks para manejar imágenes, links y contenido que no carguen. Esto evita errores 404 y proporciona una experiencia de usuario consistente.

## Cambios Implementados

### 1. Componente `ImageWithFallback` 
**Archivo:** `/components/ImageWithFallback.tsx`

Nuevo componente que reemplaza `next/image` en toda la aplicación. Características:
- Detecta automáticamente si una imagen falla al cargar
- Mostrará un SVG placeholder genérico según el tipo de imagen
- Tipos disponibles: `course`, `portfolio`, `testimonial`, `instructor`, `generic`
- Cada tipo tiene su propio degradado de color y emoji personalizado

### 2. Imágenes por Defecto Creadas

#### Cursos (`/public/images/courses/`)
- `course-1.png` - Primeros Pasos en Diseño Gráfico (azul)
- `course-2.png` - La Técnica del Visual Magnético (púrpura)
- `course-3.png` - Branding Profesional (rosa)
- `course-4.png` - Web Design Moderno (verde)
- `course-5.png` - Motion Graphics Avanzado (naranja)

#### Portfolio (`/public/images/portfolio/`)
- `project-1.png` - Maverick Studio (púrpura)
- `project-2.png` - EcoPack (verde)
- `project-3.png` - Flow Dashboard (azul)
- `project-4.png` - TechFlow Animation (rosa)
- `project-5.png` - Revista Crea (naranja)

#### Testimonios (`/public/images/testimonials/`)
- `student-1.png` - María García (rosa)
- `student-2.png` - Carlos Rodríguez (azul)
- `student-3.png` - Laura Martínez (púrpura)
- `student-4.png` - Juan Pérez (verde)
- `student-5.png` - Sofia López (naranja)

#### Otros
- `/public/images/instructor.png` - Imagen del instructor (verde)
- `/public/images/hero-bg.png` - Fondo del hero (degradado gris oscuro)

### 3. Componentes Actualizados

Los siguientes componentes ahora usan `ImageWithFallback` en lugar de `next/image`:

**Componentes:**
- `CourseCard.tsx` - Tarjetas de cursos
- `ImageWithFallback.tsx` - Componente de fallback centralizado

**Páginas:**
- `app/page.tsx` - Página principal (hero, cursos y testimonios)
- `app/about/page.tsx` - Página de instructor
- `app/contact/page.tsx` - Página de contacto
- `app/course/[slug]/page.tsx` - Detalle de curso
- `app/portfolio/page.tsx` - Galería de portafolio
- `app/portfolio/[slug]/page.tsx` - Detalle de proyecto

### 4. Configuración Actualizada

**Archivo:** `/public/data/config.json`
- Actualizada referencia de imagen del instructor: `instructor.jpg` → `instructor.png`

## Ventajas del Sistema

✅ **Sin errores 404:** Las imágenes por defecto se muestran automáticamente
✅ **Experiencia consistente:** Cada tipo de contenido tiene su propio estilo
✅ **Fácil de mantener:** Solo un componente centralizado para gestionar fallbacks
✅ **Responsive:** Los SVG se adaptan a cualquier tamaño
✅ **Accesible:** Todos los elementos tienen alt text apropiado
✅ **Rápido:** Los SVG son ligeros y se cargan instantáneamente

## Uso del Componente ImageWithFallback

```jsx
import ImageWithFallback from '@/components/ImageWithFallback';

// Con fill (como Next Image)
<ImageWithFallback
  src={imageUrl}
  alt="Descripción"
  fill
  className="object-cover"
  fallbackType="course" // course | portfolio | testimonial | instructor | generic
/>

// Con ancho y alto específicos
<ImageWithFallback
  src={imageUrl}
  alt="Descripción"
  width={400}
  height={300}
  fallbackType="portfolio"
/>
```

## Próximos Pasos (Opcionales)

Para una experiencia aún mejor, considera:
1. Reemplazar los SVG placeholders con imágenes PNG optimizadas reales
2. Agregar más variedad de imágenes por defecto
3. Implementar optimización de imágenes con WebP
4. Agregar animaciones de carga
5. Implementar lazy loading para imágenes

## Soporte

Si alguna imagen específica falla, el sistema automáticamente:
1. Intenta cargar la imagen original
2. Si falla, muestra el SVG correspondiente al tipo
3. Mantiene el layout consistente sin saltos visuales
