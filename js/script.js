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



//Swiper Galería

const galeriaWrapper = document.getElementById('galeria-wrapper');

const totalImagenes = 66;

for (let i = 1; i <= totalImagenes; i++) {
    const slide = document.createElement('div');
    slide.classList.add('swiper-slide');

    const img = document.createElement('img');
    img.src = `/images/galeria/image_galery_${i}.jpg`;
    img.alt = `Imagen ${i} de la galería`;

    slide.appendChild(img);
    galeriaWrapper.appendChild(slide);
}



const swiper = new Swiper(".mySwiper", {
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
        depth: 50,
        modifier: 2,
        slideShadows: true,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});


//Swiper Galería Kids

const galeriaWrapperKids = document.getElementById('galeria-wrapper-kids');

const totalImagenesKids = 19;

for (let i = 1; i <= totalImagenesKids; i++) {
    const slide = document.createElement('div');
    slide.classList.add('swiper-slide');

    const img = document.createElement('img');
    img.src = `/images/galeria_kids/Image_kids_${i}.jpeg`;
    img.alt = `Imagen ${i} de la galería`;

    slide.appendChild(img);
    galeriaWrapperKids.appendChild(slide);
}

// --- Inicializar Swiper Kids ---

const swiperKids = new Swiper(".mySwiperKids", {
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
        depth: 100,
        modifier: 5,
        slideShadows: true,
    },
    pagination: {
        el: ".swiper-pagination-kids",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next-kids",
        prevEl: ".swiper-button-prev-kids",
    },
});

// --- Doble clic en el carrusel principal para abrir la galería completa ---
const swiperContainer = document.querySelector('.mySwiper');
swiperContainer.addEventListener('dblclick', () => {
    window.open('/pages/gallery-complete.html', '_blank');
});

// --- Doble clic en el carrusel Kids para abrir su galería completa ---
const swiperContainerKids = document.querySelector('.mySwiperKids');
swiperContainerKids.addEventListener('dblclick', () => {
    window.open('/pages/gallery-complete.html', '_blank');
});

