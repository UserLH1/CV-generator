document.addEventListener('DOMContentLoaded', function () {
    const burgerMenu = document.querySelector('.burger-menu');
    const menuDropdown = document.querySelector('.menu-dropdown');

    if (burgerMenu && menuDropdown) {
        burgerMenu.addEventListener('click', function () {
            burgerMenu.classList.toggle('active');
            // Afișează sau ascunde meniul
            menuDropdown.style.display = menuDropdown.style.display === 'block' ? 'none' : 'block';
        });
    } else {
        console.error('Elementele burger-menu sau menu-dropdown nu au fost găsite.');
    }
});
