document.addEventListener('DOMContentLoaded', () => {

    // --- Lógica para el desplazamiento suave del menú ---
    const navLinks = document.querySelectorAll('.main-nav ul li a');

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
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
        slides.forEach((slide) => {
            slide.classList.remove('active');
        });
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

    showSlide(currentSlide);
});



// --- Lógica para el Menú Hmaburguesa ---

// Selección de elementos
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

// --- Abrir / cerrar con el botón hamburguesa ---
hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
});

// --- Cerrar al hacer clic en un enlace del menú ---
navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
    });
});

// --- Cerrar al hacer clic fuera del menú ---
document.addEventListener("click", (event) => {
    if (
        !navLinks.contains(event.target) &&
        !hamburger.contains(event.target)
    ) {
        navLinks.classList.remove("open");
    }
});


// Obtener la fecha actual
const fechaElemento = document.getElementById("fecha-hoy");
const hoy = new Date();

// Opciones para mostrar formato legible
const opciones = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
fechaElemento.textContent = hoy.toLocaleDateString("es-ES", opciones);
