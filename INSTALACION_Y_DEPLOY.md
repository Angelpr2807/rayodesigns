## 🎯 Guía Rápida de Instalación y Deploy

### Instalación Local

1. **Descarga el proyecto**:
   - Haz clic en los tres puntos arriba a la derecha en v0
   - Selecciona "Download ZIP"

2. **Extrae el archivo**:
   ```bash
   unzip v0-project.zip
   cd v0-project
   ```

3. **Instala dependencias**:
   ```bash
   pnpm install
   ```

4. **Inicia el servidor**:
   ```bash
   pnpm dev
   ```

5. **Abre en tu navegador**:
   ```
   http://localhost:3000
   ```

---

### Deploy a Vercel (Gratis)

#### Opción 1: Desde GitHub
1. Sube tu repositorio a GitHub
2. Entra a [vercel.com](https://vercel.com)
3. Haz clic en "Add New → Project"
4. Importa el repositorio de GitHub
5. Haz clic en "Deploy"
6. ¡Listo! Tu sitio estará en vivo en minutos

#### Opción 2: Vercel CLI
```bash
# Instala Vercel CLI
npm i -g vercel

# Desde la carpeta del proyecto
vercel

# Sigue las instrucciones en pantalla
```

---

### Personalización

#### Cambiar el nombre de la plataforma
1. Abre `.env.local`
2. Edita: `NEXT_PUBLIC_PLATFORM_NAME=TuNombreAqui`
3. Reinicia el servidor

#### Agregar más cursos
1. Abre `/public/data/courses.json`
2. Agrega un nuevo objeto de curso:
   ```json
   {
     "id": 21,
     "title": "Tu Nuevo Curso",
     "category": "Diseño Gráfico",
     "description": "Descripción del curso",
     "image": "/images/courses/course-21.png",
     "price": 49.99,
     "duration": "12 horas",
     "level": "Intermedio",
     "students": 150,
     "rating": 4.9
   }
   ```
3. Guarda y recarga la página

#### Editar información del instructor
- Abre `/public/data/instructor.json`
- Cambia nombre, descripción, formación, experiencia

#### Agregar más testimonios
- Abre `/public/data/testimonials.json`
- Agrega nuevas reseñas con el formato existente

---

### Troubleshooting

**El sitio no carga:**
```bash
# Limpia el cache y reinstala
rm -rf node_modules
pnpm install
pnpm dev
```

**Error de imagen no encontrada:**
- Verifica que la ruta en `/public/images/` sea correcta
- Asegúrate de que el nombre del archivo coincida

**Mobile menu no funciona:**
- Actualiza la página (F5)
- Comprueba que estés en viewport móvil (< 1024px)

---

### Características del Stack

- ✅ **Next.js 16** - Framework React moderno
- ✅ **Tailwind CSS v4** - Estilos optimizados
- ✅ **TypeScript** - Código seguro y tipado
- ✅ **Lucide Icons** - Iconos SVG lindos
- ✅ **Datos JSON** - Sin necesidad de backend

---

### Soporte

Si tienes preguntas o necesitas ayuda:
1. Revisa el archivo `README_ES.md`
2. Consulta la documentación de [Next.js](https://nextjs.org)
3. Revisa [Tailwind CSS docs](https://tailwindcss.com)

¡Disfruta tu plataforma! 🚀
