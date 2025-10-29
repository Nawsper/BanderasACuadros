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


// --- Galería principal ---
const grid = document.getElementById('grid-galeria');
const totalImagenes = 66;

for (let i = 1; i <= totalImagenes; i++) {
    const img = document.createElement('img');
    img.src = `/images/galeria/image_galery_${i}.jpg`;
    img.alt = `Imagen ${i}`;
    grid.appendChild(img);
}

// --- Galería Kids ---
const gridKids = document.getElementById('grid-galeria-kids');
const totalImagenesKids = 19;

for (let i = 1; i <= totalImagenesKids; i++) {
    const img = document.createElement('img');
    img.src = `/images/galeria_kids/Image_kids_${i}.jpeg`;
    img.alt = `Imagen Kids ${i}`;
    gridKids.appendChild(img);
}

// --- Lightbox funcional ---

document.addEventListener("DOMContentLoaded", () => {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const prevBtn = document.querySelector(".lightbox-prev");
    const nextBtn = document.querySelector(".lightbox-next");

    // Seleccionamos todas las imágenes de ambas galerías
    const galleryImages = document.querySelectorAll(".gallery-grid img");
    let currentIndex = 0;
    let zoom = 1;
    let isDragging = false;
    let startX, startY, scrollLeft, scrollTop;

    // Mostrar imagen en el lightbox
    const showLightbox = (index) => {
        lightboxImg.src = galleryImages[index].src;
        lightbox.classList.add("show");
        currentIndex = index;
        resetZoom();
    };

    // Cerrar lightbox al hacer clic fuera de la imagen
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox || e.target.classList.contains('close-btn')) {
            lightbox.classList.remove("show");
        }
    });

    // Cerrar lightbox
    const closeLightbox = () => {
        lightbox.classList.remove("show");
        resetZoom();
    };

    // Navegar imágenes
    const showPrev = () => {
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        showLightbox(currentIndex);
    };

    const showNext = () => {
        currentIndex = (currentIndex + 1) % galleryImages.length;
        showLightbox(currentIndex);
    };

    prevBtn.addEventListener("click", showPrev);
    nextBtn.addEventListener("click", showNext);

    const resetZoom = () => {
        zoom = 1;
        lightboxImg.style.transform = "scale(1)";
        lightboxImg.style.cursor = "zoom-in";
    };

    // Mostrar lightbox al hacer clic en una imagen
    galleryImages.forEach((img, index) => {
        img.addEventListener("click", () => showLightbox(index));
    });

    // Navegación con teclado
    document.addEventListener("keydown", (e) => {
        if (!lightbox.classList.contains("show")) return;

        switch (e.key) {
            case "ArrowLeft":
                showPrev();
                break;
            case "ArrowRight":
                showNext();
                break;
            case "Escape":
                closeLightbox();
                break;
        }
    });

    // Doble clic o doble toque = zoom toggle
    lightboxImg.addEventListener("dblclick", () => {
        zoom = zoom === 1 ? 2.5 : 1;
        lightboxImg.style.transform = `scale(${zoom})`;
        lightboxImg.style.cursor = zoom > 1 ? "grab" : "zoom-in";
    });

    // Scroll del mouse = zoom progresivo
    lightbox.addEventListener("wheel", (e) => {
        e.preventDefault();
        if (e.deltaY < 0) zoom += 0.1;
        else zoom = Math.max(1, zoom - 0.1);
        lightboxImg.style.transform = `scale(${zoom})`;
        lightboxImg.style.cursor = zoom > 1 ? "grab" : "zoom-in";
    });

    // Arrastrar imagen cuando hay zoom
    lightboxImg.addEventListener("mousedown", (e) => {
        if (zoom === 1) return;
        isDragging = true;
        startX = e.pageX - lightboxImg.offsetLeft;
        startY = e.pageY - lightboxImg.offsetTop;
        lightboxImg.style.cursor = "grabbing";
    });

    lightboxImg.addEventListener("mouseup", () => {
        isDragging = false;
        lightboxImg.style.cursor = zoom > 1 ? "grab" : "zoom-in";
    });

    lightboxImg.addEventListener("mousemove", (e) => {
        if (!isDragging || zoom === 1) return;
        e.preventDefault();
        const x = e.pageX - startX;
        const y = e.pageY - startY;
        lightboxImg.style.transform = `scale(${zoom}) translate(${x / zoom}px, ${y / zoom}px)`;
    });

    lightboxImg.addEventListener("mouseleave", () => {
        isDragging = false;
        lightboxImg.style.cursor = zoom > 1 ? "grab" : "zoom-in";
    });
});