// ==========================================
// PART 1: NEW WHATSAPP & TOAST LOGIC
// ==========================================

// Global variable to store the URL temporarily
let finalWhatsappUrl = "";

// Helper function to create and show a Toast Notification
function showToast(message, type = 'default') {
    const container = document.getElementById('toast-container');

    // Create toast elements
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    toast.innerHTML = `
        <span class="toast-message">${message}</span>
        <span class="toast-close">&times;</span>
    `;

    // Append to container
    container.appendChild(toast);

    // Remove toast after 4 seconds
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease forwards';
        toast.addEventListener('animationend', () => {
            toast.remove();
        });
    }, 4000);

    // Close button logic
    toast.querySelector('.toast-close').onclick = function () {
        toast.remove();
    };
}

// The Main Form Function
function handleFormSubmit(event) {
    event.preventDefault();

    // REPLACE THIS WITH YOUR REAL NUMBER WHEN READY
    const WHATSAPP_NUMBER = "27615455235";

    // 1. Get Values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const serviceElement = document.getElementById('service');
    const service = serviceElement.value ? serviceElement.options[serviceElement.selectedIndex].text : "General Inquiry";
    const message = document.getElementById('message').value.trim();

    // 2. Validate
    if (!name || !email) {
        showToast("⚠️ Please fill in your Name and Email.", "error");
        return false;
    }

    // 3. Format Message
    let businessMessage =
        `*👋 New Lead from KX Studios Website!*\n\n` +
        `*Customer Details:*\n` +
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Phone: ${phone ? phone : 'Not Provided'}\n\n` +
        `*Service Interested In:* ${service}\n\n` +
        `*Message:*\n${message}`;

    // 4. Create URL & Store it
    const encodedMessage = encodeURIComponent(businessMessage);
    // We use api.whatsapp.com/send which is more reliable for unsaved numbers
    // We use api.whatsapp.com/send which is more reliable for unsaved numbers
    finalWhatsappUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodedMessage}`;

    // 5. Open the Modal
    const modal = document.getElementById('customModal');
    if (modal) {
        modal.classList.add('active');
    } else {
        // Fallback if modal HTML is missing
        window.open(finalWhatsappUrl, '_blank');
    }

    return false;
}

// ==========================================
// PART 2: YOUR ORIGINAL SITE LOGIC
// ==========================================

document.addEventListener('DOMContentLoaded', function () {

    // --- 1. EXISTING MOBILE NAV & ANIMATIONS ---
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenuBtn = document.getElementById('close-menu-btn');

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', function () {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', function () {
            hamburgerBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close mobile menu when clicking on a link
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function () {
            hamburgerBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', function () {
            if (window.pageYOffset > 300) {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.visibility = 'visible';
            } else {
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.visibility = 'hidden';
            }
        });
    }

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

    // Initial check & Scroll check
    checkReveal();
    window.addEventListener('scroll', checkReveal);


    // --- 2. NEW MODAL BUTTON LISTENERS ---
    const modal = document.getElementById('customModal');
    const proceedBtn = document.getElementById('proceedBtn');
    const cancelBtn = document.getElementById('cancelBtn');

    if (proceedBtn) {
        proceedBtn.addEventListener('click', function () {
            if (finalWhatsappUrl) {
                window.open(finalWhatsappUrl, '_blank');
                modal.classList.remove('active'); // Hide modal
                document.getElementById('contactForm').reset(); // Clear form

                // Show success toast
                showToast("Message drafted! Check your WhatsApp.", "success");
            }
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', function () {
            modal.classList.remove('active'); // Just hide
        });
    }

    // Close modal if clicking background
    if (modal) {
        window.addEventListener('click', function (e) {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
});