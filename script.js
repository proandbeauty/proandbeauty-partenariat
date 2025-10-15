// Données des marques partenaires
const marquesPartenaires = [
    'L\'Oréal', 'Lancôme', 'Yves Saint Laurent', 'Dior', 'Chanel', 'Estée Lauder',
    'Clinique', 'MAC', 'NARS', 'Urban Decay', 'Too Faced', 'Fenty Beauty',
    'Glossier', 'Rare Beauty', 'Charlotte Tilbury', 'Pat McGrath', 'Huda Beauty',
    'Anastasia Beverly Hills', 'Tarte', 'Benefit', 'Smashbox', 'Bobbi Brown',
    'Make Up For Ever', 'Sephora Collection', 'Fenty Skin', 'The Ordinary',
    'Drunk Elephant', 'Sunday Riley', 'Tatcha', 'Glow Recipe', 'Kiehl\'s'
];

// Variables globales
let currentCarouselIndex = 0;
const itemsPerView = 6; // Nombre d'éléments visibles dans le carousel

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollAnimations();
    initializeCarousel();
    initializeSearch();
    initializeContactForm();
    initializeModals();
    initializeFloatingCards();
});

// ===== NAVIGATION =====
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle du menu mobile
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Fermer le menu mobile lors du clic sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Changement d'apparence du header au scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
}

// ===== ANIMATIONS DE SCROLL =====
function initializeScrollAnimations() {
    // Créer un observer pour les animations au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    // Observer tous les éléments avec l'attribut data-aos
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });

    // Animation des cartes d'avantages avec délai
    const avantageCards = document.querySelectorAll('.avantage-card');
    avantageCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// ===== CAROUSEL DE LOGOS =====
function initializeCarousel() {
    const carouselTrack = document.getElementById('carouselTrack');
    if (!carouselTrack) return;

    // Générer les éléments du carousel
    generateCarouselItems();
    
    // Gérer les boutons de navigation
    updateCarouselButtons();
}

function generateCarouselItems() {
    const carouselTrack = document.getElementById('carouselTrack');
    carouselTrack.innerHTML = '';

    marquesPartenaires.forEach(marque => {
        const item = document.createElement('div');
        item.className = 'carousel-item';
        item.textContent = marque;
        item.setAttribute('data-marque', marque.toLowerCase());
        carouselTrack.appendChild(item);
    });
}

function moveCarousel(direction) {
    const carouselTrack = document.getElementById('carouselTrack');
    const totalItems = marquesPartenaires.length;
    const maxIndex = totalItems - itemsPerView;

    currentCarouselIndex += direction;
    
    // Limiter l'index
    if (currentCarouselIndex < 0) {
        currentCarouselIndex = 0;
    } else if (currentCarouselIndex > maxIndex) {
        currentCarouselIndex = maxIndex;
    }

    // Déplacer le carousel
    const translateX = -currentCarouselIndex * (150 + 32); // 150px largeur + 32px margin
    carouselTrack.style.transform = `translateX(${translateX}px)`;

    updateCarouselButtons();
}

function updateCarouselButtons() {
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const totalItems = marquesPartenaires.length;
    const maxIndex = totalItems - itemsPerView;

    if (prevBtn) {
        prevBtn.disabled = currentCarouselIndex === 0;
    }
    if (nextBtn) {
        nextBtn.disabled = currentCarouselIndex >= maxIndex;
    }
}

// ===== RECHERCHE DE MARQUES =====
function initializeSearch() {
    const searchInput = document.getElementById('marqueSearch');
    if (!searchInput) return;

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        filterCarouselItems(searchTerm);
    });
}

function filterCarouselItems(searchTerm) {
    const carouselItems = document.querySelectorAll('.carousel-item');
    
    carouselItems.forEach(item => {
        const marqueName = item.getAttribute('data-marque');
        const isVisible = marqueName.includes(searchTerm);
        
        item.style.display = isVisible ? 'flex' : 'none';
        item.style.opacity = isVisible ? '1' : '0';
    });

    // Si recherche vide, réinitialiser le carousel
    if (searchTerm === '') {
        carouselItems.forEach(item => {
            item.style.display = 'flex';
            item.style.opacity = '1';
        });
        currentCarouselIndex = 0;
        moveCarousel(0);
    }
}

// ===== FORMULAIRE DE CONTACT =====
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Récupérer les données du formulaire
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Validation simple
        if (!data.nom || !data.email || !data.type) {
            showNotification('Veuillez remplir tous les champs obligatoires.', 'error');
            return;
        }

        // Simuler l'envoi du formulaire
        showNotification('Demande envoyée avec succès ! Nous vous contacterons bientôt.', 'success');
        contactForm.reset();
    });
}

// ===== MODALES =====
function initializeModals() {
    // Fermer les modales en cliquant à l'extérieur
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });

    // Fermer avec la touche Échap
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal[style*="block"]');
            if (openModal) {
                openModal.style.display = 'none';
            }
        }
    });
}

function openModal(modalType) {
    const modal = document.getElementById(modalType + 'Modal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Empêcher le scroll
    }
}

function closeModal(modalType) {
    const modal = document.getElementById(modalType + 'Modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Réactiver le scroll
    }
}

// ===== CARTES FLOTTANTES =====
function initializeFloatingCards() {
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach((card, index) => {
        // Ajouter un délai différent pour chaque carte
        card.style.animationDelay = `${index * 0.5}s`;
        
        // Ajouter un effet de survol
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ===== FONCTIONS UTILITAIRES =====
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = section.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

function showNotification(message, type = 'info') {
    // Créer l'élément de notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Styles pour la notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Ajouter au DOM
    document.body.appendChild(notification);
    
    // Animation d'entrée
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Supprimer après 5 secondes
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// ===== EFFETS DE SURVOL POUR LES CARTES =====
document.addEventListener('DOMContentLoaded', function() {
    // Effet de survol pour les cartes d'avantages
    const avantageCards = document.querySelectorAll('.avantage-card');
    avantageCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Effet de survol pour les éléments de la timeline
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // Effet de survol pour les éléments de la galerie
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// ===== ANIMATION DES BOUTONS =====
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(0) scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-2px) scale(1)';
        });
    });
});

// ===== GESTION DU SCROLL POUR LA NAVIGATION =====
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ===== EFFET DE TYPING POUR LE TITRE PRINCIPAL =====
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Démarrer l'effet de typing au chargement
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 1000);
    }
});

// ===== LAZY LOADING POUR LES IMAGES =====
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===== PERFORMANCE ET OPTIMISATIONS =====
// Throttle pour les événements de scroll
function throttle(func, wait) {
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

// Appliquer le throttle aux événements de scroll
window.addEventListener('scroll', throttle(function() {
    // Code de scroll optimisé ici
}, 16)); // ~60fps

// ===== GESTION DES ERREURS =====
window.addEventListener('error', function(e) {
    console.error('Erreur JavaScript:', e.error);
    // Optionnel: envoyer l'erreur à un service de monitoring
});

// ===== ACCESSIBILITÉ =====
// Navigation au clavier
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Focus visible pour la navigation au clavier
const style = document.createElement('style');
style.textContent = `
    .keyboard-navigation *:focus {
        outline: 2px solid #6366f1 !important;
        outline-offset: 2px !important;
    }
`;
document.head.appendChild(style);