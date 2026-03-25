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


// Modal noticias
// Variables globales
let zoom = 1;
let isDragging = false;
let startX = 0;
let startY = 0;

// Selección de elementos
const collageImages = document.querySelectorAll('.notices-collage img, .image-calendar img, .notices-collage-img img');
const modal = document.getElementById('modal-img');
const modalImg = document.getElementById('modal-image-show');
const closeModal = document.querySelector('.close-modal');

// Abrir imagen en modal
collageImages.forEach(img => {
    img.addEventListener('click', () => {
        modal.classList.add('show');
        modalImg.src = img.src;
        resetZoom();
    });
});

// Cerrar modal con botón
closeModal.addEventListener('click', () => {
    closeModalImg();
});

// Cerrar modal clic fuera de la imagen
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        closeModalImg();
    }
});

// Función cerrar modal
const closeModalImg = () => {
    modal.classList.remove("show");
    resetZoom();
};

// Resetear zoom
const resetZoom = () => {
    zoom = 1;
    modalImg.style.transform = "scale(1)";
    modalImg.style.cursor = "zoom-in";
};

// Doble click = zoom toggle
modalImg.addEventListener("dblclick", () => {
    zoom = zoom === 1 ? 2.5 : 1;
    modalImg.style.transform = `scale(${zoom})`;
    modalImg.style.cursor = zoom > 1 ? "grab" : "zoom-in";
});

// Zoom con scroll
modal.addEventListener("wheel", (e) => {
    e.preventDefault();
    if (e.deltaY < 0) zoom += 0.1;
    else zoom = Math.max(1, zoom - 0.1);
    modalImg.style.transform = `scale(${zoom})`;
    modalImg.style.cursor = zoom > 1 ? "grab" : "zoom-in";
});

// Mover imagen con drag
modalImg.addEventListener("mousedown", (e) => {
    if (zoom === 1) return;
    isDragging = true;
    startX = e.pageX;
    startY = e.pageY;
    modalImg.style.cursor = "grabbing";
});

modalImg.addEventListener("mousemove", (e) => {
    if (!isDragging || zoom === 1) return;
    e.preventDefault();
    const moveX = e.pageX - startX;
    const moveY = e.pageY - startY;
    modalImg.style.transform = `scale(${zoom}) translate(${moveX / zoom}px, ${moveY / zoom}px)`;
});

modalImg.addEventListener("mouseup", () => {
    isDragging = false;
    modalImg.style.cursor = zoom > 1 ? "grab" : "zoom-in";
});

modalImg.addEventListener("mouseleave", () => {
    isDragging = false;
});


// Botón "Ver más"

const readMoreBtn = document.getElementById("read-more-btn");
const textContent = document.querySelector(".notices-text-content");

readMoreBtn.addEventListener("click", () => {
    textContent.classList.toggle("expanded");

    if (textContent.classList.contains("expanded")) {
        readMoreBtn.textContent = "Leer menos";
    } else {
        readMoreBtn.textContent = "Leer más";
    }
});
