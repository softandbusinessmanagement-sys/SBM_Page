// ==========================================
// SBM TECH - Form Handling & Validation
// Version: 2.0.0 - Fixed & Enhanced
// ==========================================

// Configuration: Character limits per field
const FIELD_LIMITS = {
    nombre: 50,
    email: 100,
    phone: 20,
    mensaje: 1000,
    subject: 100
};

// Configuration: Sanitization patterns
const SANITIZE_PATTERNS = {
    nombre: /[^\p{L}\s\-\']+/gu,  // Allow letters, spaces, hyphens, apostrophes
    email: /[^\p{L}\d@._+\-\s]/gu, // Allow email characters
    phone: /[^\d\s\-\+\(\)]/g,   // Allow phone characters
    mensaje: /[^\p{L}\p{N}\s\p{P}\p{S}]+/gu // Allow most characters
};

// Configuration: Validation messages
const VALIDATION_MESSAGES = {
    required: 'Este campo es obligatorio',
    email: 'Por favor ingresa un email válido',
    phone: 'Por favor ingresa un teléfono válido',
    minLength: (min) => `Debe tener al menos ${min} caracteres`,
    maxLength: (max) => `No debe exceder ${max} caracteres`
};

document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
    initFormValidation();
    initInputMasks();
    initFormFieldEffects();
});

// ========== CONTACT FORM ==========
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        if (!validateForm(this)) {
            showNotification('danger', 'Revisa el formulario', 'Completa los campos obligatorios y corrige los datos marcados.');
            return;
        }

        const data = new FormData(this);
        const nombre = sanitizeInput(data.get('nombre') || '', 'nombre').trim();
        const email = sanitizeInput(data.get('email') || '', 'email').trim();
        const phone = sanitizeInput(data.get('phone') || '', 'phone').trim();
        const subject = data.get('subject');
        const mensaje = sanitizeInput(data.get('mensaje') || '', 'mensaje').trim();
        
        const subjectEncoded = encodeURIComponent(`Contacto desde web SBM TECH - ${nombre}`);
        const bodyEncoded = encodeURIComponent(
            `Nombre: ${nombre}\nEmail: ${email}\nTeléfono: ${phone}\nAsunto: ${subject}\n\nMensaje:\n${mensaje}`
        );

        showNotification('info', 'Abriendo tu correo', 'Revisa el mensaje en tu aplicación de correo y envíalo para completar el contacto.');
        window.location.href = `mailto:sbm.tech.eirl@gmail.com?subject=${subjectEncoded}&body=${bodyEncoded}`;
    });
}

// ========== FORM VALIDATION ==========
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Real-time validation on blur
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            // Clear error on focus
            input.addEventListener('focus', function() {
                clearError(this);
            });
            
            // Validate on input for textarea (to check length)
            if (input.tagName === 'TEXTAREA' || input.type === 'text' || input.type === 'email') {
                input.addEventListener('input', function() {
                    validateField(this);
                });
            }
        });
    });
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const required = field.hasAttribute('required');
    const fieldName = field.id || field.name;
    
    // Check required fields
    if (required && !value) {
        showError(field, VALIDATION_MESSAGES.required);
        return false;
    }
    
    // Skip validation for empty optional fields
    if (!value && !required) {
        clearError(field);
        return true;
    }
    
    // Check email format
    if (type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showError(field, VALIDATION_MESSAGES.email);
            return false;
        }
    }
    
    // Check phone format
    if (field.id === 'phone' || field.name === 'phone') {
        // Phone is optional, so only validate if it has value
        if (value) {
            // Remove all non-digit characters for validation
            const digitsOnly = value.replace(/\D/g, '');
            if (digitsOnly.length < 7 || digitsOnly.length > 15) {
                showError(field, VALIDATION_MESSAGES.phone);
                return false;
            }
        }
    }
    
    // Check minimum length from HTML attribute
    if (field.minLength && value.length < field.minLength) {
        showError(field, VALIDATION_MESSAGES.minLength(field.minLength));
        return false;
    }
    
    // Check maximum length - FIXED: Use FIELD_LIMITS or HTML maxlength
    const maxLen = getMaxLength(field);
    if (maxLen !== null && value.length > maxLen) {
        showError(field, VALIDATION_MESSAGES.maxLength(maxLen));
        return false;
    }
    
    // Additional validation for textarea message
    if (field.id === 'mensaje' || field.name === 'mensaje') {
        if (value.length < 10) {
            showError(field, 'El mensaje debe tener al menos 10 caracteres');
            return false;
        }
    }
    
    clearError(field);
    return true;
}

/**
 * Get maximum length for a field
 * Priority: HTML maxlength attribute > FIELD_LIMITS configuration > null
 */
function getMaxLength(field) {
    // Check HTML maxlength attribute
    if (field.hasAttribute('maxlength')) {
        const htmlMax = parseInt(field.getAttribute('maxlength'));
        if (!isNaN(htmlMax) && htmlMax > 0) {
            return htmlMax;
        }
    }
    
    // Check field.maxLength property (but ignore -1 which is default)
    if (field.maxLength !== undefined && field.maxLength !== -1 && !isNaN(field.maxLength)) {
        return field.maxLength;
    }
    
    // Use configured limits
    const fieldName = field.id || field.name;
    if (FIELD_LIMITS[fieldName] !== undefined) {
        return FIELD_LIMITS[fieldName];
    }
    
    // No limit defined
    return null;
}

function showError(field, message) {
    // Remove existing error
    clearError(field);
    
    // Add error class
    field.classList.add('error');
    
    // Create error message element
    const errorElement = document.createElement('span');
    errorElement.className = 'form-error';
    errorElement.textContent = message;
    errorElement.style.cssText = 'color: #ff5f57; font-size: 0.75rem; margin-top: 0.25rem; display: block;';
    
    // Insert error message after field
    field.parentNode.insertBefore(errorElement, field.nextSibling);
}

function clearError(field) {
    field.classList.remove('error');
    
    // Remove error message
    const errorElement = field.parentNode.querySelector('.form-error');
    if (errorElement) {
        errorElement.remove();
    }
}

// ========== INPUT SANITIZATION ==========
/**
 * Sanitize input value to prevent XSS and injection attacks
 */
function sanitizeInput(value, fieldType = 'text') {
    if (!value || typeof value !== 'string') {
        return value;
    }
    
    // Trim whitespace
    let sanitized = value.trim();
    
    // Apply field-specific sanitization
    if (SANITIZE_PATTERNS[fieldType]) {
        sanitized = sanitized.replace(SANITIZE_PATTERNS[fieldType], '');
    }
    
    // Remove potential XSS vectors
    // Remove script tags and attributes
    sanitized = sanitized
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+\s*=/gi, '')
        .replace(/&lt;script/gi, '')
        .replace(/&lt;\/script/gi, '');
    
    // HTML encode special characters
    sanitized = sanitized
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;');
    
    // Decode back for display (we want to show the characters, not the encoded version)
    // But keep the sanitization for security
    const temp = document.createElement('div');
    temp.textContent = sanitized;
    return temp.innerHTML;
}

// ========== INPUT MASKING ==========
function initInputMasks() {
    // Phone input mask - improved version
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = this.value;
            
            // Remove all non-digit characters first
            let digitsOnly = value.replace(/\D/g, '');
            
            // Limit to 15 digits max
            if (digitsOnly.length > 15) {
                digitsOnly = digitsOnly.substring(0, 15);
            }
            
            // Format based on length
            let formatted = '';
            
            if (digitsOnly.length > 0) {
                // International format: +XX XXX XXX XXXX
                if (digitsOnly.length <= 2) {
                    formatted = digitsOnly;
                } else if (digitsOnly.length <= 5) {
                    formatted = `${digitsOnly.substring(0, 2)} ${digitsOnly.substring(2)}`;
                } else if (digitsOnly.length <= 8) {
                    formatted = `${digitsOnly.substring(0, 2)} ${digitsOnly.substring(2, 5)} ${digitsOnly.substring(5)}`;
                } else {
                    formatted = `${digitsOnly.substring(0, 2)} ${digitsOnly.substring(2, 5)} ${digitsOnly.substring(5, 8)} ${digitsOnly.substring(8)}`;
                }
            }
            
            this.value = formatted;
        });
    });
}

// ========== FORM FIELD EFFECTS ==========
function initFormFieldEffects() {
    const formGroups = document.querySelectorAll('.form-group');
    
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea, select');
        const label = group.querySelector('.form-label');
        
        if (input && label) {
            // Check if input has value on page load
            if (input.value) {
                label.classList.add('filled');
            }
            
            // Add/remove filled class on input
            input.addEventListener('input', function() {
                if (this.value) {
                    label.classList.add('filled');
                } else {
                    label.classList.remove('filled');
                }
            });
            
            // Also handle change for select elements
            if (input.tagName === 'SELECT') {
                input.addEventListener('change', function() {
                    if (this.value) {
                        label.classList.add('filled');
                    } else {
                        label.classList.remove('filled');
                    }
                });
            }
        }
    });
}

// ========== FORM SUBMISSION WITH AJAX ==========
/**
 * Enhanced AJAX form submission with security headers
 * This function can be used for future backend integration
 */
function submitFormAjax(form, url, successCallback, errorCallback) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitBtn.disabled = true;
    
    // Validate form
    if (!validateForm(form)) {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        showNotification('danger', 'Error', 'Por favor completa todos los campos requeridos.');
        return false;
    }
    
    // Sanitize all inputs
    const formData = new FormData(form);
    const sanitizedData = new FormData();
    
    for (let [key, value] of formData.entries()) {
        const fieldType = key === 'email' ? 'email' : 
                          key === 'phone' ? 'phone' : 
                          key === 'mensaje' ? 'mensaje' : 'nombre';
        sanitizedData.append(key, sanitizeInput(value, fieldType));
    }
    
    // Send request with security headers
    fetch(url, {
        method: 'POST',
        body: sanitizedData,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Accept': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (successCallback) {
            successCallback(data);
        } else {
            // Default success handling
            showNotification('success', '¡Éxito!', 'El formulario ha sido enviado correctamente.');
            form.reset();
        }
        
        submitBtn.innerHTML = '<i class="fas fa-check"></i> ¡Enviado!';
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    })
    .catch(error => {
        console.error('Error:', error);
        showNotification('danger', 'Error', 'Ha ocurrido un error al enviar el formulario. Por favor inténta de nuevo.');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        if (errorCallback) {
            errorCallback(error);
        }
    });
    
    return true;
}

// Make submitFormAjax available globally
window.submitFormAjax = submitFormAjax;

// ========== NOTIFICATION SYSTEM ==========
/**
 * Enhanced notification system with security considerations
 */
function showNotification(type, title, message, duration = 5000) {
    // Validate notification type
    const validTypes = ['success', 'warning', 'danger', 'info'];
    if (!validTypes.includes(type)) {
        type = 'info';
    }
    
    // Sanitize message content
    const sanitizedTitle = sanitizeInput(title, 'text');
    const sanitizedMessage = sanitizeInput(message, 'text');
    
    // Create notification container if it doesn't exist
    let container = document.querySelector('.notification-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'notification-container';
        document.body.appendChild(container);
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const iconMap = {
        success: 'fa-check-circle',
        warning: 'fa-exclamation-triangle',
        danger: 'fa-exclamation-circle',
        info: 'fa-info-circle'
    };
    
    const colorMap = {
        success: '#28c840',
        warning: '#febc2e',
        danger: '#ff5f57',
        info: '#00E5FF'
    };
    
    notification.innerHTML = `
        <i class="fas ${iconMap[type]} notification-icon" style="color: ${colorMap[type]}"></i>
        <div class="notification-message">
            <div class="notification-title" style="color: #fff; font-weight: 600; margin-bottom: 0.25rem;">${sanitizedTitle}</div>
            <div class="notification-text" style="color: #c0c0d8; font-size: 0.875rem;">${sanitizedMessage}</div>
        </div>
        <button class="notification-close" style="color: #c0c0d8; background: none; border: none; cursor: pointer; font-size: 1rem;" aria-label="Cerrar">&times;</button>
    `;
    
    // Style the notification
    notification.style.cssText = `
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem 1.25rem;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        animation: slideInRight 0.3s ease;
        margin-bottom: 0.5rem;
        z-index: 1000;
    `;
    
    container.appendChild(notification);
    
    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', function() {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

// ========== RATE LIMITING PROTECTION ==========
// Simple rate limiting for form submissions
let formSubmissionCount = 0;
let lastSubmissionTime = 0;

function checkRateLimit(maxAttempts = 5, timeWindow = 60000) {
    const now = Date.now();
    
    if (now - lastSubmissionTime < timeWindow) {
        formSubmissionCount++;
        if (formSubmissionCount > maxAttempts) {
            showNotification('warning', 'Demasiados intentos', 'Por favor espera un momento antes de enviar otro formulario.');
            return false;
        }
    } else {
        formSubmissionCount = 1;
        lastSubmissionTime = now;
    }
    
    return true;
}

// ========== CHARACTER COUNTER ==========
function initCharacterCounters() {
    const counters = document.querySelectorAll('.char-counter');
    
    counters.forEach(counter => {
        const targetId = counter.getAttribute('data-target');
        const input = document.getElementById(targetId);
        
        if (!input) return;
        
        const max = parseInt(input.getAttribute('maxlength')) || 1000;
        const usedSpan = counter.querySelector('.char-used');
        const maxSpan = counter.querySelector('.char-max');
        
        if (maxSpan) maxSpan.textContent = max;
        
        // Update counter on input
        input.addEventListener('input', function() {
            const used = this.value.length;
            if (usedSpan) usedSpan.textContent = used;
            
            // Update styling based on usage
            if (used > max * 0.8) {
                counter.classList.add('warning');
                counter.classList.remove('danger');
            } else {
                counter.classList.remove('warning');
                counter.classList.remove('danger');
            }
            
            if (used > max) {
                counter.classList.add('danger');
            }
        });
        
        // Initialize with current value
        const initialUsed = input.value.length;
        if (usedSpan) usedSpan.textContent = initialUsed;
    });
}

// Initialize character counters
document.addEventListener('DOMContentLoaded', function() {
    initCharacterCounters();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateForm,
        validateField,
        sanitizeInput,
        showNotification,
        submitFormAjax
    };
}
