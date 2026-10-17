// SBM TECH - Efecto de escritura del titular

document.addEventListener('DOMContentLoaded', () => {
    const element = document.querySelector('.typing-text');
    if (!element) return;

    const words = ['software', 'SaaS', 'automatización', 'soluciones'];
    let wordIndex = 0;
    let characterIndex = 0;
    let deleting = false;

    const type = () => {
        const word = words[wordIndex];
        characterIndex += deleting ? -1 : 1;
        element.textContent = word.slice(0, characterIndex);

        let delay = deleting ? 70 : 120;
        if (!deleting && characterIndex === word.length) {
            deleting = true;
            delay = 1800;
        } else if (deleting && characterIndex === 0) {
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            delay = 350;
        }
        window.setTimeout(type, delay);
    };

    window.setTimeout(type, 500);
});
