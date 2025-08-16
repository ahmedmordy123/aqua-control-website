// Contact Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = question.querySelector('i');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faq => {
                faq.classList.remove('active');
                faq.querySelector('.faq-answer').style.maxHeight = '0';
                faq.querySelector('.faq-question i').style.transform = 'rotate(0deg)';
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });
    
    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    const submitBtn = contactForm.querySelector('.form-submit');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
        submitBtn.disabled = true;
        
        // Collect form data
        const formData = new FormData(contactForm);
        const data = {};
        
        // Regular form fields
        for (let [key, value] of formData.entries()) {
            if (key === 'service-type') {
                if (!data[key]) data[key] = [];
                data[key].push(value);
            } else {
                data[key] = value;
            }
        }
        
        // Validate form
        if (validateForm(data)) {
            // Simulate form submission
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> تم الإرسال بنجاح';
                submitBtn.style.background = '#4CAF50';
                
                // Show success message
                showMessage('تم إرسال طلبك بنجاح! سنتواصل معك خلال 24 ساعة.', 'success');
                
                // Reset form after delay
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
                
                // Send WhatsApp message with form data
                sendWhatsAppMessage(data);
                
            }, 2000);
        } else {
            // Reset button on validation error
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
    
    // Form validation
    function validateForm(data) {
        let isValid = true;
        const requiredFields = ['name', 'phone', 'governorate', 'property-type'];
        
        requiredFields.forEach(field => {
            const input = document.getElementById(field);
            if (!data[field] || data[field].trim() === '') {
                showFieldError(input, `هذا الحقل مطلوب`);
                isValid = false;
            } else {
                clearFieldError(input);
            }
        });
        
        // Validate phone number
        if (data.phone && !isValidPhone(data.phone)) {
            showFieldError(document.getElementById('phone'), 'رقم الهاتف غير صحيح');
            isValid = false;
        }
        
        // Validate email if provided
        if (data.email && !isValidEmail(data.email)) {
            showFieldError(document.getElementById('email'), 'البريد الإلكتروني غير صحيح');
            isValid = false;
        }
        
        // Validate service type selection
        if (!data['service-type'] || data['service-type'].length === 0) {
            showMessage('يرجى اختيار نوع الخدمة المطلوبة', 'error');
            isValid = false;
        }
        
        // Validate privacy checkbox
        if (!data.privacy) {
            showMessage('يرجى الموافقة على سياسة الخصوصية', 'error');
            isValid = false;
        }
        
        return isValid;
    }
    
    // Phone validation
    function isValidPhone(phone) {
        const phoneRegex = /^[0-9]{11}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }
    
    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Show field error
    function showFieldError(input, message) {
        clearFieldError(input);
        input.classList.add('error');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        input.parentNode.appendChild(errorDiv);
    }
    
    // Clear field error
    function clearFieldError(input) {
        input.classList.remove('error');
        const existingError = input.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }
    
    // Clear errors on input
    const formInputs = contactForm.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
    
    // Send WhatsApp message with form data
    function sendWhatsAppMessage(data) {
        const phoneNumber = '201016809096';
        let message = `🌟 طلب خدمة جديد من موقع أكوا كنترول 🌟\n\n`;
        message += `👤 الاسم: ${data.name}\n`;
        message += `📞 الهاتف: ${data.phone}\n`;
        message += `📍 المحافظة: ${data.governorate}\n`;
        message += `🏠 نوع المكان: ${data['property-type']}\n`;
        
        if (data['service-type']) {
            message += `🛠️ الخدمات المطلوبة: ${data['service-type'].join(', ')}\n`;
        }
        
        if (data.urgency) {
            message += `⚡ الأولوية: ${data.urgency}\n`;
        }
        
        if (data['preferred-time']) {
            message += `🕐 الوقت المفضل: ${data['preferred-time']}\n`;
        }
        
        if (data.message) {
            message += `📝 تفاصيل إضافية: ${data.message}\n`;
        }
        
        message += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        message += `🌐 تم الإرسال من: موقع أكوا كنترول\n`;
        message += `📱 للتواصل السريع: +20 10 16809096`;
        
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        
        // Add button to open WhatsApp
        setTimeout(() => {
            const whatsappBtn = document.createElement('a');
            whatsappBtn.href = whatsappURL;
            whatsappBtn.target = '_blank';
            whatsappBtn.className = 'btn btn-success whatsapp-followup';
            whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i> أرسل عبر واتساب أيضاً';
            whatsappBtn.style.cssText = `
                position: fixed;
                bottom: 20px;
                left: 20px;
                z-index: 10000;
                background: #25D366;
                animation: pulse 2s infinite;
            `;
            
            document.body.appendChild(whatsappBtn);
            
            // Remove after 10 seconds
            setTimeout(() => {
                whatsappBtn.remove();
            }, 10000);
        }, 3000);
    }
    
    // Message display function (reuse from main script)
    function showMessage(message, type) {
        const existingMessage = document.querySelector('.message-alert');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message-alert ${type}`;
        messageDiv.textContent = message;
        
        messageDiv.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : '#f44336'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            font-weight: 500;
            max-width: 350px;
            text-align: right;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.parentNode.removeChild(messageDiv);
                }
            }, 300);
        }, 5000);
    }
    
    // Auto-fill current time preference based on time of day
    const currentHour = new Date().getHours();
    const timeSelect = document.getElementById('preferred-time');
    
    if (currentHour >= 9 && currentHour < 12) {
        timeSelect.value = 'صباحاً';
    } else if (currentHour >= 12 && currentHour < 15) {
        timeSelect.value = 'ظهراً';
    } else if (currentHour >= 15 && currentHour < 18) {
        timeSelect.value = 'عصراً';
    } else if (currentHour >= 18 && currentHour < 21) {
        timeSelect.value = 'مساءً';
    }
    
    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, '');
        if (value.length > 11) {
            value = value.slice(0, 11);
        }
        this.value = value;
    });
    
    // Enhanced WhatsApp integration
    const whatsappButtons = document.querySelectorAll('.whatsapp-btn');
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const phoneNumber = '201016809096';
            const message = 'مرحباً، أريد الاستفسار عن خدمات مكافحة الحشرات والقوارض';
            const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
            window.open(whatsappURL, '_blank');
        });
    });
    
    // Service area highlighting
    const areaGroups = document.querySelectorAll('.area-group');
    areaGroups.forEach(group => {
        group.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(45, 189, 232, 0.15)';
        });
        
        group.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Add CSS for pulse animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        .field-error {
            color: #f44336;
            font-size: 0.85rem;
            margin-top: 0.5rem;
        }
        .form input.error,
        .form select.error,
        .form textarea.error {
            border-color: #f44336;
            box-shadow: 0 0 0 2px rgba(244, 67, 54, 0.2);
        }
    `;
    document.head.appendChild(style);
    
    console.log('Contact page JavaScript loaded successfully!');
});
