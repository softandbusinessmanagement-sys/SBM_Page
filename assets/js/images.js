// SBM TECH - Image Configuration
// URLs de imágenes para usar en el sitio
// Puedes reemplazar con tus propias imágenes locales

const IMAGES = {
  hero: {
    background: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=800&fit=crop",
    tech: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop",
    development: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
  },
  projects: {
    gmschool: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
    tallerBuendia: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    cpp: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=300&fit=crop",
    arduino: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop"
  },
  team: {
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
  },
  services: {
    saas: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=100&h=100&fit=crop",
    custom: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=100&h=100&fit=crop",
    landing: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&h=100&fit=crop",
    ai: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=100&h=100&fit=crop"
  }
};

// Exportar para usar en otros módulos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = IMAGES;
}
