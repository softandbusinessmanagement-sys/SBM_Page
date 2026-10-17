# SBM TECH - Professional Landing Page

## 📁 Estructura del Proyecto

```
SBM_Tech/
├── index.html                 # Página principal
├── README.md                 # Documentación
│
├── assets/
│   ├── css/
│   │   ├── styles.css        # Estilos principales
│   │   ├── animations.css    # Animaciones
│   │   └── components.css     # Componentes reutilizables
│   │
│   ├── js/
│   │   ├── main.js           # JavaScript principal
│   │   ├── typing.js         # Efecto de escritura
│   │   ├── counter.js         # Animación de contadores
│   │   └── form.js           # Manejo de formularios
│   │
│   └── images/               # Imágenes del proyecto
│
└── components/               # Componentes HTML reutilizables
```

## 🚀 Características

### Diseño Profesional
- ✅ **Glassmorphism**: Efectos de vidrio esmerilado en tarjetas
- ✅ **Animaciones suaves**: Transiciones y scroll animations
- ✅ **Responsive Design**: 100% compatible con móviles
- ✅ **Diseño moderno**: Paleta de colores profesional
- ✅ **UI/UX optimizado**: Experiencia de usuario mejorada

### Funcionalidades
- ✅ **Navegación fluida**: Menú móvil y desktop
- ✅ **Efecto typing**: Texto animado en el hero
- ✅ **Contadores animados**: Estadísticas con animación
- ✅ **Filtro de proyectos**: Categorización dinámica
- ✅ **Formulario funcional**: Validación y envío
- ✅ **Scroll suave**: Navegación fluida
- ✅ **Loading screen**: Pantalla de carga profesional

### Secciones Incluidas
1. **Hero**: Presentación con llamado a la acción
2. **Servicios**: 4 servicios principales con detalles
3. **Proyectos**: Portfolio con filtro de categorías
4. **Sobre Nosotros**: Información profesional
5. **Contacto**: Formulario y datos de contacto
6. **Footer**: Información adicional y redes sociales

## 🛠️ Tecnologías Utilizadas

- **HTML5** (Estructura semántica)
- **CSS3** (Flexbox, Grid, Glassmorphism)
- **JavaScript ES6+** (Modular, sin dependencias)
- **Font Awesome** (Iconos)
- **Google Fonts - Inter** (Tipografía)

## 🎨 Personalización

### Colores
Edita las variables CSS en `:root` dentro de `assets/css/styles.css`:
```css
:root {
    --primary: #00E5FF;      /* Color principal */
    --primary-dark: #00B8E6;
    --bg-dark: #0a0a1a;      /* Fondo oscuro */
    --text-primary: #ffffff; /* Texto principal */
    /* ... más variables */
}
```

### Información del Negocio
Edita directamente en `index.html`:
- Nombre de la empresa
- Descripción
- Servicios
- Proyectos
- Datos de contacto
- Redes sociales

### Agregar Proyectos
En la sección de proyectos (línea ~200 en index.html):
```html
<div class="project-card glass-card" data-category="web">
    <div class="project-image">
        <div class="project-placeholder">
            <i class="fas fa-code"></i>
        </div>
        <div class="project-badge">Categoría</div>
    </div>
    <div class="project-content">
        <h3 class="project-title">Nombre del Proyecto</h3>
        <p class="project-description">Descripción...</p>
        <div class="project-meta">
            <div class="tech-tags">
                <span class="tech-tag">Tecnología</span>
            </div>
        </div>
        <a href="#" class="project-link">Enlace <i class="fas fa-external-link-alt"></i></a>
    </div>
</div>
```

### Categorías de Proyectos
- `web` - Proyectos web
- `desktop` - Aplicaciones de escritorio
- `iot` - Internet de las cosas
- Agrega más según necesites

## 📱 Vista Previa

Abre `index.html` en tu navegador:

```bash
# Navega a la carpeta
cd /home/joseph/Escritorio/SBM_Tech

# Abre con tu navegador
# En Linux/Mac:
xdg-open index.html  # Linux
open index.html      # Mac

# En Windows:
start index.html
```

## 🔧 Optimización

### Imágenes
Para mejor rendimiento:
1. Coloca imágenes en `assets/images/`
2. Usa formato WebP
3. Optimiza con herramientas como TinyPNG
4. Usa el atributo `loading="lazy"`

### SEO
- Ya incluye meta tags básicos
- Añade más keywords en el `<head>` si es necesario
- Considera agregar Google Analytics

## 📊 Mejoras Futuras

- [ ] Conexión con backend (Node.js, PHP, etc.)
- [ ] Base de datos para proyectos
- [ ] Panel de administración
- [ ] Blog integrado
- [ ] SEO avanzado
- [ ] PWA (Progressive Web App)

## 🎯 Requisitos

- Navegador moderno (Chrome, Firefox, Edge, Safari)
- No requiere Node.js ni npm (solo HTML, CSS y JS puro)

## 📝 Notas

- El formulario actual abre el cliente de correo con los datos
- Para un formulario funcional con backend, necesitarás implementar un servidor
- El diseño está optimizado para velocidad y experiencia de usuario

## 🌟 Funcionalidades Adicionales

El proyecto incluye:
- **Loading screen** animada
- **Efecto glassmorphism** en tarjetas
- **Animaciones de scroll** (reveal)
- **Contadores animados** (stats)
- **Filtro de proyectos** por categoría
- **Efecto typing** en el título
- **Botón de WhatsApp** flotante
- **Volver al inicio** botón
- **Menú móvil responsive**

## 🔒 Licencia

Este proyecto es propiedad de **SBM TECH - Software & Business Management Technologies**.

---

**Hecho con ❤️ en Huancayo, Perú 🇵🇪**
# SBM_Page
