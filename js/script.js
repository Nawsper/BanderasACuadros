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


// Obtener la fecha actual
const fechaElemento = document.getElementById("fecha-hoy");
const hoy = new Date();

// Opciones para mostrar formato legible
const opciones = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
fechaElemento.textContent = hoy.toLocaleDateString("es-ES", opciones);


// --- Construcción de slides para las galerias ---

function buildSlides(wrapperId, total, srcFn, altFn) {
    const wrapper = document.getElementById(wrapperId);
    if (!wrapper) return;

    for (let i = 1; i <= total; i++) {
        const slide = document.createElement("div");
        slide.classList.add("swiper-slide");

        const img = document.createElement("img");
        img.src = srcFn(i);
        img.alt = altFn(i);

        slide.appendChild(img);
        wrapper.appendChild(slide);
    }
}

// Galería principal
buildSlides(
    "galeria-wrapper",
    66,
    (i) => `/images/galeria/image_galery_${i}.jpg`,
    (i) => `Imagen ${i} de la galería`
);

// Galería Kids
buildSlides(
    "galeria-wrapper-kids",
    19,
    (i) => `/images/galeria_kids/Image_kids_${i}.jpeg`,
    (i) => `Imagen Kids ${i} de la galería`
);

// Galería Automovilismo Pista 2026
buildSlides(
    "galeria-wrapper-pista",
    35,
    (i) => `/images/pista_2026/automovilismo_pista_2026_${i}.jpeg`,
    (i) => `Imagen Pista ${i} de la galería`
);

// --- Inicializar Swipers de galerias---

function initSwiper(selector, paginationEl, nextEl, prevEl, depth, modifier) {
    return new Swiper(selector, {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        loop: true,
        speed: 1000,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        coverflowEffect: {
            rotate: 30,
            stretch: 0,
            depth: depth,
            modifier: modifier,
            slideShadows: true,
        },
        pagination: { el: paginationEl, clickable: true },
        navigation: { nextEl: nextEl, prevEl: prevEl },
    });
}

const swiper      = initSwiper(".mySwiper",      ".swiper-pagination",       ".swiper-button-next",       ".swiper-button-prev",       50,  2);
const swiperKids  = initSwiper(".mySwiperKids",  ".swiper-pagination-kids",  ".swiper-button-next-kids",  ".swiper-button-prev-kids",  100, 5);
const swiperPista = initSwiper(".mySwiperPista", ".swiper-pagination-pista", ".swiper-button-next-pista", ".swiper-button-prev-pista", 100, 5);


// --- Doble clic en el carrusel principal para abrir la galería completa ---
const swiperContainer = document.querySelector('.mySwiper');
swiperContainer.addEventListener('dblclick', () => {
    window.location.href = '/pages/gallery-complete.html';
});

// --- Doble clic en el carrusel Kids para abrir su galería completa ---
const swiperContainerKids = document.querySelector('.mySwiperKids');
swiperContainerKids.addEventListener('dblclick', () => {
    window.location.href = '/pages/gallery-complete.html';
});

// --- Doble clic en el carrusel Pista para abrir su galería completa ---
const swiperContainerPista = document.querySelector('.mySwiperPista');
swiperContainerPista.addEventListener('dblclick', () => {
    window.location.href = '/pages/gallery-complete.html';
});

