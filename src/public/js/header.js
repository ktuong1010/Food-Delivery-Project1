document.addEventListener('DOMContentLoaded', function() {
    // Only enable sticky header on main page
    const isMainPage = window.location.pathname === '/public-home' || window.location.pathname === '/';
    if (!isMainPage) return;

    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add/remove sticky class based on scroll position
        if (currentScroll > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }

        // Optional: Hide/show header based on scroll direction
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down & past header
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });

    // Smooth scroll for nav links with offset for fixed header
    const headerHeight = 100; // px
    document.querySelectorAll('a.nav-link[href^="/#"], .logo-link[href="/"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('/#')) {
                const id = href.replace('/#', '');
                const target = document.getElementById(id);
                if (target) {
                    e.preventDefault();
                    const y = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            } else if (this.classList.contains('logo-link') && href === '/') {
                // Scroll to top for logo
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });
}); 