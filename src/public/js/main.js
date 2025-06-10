document.addEventListener('DOMContentLoaded', function() {
    // ====== Navigation Menu ======
    // (Removed nav-link click handler to allow normal navigation)

    // ====== Hero Section Animations ======
    const notifications = document.querySelectorAll('.notification');
    const steps = document.querySelectorAll('.step');
    
    // Animate notifications sequentially
    function animateNotifications() {
        notifications.forEach((notification, index) => {
            // Initial state - hide all notifications
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(50px)';
            notification.style.transition = 'all 0.5s ease';
            
            // Animate each notification with delay
            setTimeout(() => {
                notification.style.opacity = '1';
                notification.style.transform = 'translateX(0)';
            }, 1000 * (index + 1));
        });
    }
    
    // Run animation on page load
    animateNotifications();

    // ====== Filter Buttons ======
    const filterButtons = document.querySelectorAll('.filters button');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            // Add active class to clicked button
            this.classList.add('active');
        });
    });

    // ====== About Us Tabs ======
    const tabs = document.querySelectorAll('.tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => {
                t.classList.remove('active');
            });
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Here you would typically show/hide content based on tab
            // For now just a placeholder, would need content sections to manipulate
            console.log('Tab clicked:', this.textContent);
        });
    });

    // ====== FAQ Questions ======
    const faqQuestions = document.querySelectorAll('.faq-question');
    const faqAnswer = document.querySelector('.faq-answer');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            // Remove active class from all questions
            faqQuestions.forEach(q => {
                q.classList.remove('active');
            });
            // Add active class to clicked question
            this.classList.add('active');
            
            // Change answer content based on question (placeholder)
            // In a real implementation, you'd have multiple answer divs or data attributes
            const questionText = this.textContent;
            
            // Simple content switch example
            if (questionText.includes('payment methods')) {
                faqAnswer.innerHTML = `
                    <div class="faq-card">
                        <img src="/img/icons/credit-card.svg" alt="Credit Card" />
                        <h3>Credit & Debit Cards</h3>
                        <p>We accept all major credit and debit cards for payment</p>
                    </div>
                    <div class="faq-card">
                        <img src="/img/icons/digital-wallet.svg" alt="Digital Wallet" />
                        <h3>Digital Wallets</h3>
                        <p>Pay easily with Apple Pay, Google Pay, and other digital wallets</p>
                    </div>
                    <div class="faq-card">
                        <img src="/img/icons/cash.svg" alt="Cash" />
                        <h3>Cash on Delivery</h3>
                        <p>Pay with cash when your order arrives at your doorstep</p>
                    </div>`;
            } else if (questionText.includes('track my order')) {
                faqAnswer.innerHTML = `
                    <div class="faq-card">
                        <img src="/img/icons/track.svg" alt="Track Order" />
                        <h3>Real-time Tracking</h3>
                        <p>Watch your order's journey from restaurant to your doorstep in real-time</p>
                    </div>
                    <div class="faq-card">
                        <img src="/img/icons/app.svg" alt="Mobile App" />
                        <h3>Mobile App</h3>
                        <p>Get push notifications about your order status on our mobile app</p>
                    </div>
                    <div class="faq-card">
                        <img src="/img/icons/support.svg" alt="Support" />
                        <h3>Customer Support</h3>
                        <p>Contact our support team anytime for updates on your order</p>
                    </div>`;
            } else if (questionText.includes('discounts')) {
                faqAnswer.innerHTML = `
                    <div class="faq-card">
                        <img src="/img/icons/promotion.svg" alt="Promotions" />
                        <h3>Special Promotions</h3>
                        <p>Regular discounts and promotional offers throughout the year</p>
                    </div>
                    <div class="faq-card">
                        <img src="/img/icons/loyalty.svg" alt="Loyalty Program" />
                        <h3>Loyalty Program</h3>
                        <p>Earn points with every order and redeem them for discounts</p>
                    </div>
                    <div class="faq-card">
                        <img src="/img/icons/referral.svg" alt="Referral" />
                        <h3>Referral Program</h3>
                        <p>Get discounts by referring friends and family to Foodzie</p>
                    </div>`;
            }
        });
    });

    // ====== Search Bar Functionality ======
    const searchForm = document.querySelector('.search-bar');
    
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchInput = this.querySelector('input');
            const postcodeValue = searchInput.value.trim();
            
            if (postcodeValue) {
                // Simple validation demo
                const postcodePattern = /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i;
                
                if (postcodePattern.test(postcodeValue)) {
                    alert(`Thank you! Searching for restaurants near ${postcodeValue}`);
                    // Here you would redirect or show results
                } else {
                    alert('Please enter a valid VN postcode');
                    searchInput.focus();
                }
            } else {
                alert('Please enter a postcode to continue');
                searchInput.focus();
            }
        });
    }

    // ====== Newsletter Subscription ======
    const subscribeForm = document.querySelector('.subscribe-form');
    
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const emailValue = emailInput.value.trim();
            
            if (emailValue && isValidEmail(emailValue)) {
                // Success message
                alert(`Thank you for subscribing with ${emailValue}! You'll receive our latest deals.`);
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address');
                emailInput.focus();
            }
        });
    }
    
    // Email validation helper
    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    // ====== Change Location Functionality ======
    const changeLocationBtn = document.querySelector('.change-location');
    
    if (changeLocationBtn) {
        changeLocationBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Redirect to delivery location page
            window.location.href = '/delivery-location';
        });
    }

    // ====== Cart Checkout Button ======
    const checkoutBtn = document.querySelector('.dropdown-btn');
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            // In a real app, this would redirect to checkout page
            alert('Proceeding to checkout with your 23 items. Total: $79.89');
        });
    }

    // ====== Scroll Animation for Categories and Restaurants ======
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px'
    };

    const fadeInOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply to category cards
    document.querySelectorAll('.category-card, .restaurant-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        fadeInOnScroll.observe(card);
    });

    // ====== Sticky Header Logic ======
    const header = document.querySelector('.header');
    const topBar = document.querySelector('.top-bar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
            
            // Hide top bar on scroll down
            if (window.scrollY > lastScrollY) {
                topBar.style.height = '0';
                topBar.style.overflow = 'hidden';
                topBar.style.padding = '0';
                topBar.style.margin = '0';
            } else {
                // Show top bar on scroll up
                topBar.style.height = '60px';
            }
        } else {
            header.style.boxShadow = 'none';
            topBar.style.height = '60px';
        }
        
        lastScrollY = window.scrollY;
    });

    // ====== Deal Card Effects ======
    document.querySelectorAll('.deal-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const badge = this.querySelector('.badge');
            if (badge) {
                badge.style.transform = 'scale(1.1)';
                badge.style.backgroundColor = '#FFD95E';
                badge.style.color = '#423C3C';
                badge.style.transition = 'all 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const badge = this.querySelector('.badge');
            if (badge) {
                badge.style.transform = 'scale(1)';
                badge.style.backgroundColor = '#1c2a3a';
                badge.style.color = '#fff';
            }
        });
    });

    // ====== Modal Logic for Login/Signup ======
    const loginBtn = document.querySelector('.login-signup');
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const closeLoginBtn = document.getElementById('closeModal');
    const closeSignupBtn = document.getElementById('closeSignupModal');

    // Open login modal
    if (loginBtn && loginModal) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.classList.add('active');
        });
    }

    // Close login modal
    if (closeLoginBtn && loginModal) {
        closeLoginBtn.addEventListener('click', function() {
            loginModal.classList.remove('active');
        });
    }

    // Close signup modal
    if (closeSignupBtn && signupModal) {
        closeSignupBtn.addEventListener('click', function() {
            signupModal.classList.remove('active');
        });
    }

    // Switch to signup modal from login modal
    const switchToSignup = document.getElementById('switchToSignup');
    if (switchToSignup && loginModal && signupModal) {
        switchToSignup.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.classList.remove('active');
            signupModal.classList.add('active');
        });
    }

    // Switch to login modal from signup modal
    const switchToLogin = document.getElementById('switchToLogin');
    if (switchToLogin && loginModal && signupModal) {
        switchToLogin.addEventListener('click', function(e) {
            e.preventDefault();
            signupModal.classList.remove('active');
            loginModal.classList.add('active');
        });
    }

    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            loginModal.classList.remove('active');
        }
        if (e.target === signupModal) {
            signupModal.classList.remove('active');
        }
    });

    // ====== User Dropdown Logic ======
    const userDropdownToggle = document.getElementById('userDropdownToggle');
    const userDropdownMenu = document.getElementById('userDropdownMenu');

    if (userDropdownToggle && userDropdownMenu) {
        userDropdownToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            const isOpen = userDropdownMenu.style.display === 'block';
            userDropdownMenu.style.display = isOpen ? 'none' : 'block';
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!userDropdownMenu.contains(e.target) && !userDropdownToggle.contains(e.target)) {
                userDropdownMenu.style.display = 'none';
            }
        });
    }

    // Initialize other components if needed
    console.log('Foodzie website initialized successfully!');
});