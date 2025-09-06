// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.nav');

mobileMenuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Smooth scrolling for navigation links
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

// Header background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(26, 54, 93, 0.98)';
    } else {
        header.style.background = 'rgba(26, 54, 93, 0.95)';
    }
});

// Form submission
const contactForm = document.querySelector('.contact-form form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = contactForm.querySelector('input[type="text"]').value;
    const phone = contactForm.querySelector('input[type="tel"]').value;
    const location = contactForm.querySelectorAll('input[type="text"]')[1].value;
    const service = contactForm.querySelector('select').value;
    const description = contactForm.querySelector('textarea').value;
    
    // Create WhatsApp message
    const message = `Olá! Gostaria de solicitar um atendimento:
    
Nome: ${name}
Telefone: ${phone}
Localização: ${location}
Serviço: ${service}
Descrição: ${description}`;
    
    // Open WhatsApp
    const whatsappUrl = `https://wa.me/5521999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Show success message
    alert('Redirecionando para o WhatsApp...');
    
    // Reset form
    contactForm.reset();
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('loaded');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .testimonial-card, .area-group, .contact-item');
    animatedElements.forEach(el => {
        el.classList.add('loading');
        observer.observe(el);
    });
});

// Phone number formatting
const phoneInputs = document.querySelectorAll('input[type="tel"]');
phoneInputs.forEach(input => {
    input.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 11) {
            value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else if (value.length >= 7) {
            value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
        } else if (value.length >= 3) {
            value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
        }
        e.target.value = value;
    });
});

// Add loading states to buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    if (button.href && button.href.includes('wa.me')) {
        button.addEventListener('click', () => {
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Abrindo WhatsApp...';
            setTimeout(() => {
                button.innerHTML = originalText;
            }, 2000);
        });
    }
});

// Auto-hide mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        nav.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    }
});

// Add active state to mobile menu button
const style = document.createElement('style');
style.textContent = `
    .mobile-menu-btn.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    .mobile-menu-btn.active span:nth-child(2) {
        opacity: 0;
    }
    .mobile-menu-btn.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    .nav.active {
        display: block;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(26, 54, 93, 0.98);
        backdrop-filter: blur(10px);
        padding: 1rem 0;
    }
    
    .nav.active .nav-list {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
    }
    
    @media (min-width: 769px) {
        .nav {
            display: block !important;
        }
    }
`;
document.head.appendChild(style);

// Preload images
const imageUrls = [
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80'
];

imageUrls.forEach(url => {
    const img = new Image();
    img.src = url;
});

// Add scroll-to-top functionality
const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

// Show/hide scroll to top button
let scrollToTopBtn;
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        if (!scrollToTopBtn) {
            scrollToTopBtn = document.createElement('button');
            scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
            scrollToTopBtn.className = 'scroll-to-top';
            scrollToTopBtn.onclick = scrollToTop;
            document.body.appendChild(scrollToTopBtn);
            
            // Add styles for scroll to top button
            const scrollStyle = document.createElement('style');
            scrollStyle.textContent = `
                .scroll-to-top {
                    position: fixed;
                    bottom: 100px;
                    right: 30px;
                    width: 50px;
                    height: 50px;
                    background: #1a365d;
                    color: white;
                    border: none;
                    border-radius: 50%;
                    cursor: pointer;
                    font-size: 1.2rem;
                    box-shadow: 0 5px 20px rgba(26, 54, 93, 0.3);
                    transition: all 0.3s ease;
                    z-index: 999;
                }
                
                .scroll-to-top:hover {
                    background: #ffd700;
                    color: #1a365d;
                    transform: translateY(-3px);
                }
                
                @media (max-width: 768px) {
                    .scroll-to-top {
                        bottom: 80px;
                        right: 20px;
                        width: 40px;
                        height: 40px;
                        font-size: 1rem;
                    }
                }
            `;
            document.head.appendChild(scrollStyle);
        }
        scrollToTopBtn.style.display = 'block';
    } else if (scrollToTopBtn) {
        scrollToTopBtn.style.display = 'none';
    }
});

// Add performance optimization
window.addEventListener('load', () => {
    // Remove loading class from body if exists
    document.body.classList.remove('loading');
    
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Add click tracking for analytics (placeholder)
const trackClick = (element, action) => {
    // This would integrate with Google Analytics or other tracking
    console.log(`Tracked: ${action} on ${element}`);
};

// Track important clicks
document.querySelectorAll('a[href*="wa.me"], a[href*="tel:"]').forEach(link => {
    link.addEventListener('click', () => {
        const action = link.href.includes('wa.me') ? 'WhatsApp Click' : 'Phone Click';
        trackClick(link, action);
    });
});

// Add error handling for form
contactForm.addEventListener('error', (e) => {
    console.error('Form error:', e);
    alert('Ocorreu um erro. Tente novamente ou entre em contato diretamente pelo WhatsApp.');
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        nav.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    }
});

console.log('ReboqueFast RJ - Site carregado com sucesso!');

