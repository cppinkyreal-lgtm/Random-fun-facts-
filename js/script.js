// ===========================
// Navigation & Mobile Menu
// ===========================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ===========================
// Smooth Scrolling Enhancement
// ===========================
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

// ===========================
// Program Modal Functionality
// ===========================
const modal = document.getElementById('programModal');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');

const programDescriptions = {
    'Tech Bootcamp': 'Our intensive 8-week Tech Bootcamp covers web development, mobile app development, and introduction to AI/ML. Perfect for beginners looking to start their tech career or intermediates wanting to level up.',
    'Innovation Challenge': 'Participate in monthly global innovation challenges where you showcase your ideas, compete for prizes, and network with innovators worldwide. Total prize pool exceeds $50,000 annually.',
    'Leadership Accelerator': 'Develop essential leadership and entrepreneurship skills with 1-on-1 mentoring from industry veterans. Includes business planning, pitch coaching, and access to funding opportunities.',
    'Creative Design Studio': 'Master UI/UX design, graphic design, and creative problem-solving. Build an impressive portfolio with real-world projects and get internship placement support.',
    'AI & Data Science': 'Explore machine learning, data analysis, and AI applications through hands-on projects. Work with real datasets and contribute to research opportunities.',
    'Social Impact': 'Build technology solutions that address global challenges in education, healthcare, environment, and more. Partner with NGOs and measure your impact on communities.'
};

function enrollProgram(programName) {
    if (programName) {
        modalTitle.textContent = programName;
        modalDescription.textContent = programDescriptions[programName] || 'Learn more about this amazing program!';
        modal.style.display = 'block';
    }
}

function closeModal() {
    modal.style.display = 'none';
}

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

// ===========================
// Form Submission
// ===========================
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    
    // Simulate form submission
    console.log('Form submitted with data:');
    console.log({
        name: formData.get('name'),
        email: formData.get('email'),
        program: formData.get('program'),
        message: formData.get('message')
    });
    
    // Show success message
    showNotification('Thank you! We\'ll get back to you soon.', 'success');
    
    // Reset form
    this.reset();
});

// ===========================
// Notification System
// ===========================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles dynamically if not in CSS
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===========================
// Scroll Animations
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe cards for animation
document.querySelectorAll('.about-card, .program-card, .story-card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// ===========================
// Counter Animation
// ===========================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : '');
        }
    }, 16);
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = 'true';
            document.querySelectorAll('.stat-item h3').forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text);
                if (!isNaN(number)) {
                    animateCounter(stat, number);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ===========================
// Theme Toggle (Optional Enhancement)
// ===========================
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Load saved theme preference
window.addEventListener('load', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
});

// ===========================
// Utility Functions
// ===========================

// Validate email
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Scroll to top button
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.id = 'scrollToTop';
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        z-index: 999;
        transition: all 0.3s ease;
        font-size: 1.5rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.style.display = 'flex';
            button.style.alignItems = 'center';
            button.style.justifyContent = 'center';
        } else {
            button.style.display = 'none';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    button.addEventListener('mouseover', () => {
        button.style.transform = 'scale(1.1)';
    });
    
    button.addEventListener('mouseout', () => {
        button.style.transform = 'scale(1)';
    });
}

// Initialize scroll to top button
createScrollToTopButton();

// ===========================
// Performance Optimization
// ===========================

// Lazy load images when they come into view
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===========================
// Accessibility Enhancements
// ===========================

// Improve keyboard navigation
document.addEventListener('keydown', (e) => {
    // Escape key closes modal
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Announce to screen readers
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.textContent = message;
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    document.body.appendChild(announcement);
    
    setTimeout(() => announcement.remove(), 1000);
}

// ===========================
// Analytics & Tracking
// ===========================

// Track button clicks
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        console.log('Button clicked:', this.textContent);
        // You can add analytics tracking here
    });
});

// ===========================
// Page Load Performance
// ===========================

// Log page performance metrics
window.addEventListener('load', () => {
    const perfData = performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log('Page loaded in', pageLoadTime, 'ms');
});

// ===========================
// Service Worker (Optional - for PWA)
// ===========================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when you have a service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(reg => console.log('Service Worker registered'))
        //     .catch(err => console.log('SW registration failed'));
    });
}

console.log('Youth Innovation Hub - Initialized Successfully! 🚀');
