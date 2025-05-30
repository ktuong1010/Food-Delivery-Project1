// Restaurant Menu Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Category navigation functionality with smooth scroll
    const categoryTabs = document.querySelectorAll('.category-tab');
    const menuSections = document.querySelectorAll('.menu-items');

    // Smooth scroll to section when tab is clicked
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            categoryTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Get the category
            const category = this.getAttribute('data-category');
            
            // Scroll to the target section
            const targetSection = document.getElementById(category);
            if (targetSection) {
                const navHeight = document.querySelector('.category-nav').offsetHeight;
                const offsetTop = targetSection.offsetTop - navHeight - 10; // Account for sticky nav + small buffer
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll spy functionality to highlight active section
    function updateActiveTab() {
        const sections = document.querySelectorAll('.menu-items, .promotional-offers');
        const navHeight = document.querySelector('.category-nav').offsetHeight;
        const scrollPos = window.scrollY + navHeight + 20; // Account for sticky nav

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                // Remove active class from all tabs
                categoryTabs.forEach(tab => tab.classList.remove('active'));
                
                // Add active class to corresponding tab
                const activeTab = document.querySelector(`[data-category="${sectionId}"]`);
                if (activeTab) {
                    activeTab.classList.add('active');
                }
            }
        });
    }

    // Listen for scroll events to update active tab
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                updateActiveTab();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Menu search functionality
    const searchInput = document.querySelector('.menu-search-input');
    const menuItems = document.querySelectorAll('.menu-item');

    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            
            menuItems.forEach(item => {
                const itemName = item.querySelector('.item-name').textContent.toLowerCase();
                const itemDescription = item.querySelector('.item-description').textContent.toLowerCase();
                
                if (itemName.includes(searchTerm) || itemDescription.includes(searchTerm)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get item details
            const menuItem = this.closest('.menu-item');
            const itemName = menuItem.querySelector('.item-name').textContent;
            const itemPrice = menuItem.querySelector('.item-price').textContent;
            
            // Show success feedback
            this.innerHTML = '✓';
            this.style.backgroundColor = '#28a745';
            
            // Reset button after 1 second
            setTimeout(() => {
                this.innerHTML = '+';
                this.style.backgroundColor = '#2c3e50';
            }, 1000);
            
            // You can add actual cart functionality here
            console.log(`Added to cart: ${itemName} - ${itemPrice}`);
        });
    });

    // Add offer functionality
    const addOfferButtons = document.querySelectorAll('.add-offer-btn');
    
    addOfferButtons.forEach(button => {
        button.addEventListener('click', function() {
            const offerCard = this.closest('.offer-card');
            const offerTitle = offerCard.querySelector('.offer-title').textContent;
            
            // Show success feedback
            this.innerHTML = '✓';
            this.style.backgroundColor = '#28a745';
            
            // Reset button after 1 second
            setTimeout(() => {
                this.innerHTML = '+';
                this.style.backgroundColor = '#FFD95E';
            }, 1000);
            
            console.log(`Added offer: ${offerTitle}`);
        });
    });

    // Smooth scroll for category navigation
    const categoryNav = document.querySelector('.category-nav');
    if (categoryNav) {
        // Make category nav sticky behavior smoother
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop) {
                // Scrolling down
                categoryNav.style.transform = 'translateY(-2px)';
            } else {
                // Scrolling up
                categoryNav.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });
    }

    // Initialize - Set first tab as active by default
    if (categoryTabs.length > 0) {
        categoryTabs[0].classList.add('active');
    }
}); 