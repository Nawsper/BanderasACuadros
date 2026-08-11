// --- Modal de imágenes de noticias ---

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal-img");
    const modalImg = document.getElementById("modal-image-show");
    const closeModal = document.querySelector(".close-modal");

    // Si no existe el modal en esta página, no hacer nada
    if (!modal || !modalImg || !closeModal) return;

    const collageImages = document.querySelectorAll(
        ".notices-collage img, .image-calendar img, .notices-collage-img img, .notices-collage-vuelta img"
    );

    // Estado interno del modal
    let zoom = 1;
    let isDragging = false;
    let startX = 0;
    let startY = 0;

    // Resetear zoom
    const resetZoom = () => {
        zoom = 1;
        modalImg.style.transform = "scale(1)";
        modalImg.style.cursor = "zoom-in";
    };

    // Cerrar modal
    const closeModalImg = () => {
        modal.classList.remove("show");
        resetZoom();
    };

    // Abrir imagen en modal
    collageImages.forEach((img) => {
        img.addEventListener("click", () => {
            modal.classList.add("show");
            modalImg.src = img.src;
            resetZoom();
        });
    });

    // Cerrar con botón
    closeModal.addEventListener("click", closeModalImg);

    // Cerrar al hacer clic fuera de la imagen
    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModalImg();
    });

    // Doble clic = zoom toggle
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

    // Arrastrar imagen con drag
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
});