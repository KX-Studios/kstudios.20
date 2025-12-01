// pricing.js
document.addEventListener('DOMContentLoaded', function() {
// Mobile navigation toggle (consistent with other pages)
const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileMenu = document.getElementById('mobile-menu');
const closeMenuBtn = document.getElementById('close-menu-btn');

hamburgerBtn.addEventListener('click', function() {
    this.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

closeMenuBtn.addEventListener('click', function() {
    hamburgerBtn.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
});

// Close mobile menu when clicking on a link
const mobileLinks = document.querySelectorAll('.mobile-nav-link');
mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
        hamburgerBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Pricing toggle functionality
const pricingToggle = document.getElementById('pricing-toggle');
const pricingContainer = document.querySelector('.pricing-main');

if (pricingToggle) {
    pricingToggle.addEventListener('change', function() {
        pricingContainer.classList.toggle('show-annual');
    });
}

// FAQ accordion functionality
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', function() {
        // Close all other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// Back to top button
const backToTopBtn = document.querySelector('.back-to-top');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
    } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
    }
});

// Scroll reveal animations
const revealElements = document.querySelectorAll('[class*="reveal-"]');

function checkReveal() {
    const windowHeight = window.innerHeight;
    const revealPoint = 150;
    
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
}

// Initial check
checkReveal();

// Check on scroll
window.addEventListener('scroll', checkReveal);
});