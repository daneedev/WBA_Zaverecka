function toggleMenu() {
    const menu = document.querySelector('.hamburger-menu');
    if (menu.style.display === "none") {
        menu.style.display = "flex";
    } else {
        menu.style.display = "none";
    }
}
