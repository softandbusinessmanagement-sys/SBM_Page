# Correcciones Realizadas - SBM TECH

**Fecha:** 26 de Octubre 2025  
**Problema Inicial:** Mensaje de error "No debe exceder -1 caracteres" en todos los campos del formulario

---

## Problema Identificado

El error ocurria porque en `assets/js/form.js`, la funcion `validateField` validaba `field.maxLength` sin considerar que este valor es `-1` por defecto cuando no se define el atributo HTML `maxlength`.

```javascript
// Codigo problematico (antes):
if (field.maxLength && value.length > field.maxLength) {
    showError(field, `No debe exceder ${field.maxLength} caracteres`);
    return false;
}
```

Cuando `field.maxLength = -1`:
- La condicion `field.maxLength` evalua a `true` (cualquier numero != 0 es truthy)
- `value.length > -1` siempre es `true` para cualquier string no vacio
- Resultado: Mostrar "No debe exceder -1 caracteres"

---

## Soluciones Implementadas

### 1. form.js - Corregido y Mejorado

**Cambios:**
- Aadido objeto `FIELD_LIMITS` con limites por campo:
  ```javascript
  const FIELD_LIMITS = {
    nombre: 50,
    email: 100,
    phone: 20,
    mensaje: 1000
  };
  ```

- Creada funcion `getMaxLength(field)` que:
  - Verifica atributo HTML `maxlength`
  - Verifica propiedad `field.maxLength` (ignorando -1)
  - Usa valores de `FIELD_LIMITS` como fallback

- Aadida sanitizacion de inputs:
  ```javascript
  function sanitizeInput(value, fieldType) {
    // Elimina XSS, script tags, encoding HTML
  }
  ```

- Mejorada validacion de telefono
- Aadida proteccion rate limiting

### 2. index.html - Atributos maxlength

Aadidos atributos a los campos del formulario:

```html
<!-- Nombre -->
<input type="text" id="nombre" name="nombre" 
       class="form-input" placeholder="Ej: Juan Perez" 
       maxlength="50" minlength="2" required>

<!-- Email -->
<input type="email" id="email" name="email" 
       class="form-input" placeholder="Ej: juan@email.com" 
       maxlength="100" required>

<!-- Telefono -->
<input type="tel" id="phone" name="phone" 
       class="form-input" placeholder="Ej: +51 987 654 321" 
       maxlength="20">

<!-- Mensaje -->
<textarea id="mensaje" name="mensaje" class="form-input form-textarea" 
          placeholder="Cuentame sobre tu proyecto..." rows="5" 
          maxlength="1000" minlength="10" required></textarea>
```

### 3. components.css - Estilos de Error

Aadidos estilos para feedback visual:

```css
.form-input.error {
    border-color: var(--danger) !important;
    background: rgba(255, 95, 87, 0.05) !important;
    box-shadow: 0 0 0 3px rgba(255, 95, 87, 0.2);
}

.form-error {
    color: var(--danger);
    font-size: 0.75rem;
    margin-top: 0.25rem;
    display: block;
    animation: shake 0.3s ease;
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%, 60% { transform: translateX(-3px); }
    40%, 80% { transform: translateX(3px); }
}
```

### 4. vercel.json - Headers de Seguridad

Configurados CSP y otros headers:

```json
{
  "headers": {
    "Content-Security-Policy": "default-src 'self' https: data:; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https://images.unsplash.com; font-src 'self' https://fonts.gstatic.com; frame-src 'none'; object-src 'none'; base-uri 'self'; form-action 'self' mailto:; frame-ancestors 'none'",
    "X-Frame-Options": "DENY",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload"
  }
}
```

### 5. .htaccess - Headers para Apache

Configurados headers equivalentes para servidores Apache.

---

## Archivos Modificados

| Archivo | Tamano Anterior | Tamano Nuevo | Cambios |
|--------|----------------|--------------|---------|
| `assets/js/form.js` | 10,877 bytes | 18,319 bytes | +7,442 bytes |
| `index.html` | 45,807 bytes | 46,074 bytes | +267 bytes |
| `assets/css/components.css` | 24,132 bytes | 26,012 bytes | +1,880 bytes |

### Archivos Creados

| Archivo | Tamano | Descripcion |
|--------|--------|-------------|
| `vercel.json` | 1,211 bytes | CSP y security headers para Vercel |
| `.htaccess` | 2,457 bytes | Security headers para Apache |
| `CORRECCIONES_REALIZADAS.md` | Este archivo | Documentacion |

---

## Como Verificar

1. **Abrir el formulario** en el navegador
2. **Intentar escribir** en cualquier campo
3. **Verificar que:**
   - No aparece el mensaje "No debe exceder -1 caracteres"
   - Los campos validan correctamente sus limites
   - El formulario envia correctamente

---

## Proximos Pasos Recomendados

1. **Implementar backend** para el formulario (reemplazar mailto:)
2. **Aadir reCAPTCHA** para prevenir spam
3. **Convertir imagenes** a formato WebP
4. **Diferir scripts** no criticos

---

## Contacto

**Joseph Eduardo Huatuco Buendia**  
Email: sbm.tech.eirl@gmail.com  
Phone: +51 973 012 326  
Web: https://sbmtech.pe  
Ubicacion: Huancayo, Peru
