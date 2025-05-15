document.addEventListener('DOMContentLoaded', function() {
    // ====== Navigation Menu ======
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Set active navigation link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Check if the link has a valid href (not "#" or empty)
            if (this.getAttribute('href') === '#' || !this.getAttribute('href')) {
                e.preventDefault(); // Prevent default only for non-navigational links
            }

            // Remove active class from all links
            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
            });

            // Add active class to clicked link
            this.classList.add('active');
        });
    });

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
                    alert('Please enter a valid UK postcode');
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

    // Other event handlers and functionality
    // ====== Change Location Functionality ======
    const changeLocationBtn = document.querySelector('.change-location');
    
    if (changeLocationBtn) {
        changeLocationBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Simple implementation using prompt
            const newLocation = prompt('Enter your new delivery location:', '');
            
            if (newLocation && newLocation.trim() !== '') {
                // Update location text
                const locationSpan = document.querySelector('.location span');
                if (locationSpan) {
                    locationSpan.textContent = ` ${newLocation}`;
                }
            }
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

    // Initialize other components if needed
    console.log('Foodzie website initialized successfully!');

    //Modal Login and Signup
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const loginSignupBtn = document.querySelector('.login-signup');
    const closeModalBtn = document.getElementById('closeModal');
    const closeSignupModalBtn = document.getElementById('closeSignupModal');
    const switchToSignupBtn = document.getElementById('switchToSignup');
    const switchToLoginBtn = document.getElementById('switchToLogin');
    
    // Function to open login modal
    function openLoginModal() {
        loginModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    
    // Function to close login modal
    function closeLoginModal() {
        loginModal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    // Function to open signup modal
    function openSignupModal() {
        loginModal.classList.remove('active');
        signupModal.classList.add('active');
    }
    
    // Function to close signup modal
    function closeSignupModal() {
        signupModal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    // Function to switch from signup to login
    function switchToLogin() {
        signupModal.classList.remove('active');
        loginModal.classList.add('active');
    }
    
    // Event listeners
    if (loginSignupBtn) {
        loginSignupBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openLoginModal();
        });
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeLoginModal);
    }
    
    if (closeSignupModalBtn) {
        closeSignupModalBtn.addEventListener('click', closeSignupModal);
    }
    
    if (switchToSignupBtn) {
        switchToSignupBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openSignupModal();
        });
    }
    
    if (switchToLoginBtn) {
        switchToLoginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            switchToLogin();
        });
    }
    
    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === loginModal) {
            closeLoginModal();
        } else if (event.target === signupModal) {
            closeSignupModal();
        }
    });
    
    // Handle form submissions (prevent default behavior)
    // const forms = document.querySelectorAll('.login-form');
    // forms.forEach(form => {
    //     form.addEventListener('submit', function(e) {
    //         e.preventDefault();
    //         // Show an alert
    //         const isLogin = form.closest('#loginModal') !== null;
    //         alert(isLogin ? 'Login submitted' : 'Signup submitted');
    //         // Close the modal after submission
    //         isLogin ? closeLoginModal() : closeSignupModal();
    //     });
    // });
    
    // Close modals when pressing ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLoginModal();
            closeSignupModal();
        }
    });
});