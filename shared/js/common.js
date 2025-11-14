// Common JavaScript for all place pages

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all animated elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-item, .review-card, .info-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Image lazy loading
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Gallery lightbox functionality
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <span class="lightbox-close">&times;</span>
                    <img src="${item.querySelector('img')?.src || item.style.backgroundImage}" alt="Gallery Image">
                </div>
            `;

            document.body.appendChild(lightbox);

            setTimeout(() => {
                lightbox.style.opacity = '1';
            }, 10);

            const close = lightbox.querySelector('.lightbox-close');
            close.addEventListener('click', () => {
                lightbox.style.opacity = '0';
                setTimeout(() => {
                    lightbox.remove();
                }, 300);
            });

            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    lightbox.style.opacity = '0';
                    setTimeout(() => {
                        lightbox.remove();
                    }, 300);
                }
            });
        });
    });
}

// Initialize gallery when DOM is ready
document.addEventListener('DOMContentLoaded', initGallery);

// Parallax effect for hero sections
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Rating stars generator
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let starsHTML = '';

    for (let i = 0; i < fullStars; i++) {
        starsHTML += '★';
    }

    if (hasHalfStar) {
        starsHTML += '⯨';
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '☆';
    }

    return starsHTML;
}

// Update all rating displays
document.addEventListener('DOMContentLoaded', () => {
    const ratingElements = document.querySelectorAll('[data-rating]');
    ratingElements.forEach(el => {
        const rating = parseFloat(el.dataset.rating);
        const starsContainer = el.querySelector('.stars');
        if (starsContainer) {
            starsContainer.innerHTML = generateStars(rating);
        }
    });
});

// Current time for opening hours
function updateOpenStatus() {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const currentTime = now.getHours() * 100 + now.getMinutes();

    const hoursRows = document.querySelectorAll('.hours-row');
    hoursRows.forEach((row, index) => {
        if (index === dayOfWeek) {
            row.classList.add('open-now');
        }
    });
}

document.addEventListener('DOMContentLoaded', updateOpenStatus);

// Add hover effects to cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.info-card, .feature-item, .review-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Back to top button
function createBackToTop() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'back-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #4285f4, #34a853);
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s, transform 0.3s;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        z-index: 1000;
    `;

    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.opacity = '1';
            button.style.transform = 'scale(1)';
        } else {
            button.style.opacity = '0';
            button.style.transform = 'scale(0.8)';
        }
    });

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1)';
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
    });
}

document.addEventListener('DOMContentLoaded', createBackToTop);

// Add lightbox styles
const lightboxStyles = document.createElement('style');
lightboxStyles.textContent = `
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }

    .lightbox-content img {
        max-width: 100%;
        max-height: 90vh;
        border-radius: 8px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.4);
    }

    .lightbox-close {
        position: absolute;
        top: -40px;
        right: 0;
        font-size: 40px;
        color: white;
        cursor: pointer;
        transition: transform 0.2s;
    }

    .lightbox-close:hover {
        transform: scale(1.2);
    }
`;
document.head.appendChild(lightboxStyles);

// Random quote generator for some personality
const quotes = [
    "Discover amazing places around you!",
    "Your next adventure starts here!",
    "Explore the world, one place at a time!",
    "Find your perfect destination!",
    "Making every visit memorable!"
];

function setRandomQuote() {
    const quoteElements = document.querySelectorAll('.random-quote');
    quoteElements.forEach(el => {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        el.textContent = randomQuote;
    });
}

document.addEventListener('DOMContentLoaded', setRandomQuote);

// Contact form handling (if present)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Mobile menu toggle
function initMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('header');

    if (window.innerWidth <= 768 && navLinks) {
        const menuButton = document.createElement('button');
        menuButton.innerHTML = '☰';
        menuButton.className = 'mobile-menu-button';
        menuButton.style.cssText = `
            display: block;
            font-size: 28px;
            background: none;
            border: none;
            cursor: pointer;
            color: var(--text-primary);
        `;

        header.querySelector('.header-content').prepend(menuButton);
        navLinks.style.display = 'none';

        menuButton.addEventListener('click', () => {
            if (navLinks.style.display === 'none') {
                navLinks.style.display = 'flex';
                menuButton.innerHTML = '✕';
            } else {
                navLinks.style.display = 'none';
                menuButton.innerHTML = '☰';
            }
        });
    }
}

window.addEventListener('resize', initMobileMenu);
document.addEventListener('DOMContentLoaded', initMobileMenu);
