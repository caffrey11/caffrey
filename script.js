// Lightbox functionality
document.querySelectorAll('.gallery-photo img').forEach(img => {
    img.addEventListener('click', function() {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightboxImg');
        lightboxImg.src = this.src;
        lightbox.classList.add('show');
    });
});

document.getElementById('lightboxClose').onclick = function() {
    document.getElementById('lightbox').classList.remove('show');
};

document.getElementById('lightbox').onclick = function(e) {
    if (e.target === this) this.classList.remove('show');
};

// Modal functionality
function openModal(id) {
    document.getElementById(id).classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal(id) {
    document.getElementById(id).classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Modal event listeners
document.getElementById('gamesBtn').onclick = function() {
    openModal('gamesModal');
};

document.getElementById('rulesBtn').onclick = function() {
    openModal('rulesModal');
};

document.getElementById('contactBtn').onclick = function() {
    openModal('contactModal');
};

document.getElementById('gamesClose').onclick = function() {
    closeModal('gamesModal');
};

document.getElementById('rulesClose').onclick = function() {
    closeModal('rulesModal');
};

document.getElementById('contactClose').onclick = function() {
    closeModal('contactModal');
};

// Close modals when clicking outside
document.getElementById('gamesModal').onclick = function(e) {
    if (e.target === this) closeModal('gamesModal');
};

document.getElementById('rulesModal').onclick = function(e) {
    if (e.target === this) closeModal('rulesModal');
};

document.getElementById('contactModal').onclick = function(e) {
    if (e.target === this) closeModal('contactModal');
};

// Copy server IP functionality
document.getElementById('copyBtn').onclick = function() {
    const serverIP = '185.143.177.14:246';
    navigator.clipboard.writeText(serverIP).then(function() {
        const btn = document.getElementById('copyBtn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> კოპირებულია!';
        btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        
        setTimeout(function() {
            btn.innerHTML = originalText;
            btn.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
        }, 2000);
    }).catch(function(err) {
        console.error('Could not copy text: ', err);
        alert('სერვერის IP: ' + serverIP);
    });
};



// Category Filter functionality
function initCategoryFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryPhotos = document.querySelectorAll('.gallery-photo');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            

            
            // Hide all photos first
            galleryPhotos.forEach(photo => {
                photo.classList.add('hidden');
            });
            
            // Show filtered photos with delay
            setTimeout(() => {
                galleryPhotos.forEach(photo => {
                    const photoCategory = photo.getAttribute('data-category');
                    
                    if (category === 'all' || photoCategory === category) {
                        photo.classList.remove('hidden');
                    }
                });
                
                // Add staggered animation for visible photos
                const visiblePhotos = Array.from(galleryPhotos).filter(photo => 
                    !photo.classList.contains('hidden')
                );
                
                visiblePhotos.forEach((photo, index) => {
                    photo.style.animationDelay = `${index * 0.1}s`;
                    photo.style.animation = 'fadeInUp 0.6s ease forwards';
                });
            }, 100);
        });
    });
}



// Wave animation for title
const style = document.createElement('style');
style.textContent = `
    @keyframes wave {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }
`;
document.head.appendChild(style);

// Initialize animations
document.addEventListener('DOMContentLoaded', function() {
    initCategoryFilter();
    addRippleEffect();
    
    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    document.querySelectorAll('.gallery-photo, .stat-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add ripple effect to buttons
function addRippleEffect() {
    const buttons = document.querySelectorAll('.menu-btn, .filter-btn, .copy-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Remove existing ripple
            const existingRipple = this.querySelector('.ripple');
            if (existingRipple) {
                existingRipple.remove();
            }
            
            // Create new ripple
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.remove();
                }
            }, 600);
        });
        
        // Add mouse move effect for dynamic ripple
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Update the ::before pseudo-element position
            this.style.setProperty('--mouse-x', x + 'px');
            this.style.setProperty('--mouse-y', y + 'px');
        });
    });
}

// Smooth scrolling for anchor links
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

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(function() {
        document.body.style.opacity = '1';
    }, 100);
});

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-section');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add typing effect to description
function typeWriter(element, text, speed = 50) {
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

// Initialize typing effect after page load
setTimeout(function() {
    const description = document.querySelector('.hero-description');
    if (description) {
        const originalText = description.textContent;
        typeWriter(description, originalText, 30);
    }
}, 1000);

// Add hover sound effects (optional)
function addHoverSound() {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT');
    
    document.querySelectorAll('.menu-btn, .copy-btn').forEach(element => {
        element.addEventListener('mouseenter', function() {
            audio.currentTime = 0;
            audio.play().catch(e => console.log('Audio play failed:', e));
        });
    });
}

// Uncomment the line below if you want hover sound effects
// addHoverSound(); 