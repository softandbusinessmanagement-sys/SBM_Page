// ==========================================
// SBM TECH - Main JavaScript
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initHeader();
    initMobileMenu();
    initThemeToggle();
    initScrollAnimations();
    initBackToTop();
    initProjectsFilter();
    initSmoothScroll();
    initLoadingScreen();
});

// ========== COLOR THEME ==========
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    const storageKey = 'sbm-tech-theme';
    let savedTheme = null;
    try {
        savedTheme = window.localStorage.getItem(storageKey);
    } catch (error) {
        // The control still works when storage is unavailable.
    }

    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    const applyTheme = theme => {
        const isLight = theme === 'light';
        document.body.classList.toggle('light-mode', isLight);
        themeToggle.setAttribute('aria-pressed', String(isLight));
        themeToggle.setAttribute('aria-label', isLight ? 'Activar tema oscuro' : 'Activar tema claro');
    };

    applyTheme(savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : (prefersLight ? 'light' : 'dark'));
    themeToggle.addEventListener('click', () => {
        const nextTheme = document.body.classList.contains('light-mode') ? 'dark' : 'light';
        applyTheme(nextTheme);
        try {
            window.localStorage.setItem(storageKey, nextTheme);
        } catch (error) {
            // Keep the selected theme for this page even when storage is unavailable.
        }
    });
}

// ========== LOADING SCREEN ==========
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');

    if (!loadingScreen) return;
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 1000);
    });
    
    // Hide loading screen after 5 seconds even if page doesn't load
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 5000);
}

// ========== HEADER ==========
function initHeader() {
    const header = document.getElementById('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide header on scroll down
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
}

// ========== MOBILE MENU ==========
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const navLinksItems = document.querySelectorAll('.nav-link');
    
    if (!menuToggle || !navLinks) return;
    
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
        document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : 'auto';
    });
    
    // Close menu when clicking a link
    navLinksItems.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('open');
            document.body.style.overflow = 'auto';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('open');
            document.body.style.overflow = 'auto';
        }
    });
}

// ========== SCROLL ANIMATIONS ==========
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

    if (!('IntersectionObserver' in window)) {
        revealElements.forEach(element => element.classList.add('visible'));
        return;
    }
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    revealElements.forEach(el => observer.observe(el));
    
    // Animate elements with class reveal on page load
    setTimeout(() => {
        const initialReveals = document.querySelectorAll('.reveal.visible');
        initialReveals.forEach(el => el.classList.add('visible'));
    }, 100);
}

// ========== BACK TO TOP ==========
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    if (!backToTop) return;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========== PROJECTS FILTER ==========
function initProjectsFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (!filterButtons.length || !projectCards.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filter project cards
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// ========== SMOOTH SCROLL ==========
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL hash without jumping
                history.pushState(null, null, targetId);
            }
        });
    });
}

// ========== UTILITY FUNCTIONS ==========

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Format number with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// ========== TYPING EFFECT (Separate file handles this) ==========
// This is handled by typing.js

// ========== FORM HANDLING (Separate file handles this) ==========
// This is handled by form.js

// ========== KEYBOARD NAVIGATION ==========
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    const navLinks = document.getElementById('navLinks');
    if (e.key === 'Escape' && navLinks && navLinks.classList.contains('open')) {
        const menuToggle = document.getElementById('menuToggle');
        menuToggle.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = 'auto';
    }
});

// ========== RESPONSIVE UTILITIES ==========
function checkMobile() {
    return window.innerWidth <= 768;
}

// ========== LAZY LOADING IMAGES ==========
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ========== TOOLTIPS ==========
const tooltipContainers = document.querySelectorAll('.tooltip-container');

tooltipContainers.forEach(container => {
    const tooltip = container.querySelector('.tooltip');
    
    container.addEventListener('mouseenter', function() {
        if (tooltip) {
            tooltip.style.opacity = '1';
            tooltip.style.visibility = 'visible';
        }
    });
    
    container.addEventListener('mouseleave', function() {
        if (tooltip) {
            tooltip.style.opacity = '0';
            tooltip.style.visibility = 'hidden';
        }
    });
});

// ========== TAB SYSTEM ==========
const tabGroups = document.querySelectorAll('.tabs');

tabGroups.forEach(tabGroup => {
    const tabButtons = tabGroup.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Deactivate all buttons in this group
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Hide all tab contents in this group
            const groupId = this.closest('.tabs').getAttribute('data-group');
            document.querySelectorAll(`.tab-content[data-group="${groupId}"]`).forEach(content => {
                content.classList.remove('active');
            });
            
            // Show target tab content
            const targetId = this.getAttribute('data-target');
            const targetContent = document.querySelector(`#${targetId}`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
});

// ========== ACCORDION SYSTEM ==========
const accordions = document.querySelectorAll('.accordion');

accordions.forEach(accordion => {
    const header = accordion.querySelector('.accordion-header');
    
    header.addEventListener('click', function() {
        accordion.classList.toggle('active');
    });
});

// ========== DROPDOWN SYSTEM ==========
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    const menu = dropdown.querySelector('.dropdown-menu');
    
    toggle.addEventListener('click', function(e) {
        e.preventDefault();
        menu.classList.toggle('show');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target)) {
            menu.classList.remove('show');
        }
    });
});

// ========== MODAL SYSTEM ==========
const modalOpens = document.querySelectorAll('[data-modal-open]');
const modalCloses = document.querySelectorAll('[data-modal-close]');
const modals = document.querySelectorAll('.modal-overlay');

modalOpens.forEach(open => {
    open.addEventListener('click', function() {
        const modalId = this.getAttribute('data-modal-open');
        const modal = document.getElementById(modalId);
        
        if (modal) {
            modal.classList.add('visible');
            document.body.style.overflow = 'hidden';
        }
    });
});

modalCloses.forEach(close => {
    close.addEventListener('click', function() {
        const modal = this.closest('.modal-overlay');
        
        if (modal) {
            modal.classList.remove('visible');
            document.body.style.overflow = 'auto';
        }
    });
});

modals.forEach(modal => {
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('visible');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modal.classList.remove('visible');
            document.body.style.overflow = 'auto';
        }
    });
});

// ========== PARALLAX EFFECT ==========
const parallaxElements = document.querySelectorAll('.parallax');

window.addEventListener('scroll', throttle(function() {
    const scrollPosition = window.pageYOffset;
    
    parallaxElements.forEach(element => {
        const speed = parseFloat(element.getAttribute('data-speed')) || 0.5;
        const yPos = -(scrollPosition * speed);
        
        element.style.transform = `translateY(${yPos}px)`;
    });
}, 16));

// ========== MAGNETIC BUTTONS ==========
const magneticButtons = document.querySelectorAll('.magnetic-btn');

magneticButtons.forEach(button => {
    button.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        this.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translate(0, 0)';
    });
});

// ========== CURSOR FOLLOWER ==========
const cursorFollower = document.getElementById('cursor-follower');

if (cursorFollower) {
    document.addEventListener('mousemove', throttle(function(e) {
        cursorFollower.style.left = `${e.clientX}px`;
        cursorFollower.style.top = `${e.clientY}px`;
    }, 16));
    
    // Add hover effects
    document.querySelectorAll('a, button, .btn, .service-card, .project-card').forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursorFollower.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', function() {
            cursorFollower.classList.remove('hover');
        });
    });
}

// ========== NOTIFICATION SYSTEM ==========
function showNotification(type, title, message, duration = 5000) {
    const container = document.createElement('div');
    container.className = `notification notification-${type}`;
    
    const iconMap = {
        success: 'fa-check-circle',
        warning: 'fa-exclamation-triangle',
        danger: 'fa-exclamation-circle',
        info: 'fa-info-circle'
    };
    
    container.innerHTML = `
        <i class="fas ${iconMap[type]} notification-icon"></i>
        <div class="notification-message">
            <div class="notification-title">${title}</div>
            <div class="notification-text">${message}</div>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    // Add to container
    let notificationContainer = document.querySelector('.notification-container');
    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.className = 'notification-container';
        document.body.appendChild(notificationContainer);
    }
    
    notificationContainer.appendChild(container);
    
    // Close button
    const closeBtn = container.querySelector('.notification-close');
    closeBtn.addEventListener('click', function() {
        container.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => container.remove(), 300);
    });
    
    // Auto remove
    setTimeout(() => {
        container.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => container.remove(), 300);
    }, duration);
}

// ========== SCROLL PROGRESS ==========
function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    
    if (!progressBar) return;
    
    window.addEventListener('scroll', throttle(function() {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollProgress = (scrollTop / scrollHeight) * 100;
        
        progressBar.style.width = `${scrollProgress}%`;
    }, 16));
}

// Initialize scroll progress if element exists
const scrollProgress = document.getElementById('scroll-progress');
if (scrollProgress) {
    initScrollProgress();
}

// ========== MAGIC CURSOR ==========
const magicCursor = document.getElementById('magic-cursor');

if (magicCursor) {
    // Create cursor elements
    const cursor = document.createElement('div');
    cursor.className = 'magic-cursor-main';
    document.body.appendChild(cursor);
    
    const cursorFollower = document.createElement('div');
    cursorFollower.className = 'magic-cursor-follower';
    document.body.appendChild(cursorFollower);
    
    document.addEventListener('mousemove', throttle(function(e) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        
        // Follow with delay
        cursorFollower.style.left = `${e.clientX}px`;
        cursorFollower.style.top = `${e.clientY}px`;
    }, 16));
    
    // Hover effects
    document.querySelectorAll('a, button, .btn, .service-card, .project-card').forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursor.classList.add('hover');
            cursorFollower.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', function() {
            cursor.classList.remove('hover');
            cursorFollower.classList.remove('hover');
        });
    });
}

// ========== EASTER EGG ==========
let clickCount = 0;
const easterEgg = function() {
    clickCount++;
    
    if (clickCount >= 10) {
        showNotification('info', '¡Easter Egg!', 'Encontraste el huevo de pascua. ¡Eres un explorador!');
        clickCount = 0;
    }
    
    setTimeout(() => clickCount = 0, 5000);
};

// Add easter egg to logo
document.querySelectorAll('.logo').forEach(logo => {
    logo.addEventListener('click', easterEgg);
});

// ========== CONSOLE MESSAGE ==========
console.log('%c SBM TECH ', 'background: linear-gradient(45deg, #00E5FF, #8A2BE2); color: #000; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 5px;');
console.log('%c Software & Business Management Technologies ', 'color: #00E5FF; font-size: 12px;');
console.log('%c Hecho con amor en Huancayo, Perú 🇵🇪 ', 'color: #8A2BE2; font-size: 10px;');
