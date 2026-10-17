// SBM TECH - Animación de estadísticas

document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    if (!counters.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach(({ isIntersecting, target }) => {
            if (!isIntersecting) return;
            currentObserver.unobserve(target);

            const value = Number.parseInt(target.dataset.target, 10);
            if (!Number.isFinite(value)) return;

            const duration = 2000;
            const start = performance.now();
            const update = now => {
                const progress = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                target.textContent = Math.floor(eased * value);
                if (progress < 1) requestAnimationFrame(update);
                else target.textContent = value;
            };
            requestAnimationFrame(update);
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
});
