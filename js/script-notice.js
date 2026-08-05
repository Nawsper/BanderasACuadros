// Obtener la fecha actual
const fechaElemento = document.getElementById("fecha-hoy");
const hoy = new Date();

// Opciones para mostrar formato legible
const opciones = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
fechaElemento.textContent = hoy.toLocaleDateString("es-ES", opciones);


// Modal noticias
// Variables globales
let zoom = 1;
let isDragging = false;
let startX = 0;
let startY = 0;

// Selección de elementos
const collageImages = document.querySelectorAll('.notices-collage img, .image-calendar img, .notices-collage-img img, .notices-collage-vuelta img');
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

if (readMoreBtn && textContent) {
    readMoreBtn.addEventListener("click", () => {
        textContent.classList.toggle("expanded");
        if (textContent.classList.contains("expanded")) {
            readMoreBtn.textContent = "Leer menos";
        } else {
            readMoreBtn.textContent = "Leer más";
        }
    });
}
