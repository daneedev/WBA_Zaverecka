function toggleMenu() {
    const menu = document.querySelector('.hamburger-menu');
    
    if (menu.classList.contains('active')) {
        // First remove the active class to start the CSS transition
        menu.classList.remove('active');
        
        // Then hide the element after the transition completes
        setTimeout(() => {
            menu.style.display = 'none';
        }, 300); // Match this to the transition duration in CSS
    } else {
        // First set display to flex to make it visible
        menu.style.display = 'flex';
        
        // Force a reflow to ensure the display change is applied before adding the active class
        void menu.offsetWidth;
        
        // Add the active class to trigger the transition
        menu.classList.add('active');
    }
}

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const menu = document.querySelector('.hamburger-menu');
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    
    if (menu.classList.contains('active')) {
        // If click is outside menu and not on the button
        if (!menu.contains(event.target) && !hamburgerBtn.contains(event.target)) {
            toggleMenu();
        }
    }
});

// Prevent menu toggle button clicks from propagating
document.querySelector('.hamburger-btn').addEventListener('click', function(event) {
    event.stopPropagation();
});
