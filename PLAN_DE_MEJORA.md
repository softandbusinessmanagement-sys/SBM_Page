# Plan de Mejora para el Sitio Web de SBM TECH

## Resumen Ejecutivo

Este documento presenta un plan de mejora **específico para el sitio web** de SBM TECH, enfocado en optimizar el SEO, mejorar la experiencia de usuario, aumentar la conversión y la velocidad del sitio. Todo el enfoque está en mejoras técnicas y de contenido que se pueden implementar directamente en la web actual.

---

## 1. Objetivos del Sitio Web

| Objetivo | Métrica Actual | Métrica Objetivo | Plazo |
|----------|----------------|------------------|-------|
| Velocidad de carga (Desktop) | ~3-4s | < 2s | 2 semanas |
| Velocidad de carga (Mobile) | ~5-6s | < 3s | 2 semanas |
| Puntuación Google PageSpeed | ~50-60 | > 85 | 1 mes |
| Tasa de rebote | ~60% | < 45% | 2 meses |
| Tiemp. promedio en sitio | ~1-2 min | > 3 min | 2 meses |
| Páginas por visita | ~2.5 | > 4 | 2 meses |

---

## 2. Optimización Técnica SEO

### 2.1. SEO On-Page (Alta Prioridad)

- [ ] **Estructura de URLs mejorada**
  - Cambiar de hashtags (#services, #projects) a URLs reales:
    - `/servicios/` (listado)
    - `/servicios/saas/` (página individual)
    - `/servicios/software-a-medida/`
    - `/servicios/landing-pages/`
    - `/servicios/automatizacion-ia/`
    - `/proyectos/` (listado)
    - `/proyectos/gmschool/` (página individual)
    - `/sobre-nosotros/`
    - `/contacto/`
    - `/blog/`
  
- [ ] **Keywords estratégicas para SBM TECH**
  - **Principales (enfocado en Huancayo/Perú):**
    - "desarrollo de software Huancayo"
    - "empresa de software Huancayo"
    - "desarrollador de software Perú"
    - "SaaS Perú"
    - "landing pages profesionales"
    - "automatización con IA"
    - "sistemas a medida Huancayo"
    - "desarrollo web Perú"
    - "soluciones de software empresarial"
    - "programador Java Huancayo"
  
- [ ] **Meta Tags optimizados**
  - Cada página debe tener:
    - Title único con keyword principal (max 60 chars)
    - Meta description única (max 160 chars) con CTA
    - Meta keywords relevantes
    - Open Graph tags para sharing en redes
    - Twitter Cards
  
- [ ] **Schema Markup**
  - `LocalBusiness` (para SBM TECH con dirección, teléfono, horario)
  - `Service` (para cada servicio ofrecido)
  - `Person` (para Joseph Eduardo con habilidades y experiencia)
  - `BreadcrumbList` (navegación estructurada)
  - `FAQPage` (si se añade sección de preguntas frecuentes)
  
- [ ] **Encabezados jerárquicos**
  - Asegurar que cada página tenga H1 único
  - Usar H2, H3, H4 de manera jerárquica
  - Incluir keywords en los encabezados

### 2.2. SEO Técnico (Alta Prioridad)

- [ ] **Sitemap XML**
  - Crear sitemap.xml con todas las páginas
  - Incluir prioridades (páginas principales: 1.0, secundarias: 0.8)
  - Enviar a Google Search Console
  
- [ ] **Robots.txt**
  - Crear archivo con reglas claras
  - Permitir indexación de páginas públicas
  - Bloquear páginas administrativas si las hay
  
- [ ] **Estructura de enlaces internos**
  - Añadir enlaces contextuales entre páginas relacionadas
  - Usar anchor text descriptivo (ej: "desarrollo de software SaaS" en lugar de "click aquí")
  - Crear menú de navegación claro y accesible
  
- [ ] **Canonical URLs**
  - Implementar para evitar contenido duplicado
  - Auto-generar para cada página

### 2.3. SEO de Contenido

- [ ] **Contenido único y de valor**
  - Aumentar contenido textual en cada página (mínimo 300-500 palabras)
  - Crear páginas individuales para cada servicio
  - Añadir sección de blog con artículos técnicos
  
- [ ] **Optimización de imágenes**
  - **Comprimir todas las imágenes** (usar formato WebP)
  - **Añadir atributos `alt` descriptivos** con keywords naturales
  - Usar nombres de archivo descriptivos (ej: `desarrollo-software-huancayo.webp`)
  - Implementar lazy loading para todas las imágenes

---

## 3. Optimización de Velocidad

### 3.1. Mejoras de Carga (Alta Prioridad)

- [ ] **Minificación de recursos**
  - Minificar CSS (usar cssnano)
  - Minificar JavaScript (usar terser)
  - Minificar HTML
  
- [ ] **Compresión GZIP/Brotli**
  - Configurar en el servidor o hosting
  
- [ ] **Cache Browser**
  - Configurar headers Cache-Control para assets estáticos
  - Cache de 1 año para CSS, JS, imágenes
  - Cache de 1 hora para HTML

### 3.2. Optimización de Recursos

- [ ] **Reducir tamaño de imágenes**
  - Hero image: < 200KB (actualmente ~85KB - OK)
  - Otras imágenes: < 100KB
  - **Convertir a formato WebP** (mejor compresión que JPG/PNG)
  - Usar srcset para imágenes responsivas
  
- [ ] **Defer y Async para JS**
  - Cargar scripts no críticos con `defer` o `async`
  - Cargar Font Awesome localmente (solo los iconos usados)
  - Reducir número de librerías externas
  
- [ ] **Critical CSS**
  - Inline CSS crítico para above-the-fold content
  - Cargar el resto de CSS asíncronamente

### 3.3. Optimización de Renderizado

- [ ] **Eliminar render-blocking resources**
  - CSS crítico inline
  - JavaScript no crítico deferido
  
- [ ] **Preload recursos clave**
  - Preload de fonts (Inter)
  - Preload de CSS principal
  
- [ ] **Reduce DOM size**
  - Minimizar número de elementos DOM (< 1500 para mobile)
  - Simplificar estructura HTML

---

## 4. Experiencia de Usuario (UX) y Diseño

### 4.1. Navegación y Estructura

- [ ] **Menú de navegación mejorado**
  - Añadir submenú desplegable para "Servicios"
  - Añadir enlace a "Blog" en el menú principal
  - Añadir enlace a "Aplicaciones" (para docx2pdf y futuras)
  - Menú sticky que persiste al hacer scroll
  
- [ ] **Breadcrumbs**
  - Implementar en todas las páginas (Ej: Inicio > Servicios > SaaS)
  - Usar schema markup para breadcrumbs
  
- [ ] **Sticky header**
  - Header fijo en la parte superior al hacer scroll
  - Reducir tamaño en scroll para más espacio

### 4.2. Diseño Visual y Branding

- [ ] **Foto de perfil profesional**
  - ✅ **RUTA CORREGIDA**: Ahora apunta a `assets/images/Foto de perfil.jpg`
  - **Recomendaciones:**
    - Usar formato WebP para reducir tamaño
    - Tamaño ideal: 400x400px (cuadrada)
    - Optimizar con herramientas como TinyPNG
    - Añadir `alt` text más descriptivo: "Joseph Eduardo Huatuco Buendia, Fundador de SBM TECH"
  
- [ ] **Consistencia visual**
  - Crear design system con colores, tipografía, spacing definidos
  - Asegurar coherencia en botones, cards, secciones
  - Usar la misma paleta de colores en todo el sitio

### 4.3. Interacciones y Animaciones (MEJORADO)

#### **Dark/Light Mode Toggle** 🌓
- [ ] **Implementación:**
  - Añadir botón de toggle en header (junto al menú)
  - Usar preferencias del sistema (prefers-color-scheme)
  - Guardar preferencia en localStorage
  - Transición suave entre modos (0.3s)
- [ ] **Diseño:**
  - Icono: 🌙 (oscuro) / ☀️ (claro)
  - Posición: Header (lado derecho)
  - Estilos: Botón minimalista con tooltip
- [ ] **Colores:**
  - Modo oscuro: Actual (negro/azul oscuro)
  - Modo claro: Fondo blanco, texto oscuro, primary color mantenido

#### **Animaciones más Fluidas** ✨
- [ ] **Transiciones suaves:**
  - Botones: `transition: all 0.3s ease` (hover, focus)
  - Cards: `transition: transform 0.3s ease, box-shadow 0.3s ease`
  - Enlaces: `transition: color 0.2s ease`
- [ ] **Scroll animations:**
  - Usar Intersection Observer para animaciones al hacer scroll
  - Efectos: fade-in, slide-up, scale-in
  - Biblias recomendadas: AOS (Animate On Scroll) o GSAP
- [ ] **Micro-interacciones:**
  - Hover en botones: Elevación + sombra + cambio de color
  - Hover en cards: Elevación sutil (2-4px)
  - Click feedback: Efecto ripple o scale down
  - Loading states: Spinners o skeletons

#### **Video Background en Hero Section** 🎥
- [ ] **Implementación:**
  - Usar video HTML5 con fallback a imagen
  - Formato: MP4 (WebM opcional)
  - Tamaño: < 5MB (comprimido)
  - Duración: 10-15 segundos (loop)
- [ ] **Diseño:**
  - Video con opacidad reducida (overlay oscuro)
  - Contenido de texto encima con fondo semi-transparente
  - Botón de pause/play opcional
- [ ] **Fallback:**
  - Imagen estática para mobile (ahorra datos)
  - Imagen estática si video no carga
- [ ] **Recomendación:**
  - Video de desarrollo de software (time-lapse de codificación)
  - O fondo abstracto tecnológico

#### **Testimonios en Video** 🎬
- [ ] **Implementación:**
  - Grabación: 30-60 segundos por testimonio
  - Formato: MP4, relación 16:9 o 1:1
  - Calidad: 720p mínimo
- [ ] **Diseño:**
  - Player personalizado (no YouTube embed)
  - Thumbnail con play button superpuesto
  - Transcripción de texto debajo
- [ ] **Contenido:**
  - Cliente hablando de su experiencia
  - Nombre, empresa y cargo visibles
  - Subtítulos en español
- [ ] **Ejemplo de estructura:**
  ```html
  <div class="video-testimonial">
    <video controls poster="thumbnail.jpg">
      <source src="testimonio-cliente.mp4" type="video/mp4">
    </video>
    <div class="testimonial-info">
      <h4>Nombre del Cliente</h4>
      <p>Empresa - Cargo</p>
    </div>
  </div>
  ```

#### **Calendario de Reunión (Calendly)** 📅
- [ ] **Implementación:**
  - Integración con Calendly (gratis)
  - Opción 1: Embed directo en página de contacto
  - Opción 2: Botón que abre Calendly en popup
  - Opción 3: Enlace a página de Calendly
- [ ] **Diseño:**
  - Botón: "Agendar Reunión" o "Hablar con un experto"
  - Posición: Hero section, contacto, footer
  - Estilo: Botón primary o ghost
- [ ] **Configuración:**
  - Horario: Lun-Dom 8:00-22:00 (como indicas en tu web)
  - Duración: 30 minutos (consulta inicial)
  - Tipos de reunión: Cotización, Consulta, Demo
- [ ] **Beneficios:**
  - Reduce fricción (cliente elige horario)
  - Evita emails de ida y vuelta
  - Confirmación automática por email

### 4.4. Conversión y Engagement (MEJORADO)

#### **Chatbot** 💬
- [ ] **Implementación:**
  - Usar Tawk.to (gratis) o Crisp (freemium)
  - Opción: Chatbot simple con preguntas frecuentes
  - Integración: Botón flotante en esquina inferior
- [ ] **Funcionalidades:**
  - Respuestas automáticas a preguntas comunes:
    - "¿Cuánto cuesta un sistema SaaS?"
    - "¿En qué tecnologías trabajan?"
    - "¿Cuál es el tiempo de entrega?"
  - Opción de transferir a humano
  - Historial de chats
- [ ] **Diseño:**
  - Avatar personalizado (logo SBM TECH)
  - Colores: Primary color (#00E5FF)
  - Mensaje de bienvenida personalizado
- [ ] **Horario:**
  - Chatbot: 24/7
  - Chat humano: Según tu disponibilidad

#### **Pop-ups Inteligentes** 🎯
- [ ] **Tipos de pop-ups:**
  1. **Exit-intent**: Cuando el usuario intenta salir
     - Mensaje: "¿Necesitas ayuda con tu proyecto?"
     - CTA: "Agendar reunión" o "Contactar"
  2. **Scroll-triggered**: Cuando llega al 70% del scroll
     - Mensaje: "Descarga nuestra guía gratuita"
     - CTA: "Descargar ahora"
  3. **Time-delayed**: Después de 30 segundos en el sitio
     - Mensaje: "¿Quieres saber cómo podemos ayudarte?"
     - CTA: "Hablar con un experto"
- [ ] **Diseño:**
  - Tamaño: 400-500px de ancho
  - Posición: Centro o esquina inferior derecha
  - Estilo: Modal con overlay oscuro
  - Cierre fácil: Botón X visible
- [ ] **Frecuencia:**
  - Mostrar solo 1 vez por sesión
  - Cookies para no mostrar a usuarios que ya interactuaron

#### **Barra de Notificaciones** 📢
- [ ] **Implementación:**
  - Barra superior o inferior fija
  - Deslizable desde un lado
- [ ] **Usos:**
  - Promociones: "¡10% de descuento en el primer proyecto!"
  - Novedades: "Nueva herramienta: docx2pdf"
  - Eventos: "Webinar: Automatización con IA"
- [ ] **Diseño:**
  - Colores: Primary color con texto blanco
  - Tamaño: 40-50px de alto
  - Animación: Slide in/out suave
  - Botón de cierre: X en el lado derecho
- [ ] **Ejemplo:**
  ```html
  <div class="notification-bar" style="background: #00E5FF;">
    <span>🎉 Nueva herramienta: Convierte archivos a PDF con docx2pdf</span>
    <a href="https://docx2pdf-jet.vercel.app/" class="btn-notification">Probar ahora</a>
    <button class="close-notification">×</button>
  </div>
  ```

#### **Sistema de Citas Online** 📆
- [ ] **Alternativas a Calendly:**
  - **Calendly** (gratis, fácil)
  - **YouCanBook.me** (más personalizable)
  - **Acuity Scheduling** (para empresas)
  - **Google Calendar + App Script** (solución DIY)
- [ ] **Integración:**
  - Embed en página de contacto
  - Botón en header
  - Enlace en CTA
- [ ] **Tipos de citas:**
  - Consulta inicial (30 min, gratis)
  - Reunión de cotización (60 min)
  - Demo técnica (45 min)
  - Seguimiento (30 min)

#### **Portafolio Interactivo** 🎨
- [ ] **Demostraciones en vivo:**
  - **Para aplicaciones web** (como docx2pdf):
    - Iframe embed directo
    - Video demo (grabación de pantalla)
    - Screenshots interactivos (con tooltip)
  - **Para proyectos desktop** (Taller Buendía):
    - Video demo
    - Screenshots con descripciones
    - Diagrama de arquitectura
- [ ] **Diseño:**
  - Cards con tabs: "Descripción", "Tecnologías", "Demo"
  - Botón "Ver Demo" que abre modal o nueva pestaña
  - Galería de imágenes con lightbox
- [ ] **Ejemplo para docx2pdf:**
  ```html
  <div class="portfolio-item">
    <h3>docx2pdf</h3>
    <p>Convierte archivos y carpetas a PDF...</p>
    <div class="demo-section">
      <iframe 
        src="https://docx2pdf-jet.vercel.app/" 
        frameborder="0" 
        allowfullscreen>
      </iframe>
      <a href="https://docx2pdf-jet.vercel.app/" target="_blank" class="btn">
        Probar aplicación
      </a>
    </div>
  </div>
  ```

---

## 5. Implementación del Plan

### Prioridades de Implementación

#### 🔴 **Alta Prioridad (1-2 semanas)**
1. ✅ **Corregir ruta de foto de perfil** (YA HECHO)
2. [ ] Implementar URLs amigables (sin hashtags)
3. [ ] Crear sitemap.xml y robots.txt
4. [ ] Minificar CSS y JavaScript
5. [ ] Comprimir imágenes a WebP
6. [ ] Añadir schema markup básico

#### 🟡 **Media Prioridad (2-4 semanas)**
1. [ ] Dark/Light mode toggle
2. [ ] Animaciones más fluidas (scroll, hover)
3. [ ] Implementar breadcrumbs
4. [ ] Menú de navegación mejorado (submenús)
5. [ ] Calendario de reunión (Calendly)
6. [ ] Pop-ups inteligentes (1 tipo inicial)

#### 🟢 **Baja Prioridad (1-2 meses)**
1. [ ] Video background en hero section
2. [ ] Testimonios en video (grabación)
3. [ ] Chatbot para el sitio
4. [ ] Barra de notificaciones
5. [ ] Portafolio interactivo con demos
6. [ ] Sistema de citas completo

---

## 6. Recursos y Herramientas Recomendadas

### Para Desarrollo:
- **Google PageSpeed Insights** - Analizar velocidad
- **Lighthouse** (Chrome DevTools) - Auditoría completa
- **WebPageTest** - Testing de rendimiento
- **Screaming Frog** - Crawling del sitio

### Para SEO:
- **Google Search Console** - Monitoreo de indexación
- **Google Analytics 4** - Tracking de tráfico
- **AnswerThePublic** - Investigación de contenido
- **TinyPNG** - Compresión de imágenes

### Para Diseño:
- **Figma** - Diseño de nuevas páginas
- **Canva** - Creación de gráficos
- **Coolors** - Paleta de colores
- **Remove.bg** - Eliminar fondo de imágenes

### Para UX:
- **Hotjar** - Grabación de sesiones de usuarios
- **Google Optimize** - A/B testing
- **UserTesting** - Pruebas con usuarios reales

---

## 7. Métricas de Éxito

### Velocidad:
- [ ] PageSpeed Score: > 85 (Desktop), > 75 (Mobile)
- [ ] Tiempo de carga: < 2s (Desktop), < 3s (Mobile)
- [ ] Largest Contentful Paint: < 2.5s

### SEO:
- [ ] Indexación: 100% de páginas en Google
- [ ] Posiciones: Top 10 para 10+ keywords en 3 meses
- [ ] Backlinks: 20+ en 6 meses
- [ ] Domain Authority: 20+ en 6 meses

### Tráfico:
- [ ] Visitantes mensuales: 500 → 1500 → 3000
- [ ] Páginas por visita: 2.5 → 4+
- [ ] Tasa de rebote: 60% → 45% → 40%

### Conversión:
- [ ] Tasa de conversión: 2% → 5% → 7%
- [ ] Leads mensuales: 10 → 30 → 50

---

## 8. Conclusión

Este plan de mejora está **100% enfocado en el sitio web** de SBM TECH. Las mejoras de **UX/UI** propuestas están organizadas por prioridad y incluyen:

### 🎨 **Mejoras Visuales:**
- Dark/Light mode para mejor experiencia
- Animaciones fluidas para engagement
- Video background para impacto visual

### 🎯 **Mejoras de Conversión:**
- Chatbot para atención 24/7
- Pop-ups inteligentes para captar leads
- Barra de notificaciones para promociones
- Calendario de citas para agendar reuniones
- Portafolio interactivo con demos

### 📱 **Mejoras de UX:**
- Testimonios en video para mayor credibilidad
- Navegación mejorada con breadcrumbs
- Menú sticky para acceso rápido

**Recomendación:** Empieza con las mejoras de **alta prioridad** (corrección de foto, URLs amigables, SEO técnico) y luego avanza con las de **media prioridad** (dark mode, animaciones, Calendly). Las mejoras de **baja prioridad** (video background, testimonios en video) pueden esperarse a que tengas más recursos.

---

*Documento creado: 26 de Octubre de 2024*
*Última actualización: 26 de Octubre de 2024*
*Versión: 3.0*
*Enfoque: 100% Sitio Web de SBM TECH*
*Autor: SBM TECH*
