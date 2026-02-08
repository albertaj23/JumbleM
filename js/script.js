document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const beams = document.querySelectorAll('.beam');
    const cards = document.querySelectorAll('.card');

    // Remove jumble state instantly for snappier feel
    setTimeout(() => {
        body.classList.remove('is-jumbled');
    }, 50);

    // Animate logo beams
    setTimeout(() => {
        if(beams.length >= 3) {
            beams[0].classList.add('grow-b1');
            beams[1].classList.add('grow-b2');
            beams[2].classList.add('grow-b3');
        }
    }, 350);

    // Staggered card entry
    cards.forEach((card, index) => {
        card.style.transitionDelay = `${0.6 + (index * 0.1)}s`;
    });


    // Add this to your existing script.js
    const menuLinks = document.querySelectorAll('.nav-links a');
    const toggle = document.getElementById('menu-toggle');

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
        toggle.checked = false; // Closes menu when a link is tapped
    });
});
});