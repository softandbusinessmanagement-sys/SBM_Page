// ==========================================
// SBM TECH - Form Handling
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
    initFormValidation();
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
        const nombre = data.get('nombre').trim();
        const email = data.get('email').trim();
        const phone = (data.get('phone') || '').trim();
        const subject = data.get('subject');
        const mensaje = data.get('mensaje').trim();
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
    
    // Check required fields
    if (required && !value) {
        showError(field, 'Este campo es obligatorio');
        return false;
    }
    
    // Check email format
    if (type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showError(field, 'Por favor ingresa un email válido');
            return false;
        }
    }
    
    // Check phone format (optional)
    if (field.id === 'phone' && value) {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(value)) {
            showError(field, 'Por favor ingresa un teléfono válido');
            return false;
        }
    }
    
    // Check minimum length
    if (field.minLength && value.length < field.minLength) {
        showError(field, `Debe tener al menos ${field.minLength} caracteres`);
        return false;
    }
    
    // Check maximum length
    if (field.maxLength && value.length > field.maxLength) {
        showError(field, `No debe exceder ${field.maxLength} caracteres`);
        return false;
    }
    
    return true;
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

// ========== NOTIFICATION SYSTEM ==========
function showNotification(type, title, message, duration = 5000) {
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
            <div class="notification-title" style="color: #fff; font-weight: 600; margin-bottom: 0.25rem;">${title}</div>
            <div class="notification-text" style="color: #c0c0d8; font-size: 0.875rem;">${message}</div>
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

// ========== INPUT MASKING ==========
function initInputMasks() {
    // Phone input mask
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = this.value.replace(/\D/g, '');
            let formatted = '';
            
            if (value.length > 0) {
                formatted = value.substring(0, 3);
            }
            if (value.length > 3) {
                formatted += ' ' + value.substring(3, 6);
            }
            if (value.length > 6) {
                formatted += ' ' + value.substring(6, 10);
            }
            
            this.value = formatted;
        });
    });
}

// Initialize input masks
initInputMasks();

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
        }
    });
}

// Initialize form field effects
initFormFieldEffects();

// ========== FORM SUBMISSION WITH AJAX ==========
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
    
    // Create FormData
    const formData = new FormData(form);
    
    // Send request
    fetch(url, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
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
