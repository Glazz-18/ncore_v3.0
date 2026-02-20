// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initScrollProgress();
    initMobileMenu();
    initCounters();
    initModals();
    initFAQ();
    initFormValidation();
    initSmoothScrolling();
    initScrollEffects();
    initParallax();
    initAnimateOnScroll();
    initHeaderScroll();
    initQuoteInteractivity();
    initGallery();
    initContactForm();
    initModals();
    initImpactCarousel();
    initGetInvolved();
    initProgramsCarousel();
    initEngagementTabs();
    initAdvisoryCarousel();
});

// Impact Carousel - Auto-scrolling
function initImpactCarousel() {
    const carouselTrack = document.querySelector('.impact-carousel-track');
    if (!carouselTrack) return;
    
    // Clone all cards for seamless infinite scroll
    const cards = carouselTrack.querySelectorAll('.impact-card');
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        carouselTrack.appendChild(clone);
    });
    
    // Reset animation when it completes (for seamless loop)
    carouselTrack.addEventListener('animationiteration', function() {
        // The animation will loop seamlessly with duplicated cards
    });
}

// Programs Grid - No carousel needed, simple grid layout
function initProgramsCarousel() {
    // No JavaScript needed for grid layout
    return;
}

// Advisory Carousel
// Advisory Carousel - Infinite Smooth Scroll
function initAdvisoryCarousel() {
    const carouselTrack = document.querySelector('.advisory-carousel-track');
    const prevBtn = document.querySelector('.advisory-carousel-prev');
    const nextBtn = document.querySelector('.advisory-carousel-next');
    const indicatorsContainer = document.querySelector('.advisory-carousel-indicators');
    
    if (!carouselTrack || !prevBtn || !nextBtn || !indicatorsContainer) return;
    
    const cards = carouselTrack.querySelectorAll('.advisory-card');
    if (cards.length === 0) return;
    
    let currentIndex = 0;
    let cardsPerView = 3;
    let autoScrollInterval;
    
    // Calculate cards per view based on screen size
    function updateCardsPerView() {
        if (window.innerWidth <= 768) {
            cardsPerView = 1;
        } else if (window.innerWidth <= 1024) {
            cardsPerView = 2;
        } else {
            cardsPerView = 3;
        }
    }
    
    updateCardsPerView();
    window.addEventListener('resize', () => {
        updateCardsPerView();
        updateCarousel();
    });
    
    // Create indicators
    const totalSlides = Math.ceil(cards.length / cardsPerView);
    for (let i = 0; i < totalSlides; i++) {
        const indicator = document.createElement('button');
        indicator.className = 'advisory-carousel-indicator';
        if (i === 0) indicator.classList.add('active');
        indicator.setAttribute('aria-label', `Go to slide ${i + 1}`);
        indicator.addEventListener('click', () => goToSlide(i));
        indicatorsContainer.appendChild(indicator);
    }
    
    const indicators = indicatorsContainer.querySelectorAll('.advisory-carousel-indicator');
    
    function updateCarousel() {
        const cardWidth = cards[0].offsetWidth;
        const gap = 32; // 2rem in pixels
        const translateX = -(currentIndex * (cardWidth + gap) * cardsPerView);
        carouselTrack.style.transform = `translateX(${translateX}px)`;
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
        
        // Update button states
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= totalSlides - 1;
    }
    
    function goToSlide(index) {
        currentIndex = Math.max(0, Math.min(index, totalSlides - 1));
        updateCarousel();
        resetAutoScroll();
    }
    
    function nextSlide() {
        if (currentIndex < totalSlides - 1) {
            currentIndex++;
            updateCarousel();
        } else {
            // Loop back to start
            currentIndex = 0;
            updateCarousel();
        }
        resetAutoScroll();
    }
    
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        } else {
            // Loop to end
            currentIndex = totalSlides - 1;
            updateCarousel();
        }
        resetAutoScroll();
    }
    
    function resetAutoScroll() {
        clearInterval(autoScrollInterval);
        autoScrollInterval = setInterval(() => {
            nextSlide();
        }, 2000);
    }
    
    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            nextSlide();
        }, 2000);
    }
    
    nextBtn.addEventListener('click', () => {
        nextSlide();
    });
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
    });
    
    // Touch/swipe support
    let startX = 0;
    let isDragging = false;
    
    carouselTrack.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });
    
    carouselTrack.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
    });
    
    carouselTrack.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    });
    
    // Pause auto-scroll on hover
    const carouselWrapper = document.querySelector('.advisory-carousel-wrapper');
    if (carouselWrapper) {
        carouselWrapper.addEventListener('mouseenter', () => {
            clearInterval(autoScrollInterval);
        });
        
        carouselWrapper.addEventListener('mouseleave', () => {
            startAutoScroll();
        });
    }
    
    // Initialize
    updateCarousel();
    startAutoScroll();
}

// Engagement Tabs
function initEngagementTabs() {
    const tabButtons = document.querySelectorAll('.engagement-tab-btn');
    const tabPanels = document.querySelectorAll('.engagement-tab-panel');
    
    if (tabButtons.length === 0) return;
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button and corresponding panel
            button.classList.add('active');
            const targetPanel = document.getElementById(targetTab);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

// Get Involved Items - Make clickable
function initGetInvolved() {
    const items = document.querySelectorAll('.get-involved-item');
    items.forEach(item => {
        item.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            if (modalId) {
                const modal = document.getElementById(modalId);
                if (modal && typeof openModal === 'function') {
                    openModal(modal);
                } else if (modal) {
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                }
            }
        });
    });
}

// Gallery Functionality
function initGallery() {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const galleryBtns = document.querySelectorAll('.gallery-btn');
    const scrollItems = document.querySelectorAll('.scroll-item');
    
    let currentSlide = 0;
    let slideInterval;
    
    // Initialize slideshow
    function initSlideshow() {
        if (slides.length === 0) return;
        
        showSlide(currentSlide);
        startSlideshow();
        
        // Auto-advance slides
        function startSlideshow() {
            slideInterval = setInterval(() => {
                nextSlide();
            }, 5000);
        }
        
        function stopSlideshow() {
            clearInterval(slideInterval);
        }
        
        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            
            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === index);
            });
            
            currentSlide = index;
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
        
        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }
        
        // Navigation controls
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                stopSlideshow();
                setTimeout(startSlideshow, 3000);
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                stopSlideshow();
                setTimeout(startSlideshow, 3000);
            });
        }
        
        // Indicator controls
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                showSlide(index);
                stopSlideshow();
                setTimeout(startSlideshow, 3000);
            });
        });
        
        // Pause on hover
        const slideshowContainer = document.querySelector('.slideshow-container');
        if (slideshowContainer) {
            slideshowContainer.addEventListener('mouseenter', stopSlideshow);
            slideshowContainer.addEventListener('mouseleave', startSlideshow);
        }
    }
    
    // Gallery filtering
    function initGalleryFiltering() {
        galleryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                
                // Update active button
                galleryBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Filter slides
                slides.forEach(slide => {
                    const category = slide.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        slide.style.display = 'block';
                    } else {
                        slide.style.display = 'none';
                    }
                });
                
                // Filter scroll items
                scrollItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
                
                // Reset to first slide if current slide is hidden
                if (filter !== 'all') {
                    const visibleSlides = Array.from(slides).filter(slide => slide.style.display !== 'none');
                    if (visibleSlides.length > 0) {
                        const firstVisibleIndex = Array.from(slides).indexOf(visibleSlides[0]);
                        showSlide(firstVisibleIndex);
                    }
                }
            });
        });
    }
    
    // Scroll gallery interactions
    function initScrollGallery() {
        scrollItems.forEach(item => {
            item.addEventListener('click', () => {
                // Add click animation
                item.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    item.style.transform = '';
                }, 150);
                
                // You can add modal or lightbox functionality here
                console.log('Scroll item clicked:', item.querySelector('img').alt);
            });
        });
    }
    
    // Initialize all gallery functionality
    initSlideshow();
    initGalleryFiltering();
    initScrollGallery();
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            if (prevBtn) prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            if (nextBtn) nextBtn.click();
        }
    });
}

// Contact Form Functionality
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const steps = form.querySelectorAll('.form-step');
    const prevBtn = form.querySelector('.btn-prev');
    const nextBtn = form.querySelector('.btn-next');
    const submitBtn = form.querySelector('.btn-submit');
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    const charCounter = document.querySelector('.char-count');
    const textarea = form.querySelector('#message');
    
    let currentStep = 1;
    const totalSteps = steps.length;
    
    // Initialize form
    function initForm() {
        updateStepDisplay();
        updateProgress();
        updateNavigationButtons();
        
        // Character counter for textarea
        if (textarea && charCounter) {
            textarea.addEventListener('input', () => {
                const count = textarea.value.length;
                charCounter.textContent = count;
                
                if (count > 500) {
                    charCounter.style.color = 'var(--error-color, #e74c3c)';
                    textarea.value = textarea.value.substring(0, 500);
                    charCounter.textContent = '500';
                } else {
                    charCounter.style.color = 'var(--text-secondary)';
                }
            });
        }
        
        // Form validation
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    }
    
    // Step navigation
    function nextStep() {
        if (validateCurrentStep()) {
            if (currentStep < totalSteps) {
                currentStep++;
                updateStepDisplay();
                updateProgress();
                updateNavigationButtons();
                scrollToForm();
            }
        }
    }
    
    function prevStep() {
        if (currentStep > 1) {
            currentStep--;
            updateStepDisplay();
            updateProgress();
            updateNavigationButtons();
            scrollToForm();
        }
    }
    
    function updateStepDisplay() {
        steps.forEach((step, index) => {
            step.classList.toggle('active', index + 1 === currentStep);
        });
    }
    
    function updateProgress() {
        if (progressFill) {
            const percentage = (currentStep / totalSteps) * 100;
            progressFill.style.transition = 'width 0.8s ease';
            progressFill.style.width = `${percentage}%`;
        }
        
        if (progressText) {
            progressText.textContent = `Step ${currentStep} of ${totalSteps}`;
        }
    }
    
    function updateNavigationButtons() {
        if (prevBtn) {
            prevBtn.disabled = currentStep === 1;
        }
        
        if (nextBtn) {
            if (currentStep === totalSteps) {
                nextBtn.style.display = 'none';
                if (submitBtn) {
                    submitBtn.style.display = 'inline-flex';
                }
            } else {
                nextBtn.style.display = 'inline-flex';
                if (submitBtn) {
                    submitBtn.style.display = 'none';
                }
            }
        }
    }
    
    function scrollToForm() {
        const formCard = document.querySelector('.form-card');
        if (formCard) {
            setTimeout(() => {
                formCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300);
        }
    }
    
    // Form validation
    function validateCurrentStep() {
        const currentStepElement = form.querySelector(`.form-step[data-step="${currentStep}"]`);
        if (!currentStepElement) return true;
        
        const requiredFields = currentStepElement.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!validateField({ target: field })) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        const fieldContainer = field.closest('.form-group');
        let isValid = true;
        let errorMessage = '';
        
        // Remove existing error
        clearFieldError(e);
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }
        
        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }
        
        // Phone validation
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(value.replace(/\s/g, ''))) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
        }
        
        // Show error if invalid
        if (!isValid) {
            showFieldError(fieldContainer, errorMessage);
            field.style.borderColor = 'var(--error-color, #e74c3c)';
        } else {
            field.style.borderColor = 'var(--success-color, #27ae60)';
        }
        
        return isValid;
    }
    
    function showFieldError(container, message) {
        if (!container) return;
        
        // Remove existing error
        const existingError = container.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.color = 'var(--error-color, #e74c3c)';
        errorElement.style.fontSize = '0.8rem';
        errorElement.style.marginTop = '0.3rem';
        
        container.appendChild(errorElement);
    }
    
    function clearFieldError(e) {
        const field = e.target;
        const fieldContainer = field.closest('.form-group');
        const errorElement = fieldContainer?.querySelector('.field-error');
        
        if (errorElement) {
            errorElement.remove();
        }
        
        field.style.borderColor = '';
    }
    
    // Form submission
    function handleSubmit(e) {
        e.preventDefault();
        
        if (!validateCurrentStep()) {
            return;
        }
        
        // Show loading state
        if (submitBtn) {
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
        }
        
        // Simulate form submission
        setTimeout(() => {
            if (submitBtn) {
                submitBtn.classList.remove('loading');
                submitBtn.classList.add('success');
                
                setTimeout(() => {
                    // Show success message
                    showNotification('Message sent successfully! We\'ll get back to you within 24 hours.', 'success');
                    
                    // Reset form
                    form.reset();
                    currentStep = 1;
                    updateStepDisplay();
                    updateProgress();
                    updateNavigationButtons();
                    
                    if (charCounter) {
                        charCounter.textContent = '0';
                    }
                    
                    // Reset submit button
                    setTimeout(() => {
                        submitBtn.classList.remove('success');
                        submitBtn.disabled = false;
                    }, 3000);
                }, 2000);
            }
        }, 3000);
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}</span>
                <span class="notification-message">${message}</span>
            </div>
        `;
        
        // Add notification styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'var(--success-color, #27ae60)' : type === 'error' ? 'var(--error-color, #e74c3c)' : 'var(--primary-color)'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.6s ease;
            max-width: 400px;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 200);
        
        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 500);
        }, 6000);
    }
    
    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', nextStep);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevStep);
    }
    
    if (submitBtn) {
        submitBtn.addEventListener('click', handleSubmit);
    }
    
    // Keyboard navigation
    form.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && currentStep < totalSteps) {
            e.preventDefault();
            nextStep();
        }
    });
    
    // Initialize form
    initForm();
}

// Modal Functionality
function initModals() {
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const modals = document.querySelectorAll('.modal');
    const modalCloses = document.querySelectorAll('.modal-close');
    
    // Open modal
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = trigger.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                openModal(modal);
            }
        });
    });
    
    // Close modal
    modalCloses.forEach(closeBtn => {
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const modal = closeBtn.closest('.modal');
            if (modal) {
                closeModal(modal);
            }
        });
    });
    
    // Close modal on backdrop click
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('modal-backdrop')) {
                closeModal(modal);
            }
        });
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                closeModal(activeModal);
            }
        }
    });
    
    // Initialize modal forms
    initModalForms();
}

function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus first input
    const firstInput = modal.querySelector('input, select, textarea');
    if (firstInput) {
        setTimeout(() => firstInput.focus(), 300);
    }
    
    // Initialize modal-specific functionality
    if (modal.id === 'donate-modal') {
        initDonationModal();
    }
}

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Reset forms
    const form = modal.querySelector('form');
    if (form) {
        form.reset();
        resetFormStates(form);
    }
}

function resetFormStates(form) {
    // Reset button states
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.classList.remove('loading', 'success');
        submitBtn.disabled = false;
    }
    
    // Reset amount selection
    const amountBtns = form.querySelectorAll('.amount-btn');
    amountBtns.forEach(btn => btn.classList.remove('selected'));
    
    // Hide custom amount input
    const customInput = form.querySelector('.custom-amount-input');
    if (customInput) {
        customInput.style.display = 'none';
    }
}

function initModalForms() {
    // Volunteer Form
    const volunteerForm = document.getElementById('volunteer-form');
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', handleVolunteerSubmit);
    }
    
    // Partner Form
    const partnerForm = document.getElementById('partner-form');
    if (partnerForm) {
        partnerForm.addEventListener('submit', handlePartnerSubmit);
    }

    const contactform = document.getElementById('contact-form');
    if (contactform) {
        contactform.addEventListener('submit', handlePartnerSubmit);
    }
    const collabform = document.getElementById('collab-form');
    if (collabform) {
        collabform.addEventListener('submit', handlePartnerSubmit);
    }

}

function initDonationModal() {
    const modal = document.getElementById('donate-modal');
    if (!modal) return;
    
    const amountBtns = modal.querySelectorAll('.amount-btn');
    const customAmountBtn = modal.querySelector('.amount-btn.custom-amount');
    const customAmountInput = modal.querySelector('.custom-amount-input');
    const customAmountField = modal.querySelector('#custom-amount');
    const donateForm = modal.querySelector('#donate-form');
    
    // Amount button selection
    amountBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove selected from all buttons
            amountBtns.forEach(b => b.classList.remove('selected'));
            
            // Add selected to clicked button
            btn.classList.add('selected');
            
            if (btn === customAmountBtn) {
                customAmountInput.style.display = 'block';
                customAmountField.focus();
            } else {
                customAmountInput.style.display = 'none';
                customAmountField.value = '';
            }
        });
    });
    
    // Custom amount input
    customAmountField.addEventListener('input', () => {
        if (customAmountField.value) {
            customAmountBtn.classList.add('selected');
        }
    });
    
    // Form submission
    if (donateForm) {
        donateForm.addEventListener('submit', handleDonationSubmit);
    }
}

const NCORE_CONTACT_EMAIL = 'contact@ncorefoundation.org';
// Backend API base (empty = same origin). Set window.NCORE_FORM_API before script load if API is elsewhere.
const FORM_API_BASE = (typeof window !== 'undefined' && window.NCORE_FORM_API) || '';

function buildMailtoBody(form, extraLines) {
    const lines = [];
    const checkboxGroups = {};
    const add = (label, value) => { if (value != null && String(value).trim() !== '') lines.push(label + ': ' + String(value).trim()); };
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(el => {
        const name = el.name;
        if (!name) return;
        const label = (el.labels && el.labels[0]) ? el.labels[0].textContent.replace(/\s+/g, ' ').trim() : (el.closest('label') ? el.closest('label').textContent.replace(/\s+/g, ' ').trim() : name);
        if (el.type === 'checkbox') {
            if (el.checked) {
                if (!checkboxGroups[name]) checkboxGroups[name] = { label, values: [] };
                checkboxGroups[name].values.push(el.value || 'Yes');
            }
        } else if (el.type === 'radio') {
            if (el.checked) add(label, el.value || 'Yes');
        } else {
            add(label, el.value);
        }
    });
    Object.keys(checkboxGroups).forEach(name => {
        const g = checkboxGroups[name];
        add(g.label, g.values.join(', '));
    });
    if (extraLines && extraLines.length) lines.push('', ...extraLines);
    return lines.join('\r\n');
}

function openMailto(to, subject, body) {
    const mailto = 'mailto:' + encodeURIComponent(to) + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    window.location.href = mailto;
}

/** Send form via backend API. Returns { ok: true } or throws. */
async function sendFormViaAPI(to, subject, text, replyTo) {
    const url = (FORM_API_BASE + '/api/send-form').replace(/\/+/g, '/');
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to, subject, text, replyTo: replyTo || undefined }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || res.statusText || 'Request failed');
    if (data.ok === false) throw new Error(data.error || 'Failed to send');
    return data;
}

function handleVolunteerSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    
    const interests = form.querySelectorAll('input[name="interests"]:checked');
    if (interests.length === 0) {
        showModalNotification('Please select at least one area of interest.', 'error');
        return;
    }
    
    const subject = 'NCORE - Volunteer Application';
    const body = buildMailtoBody(form, []);
    const replyTo = form.querySelector('input[name="email"]')?.value?.trim() || undefined;
    
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    (async function () {
        try {
            await sendFormViaAPI(NCORE_CONTACT_EMAIL, subject, body, replyTo);
            submitBtn.classList.remove('loading');
            submitBtn.classList.add('success');
            showModalNotification('Thank you! Your volunteer application has been sent. We\'ll get back to you within 48 hours.', 'success');
            setTimeout(() => { const m = form.closest('.modal'); if (m) closeModal(m); }, 2500);
        } catch (err) {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            openMailto(NCORE_CONTACT_EMAIL, subject, body);
            showModalNotification('Your email client will open to send your application.', 'info');
            setTimeout(() => { const m = form.closest('.modal'); if (m) closeModal(m); }, 2500);
        }
    })();
}

function handleDonationSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const modal = form.closest('.modal');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    const selectedAmount = getSelectedAmount(modal || form);
    if (!selectedAmount) {
        showModalNotification('Please select a donation amount.', 'error');
        return;
    }
    
    const subject = 'NCORE - Donation';
    const body = 'Donation Amount: ₹' + selectedAmount + '\r\n\r\n' + buildMailtoBody(form, []);
    const replyTo = form.querySelector('input[name="email"]')?.value?.trim() || undefined;
    
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    (async function () {
        try {
            await sendFormViaAPI(NCORE_CONTACT_EMAIL, subject, body, replyTo);
            submitBtn.classList.remove('loading');
            submitBtn.classList.add('success');
            showModalNotification('Thank you for your donation inquiry! We\'ll be in touch shortly.', 'success');
            setTimeout(() => { if (modal) closeModal(modal); }, 2500);
        } catch (err) {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            openMailto(NCORE_CONTACT_EMAIL, subject, body);
            showModalNotification('Your email client will open to complete your donation inquiry.', 'info');
            setTimeout(() => { if (modal) closeModal(modal); }, 2500);
        }
    })();
}

function handlePartnerSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    
    const partnershipTypes = form.querySelectorAll('input[name="partnership_type"]:checked');
    if (partnershipTypes.length === 0) {
        showModalNotification('Please select at least one partnership type.', 'error');
        return;
    }
    
    const subject = 'NCORE - Partnership Inquiry';
    const body = buildMailtoBody(form, []);
    const replyTo = form.querySelector('input[name="contact_email"]')?.value?.trim() || undefined;
    
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    (async function () {
        try {
            await sendFormViaAPI(NCORE_CONTACT_EMAIL, subject, body, replyTo);
            submitBtn.classList.remove('loading');
            submitBtn.classList.add('success');
            showModalNotification('Thank you! Your partnership request has been sent. We\'ll contact you within 72 hours.', 'success');
            setTimeout(() => { const m = form.closest('.modal'); if (m) closeModal(m); }, 2500);
        } catch (err) {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            openMailto(NCORE_CONTACT_EMAIL, subject, body);
            showModalNotification('Your email client will open to send your partnership request.', 'info');
            setTimeout(() => { const m = form.closest('.modal'); if (m) closeModal(m); }, 2500);
        }
    })();
}

function getSelectedAmount(formOrModal) {
    const root = formOrModal && formOrModal.querySelector ? formOrModal : document;
    const selectedBtn = root.querySelector('.amount-btn.selected');
    if (selectedBtn) {
        if (selectedBtn.classList.contains('custom-amount')) {
            const customInput = root.querySelector('#custom-amount');
            const customAmount = customInput ? customInput.value : '';
            return customAmount ? parseInt(customAmount, 10) : null;
        } else {
            return parseInt(selectedBtn.getAttribute('data-amount'), 10);
        }
    }
    return null;
}

function showModalNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `modal-notification modal-notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ'}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--success-color, #27ae60)' : type === 'error' ? 'var(--error-color, #e74c3c)' : 'var(--primary-color)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
        z-index: 10001;
        transform: translateX(100%);
        transition: transform 0.6s ease;
        max-width: 400px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 200);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 400);
    }, 5000);
}

// Scroll Progress Indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Header Scroll Effect
function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

// Enhanced Mobile Menu Toggle with Dropdown Support
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu') || document.querySelector('.menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Handle dropdown toggles (both mobile and desktop)
        const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const dropdown = this.closest('.nav-dropdown');
                const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                
                if (!dropdownMenu) return;
                
                // Use a data attribute to track state reliably
                const isCurrentlyOpen = dropdown.classList.contains('dropdown-open');
                
                // Close all other dropdowns first
                document.querySelectorAll('.nav-dropdown').forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        const otherMenu = otherDropdown.querySelector('.dropdown-menu');
                        if (otherMenu) {
                            otherMenu.style.display = 'none';
                            otherMenu.style.opacity = '0';
                            otherMenu.style.visibility = 'hidden';
                            otherDropdown.classList.remove('dropdown-open', 'active');
                        }
                    }
                });
                
                // Toggle current dropdown
                if (isCurrentlyOpen) {
                    // Close dropdown
                    dropdownMenu.style.display = 'none';
                    dropdownMenu.style.opacity = '0';
                    dropdownMenu.style.visibility = 'hidden';
                    dropdown.classList.remove('dropdown-open', 'active');
                } else {
                    // Open dropdown
                    dropdownMenu.style.display = 'block';
                    dropdownMenu.style.opacity = '1';
                    dropdownMenu.style.visibility = 'visible';
                    dropdownMenu.style.transform = 'translateY(0)';
                    dropdown.classList.add('dropdown-open', 'active');
                }
            });
        });
        
        // Close dropdowns when clicking outside (but not on the toggle itself)
        document.addEventListener('click', function(e) {
            // Don't close if clicking inside a dropdown
            if (e.target.closest('.nav-dropdown')) {
                return;
            }
            
            // Close all dropdowns
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.style.display = 'none';
                menu.style.opacity = '0';
                menu.style.visibility = 'hidden';
            });
            document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
                dropdown.classList.remove('dropdown-open', 'active');
            });
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link, .link, .dropdown-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                // Close all dropdowns
                document.querySelectorAll('.dropdown-menu').forEach(menu => {
                    menu.style.display = 'none';
                });
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                // Close all dropdowns
                document.querySelectorAll('.dropdown-menu').forEach(menu => {
                    menu.style.display = 'none';
                });
            }
        });
    }
}

// Animated Counters with Enhanced Effects
function initCounters() {
    const counters = document.querySelectorAll('.counter-number');
    
    if (counters.length > 0) {
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target') || counter.textContent);
                    animateCounterWithEasing(counter, target);
                    observer.unobserve(counter);
                }
            });
        }, observerOptions);

        counters.forEach(counter => {
            observer.observe(counter);
        });
    }
}

function animateCounterWithEasing(counter, target, duration = 2000) {
    const start = 0;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out-cubic)
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (target - start) * easeProgress);
        
        counter.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Parallax Effects
function initParallax() {
    const parallaxElements = document.querySelectorAll('.hero::before, .hero::after');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.2);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Advanced Scroll Animations
function initAnimateOnScroll() {
    // Add animation classes to elements
    const previewCards = document.querySelectorAll('.preview-card');
    const counterItems = document.querySelectorAll('.counter-item');
    
   
    
    previewCards.forEach((card, index) => {
        if (index % 2 === 0) card.classList.add('animate-on-scroll');
        else card.classList.add('rotate-in');
    });
    
    counterItems.forEach(item => {
        item.classList.add('scale-in');
    });
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll(
        '.animate-on-scroll, .slide-in-left, .slide-in-right, .scale-in, .rotate-in'
    );
    
    if (animatedElements.length > 0) {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, observerOptions);

        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
}

// Modal Functionality
function initModals() {
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modals = document.querySelectorAll('.modal');
    const modalCloses = document.querySelectorAll('.modal-close');

    // Open modal
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = trigger.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                setTimeout(() => {
                    modal.querySelector('.modal-content').style.animation = 'fadeInUp 0.5s ease';
                }, 10);
            }
        });
    });

    // Close modal
    modalCloses.forEach(close => {
        close.addEventListener('click', () => {
            const modal = close.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Close modal when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.style.display === 'block') {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        }
    });
}

// FAQ Functionality
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.closest('.faq-item');
            const answer = faqItem.querySelector('.faq-answer');
            const toggle = question.querySelector('.faq-toggle');
            
            // Close other open FAQs
            const otherAnswers = document.querySelectorAll('.faq-answer.active');
            const otherToggles = document.querySelectorAll('.faq-toggle.active');
            
            otherAnswers.forEach(ans => {
                if (ans !== answer) {
                    ans.classList.remove('active');
                }
            });
            
            otherToggles.forEach(tog => {
                if (tog !== toggle) {
                    tog.classList.remove('active');
                }
            });
            
            // Toggle current FAQ
            answer.classList.toggle('active');
            toggle.classList.toggle('active');
        });
    });
}

// Form Validation
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                // Show success message
                showNotification('Form submitted successfully! 🎉', 'success');
                this.reset();
            }
        });
    });
}

function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            showFieldError(input, 'This field is required');
            isValid = false;
        } else {
            clearFieldError(input);
            
            // Email validation
            if (input.type === 'email' && !isValidEmail(input.value)) {
                showFieldError(input, 'Please enter a valid email address');
                isValid = false;
            }
            
            // Phone validation
            if (input.type === 'tel' && !isValidPhone(input.value)) {
                showFieldError(input, 'Please enter a valid phone number');
                isValid = false;
            }
        }
    });
    
    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

function showFieldError(input, message) {
    clearFieldError(input);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#ef4444';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.5rem';
    errorDiv.style.animation = 'fadeIn 0.3s ease';
    
    input.parentNode.appendChild(errorDiv);
    input.style.borderColor = '#ef4444';
}

function clearFieldError(input) {
    const existingError = input.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    input.style.borderColor = '';
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '1.2rem 2rem',
        borderRadius: '12px',
        color: '#fff',
        fontWeight: '600',
        zIndex: '3000',
        transform: 'translateX(400px)',
        transition: 'transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        maxWidth: '350px',
        wordWrap: 'break-word',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(10px)'
    });
    
    // Set background based on type
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #3b82f6, #2563eb)';
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 500);
    }, 5000);
}

// Smooth Scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = (this.getAttribute('href') || this.hash || '').trim();
            const hashPart = href.includes('#') ? '#' + href.split('#')[1] : (href && href !== '#' ? '#' + href : '');
            if (!hashPart || hashPart === '#') return;
            
            const targetSection = document.getElementById(hashPart.slice(1));
            if (!targetSection) return;
            
            e.preventDefault();
            
            const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
            const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

// Scroll Effects
function initScrollEffects() {
    // Add 3D tilt effect to cards on mouse move
    const cards = document.querySelectorAll('.preview-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
    
    // Button ripple effect
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add ripple animation
    if (!document.getElementById('ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Utility Functions
function debounce(func, wait) {
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Image lazy loading
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
        });
    }
}

// Initialize lazy loading if images exist
if (document.querySelectorAll('img[data-src]').length > 0) {
    initLazyLoading();
}

// Performance optimization: Use Intersection Observer for expensive animations
const performanceOptimizer = {
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    
    shouldAnimate() {
        return !this.reducedMotion;
    }
};

// Enhanced Quote Interactivity
function initQuoteInteractivity() {
    const quoteSection = document.querySelector('#quote');
    const quoteText = document.querySelector('#quote h2');
    
    if (quoteSection && quoteText) {
        // Add click interaction
        quoteText.addEventListener('click', function() {
            // Add ripple effect
            createRippleEffect(this, event);
            
            // Animate quote stats
            const stats = document.querySelectorAll('.quote-stat');
            stats.forEach((stat, index) => {
                setTimeout(() => {
                    stat.style.animation = 'bounce 0.6s ease';
                    setTimeout(() => {
                        stat.style.animation = '';
                    }, 600);
                }, index * 100);
            });
            
            // Show notification
            showNotification('Thank you for believing in our mission! 💚', 'success');
        });
        
        // Add mouse move parallax effect
        quoteText.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
        
        quoteText.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
        
        // Add scroll-triggered animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate particles
                    const particles = document.querySelectorAll('#quote .particle');
                    particles.forEach((particle, index) => {
                        setTimeout(() => {
                            particle.style.animationPlayState = 'running';
                        }, index * 200);
                    });
                    
                    // Animate quote marks
                    const quoteMarks = document.querySelectorAll('#quote h2::before, #quote h2::after');
                    quoteText.style.animation = 'fadeInUp 1s ease-out';
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(quoteSection);
        
        // Add keyboard interaction
        document.addEventListener('keydown', function(e) {
            if (e.key === 'q' || e.key === 'Q') {
                quoteText.click();
            }
        });
    }
}

function createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.8s ease-out;
        pointer-events: none;
        z-index: 10;
    `;
    
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 800);
}

// Export functions for global use
window.NCORE = {
    showNotification,
    validateForm,
    animateCounter: animateCounterWithEasing,
    debounce,
    throttle,
    initQuoteInteractivity
};