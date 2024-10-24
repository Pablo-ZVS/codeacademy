document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const loginButton = document.querySelector('.login-button');

    if (menuToggle) {
        menuToggle.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;

        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            nav.classList.toggle('active');
            loginButton.classList.toggle('active');
        });
    }
});