const hamburgerButton = document.querySelector('.hamburger-btn');
const closeButton = document.querySelector('.hamburger-close');
hamburgerButton.addEventListener('click', toggleMenu);
closeButton.addEventListener('click', toggleMenu);

function toggleMenu() {
    const menu = document.querySelector('.hamburger-menu');
    if (menu.style.display === "flex") {
        menu.style.display = "none";
    } else {
        menu.style.display = "flex";
    }
}