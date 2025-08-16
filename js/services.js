// Services Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Service category switching
    const categoryButtons = document.querySelectorAll('.category-btn');
    const categorySections = document.querySelectorAll('.service-category-section');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetCategory = this.getAttribute('data-category');
            
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all category sections
            categorySections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Show target category section
            const targetSection = document.getElementById(targetCategory);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });
    
    // Service card animations
    const serviceCards = document.querySelectorAll('.detailed-service-card');
    
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
    
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Process steps animation
    const processSteps = document.querySelectorAll('.process-step');
    processSteps.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateX(-50px)';
        step.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(step);
    });
    
    // Safety cards hover effects
    const safetyCards = document.querySelectorAll('.safety-card');
    safetyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Detailed service card interactions
    const detailedCards = document.querySelectorAll('.detailed-service-card');
    detailedCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 20px 40px rgba(45, 189, 232, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 10px 30px rgba(45, 189, 232, 0.1)';
        });
    });
    
    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Service inquiry form (if added)
    function createServiceInquiry(serviceName) {
        const message = `مرحباً، أريد الاستفسار عن خدمة ${serviceName}`;
        const phoneNumber = '201016809096';
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, '_blank');
    }
    
    // Add click handlers for service cards to allow inquiries
    detailedCards.forEach(card => {
        const serviceTitle = card.querySelector('h3').textContent;
        const inquiryBtn = document.createElement('button');
        inquiryBtn.className = 'btn btn-outline service-inquiry-btn';
        inquiryBtn.innerHTML = '<i class="fab fa-whatsapp"></i> استفسار عبر واتساب';
        inquiryBtn.addEventListener('click', () => createServiceInquiry(serviceTitle));
        
        // Add the button to the card
        const serviceDetails = card.querySelector('.service-details');
        if (serviceDetails) {
            serviceDetails.appendChild(inquiryBtn);
        }
    });
    
    // Price calculator (basic)
    function showPriceEstimator() {
        // This would typically open a modal or navigate to a form
        alert('سيتم توجيهك إلى نموذج تقدير السعر');
    }
    
    // Category statistics counter
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const start = 0;
            const startTime = performance.now();
            
            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                const current = Math.floor(start + (target - start) * progress);
                counter.textContent = current;
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            }
            
            observer.observe(counter);
            counter.addEventListener('animationstart', () => {
                requestAnimationFrame(updateCounter);
            });
        });
    }
    
    // Call functions
    animateCounters();
    
    console.log('Services page JavaScript loaded successfully!');
});
