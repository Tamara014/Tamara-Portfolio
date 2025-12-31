window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scroll-progress');
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / scrollHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});
const backToTopButton = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach((item, index) => {
    item.classList.add('slide-in-left');
    item.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(item);
});
const skillCategories = document.querySelectorAll('.skill-category');
skillCategories.forEach((category, index) => {
    category.classList.add('fade-in');
    category.style.transitionDelay = `${index * 0.15}s`;
    observer.observe(category);
});

const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    card.classList.add('slide-in-right');
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
});
const educationItems = document.querySelectorAll('.education-item');
educationItems.forEach((item, index) => {
    item.classList.add('fade-in');
    item.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(item);
});
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = navMenu.classList.contains('active') 
        ? 'rotate(45deg) translate(5px, 5px)' 
        : 'none';
    spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navMenu.classList.contains('active') 
        ? 'rotate(-45deg) translate(7px, -6px)' 
        : 'none';
});
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});
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

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 100) {
        if (currentTheme === 'light') {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        }
    } else {
        if (currentTheme === 'light') {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        }
    }
});
const skillsObserverOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
            skillsObserver.unobserve(entry.target);
        }
    });
}, skillsObserverOptions);
const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.timeline-item, .education-item, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(el);
});
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
    });
}
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});
const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroSubtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
    };

    setTimeout(typeWriter, 500);
}

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - scrolled / 600;
    }
});
const createParticle = (x, y) => {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = '5px';
    particle.style.height = '5px';
    particle.style.borderRadius = '50%';
    particle.style.background = 'linear-gradient(135deg, #6366f1, #8b5cf6)';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.pointerEvents = 'none';
    particle.style.opacity = '0.6';
    particle.style.transition = 'all 0.5s ease';
    document.body.appendChild(particle);
    setTimeout(() => {
        particle.style.opacity = '0';
        particle.style.transform = 'scale(0)';
    }, 10);
    setTimeout(() => {
        particle.remove();
    }, 500);
};
let lastX = 0, lastY = 0;
let throttleTimer = null;
document.addEventListener('mousemove', (e) => {
    if (throttleTimer) return;
    throttleTimer = setTimeout(() => {
        const distance = Math.sqrt(
            Math.pow(e.clientX - lastX, 2) + Math.pow(e.clientY - lastY, 2)
        );
        if (distance > 50) {
            createParticle(e.clientX, e.clientY);
            lastX = e.clientX;
            lastY = e.clientY;
        }
        throttleTimer = null;
    }, 50);
});

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.3s ease';
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    if (!themeToggle) {
        console.error('Theme toggle button not found');
        return;
    }
    const currentTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        console.log('Theme changed to:', newTheme);
    });
    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        if (icon) {
            if (theme === 'dark') {
                icon.className = 'fas fa-moon';
            } else {
                icon.className = 'fas fa-sun';
            }
        }
    }
}
initThemeToggle();
const canvas = document.getElementById('particles-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        draw() {
            ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    function init() {
        particles = [];
        const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 120) {
                    ctx.strokeStyle = `rgba(99, 102, 241, ${0.2 * (1 - distance / 120)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        connectParticles();
        animationId = requestAnimationFrame(animate);
    }
    init();
    animate();
    window.addEventListener('resize', () => {
        resizeCanvas();
        init();
    });
}
const contactFormValidation = document.getElementById('contact-form-validation');
if (contactFormValidation) {
    const nameInput = document.getElementById('form-name');
    const emailInput = document.getElementById('form-email');
    const subjectInput = document.getElementById('form-subject');
    const messageInput = document.getElementById('form-message');
    const submitBtn = document.getElementById('form-submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    function validateName() {
        const nameError = document.getElementById('name-error');
        if (nameInput.value.trim().length < 2) {
            nameError.textContent = 'Name must be at least 2 characters';
            nameInput.classList.add('error');
            nameInput.classList.remove('success');
            return false;
        } else {
            nameError.textContent = '';
            nameInput.classList.remove('error');
            nameInput.classList.add('success');
            return true;
        }
    }
    function validateEmail() {
        const emailError = document.getElementById('email-error');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email';
            emailInput.classList.add('error');
            emailInput.classList.remove('success');
            return false;
        } else {
            emailError.textContent = '';
            emailInput.classList.remove('error');
            emailInput.classList.add('success');
            return true;
        }
    }
    function validateSubject() {
        const subjectError = document.getElementById('subject-error');
        if (subjectInput.value.trim().length < 3) {
            subjectError.textContent = 'Subject must be at least 3 characters';
            subjectInput.classList.add('error');
            subjectInput.classList.remove('success');
            return false;
        } else {
            subjectError.textContent = '';
            subjectInput.classList.remove('error');
            subjectInput.classList.add('success');
            return true;
        }
    }
    function validateMessage() {
        const messageError = document.getElementById('message-error');
        if (messageInput.value.trim().length < 10) {
            messageError.textContent = 'Message must be at least 10 characters';
            messageInput.classList.add('error');
            messageInput.classList.remove('success');
            return false;
        } else {
            messageError.textContent = '';
            messageInput.classList.remove('error');
            messageInput.classList.add('success');
            return true;
        }
    }
    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    subjectInput.addEventListener('blur', validateSubject);
    messageInput.addEventListener('blur', validateMessage);
    contactFormValidation.addEventListener('submit', (e) => {
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isSubjectValid = validateSubject();
        const isMessageValid = validateMessage();
        if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
            e.preventDefault();
            return;
        }
    });
}
console.log('Portfolio loaded successfully! 🚀');
