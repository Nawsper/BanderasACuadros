document.addEventListener('DOMContentLoaded', () => {

    // --- Lógica para el desplazamiento suave del menú ---
    const navLinks = document.querySelectorAll('.main-nav ul li a');

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // El offset es para compensar la altura del menú fijo
                const offsetTop = targetSection.offsetTop - document.querySelector('.main-nav').offsetHeight;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Lógica para el Carrusel de "Nosotros" ---
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const slides = document.querySelectorAll('.carousel-slide img');
    let currentSlide = 0;

    function showSlide(index) {
        // Oculta todas las imágenes
        slides.forEach((slide) => {
            slide.classList.remove('active');
        });
        // Muestra la imagen correcta
        slides[index].classList.add('active');
    }

    nextButton.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    });

    prevButton.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    });

    // Iniciar el carrusel en la primera imagen
    showSlide(currentSlide);
});



// --- Lógica para el Menú Hmaburguesa ---

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
});